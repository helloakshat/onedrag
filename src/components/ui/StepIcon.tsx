import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StepIconName = "audit" | "blueprint" | "build" | "launch";

interface StepIconProps {
  name: StepIconName;
  className?: string;
}

const S = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

const GLYPHS: Record<StepIconName, ReactNode> = {
  audit: (
    <>
      <rect x="3" y="5" width="27" height="34" strokeDasharray="3 2" {...S} />
      <path d="M9 14H24M9 20H24M9 26H18" {...S} />
      <rect x="26" y="24" width="15" height="15" fill="var(--spine)" />
      <path d="M30 31.5H37M33.5 28V35" stroke="var(--bg-raised)" strokeWidth="1.5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3" y="6" width="38" height="32" {...S} />
      <path d="M3 14H41" strokeDasharray="3 2" {...S} />
      <rect x="9" y="20" width="12" height="12" {...S} />
      <rect x="26" y="20" width="9" height="9" fill="var(--spine)" />
      <path d="M21 26H26" strokeDasharray="2 2" {...S} />
    </>
  ),
  build: (
    <>
      <rect x="3" y="20" width="17" height="17" {...S} />
      <rect x="24" y="20" width="17" height="17" strokeDasharray="3 2" {...S} />
      <rect x="13" y="4" width="17" height="17" fill="var(--spine)" />
      <path d="M11.5 20V15M32.5 20V15" strokeDasharray="2 2" {...S} />
    </>
  ),
  launch: (
    <>
      <rect x="6" y="4" width="32" height="24" strokeDasharray="3 2" {...S} />
      <path d="M12 16L19 22L32 10" stroke="var(--spine)" strokeWidth="2" fill="none" />
      <path d="M22 28V36" {...S} />
      <rect x="12" y="36" width="20" height="5" fill="var(--spine)" />
    </>
  ),
};

/** ~44px process-step icons, same line language as ServiceIcon. */
export function StepIcon({ name, className }: StepIconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      width="44"
      height="44"
      className={cn("shrink-0 text-text-primary", className)}
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}
