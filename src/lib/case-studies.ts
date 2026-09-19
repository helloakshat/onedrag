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
  cover: string;
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

export function getCaseStudies(): CaseStudy[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => matter(fs.readFileSync(path.join(DIR, file), "utf8")).data as CaseStudy)
    .sort((a, b) => a.client.localeCompare(b.client));
}

export function getCaseStudyIndex(): CaseStudyIndex {
  return indexJson as CaseStudyIndex;
}
