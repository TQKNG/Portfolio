import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageTransition } from "@/components/animations/PageTransition";
import { SiteNav } from "@/components/navigation/SiteNav";
import {
  CaseStudySection,
  ImpactMetrics,
  ProjectFacts,
  SectionIndex,
} from "@/components/projects/ProjectCaseStudy";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectNav } from "@/components/projects/ProjectNav";
import {
  getNextProject,
  getPreviousProject,
  getProjectBySlug,
} from "@/data/projects";
import { Project } from "@/types";

const ensureMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element?.setAttribute(name, value);
  });
};

const useProjectMetadata = (project: Project) => {
  useEffect(() => {
    const title = `${project.title} case study | Khanh Nguyen`;
    document.title = title;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: project.description,
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: project.description,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: project.heroImage,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "article",
    });

    const structuredData = document.createElement("script");
    structuredData.id = "project-structured-data";
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: project.heroImage,
      dateCreated: project.year,
      creator: {
        "@type": "Person",
        name: "Khanh Nguyen",
      },
    });
    document.getElementById(structuredData.id)?.remove();
    document.head.appendChild(structuredData);

    return () => structuredData.remove();
  }, [project]);
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return <ProjectDetailContent project={project} />;
};

const ProjectDetailContent = ({ project }: { project: Project }) => {
  useProjectMetadata(project);

  const previousProject = getPreviousProject(project.slug);
  const nextProject = getNextProject(project.slug);
  const sections = project.sections ?? [];

  return (
    <PageTransition>
      <div className="min-h-screen bg-brutalist-cream font-mono text-brutalist-ink">
        <SiteNav />

        <main id="main-content" tabIndex={-1}>
          <ProjectHero project={project} />
          <ProjectFacts project={project} />
          <ImpactMetrics metrics={project.metrics} />

          {sections.length > 0 && (
            <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-10 sm:px-8 lg:px-12 lg:py-16 xl:grid-cols-[190px_minmax(0,1fr)] xl:gap-16">
              <aside className="hidden xl:block">
                <SectionIndex sections={sections} />
              </aside>
              <article>
                {sections.map((section) => (
                  <FadeIn key={section.id}>
                    <CaseStudySection
                      section={section}
                      fallbackMedia={project.images}
                    />
                  </FadeIn>
                ))}
              </article>
            </div>
          )}

          <section className="border-t-4 border-brutalist-ink px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-[1600px]">
              <ProjectNav
                previousProject={previousProject}
                nextProject={nextProject}
              />
            </div>
          </section>
        </main>

        <footer className="border-t-4 border-brutalist-ink">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-5 text-xs font-bold uppercase tracking-[0.12em] text-brutalist-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <span>© {new Date().getFullYear()} Khanh Nguyen</span>
            <div className="flex gap-5">
              <a
                href="https://www.linkedin.com/in/khanhngt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-brutalist-red focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-red"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/TQKNG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-brutalist-red focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-red"
              >
                GitHub
              </a>
              <Link
                to="/#contact"
                className="inline-flex min-h-11 items-center transition-colors hover:text-brutalist-red focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-red"
              >
                Mail
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
