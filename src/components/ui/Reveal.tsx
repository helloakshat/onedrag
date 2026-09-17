"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** Scroll-triggered reveal: opacity 0->1, y 20px->0, once at 20% viewport entry. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
