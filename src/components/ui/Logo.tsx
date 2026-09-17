import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** ONEDRAG wordmark — uppercase, tight tracking, no icon. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 148 16"
      className={cn("h-[14px] w-auto text-text-primary", className)}
      aria-label="Onedrag"
      role="img"
    >
      <text
        x="0"
        y="12.5"
        fill="currentColor"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="14"
        fontWeight="500"
        letterSpacing="-0.02em"
      >
        ONEDRAG
      </text>
    </svg>
  );
}
