import type { NavLink } from "@/lib/content";
import { getSiteContent } from "@/lib/content";
import { getServiceContent, getServiceSlugs } from "@/lib/services";

/**
 * The menu is composed, not authored: the service entries in the middle are
 * whatever has a file in content/services/, so a new service page appears in
 * the nav the moment its JSON lands — nothing here or in site.json changes.
 *
 * Only the fixed ends live in site.json (leadingLinks / trailingLinks).
 * Directory order is alphabetical, which is not the order the services are
 * sold in, so each service carries its own navOrder.
 */
export function getNavLinks(): NavLink[] {
  const site = getSiteContent();

  const services = getServiceSlugs()
    .map((slug) => getServiceContent(slug))
    .filter((service) => service !== null)
    .sort((a, b) => a.navOrder - b.navOrder)
    .map((service) => ({ label: service.navLabel, href: `/${service.slug}` }));

  return [...site.nav.leadingLinks, ...services, ...site.nav.trailingLinks];
}
