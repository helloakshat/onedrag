import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DashedLine } from "@/components/layout/DashedLine";

interface GridProps {
  children: ReactNode;
  className?: string;
  /** Draw dashed vertical lines on the 5 internal column boundaries. Default true. */
  lines?: boolean;
}

/** The 6-column construction grid. Columns are equal width; 245px is the module at max container width. */
export function Grid({ children, className, lines = true }: GridProps) {
  return (
    <div className={cn("relative grid grid-cols-6", className)}>
      {lines && (
        <div className="pointer-events-none absolute inset-0 grid grid-cols-6" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ gridColumnStart: i + 2 }}>
              <DashedLine variant="vertical-full" className="-translate-x-px" />
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
