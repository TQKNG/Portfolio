import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/animations/FadeIn";
import { Project } from "@/types";

interface ProjectHeroProps {
  project: Project;
}

export const ProjectHero = ({ project }: ProjectHeroProps) => (
  <header className="px-5 pb-10 pt-8 sm:px-8 lg:px-12 lg:pb-16 lg:pt-10">
    <div className="mx-auto max-w-[1600px]">
      <FadeIn>
        <Link
          to="/#work"
          className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brutalist-ink transition-colors hover:text-brutalist-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-teal focus-visible:ring-offset-4 focus-visible:ring-offset-brutalist-cream"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {project.category && (
              <p className="mb-5 inline-flex border-2 border-brutalist-ink bg-brutalist-teal px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brutalist-cream">
                {project.category}
              </p>
            )}
            <h1 className="max-w-[12ch] text-[clamp(3.5rem,10vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em] text-brutalist-ink">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            {project.subtitle && (
              <p className="max-w-[34rem] text-lg font-semibold leading-snug text-brutalist-ink sm:text-xl lg:text-2xl">
                {project.subtitle}
              </p>
            )}
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brutalist-muted">
              {project.year}
            </p>
          </div>
        </div>
        <div className="mt-9 h-3 w-28 bg-brutalist-teal lg:mt-12" />
      </FadeIn>
    </div>
  </header>
);
