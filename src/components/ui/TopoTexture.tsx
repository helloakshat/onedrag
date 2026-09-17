import { cn } from "@/lib/utils";

interface TopoTextureProps {
  className?: string;
}

const COLS = 48;
const ROWS = 20;
const CELL = 16;
const DOT_RADIUS = 1;

/** Layered sine waves stand in for topographic elevation — deterministic, no randomness. */
function elevation(x: number, y: number) {
  return (
    Math.sin(x * 0.25 + y * 0.15) * 0.5 +
    Math.sin(x * 0.12 - y * 0.3 + 2) * 0.3 +
    Math.sin(x * 0.4 + y * 0.05 + 4) * 0.2
  );
}

/**
 * Dotted topographic wash, generated as an SVG dot matrix. No raster images.
 * Fills its container edge-to-edge but only draws dots in the lower half of
 * rows, so the wash reads as coming up through the bottom of a section.
 */
export function TopoTexture({ className }: TopoTextureProps) {
  const dots = [];

  for (let row = Math.floor(ROWS / 2); row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const wave = elevation(col, row);
      const yOffset = wave * 6;
      const opacity = 0.12 + Math.max(0, wave) * 0.3;

      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * CELL}
          cy={row * CELL + yOffset}
          r={DOT_RADIUS}
          fill="var(--border-strong)"
          opacity={opacity}
        />,
      );
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      preserveAspectRatio="xMidYMax slice"
    >
      {dots}
    </svg>
  );
}
