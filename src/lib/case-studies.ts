import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import indexJson from "../../content/case-studies/_index.json";

const DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  slug: string;
  category: string;
  summary: string;
  services: string[];
  year: number;
  /** Frontmatter's intended path, whether or not the file exists yet. */
  cover: string;
  /** The same path, but only once the file is actually on disk — see CaseStudyCover. */
  coverFile: string | null;
  metrics: CaseStudyMetric[];
  problem: string;
  approach: string;
  outcome: string;
}

export interface CaseStudyIndex {
  chip: { number: string; label: string };
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Covers are opt-in by file: until public/images/case-studies/<slug>/cover.jpg
 * exists the card falls back to the construction block, and the moment it is
 * dropped in the build picks it up. No code change either way.
 */
function resolveCover(slug: string): string | null {
  const rel = `/images/case-studies/${slug}/cover.jpg`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

export function getCaseStudies(): CaseStudy[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const data = matter(fs.readFileSync(path.join(DIR, file), "utf8")).data as CaseStudy;
      return { ...data, coverFile: resolveCover(data.slug) };
    })
    .sort((a, b) => a.client.localeCompare(b.client));
}

export function getCaseStudyIndex(): CaseStudyIndex {
  return indexJson as CaseStudyIndex;
}
