import siteJson from "../../content/site.json";
import homeJson from "../../content/home.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  nav: {
    wordmark: string;
    links: NavLink[];
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
}

export function getHomeContent(): HomeContent {
  return homeJson as HomeContent;
}
