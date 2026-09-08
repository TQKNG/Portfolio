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

const parsePost = (source: string): BlogPost => {
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

  return {
    slug: parseValue(metadata.slug ?? ""),
    title: parseValue(metadata.title ?? ""),
    excerpt: parseValue(metadata.excerpt ?? ""),
    category: parseValue(metadata.category ?? ""),
    tags: parseList(metadata.tags ?? ""),
    publishedAt: parseValue(metadata.publishedAt ?? ""),
    readingTime: parseValue(metadata.readingTime ?? ""),
    coverImage: metadata.coverImage ? parseValue(metadata.coverImage) : undefined,
    content: content.trim(),
  };
};

export const blogPosts: BlogPost[] = Object.values(rawPosts)
  .map(parsePost)
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const getAllBlogPosts = () => blogPosts;

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
