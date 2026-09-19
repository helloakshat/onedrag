import { cn } from "@/lib/utils";
import { ditherPath, seededField } from "@/lib/dither";

interface DitherImageProps {
  seed: string;
  /** Dither grid resolution — also sets the aspect ratio. */
  cols?: number;
  rows?: number;
  className?: string;
}

/**
 * TODO: replace — 1-bit halftone stand-in until real imagery is supplied.
 * High contrast, square pixels, zero radius.
 */
export function DitherImage({ seed, cols = 52, rows = 33, className }: DitherImageProps) {
  const d = ditherPath(cols, rows, seededField(seed));

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      className={cn("block h-full w-full bg-tile-fill", className)}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d={d} fill="var(--dark)" />
    </svg>
  );
}
