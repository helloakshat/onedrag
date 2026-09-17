import { cn } from "@/lib/utils";

interface TickProps {
  className?: string;
}

/** Small orange L-shaped corner mark used to punctuate grid intersections and stats. */
export function Tick({ className }: TickProps) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M0 0.75H8.25M0.75 0V9" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}
