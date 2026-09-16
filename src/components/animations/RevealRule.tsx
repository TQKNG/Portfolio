import { motion, useReducedMotion } from "framer-motion";

interface RevealRuleProps {
  className?: string;
}

export const RevealRule = ({ className }: RevealRuleProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left" }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    />
  );
};
