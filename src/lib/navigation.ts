import fs from "node:fs";
import path from "node:path";
import type { NavLink } from "@/lib/content";
import { getSiteContent } from "@/lib/content";
import { getServiceSlugs } from "@/lib/services";

/**
 * One array, one order: `nav.links` in site.json is the menu, and the footer
 * renders the same list (CLAUDE.md §4, Site structure). Entries for pages
 * that do not exist yet stay in the array and are filtered out here, so
 * shipping a page is one edit — add its content file — and the link appears
 * in both places at the position it was always going to hold.
 */
function pageExists(href: string): boolean {
  const route = href.split("#")[0].replace(/\/$/, "");
  if (route === "") return true; // home

  const segment = route.replace(/^\//, "");
  // A service page is content: content/services/<slug>.json is the page.
  if (getServiceSlugs().includes(segment)) return true;
  // Anything else needs a hand-built route of its own.
  return fs.existsSync(path.join(process.cwd(), "src/app", segment, "page.tsx"));
}

/**
 * The menu, in authored order, minus anything that would 404.
 *
 * An entry flagged `comingSoon` is the exception: it stays in the list and is
 * rendered muted and unclickable, so the menu shows what is coming without
 * offering a dead link. Removing the flag is all it takes to turn it into a
 * real item — by then its page exists, so the filter keeps it anyway.
 */
export function getNavLinks(): NavLink[] {
  return getSiteContent().nav.links.filter(
    (link) => link.comingSoon || pageExists(link.href),
  );
}
