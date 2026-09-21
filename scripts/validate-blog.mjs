import { readBlogPosts, validatePosts } from "./lib/blog-content.mjs";

const posts = readBlogPosts();
const errors = validatePosts(posts);

if (errors.length > 0) {
  console.error("Blog validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const syncedPosts = posts.filter((post) => post.syncToDev);

if (process.argv.includes("--check-remote")) {
  const urls = new Set(
    syncedPosts.flatMap((post) => {
      const inlineImages = [...post.content.matchAll(/!\[[^\]]*\]\((https?:\/\/[^ )]+)\)/g)]
        .map((match) => match[1]);
      return [post.coverImage, ...inlineImages].filter(Boolean);
    }),
  );

  for (const url of urls) {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok || !contentType.startsWith("image/")) {
      errors.push(`${url}: expected an accessible image, received ${response.status} ${contentType}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Remote blog asset validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Blog valid: ${posts.length} posts checked, ${syncedPosts.length} enabled for DEV.`);
