import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createContext, type ReactNode, useContext } from "react";

const StaggerContext = createContext(false);

const viewport = { once: true, amount: 0.2 } as const;

/**
 * FadeIn Component
 * 
 * Scroll-reveal animation component adapted from tailwind-plus studio example.
 * Uses framer-motion to animate elements as they enter the viewport.
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

  return (
    <motion.div
      initial={shouldReduceMotion || isInsideStagger ? undefined : "hidden"}
      whileInView={shouldReduceMotion || isInsideStagger ? undefined : "visible"}
      viewport={{ ...viewport, amount: viewportAmount }}
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

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
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
