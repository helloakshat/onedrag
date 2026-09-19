import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IndustryIconName =
  | "commerce"
  | "saas"
  | "agency"
  | "property"
  | "health"
  | "services";

interface IndustryIconProps {
  name: IndustryIconName;
  className?: string;
}

const S = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

const GLYPHS: Record<IndustryIconName, ReactNode> = {
  commerce: (
    <>
      <path d="M3 8H8L11 26H29" {...S} />
      <rect x="11" y="11" width="22" height="15" strokeDasharray="3 2" {...S} />
      <rect x="13" y="29" width="6" height="6" fill="var(--spine)" />
      <rect x="24" y="29" width="6" height="6" {...S} />
    </>
  ),
  saas: (
    <>
      <rect x="3" y="7" width="30" height="21" {...S} />
      <path d="M3 13H33" strokeDasharray="3 2" {...S} />
      <rect x="6" y="9" width="4" height="2.5" fill="var(--spine)" />
      <path d="M11 30H25" {...S} />
      <path d="M9 19H17M9 23H14" strokeDasharray="2 2" {...S} />
      <rect x="22" y="17" width="7" height="7" fill="var(--spine)" />
    </>
  ),
  agency: (
    <>
      <rect x="3" y="12" width="13" height="13" {...S} />
      <rect x="20" y="4" width="13" height="13" strokeDasharray="3 2" {...S} />
      <rect x="20" y="21" width="13" height="13" fill="var(--spine)" />
      <path d="M16 18H20" strokeDasharray="2 2" {...S} />
    </>
  ),
  property: (
    <>
      <path d="M3 17L18 5L33 17" {...S} />
      <rect x="7" y="17" width="22" height="17" strokeDasharray="3 2" {...S} />
      <rect x="14" y="23" width="8" height="11" fill="var(--spine)" />
    </>
  ),
  health: (
    <>
      <rect x="4" y="7" width="28" height="26" strokeDasharray="3 2" {...S} />
      <path d="M18 13V27M11 20H25" stroke="var(--spine)" strokeWidth="2.5" fill="none" />
    </>
  ),
  services: (
    <>
      <rect x="5" y="4" width="22" height="29" {...S} />
      <path d="M10 12H22M10 18H22M10 24H17" strokeDasharray="2 2" {...S} />
      <rect x="23" y="21" width="12" height="12" fill="var(--spine)" />
    </>
  ),
};

/** ~36px industry icons. */
export function IndustryIcon({ name, className }: IndustryIconProps) {
  return (
    <svg
      viewBox="0 0 36 38"
      width="36"
      height="38"
      className={cn("shrink-0 text-text-primary", className)}
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}
