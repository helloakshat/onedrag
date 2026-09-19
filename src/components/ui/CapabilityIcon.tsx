import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CapabilityIconName =
  | "connect"
  | "sync"
  | "schedule"
  | "intake"
  | "alert"
  | "guard"
  | "inbox"
  | "ledger"
  | "handoff"
  | "dashboard";

interface CapabilityIconProps {
  name: CapabilityIconName;
  className?: string;
}

const S = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

const GLYPHS: Record<CapabilityIconName, ReactNode> = {
  // two endpoints joined through a solid accent hub
  connect: (
    <>
      <rect x="3" y="6" width="11" height="11" strokeDasharray="3 2" {...S} />
      <rect x="3" y="27" width="11" height="11" strokeDasharray="3 2" {...S} />
      <path d="M14 11.5H21V22" {...S} />
      <path d="M14 32.5H21V22" {...S} />
      <path d="M27 22H41" strokeDasharray="2 2" {...S} />
      <rect x="16" y="17" width="11" height="11" fill="var(--spine)" />
    </>
  ),
  // two records, arrows running both ways between them
  sync: (
    <>
      <rect x="3" y="8" width="13" height="28" {...S} />
      <rect x="28" y="8" width="13" height="28" strokeDasharray="3 2" {...S} />
      <path d="M16 16H28M28 16L24 12M28 16L24 20" {...S} />
      <path d="M28 29H16M16 29L20 25M16 29L20 33" {...S} />
      <rect x="6" y="12" width="7" height="4" fill="var(--spine)" />
    </>
  ),
  // clock face over a run strip
  schedule: (
    <>
      <rect x="6" y="4" width="26" height="26" {...S} />
      <path d="M19 10V17H26" {...S} />
      <path d="M6 10H32" strokeDasharray="2 2" {...S} />
      <rect x="6" y="35" width="8" height="6" fill="var(--spine)" />
      <rect x="18" y="35" width="8" height="6" strokeDasharray="2 2" {...S} />
      <rect x="30" y="35" width="8" height="6" strokeDasharray="2 2" {...S} />
    </>
  ),
  // a form sheet with a filled field and a validated row
  intake: (
    <>
      <rect x="6" y="3" width="29" height="38" {...S} />
      <rect x="11" y="9" width="19" height="6" fill="var(--spine)" />
      <path d="M11 22H30M11 28H30" strokeDasharray="3 2" {...S} />
      <path d="M11 34L14 37L20 31" {...S} />
    </>
  ),
  // bell over a dashed broadcast run
  alert: (
    <>
      <path d="M11 30V19C11 12.9 15.9 8 22 8C28.1 8 33 12.9 33 19V30H11Z" {...S} />
      <path d="M6 30H38" {...S} />
      <path d="M18 35H26" strokeDasharray="2 2" {...S} />
      <rect x="18" y="3" width="8" height="5" fill="var(--spine)" />
    </>
  ),
  // shield with a retry loop inside
  guard: (
    <>
      <path d="M22 3L38 8V22C38 31 31 37.5 22 41C13 37.5 6 31 6 22V8L22 3Z" {...S} />
      <path d="M16 21C16 17.7 18.7 15 22 15C25.3 15 28 17.7 28 21C28 24.3 25.3 27 22 27H18" {...S} />
      <path d="M18 27L21 24M18 27L21 30" {...S} />
      <rect x="20" y="31" width="4" height="4" fill="var(--spine)" />
    </>
  ),
  // tray with an item dropping into it
  inbox: (
    <>
      <path d="M4 24H15L18 30H26L29 24H40" {...S} />
      <path d="M4 24L9 8H35L40 24V38H4V24Z" {...S} />
      <rect x="18" y="12" width="8" height="8" fill="var(--spine)" />
      <path d="M13 14H16M28 14H31" strokeDasharray="2 2" {...S} />
    </>
  ),
  // ruled ledger with a totalled accent row
  ledger: (
    <>
      <rect x="4" y="6" width="36" height="32" {...S} />
      <path d="M13 6V38" strokeDasharray="3 2" {...S} />
      <path d="M17 14H35M17 21H35" {...S} />
      <path d="M17 28H27" strokeDasharray="2 2" {...S} />
      <rect x="29" y="25" width="6" height="6" fill="var(--spine)" />
    </>
  ),
  // record passed from one owner to the next
  handoff: (
    <>
      <rect x="3" y="14" width="14" height="14" strokeDasharray="3 2" {...S} />
      <rect x="27" y="14" width="14" height="14" {...S} />
      <path d="M17 21H27M27 21L23 17M27 21L23 25" {...S} />
      <rect x="30" y="17" width="8" height="4" fill="var(--spine)" />
      <path d="M3 35H41" strokeDasharray="2 2" {...S} />
    </>
  ),
  // panel of live tiles, one reading hot
  dashboard: (
    <>
      <rect x="3" y="6" width="38" height="32" {...S} />
      <path d="M3 14H41" {...S} />
      <rect x="8" y="19" width="12" height="14" fill="var(--spine)" />
      <rect x="25" y="19" width="11" height="6" strokeDasharray="2 2" {...S} />
      <path d="M25 30H36" {...S} />
    </>
  ),
};

/**
 * ~44px line icons for the service page — same drawing rules as ServiceIcon
 * (thin strokes, square corners, dashed fragments, one small accent fill).
 */
export function CapabilityIcon({ name, className }: CapabilityIconProps) {
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
