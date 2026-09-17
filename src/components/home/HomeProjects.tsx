import { Link } from "react-router-dom";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { RevealRule } from "@/components/animations/RevealRule";
import { ProjectPreviewMedia } from "@/components/projects";
import { getAllProjects } from "@/data/projects";

export const HomeProjects = () => {
  const projects = getAllProjects();

  return (
    <FadeIn viewportAmount={0.05}>
      <section id="work" data-nav-id="work" className="scroll-mt-[72px]">
        <FadeIn>
          <div className="p-4 pb-4 lg:p-6 lg:pb-4">
            <RevealRule className="mb-5 h-1 w-24 bg-brutalist-teal" />
            <h2 className="text-xl font-bold text-brutalist-ink">LET&apos;S EXPLORE</h2>
            <p className="mt-1 text-xs uppercase tracking-wide text-brutalist-muted">SELECT A PROJECT TO VIEW THE FULL CASE STUDY</p>
          </div>
        </FadeIn>
        <FadeInStagger className="space-y-2 px-6 pb-6 pt-0" staggerDelay={0.08}>
          {projects.map((project) => (
            <FadeIn key={project.id}>
              <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`} className="group block cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brutalist-teal">
                <div className="relative aspect-[16/10] overflow-hidden border-4 border-brutalist-ink transition-colors group-hover:border-brutalist-teal group-focus-visible:border-brutalist-teal">
                  <ProjectPreviewMedia project={project} className="transition-transform duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transform-none" />
                  <span className="absolute bottom-0 right-0 z-10 border-l-4 border-t-4 border-brutalist-ink bg-brutalist-cream px-4 py-3 text-xs font-bold text-brutalist-ink transition-colors group-hover:border-brutalist-teal group-hover:bg-brutalist-teal group-hover:text-brutalist-cream group-focus-visible:border-brutalist-teal group-focus-visible:bg-brutalist-teal group-focus-visible:text-brutalist-cream">VIEW CASE STUDY <span aria-hidden="true">→</span></span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-bold text-brutalist-ink transition-colors group-hover:text-brutalist-teal">{project.title.toUpperCase()}</h3>
                    <p className="text-xs text-brutalist-muted">{project.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold text-brutalist-muted">{project.year}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>
      </section>
    </FadeIn>
  );
};
