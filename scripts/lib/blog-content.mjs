import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const BLOG_CONTENT_DIR = new URL("../../src/content/blog/", import.meta.url);
export const BLOB_ORIGIN =
  "https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/";

const parseValue = (value = "") => value.trim().replace(/^['"]|['"]$/g, "");

const parseList = (value = "") =>
  parseValue(value)
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => parseValue(item))
    .filter(Boolean);

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return parseValue(value).toLowerCase() === "true";
};

export const parseBlogSource = (source, filename = "unknown.md") => {
  const match = source.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: missing frontmatter`);

  const metadata = Object.fromEntries(
    match[1]
      .split("\n")
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim()];
      }),
  );
  const parsedDevToId = Number.parseInt(parseValue(metadata.devToId), 10);

  return {
    filename,
    slug: parseValue(metadata.slug),
    title: parseValue(metadata.title),
    excerpt: parseValue(metadata.excerpt),
    category: parseValue(metadata.category),
    tags: parseList(metadata.tags),
    devToTags: parseList(metadata.devToTags || metadata.tags).slice(0, 4),
    publishedAt: parseValue(metadata.publishedAt),
    updatedAt: metadata.updatedAt ? parseValue(metadata.updatedAt) : undefined,
    status: parseValue(metadata.status || "published"),
    syncToDev: parseBoolean(metadata.syncToDev),
    devToId: Number.isFinite(parsedDevToId) ? parsedDevToId : undefined,
    coverImage: metadata.coverImage ? parseValue(metadata.coverImage) : undefined,
    coverImageAlt: metadata.coverImageAlt
      ? parseValue(metadata.coverImageAlt)
      : undefined,
    series: metadata.series ? parseValue(metadata.series) : undefined,
    content: match[2].trim(),
  };
};

export const readBlogPosts = () =>
  readdirSync(BLOG_CONTENT_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) =>
      parseBlogSource(
        readFileSync(join(BLOG_CONTENT_DIR.pathname, filename), "utf8"),
        filename,
      ),
    );

export const validatePost = (post) => {
  const errors = [];
  const markdownImages = [...post.content.matchAll(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)/g)];

  for (const field of ["slug", "title", "excerpt", "category", "publishedAt"]) {
    if (!post[field]) errors.push(`${post.filename}: missing ${field}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    errors.push(`${post.filename}: slug must use lowercase kebab-case`);
  }

  if (!Number.isFinite(Date.parse(post.publishedAt))) {
    errors.push(`${post.filename}: publishedAt must be a valid date`);
  }

  if (!new Set(["draft", "published"]).has(post.status)) {
    errors.push(`${post.filename}: status must be draft or published`);
  }

  if (post.syncToDev) {
    if (post.devToTags.length === 0 || post.devToTags.length > 4) {
      errors.push(`${post.filename}: devToTags must contain between one and four tags`);
    }

    if (!post.coverImage?.startsWith(BLOB_ORIGIN)) {
      errors.push(`${post.filename}: synced posts require a coverImage on the approved Blob origin`);
    }

    if (!post.coverImageAlt) {
      errors.push(`${post.filename}: synced posts require coverImageAlt`);
    }

    for (const image of markdownImages) {
      if (!image[1].trim()) {
        errors.push(`${post.filename}: synced post images require descriptive alternative text`);
      }

      if (!image[2].startsWith(BLOB_ORIGIN)) {
        errors.push(`${post.filename}: synced post image must use the approved Blob origin: ${image[2]}`);
      }
    }
  }

  return errors;
};

export const validatePosts = (posts) => {
  const errors = posts.flatMap(validatePost);
  const seenSlugs = new Set();
  const seenDevToIds = new Set();

  for (const post of posts) {
    if (seenSlugs.has(post.slug)) errors.push(`Duplicate slug: ${post.slug}`);
    seenSlugs.add(post.slug);

    if (post.devToId) {
      if (seenDevToIds.has(post.devToId)) errors.push(`Duplicate DEV article ID: ${post.devToId}`);
      seenDevToIds.add(post.devToId);
    }
  }

  return errors;
};
