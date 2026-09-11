import { Link } from "react-router-dom";
import { AssetImage } from "@/components/ui/AssetImage";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const BlogCard = ({ post }: BlogCardProps) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group flex h-full min-h-0 flex-col border-4 border-brutalist-ink bg-brutalist-cream transition-transform hover:-translate-y-1"
  >
    <div className="relative flex min-h-20 items-end overflow-hidden border-b-4 border-brutalist-ink bg-brutalist-ink p-2 lg:min-h-28 lg:p-3">
      {post.coverImage ? (
        <AssetImage
          src={post.coverImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
      ) : null}
      <span className="relative z-10 border-2 border-brutalist-ink bg-brutalist-cream px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brutalist-ink">
        {post.category}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-wide text-brutalist-muted">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-brutalist-ink group-hover:text-brutalist-teal">
        {post.title}
      </h3>
      <p className="mt-3 text-xs uppercase leading-relaxed tracking-wide text-brutalist-muted">
        {post.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap gap-1 pt-5">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-[10px] font-bold uppercase text-brutalist-ink">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);
