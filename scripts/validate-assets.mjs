import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(".");
const publicAssets = join(root, "public/assets");
const sourceRoot = join(root, "src");
const referencedAssets = new Set();

const walk = (directory) => {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|jsx?|css|md)$/.test(entry)) {
      const source = readFileSync(path, "utf8");
      for (const match of source.matchAll(/\/assets\/[a-zA-Z0-9_./-]+/g)) {
        referencedAssets.add(match[0]);
      }
    }
  }
};

walk(sourceRoot);

const missingAssets = [...referencedAssets].filter(
  (asset) => !existsSync(join(root, "public", asset.slice(1))),
);

if (missingAssets.length > 0) {
  console.error("Missing public assets:");
  missingAssets.forEach((asset) => console.error(`- ${asset}`));
  process.exit(1);
}

const requiredDirectories = [
  join(publicAssets, "icons/social"),
  join(publicAssets, "projects"),
  join(publicAssets, "blog"),
];

const missingDirectories = requiredDirectories.filter(
  (directory) => !existsSync(directory),
);

if (missingDirectories.length > 0) {
  console.error("Missing asset directories:");
  missingDirectories.forEach((directory) =>
    console.error(`- ${relative(root, directory)}`),
  );
  process.exit(1);
}

console.log(`Assets valid: ${referencedAssets.size} source references checked.`);
