import { readBlogPosts, validatePosts } from "./lib/blog-content.mjs";
import { setTimeout as delay } from "node:timers/promises";

const API_ROOT = "https://dev.to/api";
const SITE_URL = (process.env.SITE_URL || "https://www.khanhng.com").replace(/\/$/, "");
const API_KEY = process.env.DEVTO_API_KEY;
const write = process.argv.includes("--write");

const posts = readBlogPosts().filter((post) => post.syncToDev);
const errors = validatePosts(posts);

if (errors.length > 0) {
  errors.forEach((error) => console.error(error));
  process.exit(1);
}

const headers = {
  Accept: "application/vnd.forem.api-v1+json",
  "Content-Type": "application/json",
  "User-Agent": "khanhng.com portfolio blog sync",
  ...(API_KEY ? { "api-key": API_KEY } : {}),
};

const request = async (path, options = {}) => {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(`${API_ROOT}${path}`, { ...options, headers });

    if (response.ok) return response.json();

    if (response.status === 429 && attempt < 3) {
      const retryAfter = Number.parseInt(response.headers.get("retry-after") ?? "", 10);
      await delay(Number.isFinite(retryAfter) ? retryAfter * 1000 : 1000 * 2 ** attempt);
      continue;
    }

    throw new Error(`${options.method || "GET"} ${path} failed with ${response.status}`);
  }

  throw new Error(`${options.method || "GET"} ${path} exhausted retries`);
};

const imageMatches = (current, expected) => {
  if (current === expected) return true;

  try {
    return decodeURIComponent(current ?? "").includes(expected ?? "");
  } catch {
    return false;
  }
};

const loadAllArticles = async () => {
  if (!API_KEY) return [];

  const articles = [];
  for (let page = 1; ; page += 1) {
    const batch = await request(`/articles/me/all?page=${page}&per_page=100`);
    articles.push(...batch);
    if (batch.length < 100) break;
  }
  return articles;
};

const allArticles = await loadAllArticles();

for (const post of posts) {
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const article = post.devToId
    ? await request(`/articles/${post.devToId}`)
    : allArticles.find((candidate) => candidate.canonical_url === canonicalUrl);
  const payload = {
    article: {
      title: post.title,
      body_markdown: post.content,
      published: post.status === "published",
      tags: post.devToTags.join(","),
      description: post.excerpt,
      main_image: post.coverImage,
      canonical_url: canonicalUrl,
      series: post.series ?? null,
    },
  };
  const comparable = article
    ? {
        title: article.title,
        body_markdown: article.body_markdown?.trim(),
        published: article.published,
        tags: Array.isArray(article.tags) ? article.tags.join(",") : article.tag_list?.join(","),
        description: article.description,
        main_image: article.cover_image,
        canonical_url: article.canonical_url,
        series: article.series ?? null,
      }
    : null;
  const changed =
    !comparable ||
    Object.entries(payload.article).some(([key, value]) => {
      if (key === "main_image") return !imageMatches(comparable.main_image, value);
      if (key === "published") {
        const currentlyPublished = article.published ?? Boolean(article.published_at);
        return currentlyPublished !== value;
      }
      return comparable[key] !== value;
    });

  if (!changed) {
    console.log(`unchanged ${post.slug}`);
    continue;
  }

  const action = article ? `update DEV article ${article.id}` : "create DEV article";
  if (!write) {
    console.log(`[dry-run] ${action}: ${post.slug}`);
    continue;
  }

  if (!API_KEY) throw new Error("DEVTO_API_KEY is required with --write.");
  const path = article ? `/articles/${article.id}` : "/articles";
  const result = await request(path, {
    method: article ? "PUT" : "POST",
    body: JSON.stringify(payload),
  });
  console.log(`${article ? "updated" : "created"} ${post.slug} (${result.id})`);
}
