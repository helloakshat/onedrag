import { cn } from "@/lib/utils";
import { Tick } from "@/components/ui/Tick";

type DashedLineVariant = "vertical-full" | "vertical-inset" | "horizontal" | "corner";

interface DashedLineProps {
  variant?: DashedLineVariant;
  className?: string;
  /** Only used by "vertical-inset" — inset from the parent's top/bottom edges, in px. */
  inset?: number;
}

/**
 * Four dashed line variants used on the construction grid (CLAUDE.md §5).
 * Meant to be placed inside a `relative` ancestor and positioned via className.
 */
export function DashedLine({ variant = "vertical-full", className, inset = 0 }: DashedLineProps) {
  if (variant === "horizontal") {
    return (
      <div
        aria-hidden="true"
        className={cn("h-0 w-full border-t border-dashed border-border-strong", className)}
      />
    );
  }

  if (variant === "corner") {
    return (
      <div aria-hidden="true" className={cn("relative", className)}>
        <div className="h-6 w-px border-l border-dashed border-border-strong" />
        <Tick className="absolute -bottom-[5px] -left-[5px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("absolute w-px border-l border-dashed border-border-strong", className)}
      style={
        variant === "vertical-inset"
          ? { top: inset, bottom: inset }
          : { top: 0, bottom: 0 }
      }
    />
  );
}
