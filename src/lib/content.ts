import siteJson from "../../content/site.json";
import homeJson from "../../content/home.json";
import type { ServiceIconName } from "@/components/ui/ServiceIcon";
import type { StepIconName } from "@/components/ui/StepIcon";
import type { IndustryIconName } from "@/components/ui/IndustryIcon";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  nav: {
    wordmark: string;
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
  socials: NavLink[];
  links: {
    bookCall: string;
    getInTouch: string;
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
  process: {
    chip: { number: string; label: string };
    heading: string;
    note: string[];
    steps: ProcessStep[];
  };
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
  faq: {
    chip: { number: string; label: string };
    heading: string;
    note: string[];
    items: FaqItem[];
    moreLabel: string[];
    ctaLabel: string;
  };
  contacts: {
    chip: { number: string; label: string };
    heading: string;
    email: string;
    phone: string;
    socials: NavLink[];
    navColumns: string[][];
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      submitLabel: string;
    };
    copyright: string;
    location: string;
  };
}

export interface ServiceItem {
  icon: ServiceIconName;
  title: string[];
  description: string;
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
