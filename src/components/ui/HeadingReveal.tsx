"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface HeadingRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Heading-only reveal (CLAUDE.md §7): a left-to-right mask wipe via clip-path,
 * no opacity fade, no y-translate. Use Reveal for everything else.
 *
 * The IntersectionObserver watches an unclipped outer wrapper, not the
 * clipped element itself — a clip-path'd element is reported as having zero
 * intersection area (it's genuinely not visible), so observing it directly
 * deadlocks: the mask never lifts because the observer never sees it as
 * "in view" while it's masked.
 */
export function HeadingReveal({ children, className, delay = 0 }: HeadingRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = outerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={outerRef} className={className}>
      <div
        style={{
          clipPath: isInView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          transitionProperty: "clip-path",
          transitionDuration: "var(--dur-slow)",
          transitionTimingFunction: "var(--ease-out)",
          transitionDelay: `${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
