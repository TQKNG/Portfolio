import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { TextEffect } from "@/components/ui/text-effect";
import { designer } from "@/data/designer";
import { technologyIcons } from "@/data/projects";

const technologies = [
  { name: "React", icon: technologyIcons.react },
  { name: "TypeScript", icon: technologyIcons.typescript },
  { name: "Python", icon: technologyIcons.python },
  { name: "FastAPI", icon: technologyIcons.fastApi },
  { name: "SQL", icon: technologyIcons.sql },
  { name: "Azure", icon: technologyIcons.azure },
  { name: "OpenAI", icon: technologyIcons.openAi },
  { name: "LangChain", icon: technologyIcons.langChain },
  { name: "Codex", icon: technologyIcons.codex },
];

export const HomeHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col justify-center border-b-4 border-brutalist-ink p-8 lg:sticky lg:top-[72px] lg:h-[calc(100svh-72px)] lg:border-b-0 lg:border-r-4 lg:p-12">
      <FadeInStagger staggerDelay={0.08}>
        <FadeIn>
          <TextEffect as="h1" per="line" preset="slide" delay={0.12} className="text-6xl font-bold leading-none text-brutalist-ink md:text-8xl lg:text-[clamp(5rem,7vw,10rem)]">
            {"KHANH\nNGUYEN"}
          </TextEffect>
        </FadeIn>
        <FadeIn>
          <motion.div initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }} className="mt-8 h-4 w-32 bg-brutalist-teal" />
        </FadeIn>
        <FadeIn>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 text-xs tracking-widest text-brutalist-muted">
            <span>SOFTWARE ENGINEER /</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-brutalist-teal" />
              TORONTO, ON
            </span>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-8 grid grid-cols-[6rem_minmax(0,1fr)] items-stretch gap-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <div className="flex flex-col gap-2">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-brutalist-teal">
                <img
                  src={designer.photo}
                  alt="Khanh Nguyen"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="py-1 text-sm leading-relaxed text-brutalist-muted sm:text-base">
              Microsoft-certified software engineer experienced in designing and scaling full-stack applications across AI, robotics, manufacturing, education, and healthcare. Focused on performance, reliability, and maintainability.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-7 border-t-2 border-brutalist-ink pt-3 sm:mt-8" role="group" aria-label="Technology stack">
            <ul className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <li
                  key={technology.name}
                  className="inline-flex items-center gap-1.5 border-2 border-brutalist-ink px-1.5 py-1.5 text-xs font-bold text-brutalist-ink transition-colors hover:bg-brutalist-ink hover:text-brutalist-cream"
                >
                  <img
                    src={technology.icon}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] shrink-0 object-contain"
                  />
                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </FadeInStagger>
    </div>
  );
};
