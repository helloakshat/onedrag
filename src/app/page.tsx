import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Work } from "@/components/sections/Work";
import { Industries } from "@/components/sections/Industries";
import { Value } from "@/components/sections/Value";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { getHomeContent, getSiteContent } from "@/lib/content";
import { getCaseStudies, getCaseStudyIndex } from "@/lib/case-studies";

export default function Home() {
  const site = getSiteContent();
  const home = getHomeContent();

  return (
    <>
      <Hero site={site} home={home} />
      <TrustedBy home={home} />
      <Services site={site} home={home} />
      <Process content={home.process} />
      <Results home={home} />
      <Work studies={getCaseStudies()} index={getCaseStudyIndex()} />
      <Industries site={site} home={home} />
      <Value site={site} home={home} />
      <Testimonials home={home} />
      <Faq site={site} content={home.faq} />
    </>
  );
}
