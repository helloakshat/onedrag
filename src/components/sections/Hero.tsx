import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { GridLines } from "@/components/layout/GridLines";
import { GridCrosshairs } from "@/components/layout/GridCrosshairs";
import { Button } from "@/components/ui/Button";
import { Tick } from "@/components/ui/Tick";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { TileCluster } from "@/components/ui/TileCluster";
import { SectionChip } from "@/components/ui/SectionChip";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { HeadingReveal } from "@/components/ui/HeadingReveal";
import type { HomeContent, SiteContent } from "@/lib/content";

interface HeroProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  site: SiteContent;
  home: HomeContent;
}

/** Stats sit at C0, C2 and C4 — the first one deliberately lands in the rail. */
const STAT_COLUMNS = ["md:col-start-1", "md:col-start-3", "md:col-start-5"];

export function Hero({ site, home, number }: HeroProps) {
  const { chip, heading, subheading, primaryCtaLabel, secondaryCtaLabel, stats } = home.hero;

  return (
    <section
      id="intro"
      // the header chip reads its sequence off these (see Nav / SectionShell)
      data-chip-number={number}
      data-chip-label={chip.label}
      className="relative border-b border-border-subtle bg-paper"
    >
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
        {/*
          Mobile-only: the header's chip is hidden below md (it tracks scroll
          there), so Hero renders its own static chip instead — the same
          inline pattern every SectionShell-based section already uses.
        */}
        <Grid className="md:hidden">
          <div className="col-span-6">
            <Reveal>
              <SectionChip number={number} label={chip.label} />
            </Reveal>
          </div>
        </Grid>

        <Grid className="relative mt-8 md:mt-0">
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
              {/*
                Below md the two CTAs stack with 0 gap (Grid's own gap-0) and
                share this divider instead of each carrying its own border —
                at md+ they sit side by side, contiguous, no divider needed.
              */}
              <Button
                href="#process"
                variant="secondary"
                className="w-full border-t border-border-strong md:border-t-0"
              >
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
                  {/* trailing space so the text layer reads "…shipped 40+", not "…shipped40+" */}
                  {`${stat.label} `}
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
