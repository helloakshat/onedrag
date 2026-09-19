import { cn } from "@/lib/utils";
import { ditherPath, seededField } from "@/lib/dither";

interface DitherAvatarProps {
  size?: number;
  seed?: string;
  className?: string;
}

const CELLS = 16;

/** TODO: replace — placeholder avatar until real portraits are supplied. */
export function DitherAvatar({ size = 32, seed = "founder", className }: DitherAvatarProps) {
  const d = ditherPath(CELLS, CELLS, seededField(seed));

  return (
    <svg
      viewBox={`0 0 ${CELLS} ${CELLS}`}
      width={size}
      height={size}
      className={cn("shrink-0 bg-tile-fill", className)}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d={d} fill="var(--dark)" />
    </svg>
  );
}
