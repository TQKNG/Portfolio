import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { TextEffect } from "@/components/ui/text-effect";

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
          <p className="mt-6 text-xs tracking-widest text-brutalist-muted">SOFTWARE ENGINEER / EST. 2023</p>
        </FadeIn>
      </FadeInStagger>
    </div>
  );
};
