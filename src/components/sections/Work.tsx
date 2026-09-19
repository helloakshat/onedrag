"use client";

import { useState } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { Halftone } from "@/components/ui/Halftone";
import { NavArrows } from "@/components/ui/NavArrows";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy, CaseStudyIndex } from "@/lib/case-studies";

interface WorkProps {
  studies: CaseStudy[];
  index: CaseStudyIndex;
}

export function Work({ studies, index }: WorkProps) {
  const [active, setActive] = useState(0);
  const study = studies[active];
  const headline = study.metrics[0];

  const step = (delta: number) =>
    setActive((current) => (current + delta + studies.length) % studies.length);

  return (
    <SectionShell
      id="work"
      variant="field"
      number={index.chip.number}
      label={index.chip.label}
      heading={index.heading}
      bg="dark"
      rail={
        <div>
          <p className="font-sans text-[32px] leading-[1.1] font-medium text-text-on-dark">
            {study.client}
          </p>
          <p className="mt-4 font-mono text-[13px] text-faint uppercase">{study.category}</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <Reveal>
            {/* TODO: replace — halftone stand-in for the real cover image. */}
            <div className="aspect-[16/10] w-full">
              {/* width ≈ the cover's real rendered width, so pixels land at ~3px */}
              <Halftone seed={study.slug} subject="scene" width={760} ratio={10 / 16} pixel={3} />
            </div>
          </Reveal>
        </div>

        <div className="mt-6 md:col-start-4 md:mt-0 md:pl-8">
          <NavArrows onPrev={() => step(-1)} onNext={() => step(1)} label="case study" />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
        <div className="flex items-baseline gap-5 md:col-span-2">
          <p className="font-sans text-[48px] leading-none font-medium text-text-on-dark">
            {headline.value}
          </p>
          <p className="font-mono text-label leading-[1.45] text-faint uppercase">
            {headline.label}
          </p>
        </div>

        <div className="md:col-span-2 md:col-start-3">
          {/* TODO: replace — point at /case-studies once the listing page exists. */}
          <Button href={index.ctaHref} variant="accent" className="w-full">
            {index.ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
