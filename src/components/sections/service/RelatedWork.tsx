import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/case-studies";
import type { ServiceContent } from "@/lib/services";

interface RelatedWorkProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  service: ServiceContent;
  /** Already filtered to this service and capped at three by the route. */
  studies: CaseStudy[];
}

export function RelatedWork({ service, studies, number }: RelatedWorkProps) {
  const { chip, heading, ctaLabel, ctaHref } = service.work;

  return (
    <SectionShell
      id="projects"
      variant="field"
      number={number}
      label={chip.label}
      heading={heading}
      bg="dark"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
        {studies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.06}>
            {/* TODO: replace — wrap in a Link once /case-studies/[slug] exists. */}
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
                <CaseStudyCover study={study} />
              </div>

              <p className="mt-6 font-sans text-[24px] leading-[1.15] font-medium text-text-on-dark">
                {study.client}
              </p>

              <p className="mt-3 font-mono text-[13px] text-faint uppercase">
                {study.metrics[0].value} &middot; {study.metrics[0].label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-4">
        {/* C4 -> C6: the right half of the content field */}
        <div className="md:col-span-2 md:col-start-3">
          <Button href={ctaHref} variant="accent" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
