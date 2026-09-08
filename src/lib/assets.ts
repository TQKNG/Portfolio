const assetsRoot = "/assets";

export const assetPath = (path: string) => `${assetsRoot}/${path}`;

export const projectAsset = (slug: string, filename: string) =>
  assetPath(`projects/${slug}/${filename}`);

export const blogAsset = (slug: string, filename: string) =>
  assetPath(`blog/${slug}/${filename}`);
