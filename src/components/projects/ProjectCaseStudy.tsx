import { ExternalLink, Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import {
  Project,
  ProjectDecision,
  ProjectImage,
  ProjectMedia,
  ProjectMetric,
  ProjectSection,
  ProjectSectionId,
} from "@/types";

const sectionNumbers: Record<ProjectSectionId, string> = {
  context: "01",
  problem: "02",
  approach: "03",
  solution: "04",
  results: "05",
  learnings: "06",
};

const focusClass =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-red focus-visible:ring-offset-4 focus-visible:ring-offset-brutalist-cream";

const isValidLink = (value?: string) => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

interface ProjectFactsProps {
  project: Project;
}

export const ProjectFacts = ({ project }: ProjectFactsProps) => {
  const facts = [
    ["Role", project.role],
    ["Responsibilities", project.responsibilities],
    ["Team", project.team],
    ["Timeline", project.timeline],
    ["Users / industry", project.users],
    ["Platform", project.platform],
    ["Project status", project.status],
    ["Technology stack", project.technologies?.join(" · ")],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  const actions = [
    { label: "Live demo", href: project.liveUrl, icon: ExternalLink },
    { label: "GitHub", href: project.githubUrl, icon: Github },
  ].filter((action) => isValidLink(action.href));

  if (facts.length === 0 && actions.length === 0) return null;

  return (
    <section
      aria-labelledby="project-facts-heading"
      className="border-y-4 border-brutalist-ink"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <h2
          id="project-facts-heading"
          className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-brutalist-red"
        >
          Project facts
        </h2>
        <dl className="grid grid-cols-1 border-l-2 border-t-2 border-brutalist-ink sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([label, value]) => (
            <div
              key={label}
              className="min-h-32 border-b-2 border-r-2 border-brutalist-ink p-5"
            >
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brutalist-muted">
                {label}
              </dt>
              <dd className="mt-3 text-sm font-semibold leading-relaxed text-brutalist-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        {actions.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border-2 border-brutalist-ink bg-brutalist-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brutalist-cream transition-colors hover:border-brutalist-red hover:bg-brutalist-red",
                  focusClass,
                )}
              >
                {label}
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ImpactMetricsProps {
  metrics?: ProjectMetric[];
}

export const ImpactMetrics = ({ metrics }: ImpactMetricsProps) => {
  if (!metrics?.length) return null;

  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-brutalist-ink text-brutalist-cream"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <h2
          id="impact-heading"
          className="text-xs font-bold uppercase tracking-[0.2em] text-brutalist-red"
        >
          Measured impact
        </h2>
        <dl
          className={cn(
            "mt-8 grid gap-px border-2 border-brutalist-cream/50 bg-brutalist-cream/50",
            metrics.length === 1 ? "grid-cols-1" : "md:grid-cols-3",
          )}
        >
          {metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="bg-brutalist-ink p-6 lg:p-8">
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brutalist-cream/70">
                {metric.label}
              </dt>
              <dd className="mt-4 text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-none tracking-[-0.06em] text-brutalist-red">
                {metric.value}
              </dd>
              {metric.detail && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-brutalist-cream/75">
                  {metric.detail}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

interface DecisionBlockProps {
  decision: ProjectDecision;
  index: number;
}

export const DecisionBlock = ({ decision, index }: DecisionBlockProps) => (
  <aside
    aria-label={`Engineering decision ${index + 1}`}
    className="border-l-4 border-brutalist-red bg-brutalist-ink px-5 py-6 text-brutalist-cream sm:px-7"
  >
    <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brutalist-red">
      Decision {String(index + 1).padStart(2, "0")}
    </p>
    <dl className="grid gap-5 lg:grid-cols-3">
      {[
        ["Observation", decision.observation],
        ["Decision", decision.decision],
        ["Result", decision.result],
      ].map(([label, value]) => (
        <div key={label}>
          <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brutalist-cream/60">
            {label}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-brutalist-cream">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </aside>
);

interface ProjectMediaFigureProps {
  media: ProjectMedia;
  priority?: boolean;
}

export const ProjectMediaFigure = ({
  media,
  priority = false,
}: ProjectMediaFigureProps) => {
  const aspectClass = {
    wide: "aspect-[16/9]",
    standard: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
  }[media.aspectRatio ?? "wide"];

  return (
    <figure>
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden border-4 border-brutalist-ink bg-brutalist-ink",
          aspectClass,
        )}
      >
        {media.type === "video" ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={media.poster}
            aria-label={media.alt}
            className="h-full w-full object-contain"
          >
            <source src={media.localSrc ?? media.src} type="video/mp4" />
            {media.localSrc && <source src={media.src} type="video/mp4" />}
            Your browser does not support embedded video.
          </video>
        ) : (
          <AssetImage
            src={media.src}
            localSrc={media.localSrc}
            alt={media.alt}
            width={1600}
            height={900}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <figcaption className="mt-3 max-w-3xl text-xs font-bold uppercase leading-relaxed tracking-[0.1em] text-brutalist-muted">
        {media.caption}
      </figcaption>
    </figure>
  );
};

const imageToMedia = (image: ProjectImage): ProjectMedia => ({
  id: image.id,
  type: "image",
  src: image.url,
  localSrc: image.localUrl,
  alt: image.alt,
  caption: image.caption ?? image.alt,
  aspectRatio: image.width === "half" ? "standard" : "wide",
});

interface CaseStudySectionProps {
  section: ProjectSection;
  fallbackMedia?: ProjectImage[];
}

export const CaseStudySection = ({
  section,
  fallbackMedia = [],
}: CaseStudySectionProps) => {
  const media = section.media?.length
    ? section.media
    : section.id === "solution"
      ? fallbackMedia.map(imageToMedia)
      : [];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-8 border-t-4 border-brutalist-ink py-14 first:border-t-0 lg:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-bold text-brutalist-red">
            {sectionNumbers[section.id]}
          </p>
          <h2
            id={`${section.id}-heading`}
            className="mt-2 text-3xl font-bold uppercase tracking-[-0.04em] text-brutalist-ink sm:text-4xl"
          >
            {section.title}
          </h2>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <div className="max-w-[46rem] space-y-5 font-sans text-base leading-[1.8] text-brutalist-ink sm:text-lg">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {section.decisions?.length ? (
            <div className="mt-10 space-y-5">
              {section.decisions.slice(0, 3).map((decision, index) => (
                <DecisionBlock
                  key={`${decision.observation}-${index}`}
                  decision={decision}
                  index={index}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {media.length > 0 && (
        <div className="mt-12 space-y-8 lg:mt-16">
          {media.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                index > 0 && media.length > 1
                  ? "lg:ml-auto lg:w-[68%]"
                  : "w-full",
              )}
            >
              <ProjectMediaFigure media={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

interface SectionIndexProps {
  sections: ProjectSection[];
}

export const SectionIndex = ({ sections }: SectionIndexProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id as ProjectSectionId);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav aria-label="Case study sections" className="sticky top-8">
      <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brutalist-muted">
        In this case study
      </p>
      <ol className="border-l-2 border-brutalist-ink">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? "location" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 border-l-4 border-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-brutalist-red hover:text-brutalist-red",
                activeSection === section.id
                  ? "border-brutalist-red text-brutalist-red"
                  : "text-brutalist-muted",
                focusClass,
              )}
            >
              <span aria-hidden="true">{sectionNumbers[section.id]}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
