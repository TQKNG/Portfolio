import { Link, Navigate, useParams } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { SiteNav } from "@/components/navigation/SiteNav";
import { getBlogPostBySlug } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/" replace />;

  return (
    <PageTransition>
      <div className="min-h-screen bg-brutalist-cream font-mono">
        <SiteNav />
        <main className="px-6 py-12 lg:px-12 lg:py-20">
          <article className="mx-auto max-w-3xl">
            <Link to="/#blog" className="text-xs font-bold uppercase text-brutalist-teal hover:underline">
              ← Back to notes
            </Link>
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wide text-brutalist-muted">
              <span>{post.category}</span>
              <span>{post.publishedAt}</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-4 text-5xl font-bold leading-none text-brutalist-ink lg:text-8xl">{post.title}</h1>
            <p className="mt-6 text-sm uppercase leading-relaxed tracking-wide text-brutalist-muted">{post.excerpt}</p>
            <div className="my-12 border-t-4 border-brutalist-ink pt-10">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        </main>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
