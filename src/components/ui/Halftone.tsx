import { cn } from "@/lib/utils";
import { halftonePath, portraitField, sceneField } from "@/lib/halftone";

interface HalftoneProps {
  seed: string;
  subject: "portrait" | "scene";
  /** Rendered width in CSS px — sets the dither resolution. */
  width: number;
  /** Height / width. */
  ratio: number;
  /** Target dithered pixel size in CSS px. */
  pixel?: number;
  className?: string;
}

/**
 * TODO: replace — 1-bit halftone stand-in until real imagery is supplied.
 *
 * Resolution is derived from the rendered width so the dithered pixels land
 * at roughly `pixel` CSS px; at 8-10px the subject turns into a
 * checkerboard, so keep this at 2-3.
 */
export function Halftone({
  seed,
  subject,
  width,
  ratio,
  pixel = 2.5,
  className,
}: HalftoneProps) {
  const cols = Math.max(24, Math.round(width / pixel));
  const rows = Math.max(24, Math.round(cols * ratio));
  const field = subject === "portrait" ? portraitField(seed) : sceneField(seed);
  const d = halftonePath(cols, rows, field);

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      className={cn("block h-full w-full bg-bg-raised", className)}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d={d} fill="var(--dark)" />
    </svg>
  );
}
