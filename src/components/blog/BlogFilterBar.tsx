interface BlogFilterBarProps {
  options: Array<{ label: string; value: string }>;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export const BlogFilterBar = ({
  options,
  activeFilter,
  onFilterChange,
}: BlogFilterBarProps) => (
  <div className="mx-6 mb-6 flex flex-wrap gap-2" aria-label="Filter blog posts">
    {options.map((option) => {
      const isActive = activeFilter === option.value;

      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onFilterChange(option.value)}
          aria-pressed={isActive}
          className={`border-2 border-brutalist-ink px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
            isActive
              ? "bg-brutalist-ink text-brutalist-cream"
              : "text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
