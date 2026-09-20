import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Project,
  ProjectDecision,
  ProjectImage,
  ProjectMetric,
  ProjectSection,
  ProjectSectionId,
  ProjectTechnology,
  ProjectWorkflow,
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
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-teal focus-visible:ring-offset-4 focus-visible:ring-offset-brutalist-cream";

const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealViewport = { once: false, amount: 0.15 } as const;

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
          className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-brutalist-teal"
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
                  "inline-flex min-h-11 items-center gap-2 border-2 border-brutalist-ink bg-brutalist-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brutalist-cream transition-colors hover:border-brutalist-teal hover:bg-brutalist-teal",
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

interface TechnologyStackProps {
  technologies?: ProjectTechnology[];
}

export const TechnologyStack = ({ technologies }: TechnologyStackProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (!technologies?.length) return null;

  return (
    <section
      aria-labelledby="technology-stack-heading"
      className="border-b-4 border-brutalist-ink"
    >
      <div className="mx-auto grid max-w-[1600px] gap-6 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brutalist-teal">
            Technology stack
          </p>
          <h2
            id="technology-stack-heading"
            className="mt-3 text-3xl font-bold uppercase tracking-[-0.04em] text-brutalist-ink"
          >
            Built with
          </h2>
        </div>
        <motion.ul
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={revealViewport}
          variants={revealContainer}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4"
        >
          {technologies.map((technology) => (
            <motion.li
              key={technology.name}
              variants={shouldReduceMotion ? undefined : revealItem}
              className="flex min-h-20 items-center gap-3 border-2 border-brutalist-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-brutalist-ink"
            >
              <img
                src={technology.icon}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span>{technology.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

interface ImpactMetricsProps {
  metrics?: ProjectMetric[];
}

export const ImpactMetrics = ({ metrics }: ImpactMetricsProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (!metrics?.length) return null;

  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-brutalist-ink text-brutalist-cream"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <h2
          id="impact-heading"
          className="text-xs font-bold uppercase tracking-[0.2em] text-brutalist-teal-bright"
        >
          Measured impact
        </h2>
        <motion.dl
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={revealViewport}
          variants={revealContainer}
          className={cn(
            "mt-8 grid gap-px border-2 border-brutalist-cream/50 bg-brutalist-cream/50",
            metrics.length === 1
              ? "grid-cols-1"
              : metrics.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3",
          )}
        >
          {metrics.slice(0, 3).map((metric) => (
            <motion.div
              key={metric.label}
              variants={shouldReduceMotion ? undefined : revealItem}
              className="bg-brutalist-ink p-6 lg:p-8"
            >
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brutalist-cream/70">
                {metric.label}
              </dt>
              <dd className="mt-4 text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-none tracking-[-0.06em] text-brutalist-teal-bright">
                {metric.value}
              </dd>
              {metric.detail && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-brutalist-cream/75">
                  {metric.detail}
                </p>
              )}
            </motion.div>
          ))}
        </motion.dl>
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
    className="border-l-4 border-brutalist-teal bg-brutalist-ink px-5 py-6 text-brutalist-cream sm:px-7"
  >
    <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brutalist-teal-bright">
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

interface ProjectScreenshotsProps {
  images: ProjectImage[];
  projectTitle: string;
}

export const ProjectScreenshots = ({
  images,
  projectTitle,
}: ProjectScreenshotsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  if (images.length === 0) return null;

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];
  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current - 1 + images.length) % images.length,
    );
  };
  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + 1) % images.length,
    );
  };

  return (
    <>
      <section
        aria-labelledby="product-screenshots-heading"
        className="border-y-4 border-brutalist-ink"
      >
        <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brutalist-teal">
                Product screens
              </p>
              <h2
                id="product-screenshots-heading"
                className="mt-3 text-4xl font-bold uppercase tracking-[-0.05em] text-brutalist-ink sm:text-5xl"
              >
                Inside {projectTitle}
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-brutalist-muted lg:col-span-4 lg:col-start-9">
              Select any product view to inspect it at a larger size with supporting context.
            </p>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={revealViewport}
            variants={revealContainer}
            className={cn(
              "mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2",
              images.length === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3",
            )}
          >
            {images.map((image, index) => (
              <motion.figure
                key={image.id}
                variants={shouldReduceMotion ? undefined : revealItem}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open ${image.alt} in expanded view`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden border-4 border-brutalist-ink bg-brutalist-ink text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutalist-teal focus-visible:ring-offset-4 focus-visible:ring-offset-brutalist-cream"
                >
                  <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
                    <AssetImage
                      src={image.url}
                      localSrc={image.localUrl}
                      alt={image.alt}
                      width={1600}
                      height={900}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transform-none"
                    />
                  </span>
                  <span className="absolute bottom-0 right-0 inline-flex items-center gap-2 border-l-4 border-t-4 border-brutalist-ink bg-brutalist-cream px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-brutalist-ink transition-colors group-hover:bg-brutalist-teal group-hover:text-brutalist-cream group-focus-visible:bg-brutalist-teal group-focus-visible:text-brutalist-cream">
                    View large
                    <Maximize2 aria-hidden="true" className="h-4 w-4" />
                  </span>
                </button>
                <figcaption className="mt-4 border-t-2 border-brutalist-ink pt-3 font-sans text-sm leading-relaxed text-brutalist-ink sm:text-base">
                  {image.caption ?? image.alt}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        {selectedImage && (
          <DialogContent
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showPrevious();
              if (event.key === "ArrowRight") showNext();
            }}
            className="max-h-[96vh] w-[96vw] max-w-[1600px] gap-4 overflow-y-auto border-4 border-brutalist-ink bg-brutalist-cream p-4 shadow-none sm:rounded-none lg:p-6"
          >
            <div className="pr-12">
              <DialogTitle className="font-mono text-xl font-bold uppercase tracking-[-0.03em] text-brutalist-ink sm:text-2xl">
                {projectTitle} - Screen {String(selectedIndex + 1).padStart(2, "0")}
              </DialogTitle>
              <DialogDescription className="mt-2 max-w-4xl font-sans text-sm leading-relaxed text-brutalist-ink/80 sm:text-base">
                {selectedImage.caption ?? selectedImage.alt}
              </DialogDescription>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedImage.id}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="flex min-h-[240px] items-center justify-center overflow-hidden border-4 border-brutalist-ink bg-brutalist-ink"
              >
                <AssetImage
                  src={selectedImage.url}
                  localSrc={selectedImage.localUrl}
                  alt={selectedImage.alt}
                  width={1920}
                  height={1080}
                  className="max-h-[72vh] w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-brutalist-muted">
                {selectedIndex + 1} / {images.length}
              </span>
              {images.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 border-2 border-brutalist-ink px-4 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-brutalist-ink hover:text-brutalist-cream",
                      focusClass,
                    )}
                  >
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 border-2 border-brutalist-ink px-4 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-brutalist-ink hover:text-brutalist-cream",
                      focusClass,
                    )}
                  >
                    Next
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

interface WorkflowDiagramProps {
  workflow: ProjectWorkflow;
}

export const WorkflowDiagram = ({ workflow }: WorkflowDiagramProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside
      aria-label={`${workflow.title} workflow diagram`}
      className="mt-12 border-4 border-brutalist-ink bg-brutalist-ink p-5 text-brutalist-cream sm:p-7"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brutalist-teal-bright">
        Solution workflow
      </p>
      <h3 className="mt-3 text-2xl font-bold uppercase tracking-[-0.04em] sm:text-3xl">
        {workflow.title}
      </h3>
      {workflow.description && (
        <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-brutalist-cream/70">
          {workflow.description}
        </p>
      )}
      <motion.ol
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        className="mt-8 flex flex-col gap-3 lg:flex-row"
      >
        {workflow.steps.map((step, index) => (
          <motion.li
            key={`${step.title}-${index}`}
            variants={shouldReduceMotion ? undefined : revealItem}
            className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center"
          >
            <div className="h-full flex-1 border-2 border-brutalist-cream/50 p-4">
              <span className="text-xs font-bold text-brutalist-teal-bright">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 text-sm font-bold uppercase tracking-[0.08em]">
                {step.title}
              </h4>
              {step.detail && (
                <p className="mt-2 font-sans text-xs leading-relaxed text-brutalist-cream/70">
                  {step.detail}
                </p>
              )}
            </div>
            {index < workflow.steps.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 rotate-90 self-center text-brutalist-teal-bright lg:rotate-0"
              />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </aside>
  );
};

interface CaseStudySectionProps {
  section: ProjectSection;
}

export const CaseStudySection = ({ section }: CaseStudySectionProps) => {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-[104px] border-t-4 border-brutalist-ink py-14 first:border-t-0 lg:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-bold text-brutalist-teal">
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
          {section.workflow && <WorkflowDiagram workflow={section.workflow} />}
        </div>
      </div>
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
    <nav aria-label="Case study sections" className="sticky top-[104px]">
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
                "flex min-h-11 items-center gap-3 border-l-4 border-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-brutalist-teal hover:text-brutalist-teal",
                activeSection === section.id
                  ? "border-brutalist-teal text-brutalist-teal"
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
