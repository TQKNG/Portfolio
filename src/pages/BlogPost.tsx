import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { AssetImage } from "@/components/ui/AssetImage";
import { getBlogPostBySlug } from "@/data/blog";

const SITE_URL = "https://www.khanhng.com";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const setMetaContent = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  const existingElement = element;
  const previousContent = element?.content;

  if (!element) {
    element = document.createElement("meta");
    const [name, content] = attribute.split("=");
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }

  element.content = value;

  return () => {
    if (!existingElement) {
      element.remove();
      return;
    }

    element.content = previousContent ?? "";
  };
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;

    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const previousTitle = document.title;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const existingCanonical = canonical;
    const previousCanonicalHref = canonical?.href;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    document.title = `${post.title} | Khanh Nguyen`;
    canonical.href = canonicalUrl;
    const restoreMetadata = [
      setMetaContent('meta[name="description"]', "name=description", post.excerpt),
      setMetaContent('meta[property="og:title"]', "property=og:title", post.title),
      setMetaContent('meta[property="og:description"]', "property=og:description", post.excerpt),
      setMetaContent('meta[property="og:url"]', "property=og:url", canonicalUrl),
    ];

    if (post.coverImage) {
      restoreMetadata.push(
        setMetaContent('meta[property="og:image"]', "property=og:image", post.coverImage),
      );
    }

    return () => {
      document.title = previousTitle;
      restoreMetadata.forEach((restore) => restore());

      if (!existingCanonical) canonical.remove();
      else canonical.href = previousCanonicalHref ?? "";
    };
  }, [post]);

  if (!post) return <Navigate to="/" replace />;

  return (
    <PortfolioShell mainClassName="px-6 py-12 lg:px-12 lg:py-20">
      <article className="mx-auto max-w-3xl">
        <Link to="/#blog" className="text-xs font-bold uppercase text-brutalist-teal hover:underline">
          ← Back to notes
        </Link>
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wide text-brutalist-muted">
          <span>{post.category}</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-none text-brutalist-ink sm:text-5xl lg:text-6xl">{post.title}</h1>
        <p className="mt-6 text-sm uppercase leading-relaxed tracking-wide text-brutalist-muted">{post.excerpt}</p>
        {post.coverImage ? (
          <AssetImage
            src={post.coverImage}
            alt={post.coverImageAlt ?? ""}
            className="mt-10 aspect-[40/17] w-full border-4 border-brutalist-ink object-cover"
          />
        ) : null}
        <div className="my-12 border-t-4 border-brutalist-ink pt-10">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </PortfolioShell>
  );
};

export default BlogPost;
