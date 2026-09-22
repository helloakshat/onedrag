import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { Capabilities } from "@/components/sections/service/Capabilities";
import { Scope } from "@/components/sections/service/Scope";
import { RelatedWork } from "@/components/sections/service/RelatedWork";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/layout/Footer";
import { getHomeContent, getSiteContent } from "@/lib/content";
import { getCaseStudies } from "@/lib/case-studies";
import { getServiceContent, getServiceSlugs } from "@/lib/services";
import { sectionNumbering } from "@/lib/sections";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return {};

  return { title: service.seo.title, description: service.seo.description };
}

export default async function ServicePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) notFound();

  const site = getSiteContent();
  // The contacts band is the page's own copy, shared with home.
  const home = getHomeContent();
  // Up to three case studies that list this service in their frontmatter.
  const related = getCaseStudies()
    .filter((study) => study.services.includes(slug))
    .slice(0, 3);

  // 01…07 in render order — one short when Related work is dropped below.
  const n = sectionNumbering();

  return (
    <>
      <main className="flex-1">
        <ServiceHero service={service} number={n()} />
        <Capabilities service={service} number={n()} />
        <Scope site={site} service={service} number={n()} />
        <Process content={service.process} number={n()} />
        {/* the whole band is dropped when nothing matches this service, and
            with it its number — the sequence stays contiguous either way */}
        {related.length > 0 ? (
          <RelatedWork service={service} studies={related} number={n()} />
        ) : null}
        <Faq site={site} content={service.faq} bg="paper" number={n()} />
      </main>
      <Footer site={site} home={home} number={n()} />
    </>
  );
}
