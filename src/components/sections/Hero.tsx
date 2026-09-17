import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { SectionChip } from "@/components/ui/SectionChip";
import { Button } from "@/components/ui/Button";
import { Tick } from "@/components/ui/Tick";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, SiteContent } from "@/lib/content";

interface HeroProps {
  site: SiteContent;
  home: HomeContent;
}

export function Hero({ site, home }: HeroProps) {
  const { chip, heading, subheading, primaryCtaLabel, secondaryCtaLabel, stats } = home.hero;

  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <TopoTexture />

      <Container className="relative flex flex-col gap-16 py-[clamp(80px,10vw,160px)]">
        <Grid>
          <div className="col-span-6">
            <Reveal>
              <SectionChip number={chip.number} label={chip.label} />
            </Reveal>
          </div>

          <div className="col-span-6 mt-8 md:col-span-5">
            <Reveal delay={0.06}>
              <h1
                className="font-sans text-display leading-[0.95] font-medium tracking-[-0.05em] text-text-primary"
              >
                {heading}
              </h1>
            </Reveal>
          </div>

          <div className="col-span-6 mt-8 md:col-span-3">
            <Reveal delay={0.12}>
              <p className="font-mono text-label text-text-secondary uppercase tracking-[0.04em]">
                {subheading}
              </p>
            </Reveal>
          </div>

          <div className="col-span-6 mt-12 md:col-span-4">
            <Reveal delay={0.18}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Button href={site.links.bookCall} external variant="primary" className="w-full">
                  {primaryCtaLabel}
                </Button>
                <Button href="#how-it-works" variant="secondary" className="w-full">
                  {secondaryCtaLabel}
                </Button>
              </div>
            </Reveal>
          </div>
        </Grid>

        <Reveal delay={0.24}>
          <div className="grid grid-cols-1 gap-8 border-t border-border-subtle pt-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Tick />
                  <span className="font-mono text-label text-text-muted uppercase tracking-[0.04em]">
                    {stat.label}
                  </span>
                </div>
                <span className="font-sans text-h3 font-medium text-text-primary">{stat.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
