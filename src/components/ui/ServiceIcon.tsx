import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ServiceIconName = "workflow" | "storefront" | "browser" | "canvas";

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

const GLYPHS: Record<ServiceIconName, ReactNode> = {
  workflow: (
    <>
      <rect x="2" y="7" width="13" height="13" strokeDasharray="3 2" {...STROKE} />
      <rect x="2" y="24" width="13" height="13" {...STROKE} />
      <path d="M15 13.5H22V22" strokeDasharray="2 2" {...STROKE} />
      <path d="M15 30.5H22V22" strokeDasharray="2 2" {...STROKE} />
      <path d="M22 22H29" {...STROKE} />
      <rect x="29" y="15.5" width="13" height="13" fill="var(--spine)" />
    </>
  ),
  storefront: (
    <>
      <path d="M3 13L8 5H36L41 13" {...STROKE} />
      <rect x="3" y="13" width="38" height="28" {...STROKE} />
      <path d="M3 21H41" strokeDasharray="3 2" {...STROKE} />
      <rect x="9" y="26" width="9" height="9" fill="var(--spine)" />
      <path d="M23 26H35M23 31H31" strokeDasharray="2 2" {...STROKE} />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="8" width="38" height="28" {...STROKE} />
      <path d="M3 16H41" {...STROKE} />
      <rect x="6" y="10.5" width="5" height="3" fill="var(--spine)" />
      <path d="M9 22H24M9 27H19" strokeDasharray="3 2" {...STROKE} />
      <rect x="28" y="21" width="9" height="9" strokeDasharray="2 2" {...STROKE} />
    </>
  ),
  canvas: (
    <>
      <rect x="3" y="4" width="23" height="23" strokeDasharray="3 2" {...STROKE} />
      <rect x="18" y="17" width="23" height="23" {...STROKE} />
      <rect x="18" y="17" width="8" height="10" fill="var(--spine)" />
      <path d="M31 24V33M26.5 28.5H35.5" {...STROKE} />
    </>
  ),
};

/** ~44px line icons: thin strokes, square corners, dashed fragments, small accent fills. */
export function ServiceIcon({ name, className }: ServiceIconProps) {
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
