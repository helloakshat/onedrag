import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { GridLines } from "@/components/layout/GridLines";
import { GridCrosshairs } from "@/components/layout/GridCrosshairs";
import { Button } from "@/components/ui/Button";
import { Tick } from "@/components/ui/Tick";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { TileCluster } from "@/components/ui/TileCluster";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { HeadingReveal } from "@/components/ui/HeadingReveal";
import type { HomeContent, SiteContent } from "@/lib/content";

interface HeroProps {
  site: SiteContent;
  home: HomeContent;
}

/** Stats sit at C0, C2 and C4 — the first one deliberately lands in the rail. */
const STAT_COLUMNS = ["md:col-start-1", "md:col-start-3", "md:col-start-5"];

export function Hero({ site, home }: HeroProps) {
  const { heading, subheading, primaryCtaLabel, secondaryCtaLabel, stats } = home.hero;

  return (
    <section id="intro" className="relative border-b border-border-subtle bg-paper">
      {/* full-bleed decor, behind the container's content (z-10) */}
      <div className="pointer-events-none absolute inset-x-0 top-[55%] z-[2] h-[23%] opacity-60">
        <TopoTexture />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[55%] z-[3] h-px bg-border-subtle" />
      {/* lines run the hero height and carry on past its lower edge */}
      <GridLines className="-bottom-24" />
      <GridCrosshairs
        marks={[
          { col: 2, top: "14%" },
          { col: 6, top: "30%" },
          { col: 4, top: "82%" },
        ]}
      />

      <Container className="pt-[clamp(56px,6vw,104px)] pb-[clamp(56px,5vw,88px)]">
        <Grid className="relative">
          <div className="col-span-6 hidden self-center md:col-span-1 md:col-start-2 md:block">
            <TileCluster />
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-3">
            <HeadingReveal>
              <h1 className="font-sans text-display leading-none font-medium tracking-[-0.05em] text-text-primary">
                {heading}
              </h1>
            </HeadingReveal>
          </div>

          <div className="relative col-span-6 hidden self-center md:col-span-2 md:col-start-5 md:block">
            <SystemDiagram className="absolute top-1/2 left-[40%] w-[45%] -translate-y-1/2" />
          </div>
        </Grid>

        <Grid className="mt-12">
          <div className="col-span-6 md:col-span-2 md:col-start-3">
            <Reveal delay={0.12}>
              <p className="max-w-[330px] font-mono text-label leading-[1.45] text-text-primary uppercase">
                {subheading}
              </p>
            </Reveal>
          </div>
        </Grid>

        <Grid className="mt-[clamp(48px,6vw,104px)]">
          <div className="col-span-6 md:col-span-2 md:col-start-3">
            <Reveal delay={0.18}>
              <Button
                href={site.links.bookCall}
                external
                variant="primary"
                className="w-full"
              >
                {primaryCtaLabel}
              </Button>
            </Reveal>
          </div>
          <div className="col-span-6 md:col-span-2 md:col-start-5">
            <Reveal delay={0.22}>
              <Button href="#how-it-works" variant="secondary" className="w-full">
                {secondaryCtaLabel}
              </Button>
            </Reveal>
          </div>
        </Grid>

        <Grid className="mt-[clamp(56px,7vw,112px)] gap-y-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`col-span-6 md:col-span-2 ${STAT_COLUMNS[i]}`}>
              <Reveal delay={0.26 + i * 0.06}>
                <Tick />
                <p className="mt-3 font-mono text-label leading-[1.45] text-text-primary uppercase">
                  {stat.label}
                  <br />
                  {stat.value}
                </p>
              </Reveal>
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
