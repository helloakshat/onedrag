import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { Capabilities } from "@/components/sections/service/Capabilities";
import { Scope } from "@/components/sections/service/Scope";
import { RelatedWork } from "@/components/sections/service/RelatedWork";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { getSiteContent } from "@/lib/content";
import { getCaseStudies } from "@/lib/case-studies";
import { getServiceContent, getServiceSlugs } from "@/lib/services";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return {};

  return { title: service.seo.title, description: service.seo.description };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) notFound();

  const site = getSiteContent();
  // Up to three case studies that list this service in their frontmatter.
  const related = getCaseStudies()
    .filter((study) => study.services.includes(slug))
    .slice(0, 3);

  return (
    <>
      <ServiceHero service={service} />
      <Capabilities service={service} />
      <Scope site={site} service={service} />
      <Process content={service.process} />
      {/* the whole band is dropped when nothing matches this service */}
      {related.length > 0 ? <RelatedWork service={service} studies={related} /> : null}
      <Faq site={site} content={service.faq} bg="paper" />
    </>
  );
}
