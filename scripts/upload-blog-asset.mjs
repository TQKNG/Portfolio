import { existsSync } from "node:fs";
import { extname } from "node:path";
import { spawnSync } from "node:child_process";

const getArgument = (name) => {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const file = getArgument("file");
const slug = getArgument("slug");
const assetName = getArgument("name");
const version = getArgument("version") ?? "v1";
const dryRun = !process.argv.includes("--write");

if (!file || !slug || !assetName) {
  console.error("Usage: bun run blog:upload-asset -- --file PATH --slug SLUG --name NAME [--version v1] [--write]");
  process.exit(1);
}

if (!existsSync(file)) throw new Error(`Asset does not exist: ${file}`);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Slug must use lowercase kebab-case.");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(assetName)) throw new Error("Asset name must use lowercase kebab-case.");
if (!/^v[1-9][0-9]*$/.test(version)) throw new Error("Version must look like v1 or v2.");

const extension = extname(file).toLowerCase();
const contentTypes = new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
]);
const contentType = contentTypes.get(extension);

if (!contentType) throw new Error(`Unsupported image extension: ${extension}`);

const blobName = `blog/${slug}/${assetName}-${version}${extension}`;
const url = `https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/${blobName}`;

if (dryRun) {
  console.log(`[dry-run] ${file} -> ${url}`);
  process.exit(0);
}

const result = spawnSync(
  "az",
  [
    "storage", "blob", "upload",
    "--account-name", "cs210032002b3e09a5d",
    "--container-name", "portfolio-assets",
    "--name", blobName,
    "--file", file,
    "--auth-mode", "login",
    "--overwrite", "false",
    "--content-type", contentType,
    "--content-cache-control", "public, max-age=31536000, immutable",
    "--output", "none",
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) process.exit(result.status ?? 1);
console.log(url);
