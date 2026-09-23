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
  | "dashboard"
  // shopify-development
  | "product"
  | "collection"
  | "landing"
  | "cart"
  | "migrate"
  | "speed"
  | "funnel"
  | "campaign"
  | "platform"
  | "testing"
  // framer-development
  | "sitemap"
  | "canvas"
  | "records"
  | "motion"
  | "vitals"
  | "seo"
  | "newsite"
  | "promo"
  | "transfer"
  | "handover";

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
  // product page: media block, copy lines, and the buy button
  product: (
    <>
      <rect x="4" y="4" width="36" height="36" {...S} />
      <rect x="9" y="10" width="13" height="13" strokeDasharray="3 2" {...S} />
      <path d="M27 12H36M27 18H36" {...S} />
      <rect x="27" y="24" width="9" height="6" fill="var(--spine)" />
      <path d="M9 29H22M9 34H33" strokeDasharray="2 2" {...S} />
    </>
  ),
  // a filtered grid under a search field
  collection: (
    <>
      <rect x="4" y="4" width="36" height="36" {...S} />
      <path d="M4 15H40" {...S} />
      <path d="M9 9.5H27" strokeDasharray="3 2" {...S} />
      <rect x="31" y="7" width="5" height="5" fill="var(--spine)" />
      <rect x="9" y="20" width="10" height="10" {...S} />
      <rect x="25" y="20" width="10" height="10" strokeDasharray="3 2" {...S} />
    </>
  ),
  // one long page: hero, copy, and a single call to action
  landing: (
    <>
      <rect x="10" y="3" width="24" height="38" {...S} />
      <rect x="14" y="8" width="16" height="9" strokeDasharray="3 2" {...S} />
      <path d="M14 22H30M14 27H24" {...S} />
      <rect x="14" y="32" width="12" height="5" fill="var(--spine)" />
      <path d="M4 20H8M36 20H40" strokeDasharray="2 2" {...S} />
    </>
  ),
  // cart with a line added to it
  cart: (
    <>
      <path d="M3 7H9L13 27H35" {...S} />
      <path d="M11 12H40L36 27" {...S} />
      <path d="M22 16V22M19 19H25" {...S} />
      <rect x="15" y="33" width="5" height="5" fill="var(--spine)" />
      <rect x="28" y="33" width="5" height="5" strokeDasharray="2 2" {...S} />
    </>
  ),
  // records moving off the old platform into the new one
  migrate: (
    <>
      <rect x="3" y="8" width="13" height="8" strokeDasharray="3 2" {...S} />
      <rect x="3" y="20" width="13" height="8" strokeDasharray="3 2" {...S} />
      <rect x="3" y="32" width="13" height="8" strokeDasharray="3 2" {...S} />
      <path d="M19 24H30M30 24L26 20M30 24L26 28" {...S} />
      <rect x="33" y="14" width="8" height="20" {...S} />
      <rect x="33" y="14" width="8" height="6" fill="var(--spine)" />
    </>
  ),
  // a gauge reading into its good band
  speed: (
    <>
      <path d="M5 33C5 23.6 12.6 16 22 16C31.4 16 39 23.6 39 33" {...S} />
      <path d="M22 33L31 24" {...S} />
      <path d="M9 25L11 27M35 25L33 27" {...S} />
      <rect x="20" y="31" width="4" height="4" fill="var(--spine)" />
      <path d="M5 38H39" strokeDasharray="2 2" {...S} />
    </>
  ),
  // funnel narrowing to what actually converts
  funnel: (
    <>
      <path d="M4 6H40L28 20H16L4 6Z" {...S} />
      <path d="M16 20H28V30L16 36V20Z" strokeDasharray="3 2" {...S} />
      <rect x="19" y="38" width="6" height="4" fill="var(--spine)" />
    </>
  ),
  // a campaign flag on its own pole
  campaign: (
    <>
      <path d="M10 4V41" {...S} />
      <path d="M10 7H38L32 15L38 23H10" {...S} />
      <rect x="14" y="10" width="8" height="6" fill="var(--spine)" />
      <path d="M5 41H19" strokeDasharray="2 2" {...S} />
    </>
  ),
  // a whole stack lifted onto the new platform
  platform: (
    <>
      <rect x="6" y="8" width="22" height="7" strokeDasharray="3 2" {...S} />
      <rect x="6" y="18" width="22" height="7" strokeDasharray="3 2" {...S} />
      <rect x="6" y="28" width="22" height="7" {...S} />
      <rect x="9" y="30" width="6" height="3" fill="var(--spine)" />
      <path d="M36 37V12M36 12L32 16M36 12L40 16" {...S} />
    </>
  ),
  // two variants, one of them measured as the winner
  testing: (
    <>
      <rect x="3" y="8" width="17" height="28" {...S} />
      <rect x="24" y="8" width="17" height="28" strokeDasharray="3 2" {...S} />
      <path d="M8 16H15M8 22H15" {...S} />
      <path d="M29 16H36M29 22H36" strokeDasharray="2 2" {...S} />
      <rect x="8" y="28" width="7" height="4" fill="var(--spine)" />
    </>
  ),
  // one root branching into the pages beneath it
  sitemap: (
    <>
      <rect x="17" y="4" width="10" height="7" {...S} />
      <rect x="19" y="6" width="6" height="3" fill="var(--spine)" />
      <path d="M22 11V17M7 17H37M7 17V23M22 17V23M37 17V23" {...S} />
      <rect x="3" y="23" width="8" height="7" strokeDasharray="3 2" {...S} />
      <rect x="18" y="23" width="8" height="7" {...S} />
      <rect x="33" y="23" width="8" height="7" strokeDasharray="3 2" {...S} />
    </>
  ),
  // an artboard being drawn on
  canvas: (
    <>
      <rect x="5" y="5" width="30" height="26" strokeDasharray="3 2" {...S} />
      <path d="M20 18V38L25 32L29 40L32 38L28 31L35 30L20 18Z" {...S} />
      <rect x="3" y="3" width="5" height="5" fill="var(--spine)" />
      <rect x="32" y="3" width="5" height="5" {...S} />
    </>
  ),
  // one collection, many entries stacked under it
  records: (
    <>
      <path d="M4 12L22 5L40 12L22 19L4 12Z" {...S} />
      <path d="M4 22L22 29L40 22" {...S} />
      <path d="M4 32L22 39L40 32" strokeDasharray="3 2" {...S} />
      <rect x="19" y="9" width="6" height="4" fill="var(--spine)" />
    </>
  ),
  // an element carried along its easing curve
  motion: (
    <>
      <path d="M4 36C14 36 18 8 38 8" strokeDasharray="3 2" {...S} />
      <rect x="3" y="31" width="9" height="9" {...S} />
      <rect x="31" y="4" width="9" height="9" fill="var(--spine)" />
      <path d="M16 31H22M20 25H26" {...S} />
    </>
  ),
  // measured bars against a budget line
  vitals: (
    <>
      <path d="M4 38H40" {...S} />
      <path d="M4 14H40" strokeDasharray="2 2" {...S} />
      <rect x="7" y="26" width="6" height="12" strokeDasharray="3 2" {...S} />
      <rect x="17" y="18" width="6" height="20" {...S} />
      <rect x="27" y="10" width="6" height="28" {...S} />
      <rect x="27" y="10" width="6" height="4" fill="var(--spine)" />
    </>
  ),
  // a document's metadata, and the redirect leaving it
  seo: (
    <>
      <rect x="4" y="4" width="26" height="36" {...S} />
      <path d="M9 12H25M9 18H25M9 24H19" {...S} />
      <rect x="9" y="30" width="10" height="5" fill="var(--spine)" />
      <path d="M31 22H41M41 22L37 18M41 22L37 26" {...S} />
    </>
  ),
  // an empty browser frame, opened
  newsite: (
    <>
      <rect x="4" y="6" width="36" height="32" {...S} />
      <path d="M4 14H40" {...S} />
      <rect x="8" y="9" width="4" height="3" fill="var(--spine)" />
      <path d="M22 20V32M16 26H28" {...S} />
    </>
  ),
  // one page broadcasting to one audience
  promo: (
    <>
      <rect x="14" y="16" width="16" height="24" {...S} />
      <path d="M22 4V11M12 8L16 13M32 8L28 13M5 16H10M34 16H39" {...S} />
      <rect x="18" y="21" width="8" height="5" fill="var(--spine)" />
      <path d="M18 31H26" strokeDasharray="2 2" {...S} />
    </>
  ),
  // the old site carried through to the new one
  transfer: (
    <>
      <rect x="3" y="12" width="12" height="20" strokeDasharray="3 2" {...S} />
      <path d="M18 22H30M30 22L26 18M30 22L26 26" {...S} />
      <path d="M34 8V36M34 8H41M34 36H41" {...S} />
      <rect x="36" y="19" width="5" height="6" fill="var(--spine)" />
    </>
  ),
  // the keys, handed to somebody else
  handover: (
    <>
      <rect x="5" y="17" width="12" height="10" {...S} />
      <rect x="8" y="20" width="5" height="4" fill="var(--spine)" />
      <path d="M17 22H38" {...S} />
      <path d="M30 22V29M36 22V27" {...S} />
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
