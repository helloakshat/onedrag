import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
}

/**
 * The construction grid: 6 equal columns, zero gap, spanning the full
 * container width. Every element is placed by column span — never by
 * arbitrary padding or margin (CLAUDE.md §5).
 *
 * Column boundaries map to Tailwind col-start values:
 * C0=1, C1=2, C2=3, C3=4, C4=5, C5=6, C6=end.
 */
export function Grid({ children, className }: GridProps) {
  return <div className={cn("grid grid-cols-6 gap-0", className)}>{children}</div>;
}
