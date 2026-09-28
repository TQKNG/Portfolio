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

const coverStyles: Record<string, string> = {
  Accessibility: "bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700",
  "Behind the Work": "bg-gradient-to-br from-fuchsia-300 via-purple-500 to-indigo-800",
  "Design Systems": "bg-gradient-to-br from-amber-200 via-orange-500 to-red-700",
  Engineering: "bg-gradient-to-br from-lime-200 via-emerald-500 to-teal-800",
  "Field Notes": "bg-gradient-to-br from-yellow-200 via-pink-400 to-rose-700",
  "Product Thinking": "bg-gradient-to-br from-violet-300 via-blue-500 to-cyan-700",
  Process: "bg-gradient-to-br from-orange-200 via-rose-500 to-purple-800",
};

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
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 overflow-hidden ${coverStyles[post.category] ?? "bg-gradient-to-br from-teal-300 via-blue-500 to-indigo-800"}`}
        >
          <span className="absolute -right-5 -top-8 h-28 w-28 rotate-12 border-8 border-white/40" />
          <span className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/25" />
          <span className="absolute bottom-3 right-8 h-8 w-20 -rotate-6 bg-black/20" />
        </div>
      )}
      <span className="relative z-10 border-2 border-brutalist-ink bg-brutalist-cream px-2 py-1 text-xs font-bold uppercase tracking-wide text-brutalist-ink">
        {post.category}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-center justify-between gap-3 text-xs text-brutalist-muted">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-brutalist-ink group-hover:text-brutalist-teal">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brutalist-muted">
        {post.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap gap-1 pt-5">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs font-bold uppercase text-brutalist-ink">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);
