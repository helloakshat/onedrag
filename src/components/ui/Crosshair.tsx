import { cn } from "@/lib/utils";

interface CrosshairProps {
  className?: string;
}

/** Small orange "+" register mark. */
export function Crosshair({ className }: CrosshairProps) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M5.5 0V11M0 5.5H11" stroke="var(--spine)" strokeWidth="1" />
    </svg>
  );
}
