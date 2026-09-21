import fs from "node:fs";
import path from "node:path";
import type { Chip, FaqBlock, ProcessBlock } from "@/lib/content";
import type { CapabilityIconName } from "@/components/ui/CapabilityIcon";

const DIR = path.join(process.cwd(), "content/services");

export interface CapabilityItem {
  icon: CapabilityIconName;
  /** One entry per rendered line. */
  title: string[];
  points: string[];
}

export interface ScopeItem {
  icon: CapabilityIconName;
  title: string[];
  description: string;
}

export interface ServiceContent {
  slug: string;
  name: string;
  /** Label in the header menu — plural, unlike `name`. */
  navLabel: string;
  /** Menu position; the content directory is alphabetical, the menu is not. */
  navOrder: number;
  seo: { title: string; description: string };
  hero: {
    chip: Chip;
    heading: string;
    intro: string;
    counter: { value: number; suffix: string; label: string[] };
    ctaLabel: string;
    ctaHref: string;
  };
  capabilities: {
    chip: Chip;
    heading: string;
    note: string[];
    items: CapabilityItem[];
  };
  scope: {
    chip: Chip;
    heading: string;
    note: string[];
    items: ScopeItem[];
    moreLabel: string;
    ctaLabel: string;
  };
  process: ProcessBlock;
  work: {
    chip: Chip;
    heading: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faq: FaqBlock;
}

/** Every slug with a JSON file — drives generateStaticParams. */
export function getServiceSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

/** Returns null for an unknown slug so the route can call notFound(). */
export function getServiceContent(slug: string): ServiceContent | null {
  // Guard against a slug walking out of content/services via the route param.
  if (!getServiceSlugs().includes(slug)) return null;
  const raw = fs.readFileSync(path.join(DIR, `${slug}.json`), "utf8");
  return JSON.parse(raw) as ServiceContent;
}
