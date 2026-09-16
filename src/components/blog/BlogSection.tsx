import { useMemo, useState } from "react";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilterBar } from "@/components/blog/BlogFilterBar";
import { getAllBlogPosts } from "@/data/blog";

export const BlogSection = () => {
  const posts = getAllBlogPosts();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filterOptions = useMemo(() => {
    const categories = [...new Set(posts.map((post) => post.category))].sort();

    return [
      { label: "All posts", value: "all" },
      ...categories.map((category) => ({
        label: category,
        value: `category:${category}`,
      })),
    ];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    const [type, value] = activeFilter.split(":");
    return type === "category" && post.category === value;
  });
  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 6);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setShowAll(false);
  };

  return (
    <FadeIn viewportAmount={0.05}>
      <section id="blog" data-nav-id="blog" className="scroll-mt-[72px] border-t-4 border-brutalist-ink">
      <FadeIn>
        <div className="p-4 pb-4 lg:p-6 lg:pb-4">
          <RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" />
          <h4 className="text-xl font-bold text-brutalist-ink">LET&apos;S SHARE</h4>
          <p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">
            THOUGHTS ON CODE, DESIGN, AND THE WORK IN BETWEEN
          </p>
        </div>
      </FadeIn>
      <FadeIn>
        <BlogFilterBar
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </FadeIn>
      {visiblePosts.length > 0 ? (
        <FadeInStagger className="grid grid-cols-1 items-stretch gap-4 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {visiblePosts.map((post) => (
            <FadeIn key={post.slug} className="h-full">
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </FadeInStagger>
      ) : (
        <div className="mx-6 mb-6 border-4 border-dashed border-brutalist-ink p-8 text-xs font-bold uppercase tracking-wide text-brutalist-muted">
          No notes match this filter yet.
        </div>
      )}
      {filteredPosts.length > 6 ? (
        <div className="flex justify-center px-6 pb-8">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="border-4 border-brutalist-ink bg-brutalist-ink px-5 py-3 text-xs font-bold uppercase tracking-wide text-brutalist-cream transition-colors hover:bg-brutalist-teal"
          >
            {showAll ? "Show less" : "View more"}
          </button>
        </div>
      ) : null}
      </section>
    </FadeIn>
  );
};
