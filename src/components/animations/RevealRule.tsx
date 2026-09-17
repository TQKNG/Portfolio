import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealRuleProps {
  className?: string;
}

export const RevealRule = ({ className }: RevealRuleProps) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left" }}
      animate={{ scaleX: shouldReduceMotion || isInView ? 1 : 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    />
  );
};
