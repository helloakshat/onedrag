import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { GridLines } from "@/components/layout/GridLines";
import { GridCrosshairs } from "@/components/layout/GridCrosshairs";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { SectionChip } from "@/components/ui/SectionChip";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { Reveal } from "@/components/ui/Reveal";
import { HeadingReveal } from "@/components/ui/HeadingReveal";
import type { ServiceContent } from "@/lib/services";

interface ServiceHeroProps {
  service: ServiceContent;
}

/**
 * Page hero for a service page (/[slug]). Full viewport width with TopoTexture
 * behind, closing on a full-width horizontal rule (the section's own bottom
 * border, which runs edge to edge rather than container width).
 *
 * H1 sits C2->C4, the counter stat C4->C6 — both inside the content field.
 */
export function ServiceHero({ service }: ServiceHeroProps) {
  const { chip, heading, intro, counter, ctaLabel, ctaHref } = service.hero;

  return (
    <section
      id="intro"
      data-chip-number={chip.number}
      data-chip-label={chip.label}
      className="relative border-b border-border-subtle bg-paper"
    >
      {/* full-bleed decor, behind the container's content (z-10) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] opacity-55">
        <TopoTexture />
      </div>
      <GridLines />
      <GridCrosshairs
        marks={[
          { col: 2, top: "16%" },
          { col: 6, top: "34%" },
          { col: 4, top: "80%" },
        ]}
      />

      <Container className="pt-[clamp(56px,6vw,104px)] pb-[clamp(64px,7vw,120px)]">
        <Grid>
          <div className="col-span-6 md:col-span-2 md:col-start-3">
            <Reveal>
              <SectionChip number={chip.number} label={chip.label} />
            </Reveal>
          </div>
        </Grid>

        <Grid className="mt-10 gap-y-12 md:mt-12 md:gap-y-0">
          <div className="col-span-6 md:col-span-2 md:col-start-3">
            <HeadingReveal>
              <h1 className="font-sans text-display leading-none font-medium tracking-[-0.05em] text-text-primary">
                {heading}
              </h1>
            </HeadingReveal>

            <Reveal delay={0.12}>
              <p className="mt-10 max-w-[420px] font-sans text-[18px] leading-[1.5] text-copy">
                {intro}
              </p>
            </Reveal>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-5">
            <Reveal delay={0.06}>
              {/* counts up the first time it is in view — on this page, on load */}
              <p className="font-sans leading-none font-medium tracking-[-0.05em] text-text-primary text-[clamp(64px,7vw,120px)]">
                <CountUp value={counter.value} suffix={counter.suffix} />
              </p>

              <p className="mt-6 font-mono text-label leading-[1.45] text-text-primary uppercase">
                {counter.label.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <Button href={ctaHref} variant="secondary" className="mt-10 w-full">
                {ctaLabel}
              </Button>
            </Reveal>
          </div>
        </Grid>
      </Container>
    </section>
  );
}
