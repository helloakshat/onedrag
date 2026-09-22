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
import { Footer } from "@/components/layout/Footer";
import { getHomeContent, getSiteContent } from "@/lib/content";
import { getCaseStudies, getCaseStudyIndex } from "@/lib/case-studies";
import { sectionNumbering } from "@/lib/sections";
import { getNavLinks } from "@/lib/navigation";

export default function Home() {
  const site = getSiteContent();
  const home = getHomeContent();
  // 01…10 in render order. TrustedBy is an unnumbered strip, so it is skipped.
  const n = sectionNumbering();

  return (
    <>
      <main className="flex-1">
        <Hero site={site} home={home} number={n()} />
        <TrustedBy home={home} />
        <Services site={site} home={home} number={n()} />
        <Process content={home.process} number={n()} />
        <Results home={home} number={n()} />
        <Work studies={getCaseStudies()} index={getCaseStudyIndex()} number={n()} />
        <Industries site={site} home={home} number={n()} />
        <Value site={site} home={home} number={n()} />
        <Testimonials home={home} number={n()} />
        <Faq site={site} content={home.faq} number={n()} />
      </main>
      <Footer site={site} home={home} navLinks={getNavLinks()} number={n()} />
    </>
  );
}
