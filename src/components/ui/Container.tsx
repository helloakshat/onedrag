import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * max-width 1520px, centered, no inner gutter once the viewport clears the
 * container (so at 1920px the edges land exactly on x=200 / x=1720).
 *
 * z-10 puts real content above every decorative layer — see the stacking
 * scale in CLAUDE.md §5.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] min-[1560px]:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
