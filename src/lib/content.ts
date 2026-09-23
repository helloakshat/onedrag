import siteJson from "../../content/site.json";
import homeJson from "../../content/home.json";
import type { ServiceIconName } from "@/components/ui/ServiceIcon";
import type { StepIconName } from "@/components/ui/StepIcon";
import type { IndustryIconName } from "@/components/ui/IndustryIcon";

export interface NavLink {
  label: string;
  href: string;
  /**
   * Page is not built yet: the item still renders, muted and not clickable.
   * Delete the flag when the page ships — that is the only edit needed, since
   * lib/navigation then keeps it on the strength of the page existing.
   */
  comingSoon?: boolean;
}

export interface Chip {
  /** The number is page order, supplied by the page — see lib/sections. */
  label: string;
}

/**
 * Process and FAQ are rendered by the same components on the home page and
 * on every service page, so their content blocks are typed on their own
 * rather than only as members of HomeContent.
 */
export interface ProcessBlock {
  chip: Chip;
  heading: string;
  note: string[];
  steps: ProcessStep[];
}

export interface FaqBlock {
  chip: Chip;
  heading: string;
  note: string[];
  items: FaqItem[];
  moreLabel: string[];
  ctaLabel: string;
}

/** Full name for assistive tech, short code for the footer's row. */
export interface SocialLink extends NavLink {
  short: string;
}

export interface SiteContent {
  nav: {
    wordmark: string;
    /** The whole menu, in order, including pages not built yet — see lib/navigation. */
    links: NavLink[];
  };
  founder: {
    name: string;
    role: string;
  };
  footer: {
    text: string;
    copyright: string;
  };
  socials: SocialLink[];
  /** Every CTA on the site opens this one booking link — CLAUDE.md §9. */
  links: {
    bookCall: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export function getSiteContent(): SiteContent {
  return siteJson as SiteContent;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HomeContent {
  hero: {
    chip: { number: string; label: string };
    heading: string;
    subheading: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    stats: HeroStat[];
  };
  trustedBy: {
    label: string;
    logos: string[];
  };
  services: {
    chip: { number: string; label: string };
    heading: string;
    note: string[];
    items: ServiceItem[];
    moreLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
  process: ProcessBlock;
  results: {
    chip: { number: string; label: string };
    heading: string;
    items: ResultItem[];
  };
  industries: {
    chip: { number: string; label: string };
    heading: string;
    note: string[];
    items: IndustryItem[];
  };
  value: {
    chip: { number: string; label: string };
    heading: string;
    note: string[];
    moreLabel: string;
    points: ValuePoint[];
  };
  testimonials: {
    chip: { number: string; label: string };
    heading: string;
    rating: string;
    ratingOutOf: string;
    ratingNote: string[];
    items: Testimonial[];
  };
  faq: FaqBlock;
  contacts: {
    chip: { number: string; label: string };
    heading: string;
    email: string;
    /** Footer's second column; the first is the nav array. */
    legalLinks: NavLink[];
    booking: {
      /** One entry per rendered line. */
      note: string[];
      ctaLabel: string;
    };
    copyright: string;
    location: string;
  };
}

export interface ServiceItem {
  icon: ServiceIconName;
  title: string[];
  description: string;
  /** Set once that service has a page under content/services/. */
  href?: string;
}

export interface ProcessStep {
  number: string;
  icon: StepIconName;
  title: string[];
  connector: string;
  description: string;
}

export interface ResultItem {
  value: number;
  suffix: string;
  label: string[];
  description: string;
}

export interface IndustryItem {
  icon: IndustryIconName;
  name: string[];
  capabilities: string[];
}

export interface ValuePoint {
  number: string;
  title: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function getHomeContent(): HomeContent {
  return homeJson as HomeContent;
}
