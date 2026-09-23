import { BlogPost } from "@/types/blog";

const rawPosts = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const parseValue = (value: string) => value.trim().replace(/^['"]|['"]$/g, "");

const parseList = (value: string) =>
  parseValue(value)
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => parseValue(item))
    .filter(Boolean);

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  return parseValue(value).toLowerCase() === "true";
};

export const calculateReadingTime = (content: string) => {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|[\]()!-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 225))} min read`;
};

export const parsePost = (source: string): BlogPost => {
  const [, frontmatter = "", content = ""] = source.match(
    /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/,
  ) ?? ["", "", source];
  const metadata = Object.fromEntries(
    frontmatter
      .split("\n")
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim()];
      }),
  );

  const trimmedContent = content.trim();
  const parsedDevToId = Number.parseInt(parseValue(metadata.devToId ?? ""), 10);

  return {
    slug: parseValue(metadata.slug ?? ""),
    title: parseValue(metadata.title ?? ""),
    excerpt: parseValue(metadata.excerpt ?? ""),
    category: parseValue(metadata.category ?? ""),
    tags: parseList(metadata.tags ?? ""),
    devToTags: parseList(metadata.devToTags ?? metadata.tags ?? "").slice(0, 4),
    publishedAt: parseValue(metadata.publishedAt ?? ""),
    updatedAt: metadata.updatedAt ? parseValue(metadata.updatedAt) : undefined,
    readingTime: calculateReadingTime(trimmedContent),
    status:
      parseValue(metadata.status ?? "published") === "draft"
        ? "draft"
        : "published",
    syncToDev: parseBoolean(metadata.syncToDev, false),
    devToId: Number.isFinite(parsedDevToId) ? parsedDevToId : undefined,
    coverImage: metadata.coverImage
      ? parseValue(metadata.coverImage)
      : undefined,
    coverImageAlt: metadata.coverImageAlt
      ? parseValue(metadata.coverImageAlt)
      : undefined,
    series: metadata.series ? parseValue(metadata.series) : undefined,
    content: trimmedContent,
  };
};

export const blogPosts: BlogPost[] = Object.values(rawPosts)
  .map(parsePost)
  .filter((post) => post.status === "published")
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const getAllBlogPosts = () => blogPosts;

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
