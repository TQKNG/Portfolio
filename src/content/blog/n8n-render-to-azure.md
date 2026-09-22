---
slug: n8n-render-to-azure
title: I Moved My n8n Instance from Render to Azure
excerpt: Why I moved a working n8n instance to Azure and rebuilt it with Bicep, OIDC, layered security, and repeatable deployment.
category: Cloud Engineering
tags: [azure, devops, bicep, cicd]
devToTags: [azure, devops, bicep, cicd]
publishedAt: 2026-06-10T04:01:55Z
status: published
syncToDev: false
devToId: 3862305
coverImage: https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/n8n-render-to-azure/cover-v1.png
coverImageAlt: An automation workflow crossing a bridge from a small cloud into structured, protected cloud infrastructure
---

My n8n instance on Render worked perfectly.

It was fast, simple, fully managed, and cost-effectiveness. And I barely had to think about infrastructure.

![Render hosting costs before the migration](https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/n8n-render-to-azure/hosting-costs-v1.png)

---
### So why move it?

Because I wanted:

- More control over my environment
- Centralized cloud billing in Azure
- Hands-on experience with Infrastructure as Code (IaC), GitHub Actions, and cloud security
- A real-world project instead of another tutorial

This post shares what I built and what I learned along the way.<br><br>

### Repository

```powershell
git clone https://github.com/TQKNG/lab-n8n-azure.git
```
_Check out README file for full guide_<br><br>

### What I Wanted to Build

I wanted a fully reproducible deployment where I could:

- Deploy everything from GitHub Actions
- Authenticate to Azure without long-lived secrets (OIDC)
- Run n8n securely behind HTTPS
- Add identity + edge protection layers
- Tear everything down when not needed

Think: personal SaaS-grade infrastructure, but lightweight<br><br>

### Architecture

This setup adds two important layers compared to a basic VM deployment:

Cloudflare as the edge layer
Azure AD (Entra ID) as the identity gate

![Architecture connecting Cloudflare, Microsoft Entra ID, an Azure virtual machine, Docker, Caddy, and n8n](https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/n8n-render-to-azure/architecture-v1.png)<br>

### What Gets Deployed

**Compute**

- Ubuntu 22.04 LTS VM (Azure)
- Trusted Launch enabled
- SSH key-based access

**Networking**

- Virtual Network (isolated subnet)
- Network Security Group (restricted ports)
- Public IP behind controlled ingress

**Application**

- n8n (Docker container)
- Caddy reverse proxy (HTTPS + routing)

**Edge & Identity**

- Cloudflare (DNS + protection layer)
- Azure AD (Entra ID authentication gate) <br><br>

### GitHub Actions Pipeline

> To trace logs, I use below manually triggered workflows. These allows full lifecycle control from GitHub. Feel free to customize it based on your own workflow setup.

- Setup → initialize repo variables
- OIDC bootstrap → configure Azure trust
- Verify → test authentication
- Deploy → run Bicep infrastructure
- Start → validate VM + n8n endpoint
- Teardown → destroy resources safely<br><br>

### Key Security Layers

This architecture is intentionally layered:

- Cloudflare → edge protection + TLS
- Azure AD → identity verification before access
- NSG → network-level filtering
- Caddy → HTTPS termination + reverse proxy
- Docker → container isolation

This creates a simple zero-trust-inspired flow.

### What I Learned

1. Azure OIDC is a game changer. No more storing long-lived secrets in GitHub.
2. Bicep is actually pleasant. Much easier than ARM templates and still powerful.
3. Cloudflare simplifies edge security. It reduces direct exposure of Azure resources.
4. Infrastructure as Code changes everything. Even a small project becomes reproducible and disposable.
<br><br>

### Next Step

- Add Azure Key Vault for secrets
- Add automated backups for n8n workflows
- Move monitoring to Azure Monitor dashboards
- Restrict SSH via IP allowlist or JIT access
- Evaluate Azure Container Apps instead of VM
- Add cost automation (auto shutdown dev environment)

---

### Resources

**Project**

- GitHub Repository: https://github.com/TQKNG/lab-n8n-azure
- n8n Documentation: https://docs.n8n.io
- Cloudfare Developer Docs: https://developers.cloudflare.com/

**Azure**

- Bicep Docs: https://learn.microsoft.com/azure/azure-resource-manager/bicep
- Azure OIDC with GitHub Actions: https://learn.microsoft.com/azure/developer/github/connect-from-azure-openid-connect
- Azure Well-Architected Framework: https://learn.microsoft.com/azure/architecture/framework

**CI/CD & Infra**

- GitHub Actions Docs: https://docs.github.com/actions
- Docker Docs: https://docs.docker.com
- Caddy Server Docs: https://caddyserver.com/docs
