"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

interface SmoothScrollProps {
  children: ReactNode;
}

/** Global Lenis smooth scroll, lerp 0.1. Disabled entirely under prefers-reduced-motion. */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
