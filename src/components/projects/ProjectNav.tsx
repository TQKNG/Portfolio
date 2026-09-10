import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/types";

interface ProjectNavProps {
  previousProject: Project | null;
  nextProject: Project | null;
}

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-red focus-visible:ring-offset-4 focus-visible:ring-offset-brutalist-cream";

export const ProjectNav = ({
  previousProject,
  nextProject,
}: ProjectNavProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="Project navigation" className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {previousProject && (
          <Link
            to={`/projects/${previousProject.slug}`}
            className={`group flex min-h-28 flex-col justify-between border-4 border-brutalist-ink p-5 transition-colors hover:bg-brutalist-ink hover:text-brutalist-cream ${linkFocus}`}
          >
            <span className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em]">
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              />
              Previous project
            </span>
            <span className="mt-6 text-2xl font-bold uppercase tracking-[-0.04em] sm:text-3xl">
              {previousProject.title}
            </span>
          </Link>
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className={`group flex min-h-28 flex-col justify-between border-4 border-brutalist-ink bg-brutalist-red p-5 text-brutalist-cream transition-colors hover:bg-brutalist-ink ${linkFocus}`}
          >
            <span className="flex items-center justify-between gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em]">
              Next project
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
            <span className="mt-6 text-2xl font-bold uppercase tracking-[-0.04em] sm:text-3xl">
              {nextProject.title}
            </span>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/#work"
          className={`inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.16em] text-brutalist-ink hover:text-brutalist-red ${linkFocus}`}
        >
          Back to all projects
        </Link>
        <button
          type="button"
          onClick={scrollToTop}
          className={`inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brutalist-ink hover:text-brutalist-red ${linkFocus}`}
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};
