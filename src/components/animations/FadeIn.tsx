import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { createContext, type ReactNode, useContext, useRef } from "react";

const StaggerContext = createContext(false);

const viewport = { once: false, amount: 0.2 } as const;

/**
 * FadeIn Component
 * 
 * Scroll-reveal animation component adapted from tailwind-plus studio example.
 * Uses framer-motion to animate elements as they enter and leave the viewport.
 * Respects user's prefers-reduced-motion setting.
 * 
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param variants - Custom animation variants (optional)
 */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  viewportAmount?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const FadeIn = ({
  children,
  className,
  variants = defaultVariants,
  viewportAmount = 0.2,
}: FadeInProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isInsideStagger = useContext(StaggerContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: viewportAmount,
  });
  const shouldAnimate = !shouldReduceMotion && !isInsideStagger;

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? "hidden" : undefined}
      animate={shouldAnimate ? (isInView ? "visible" : "hidden") : undefined}
      variants={shouldReduceMotion ? undefined : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeInStagger Component
 * 
 * Container for staggered fade-in animations.
 * Children elements will animate in sequence with a delay between each.
 * 
 * @param children - Child elements to stagger
 * @param className - Additional CSS classes
 * @param staggerDelay - Delay between each child animation (default: 0.1s)
 */

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const FadeInStagger = ({ 
  children, 
  className,
  staggerDelay = 0.1 
}: FadeInStaggerProps) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewport);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion || isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: shouldReduceMotion ? 0 : 0.05,
          },
        },
      }}
      className={className}
    >
      <StaggerContext.Provider value>{children}</StaggerContext.Provider>
    </motion.div>
  );
};
