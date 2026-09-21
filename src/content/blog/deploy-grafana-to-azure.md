---
slug: deploy-grafana-to-azure
title: Deploy Grafana to Azure with Azure CLI : From Local Docker to Durable Dashboards
excerpt: Deploy Grafana to Azure Container Apps with private PostgreSQL, managed identity, durable state, and a pinned image.
category: Cloud Engineering
tags: [azure, devops, cli, grafana]
devToTags: [azure, devops, cli, grafana]
publishedAt: 2026-08-12T20:04:12Z
status: published
syncToDev: true
devToId: 4380724
coverImage: https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/deploy-grafana-to-azure/cover-v1.png
coverImageAlt: Retro Azure CLI and Grafana workstations connected through cloud infrastructure
---

Grafana turns data from sources such as PostgreSQL, Prometheus, and Azure Monitor into shared dashboards, charts, and alerts. While it queries that operational data, it also needs to persist its own dashboards, users, alert rules, and data-source configuration.

I usually use IaC for shared Azure environments. For this deployment, I used Azure CLI first to understand and validate each dependency directly: private networking, PostgreSQL persistence, ACR image pulls, managed identity, and Container Apps secrets.

This guide deploys Grafana on Azure Container Apps with Azure Database for PostgreSQL Flexible Server and a pinned image in ACR. By the end, you will have managed HTTPS ingress, private database connectivity, persistent Grafana state, and no registry password in the deployment.

> This is a production-minded lab: no `latest` tag, anonymous access disabled, and no database password baked into the image. After validating the design, capture it in Bicep, Terraform, or your preferred IaC tool for repeatable deployments.

## The architecture: separate what changes from what must persist

![Architecture showing Grafana on Azure Container Apps connected privately to PostgreSQL and Azure Container Registry](https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/deploy-grafana-to-azure/architecture-v1.png)

The service responsibilities are deliberately separate:

| Service | Responsibility |
| --- | --- |
| Azure Container Apps | Runs Grafana, provides HTTPS ingress, and manages revisions |
| Azure Database for PostgreSQL | Stores Grafana's users, dashboards, alerting configuration, and settings |
| ACR | Provides a private, deployable copy of the Grafana image |
| User-assigned managed identity | Lets Container Apps pull from ACR without registry credentials |

Grafana's **internal database** is different from the reporting database that dashboards query. This distinction is easy to miss: the internal database preserves Grafana itself, while data sources provide the metrics and business data displayed in a dashboard. Give Grafana a dedicated database and role; give dashboards a separate, read-only data-source account where possible.

## Before you start: prepare the Azure CLI session

You need an Azure subscription, Docker, and the Azure CLI. The commands use Bash or zsh; use a shell such as Azure Cloud Shell, macOS Terminal, or WSL.

Sign in and install the Container Apps extension:

```bash
az login
az extension add --name containerapp --upgrade

az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.OperationalInsights
az provider register --namespace Microsoft.ContainerService
az provider register --namespace Microsoft.ContainerRegistry
az provider register --namespace Microsoft.DBforPostgreSQL
```

Set names that are unique where Azure requires them. Keep secrets out of your shell history and Git repository.

```bash
RESOURCE_GROUP=rg-grafana-dev
LOCATION=canadacentral

VNET_NAME=vnet-grafana-dev
ACA_SUBNET=snet-containerapps
POSTGRES_SUBNET=snet-postgres
PRIVATE_DNS_ZONE=grafana.private.postgres.database.azure.com

POSTGRES_SERVER=pg-grafana-dev
POSTGRES_ADMIN=pgadmin
GRAFANA_DB=grafana
GRAFANA_DB_USER=grafana_app

ACR_NAME=<globally-unique-acr-name>
IDENTITY_NAME=id-grafana-acr-pull
ACA_ENV=cae-grafana-dev
APP_NAME=grafana

# Pin the version that you tested. Do not deploy :latest.
GRAFANA_VERSION=13.1.3
```

Collect secret values interactively. Replace these with Azure Key Vault references for a shared or production environment.

```bash
read -rsp "PostgreSQL admin password: " POSTGRES_ADMIN_PASSWORD; echo
read -rsp "Grafana database password: " GRAFANA_DB_PASSWORD; echo
read -rsp "Grafana admin password: " GRAFANA_ADMIN_PASSWORD; echo
GRAFANA_SECRET_KEY="$(openssl rand -base64 48)"
```

> The server name, ACR name, and PostgreSQL administrator shown above are examples. Do not reuse the sample passwords or enable anonymous access from a local experiment.

## Optional: validate Grafana locally

This optional check proves the image and database configuration before Azure resources are created. If PostgreSQL runs on your host, Docker Desktop exposes it as `host.docker.internal`.

Create a local-only `.env` file. Never commit it.

```dotenv
GF_DATABASE_TYPE=postgres
GF_DATABASE_HOST=host.docker.internal:5432
GF_DATABASE_NAME=grafana
GF_DATABASE_USER=grafana_app
GF_DATABASE_PASSWORD=replace-me
GF_DATABASE_SSL_MODE=disable
GF_SECURITY_ADMIN_PASSWORD=replace-me
GF_SECURITY_SECRET_KEY=replace-with-a-long-random-value
GF_AUTH_ANONYMOUS_ENABLED=false
GF_PANELS_DISABLE_SANITIZE_HTML=false
```

Run the pinned image and check its health endpoint:

```bash
docker pull "grafana/grafana:${GRAFANA_VERSION}"
docker run --detach --name grafana --publish 3000:3000 \
  --env-file .env "grafana/grafana:${GRAFANA_VERSION}"

curl --fail http://localhost:3000/api/health
docker logs grafana
```

On Linux Docker Engine, add `--add-host=host.docker.internal:host-gateway` if needed. This hostname is local-only; Azure uses the PostgreSQL server FQDN.

## 1. Give Grafana durable, private state

Create the resource group, VNet, and two dedicated subnets. The Container Apps environment requires its own subnet. PostgreSQL Flexible Server requires a separate subnet delegated to `Microsoft.DBforPostgreSQL/flexibleServers`.

```bash
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"

az network vnet create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VNET_NAME" \
  --location "$LOCATION" \
  --address-prefixes 10.0.0.0/16

az network vnet subnet create \
  --resource-group "$RESOURCE_GROUP" --vnet-name "$VNET_NAME" \
  --name "$ACA_SUBNET" --address-prefixes 10.0.0.0/21 \
  --delegations Microsoft.App/environments

az network vnet subnet create \
  --resource-group "$RESOURCE_GROUP" --vnet-name "$VNET_NAME" \
  --name "$POSTGRES_SUBNET" --address-prefixes 10.0.8.0/24 \
  --delegations Microsoft.DBforPostgreSQL/flexibleServers
```

Create and link the private DNS zone. The link allows workloads in the VNet to resolve the database server to its private address.

```bash
az network private-dns zone create \
  --resource-group "$RESOURCE_GROUP" --name "$PRIVATE_DNS_ZONE"

az network private-dns link vnet create \
  --resource-group "$RESOURCE_GROUP" --zone-name "$PRIVATE_DNS_ZONE" \
  --name grafana-vnet-link --virtual-network "$VNET_NAME" \
  --registration-enabled false

PRIVATE_DNS_ZONE_ID=$(az network private-dns zone show \
  --resource-group "$RESOURCE_GROUP" --name "$PRIVATE_DNS_ZONE" \
  --query id --output tsv)
```

Now create PostgreSQL and the Grafana database. PostgreSQL 18 is used here because it is currently supported by Flexible Server; choose a supported version approved by your organization.

```bash
az postgres flexible-server create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$POSTGRES_SERVER" --location "$LOCATION" \
  --admin-user "$POSTGRES_ADMIN" --admin-password "$POSTGRES_ADMIN_PASSWORD" \
  --version 18 --tier Burstable --sku-name Standard_B1ms --storage-size 32 \
  --vnet "$VNET_NAME" --subnet "$POSTGRES_SUBNET" \
  --private-dns-zone "$PRIVATE_DNS_ZONE_ID"

az postgres flexible-server db create \
  --resource-group "$RESOURCE_GROUP" --server-name "$POSTGRES_SERVER" \
  --name "$GRAFANA_DB"

POSTGRES_FQDN=$(az postgres flexible-server show \
  --resource-group "$RESOURCE_GROUP" --name "$POSTGRES_SERVER" \
  --query fullyQualifiedDomainName --output tsv)
```

### Create a least-privileged Grafana role

For a private database, run the following from a trusted machine that has network access to the VNet, such as a jump host. It creates an application role and makes it owner of the Grafana database, which lets Grafana run its own schema migrations without using the server administrator at runtime.

```bash
psql "host=$POSTGRES_FQDN port=5432 dbname=postgres user=$POSTGRES_ADMIN sslmode=require" \
  -v ON_ERROR_STOP=1 \
  -v db_name="$GRAFANA_DB" \
  -v db_user="$GRAFANA_DB_USER" \
  -v grafana_password="$GRAFANA_DB_PASSWORD" <<'SQL'
SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'db_user', :'grafana_password') \gexec
SELECT format('ALTER DATABASE %I OWNER TO %I', :'db_name', :'db_user') \gexec
SQL
```

The FQDN is read from the provisioned server instead of assumed. In a production environment, manage this database setup through a reviewed migration or infrastructure workflow instead of typing credentials into an interactive terminal.

## 2. Prepare a private image and passwordless pull access

ACR can import the public image directly, so your deployment does not depend on Docker Hub at runtime.

```bash
az acr create --resource-group "$RESOURCE_GROUP" --name "$ACR_NAME" \
  --location "$LOCATION" --sku Basic --role-assignment-mode rbac

# Required for managed-identity pulls by Azure Container Apps.
az acr config authentication-as-arm update --registry "$ACR_NAME" --status enabled

ACR_LOGIN_SERVER=$(az acr show --resource-group "$RESOURCE_GROUP" --name "$ACR_NAME" \
  --query loginServer --output tsv)

az acr import --name "$ACR_NAME" \
  --source "docker.io/grafana/grafana:${GRAFANA_VERSION}" \
  --image "grafana:${GRAFANA_VERSION}"
```

Pinning `13.1.3` avoids the ambiguity of `latest`. Tags can still be moved, so for an immutable production release, record and deploy the imported image digest. When you upgrade, test the new version, import it, and deploy it as a new Container Apps revision.

Create a user-assigned managed identity and grant it pull-only access to this registry.

```bash
az identity create --resource-group "$RESOURCE_GROUP" \
  --name "$IDENTITY_NAME" --location "$LOCATION"

IDENTITY_ID=$(az identity show --resource-group "$RESOURCE_GROUP" --name "$IDENTITY_NAME" \
  --query id --output tsv)
IDENTITY_PRINCIPAL_ID=$(az identity show --resource-group "$RESOURCE_GROUP" --name "$IDENTITY_NAME" \
  --query principalId --output tsv)
ACR_ID=$(az acr show --resource-group "$RESOURCE_GROUP" --name "$ACR_NAME" --query id --output tsv)

az role assignment create \
  --assignee-object-id "$IDENTITY_PRINCIPAL_ID" \
  --assignee-principal-type ServicePrincipal \
  --role AcrPull --scope "$ACR_ID"
```

If your registry uses the newer RBAC + ABAC repository-permission mode, use **Container Registry Repository Reader** instead of `AcrPull`, ideally scoped to the `grafana` repository.

## 3. Run Grafana with secrets outside the image

Retrieve the Container Apps subnet ID, then attach it when you create the environment.

```bash
ACA_SUBNET_ID=$(az network vnet subnet show \
  --resource-group "$RESOURCE_GROUP" --vnet-name "$VNET_NAME" --name "$ACA_SUBNET" \
  --query id --output tsv)

az containerapp env create \
  --resource-group "$RESOURCE_GROUP" --name "$ACA_ENV" --location "$LOCATION" \
  --infrastructure-subnet-resource-id "$ACA_SUBNET_ID"
```

Create the app with external HTTPS ingress. Secrets are stored by Container Apps and referenced with `secretref:`. They are not image labels, plain environment-variable values in source control, or ACR credentials. This lab passes secret values through the CLI; use Key Vault references for production to avoid exposing secret values to the local process environment.

```bash
az containerapp create \
  --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --environment "$ACA_ENV" \
  --image "${ACR_LOGIN_SERVER}/grafana:${GRAFANA_VERSION}" \
  --user-assigned "$IDENTITY_ID" \
  --registry-server "$ACR_LOGIN_SERVER" --registry-identity "$IDENTITY_ID" \
  --ingress external --target-port 3000 --transport auto \
  --cpu 0.5 --memory 1Gi --min-replicas 1 --max-replicas 1 \
  --secrets \
    grafana-db-password="$GRAFANA_DB_PASSWORD" \
    grafana-admin-password="$GRAFANA_ADMIN_PASSWORD" \
    grafana-secret-key="$GRAFANA_SECRET_KEY" \
  --env-vars \
    GF_DATABASE_TYPE=postgres \
    "GF_DATABASE_HOST=${POSTGRES_FQDN}:5432" \
    "GF_DATABASE_NAME=${GRAFANA_DB}" \
    "GF_DATABASE_USER=${GRAFANA_DB_USER}" \
    GF_DATABASE_PASSWORD=secretref:grafana-db-password \
    GF_DATABASE_SSL_MODE=require \
    GF_SECURITY_ADMIN_USER=admin \
    GF_SECURITY_ADMIN_PASSWORD=secretref:grafana-admin-password \
    GF_SECURITY_SECRET_KEY=secretref:grafana-secret-key \
    GF_AUTH_ANONYMOUS_ENABLED=false \
    GF_PANELS_DISABLE_SANITIZE_HTML=false
```

The app is intentionally fixed at one replica. Grafana's application state lives in PostgreSQL, but a multi-replica Grafana design still needs deliberate consideration for plugins, sessions, provisioning, alerting, and load balancing. Start with one replica; scale only after validating those behaviours for your Grafana version and plugins.

## 4. Confirm the deployment and persistence

Retrieve the endpoint and open it in a browser:

```bash
GRAFANA_FQDN=$(az containerapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" \
  --query properties.configuration.ingress.fqdn --output tsv)
echo "https://${GRAFANA_FQDN}"
```

Sign in with `admin` and the password supplied as `GRAFANA_ADMIN_PASSWORD` on Grafana's first start. Grafana applies `GF_SECURITY_ADMIN_PASSWORD` only when it creates the initial admin user; later changes require Grafana's supported password-management path. If the revision does not become healthy, tail the container logs:

```bash
az containerapp logs show --resource-group "$RESOURCE_GROUP" \
  --name "$APP_NAME" --type console --follow
```

The most common failures are straightforward:

| Symptom | Likely cause | First check |
| --- | --- | --- |
| Image pull fails | Identity role has not propagated or has the wrong ACR role | Verify the role assignment and wait briefly before retrying |
| `no such host` / DB connection fails | Private DNS zone is not linked or the FQDN is wrong | Confirm the zone link and use the server's Azure FQDN |
| TLS or authentication failure | Database SSL or credentials are incorrect | Keep `GF_DATABASE_SSL_MODE=require` and rotate/reapply the secret |
| Grafana starts but settings disappear | Grafana is using SQLite or the wrong database | Check `GF_DATABASE_*` variables and startup logs |

For a quick persistence check, create a throwaway dashboard, trigger a new Container Apps revision with the same image, and confirm that the dashboard remains after the revision becomes active. If it disappears, stop and fix the database configuration before inviting users.

## Production next steps

The CLI workflow makes the Azure relationships visible. Before using it for a shared production environment, codify the deployment as IaC and add:

- Azure Key Vault references and a secret-rotation process.
- Microsoft Entra ID, a custom domain, and restricted ingress or a WAF.
- PostgreSQL backups, a restore test, and a production-appropriate compute tier. Consider `verify-full` for the Grafana-to-PostgreSQL TLS connection after validating the container's CA trust.
- Diagnostics and alerts for revision failures, database capacity, and authentication issues.
- Versioned Grafana provisioning, plugin governance, and tested image upgrades.

## Clean up

For a disposable lab, delete the resource group after confirming it contains no shared resources:

```bash
az group delete --name "$RESOURCE_GROUP" --yes --no-wait
```

Deletion stops the ongoing costs for resources in that group. Check your subscription afterward for any separately scoped diagnostics, backups, or retained resources you intentionally created.

## References

- [Grafana configuration documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/)
- [Run Grafana in Docker](https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/)
- [Azure Container Apps virtual network integration](https://learn.microsoft.com/en-us/azure/container-apps/vnet-custom)
- [Azure Container Apps secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets)
- [Managed identity image pulls for Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity-image-pull)
- [Azure Database for PostgreSQL private access](https://learn.microsoft.com/en-us/azure/postgresql/network/concepts-networking-private)
- [ACR roles and ABAC repository permissions](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-rbac-built-in-roles-overview)

