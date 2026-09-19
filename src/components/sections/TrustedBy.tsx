import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { GridLines } from "@/components/layout/GridLines";
import { Marquee } from "@/components/ui/Marquee";
import type { HomeContent } from "@/lib/content";

interface TrustedByProps {
  home: HomeContent;
}

/** Small geometric mark so a wordmark reads as a logo rather than a list item. */
function LogoMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
      <rect x="0.5" y="0.5" width="11" height="11" fill="none" stroke="currentColor" />
      <rect x="0.5" y="0.5" width="5.5" height="5.5" fill="currentColor" />
    </svg>
  );
}

/** 88px strip directly under the hero: label at C2, logo marquee C3→C6. */
export function TrustedBy({ home }: TrustedByProps) {
  const { label, logos } = home.trustedBy;

  // Repeated so a single marquee half always overflows the C3→C6 track —
  // otherwise a short logo set leaves a visible gap mid-loop.
  const wordmarks = [...logos, ...logos].map((name, i) => (
    // TODO: replace — placeholder client wordmarks until real logos are supplied.
    <span
      key={`${name}-${i}`}
      className="flex w-40 shrink-0 items-center justify-center gap-2 text-faint"
    >
      <LogoMark />
      <span className="font-sans text-[18px] leading-none font-medium tracking-[-0.02em] whitespace-nowrap">
        {name}
      </span>
    </span>
  ));

  return (
    <section className="relative border-b border-grid-line-solid bg-bg-raised">
      <GridLines />

      <Container>
        <Grid className="items-center gap-y-4 py-6 md:h-22 md:gap-y-0 md:py-0">
          <span className="col-span-6 font-mono text-label whitespace-nowrap text-text-primary uppercase md:col-span-1 md:col-start-3">
            {label}
          </span>

          {/* edge fade so logos leave the track instead of hard-clipping — visible at every breakpoint, mobile just gets the full row instead of sharing one with the label */}
          <div
            className="col-span-6 md:col-span-3 md:col-start-4"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 56px, black calc(100% - 56px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 56px, black calc(100% - 56px), transparent)",
            }}
          >
            <Marquee>{wordmarks}</Marquee>
          </div>
        </Grid>
      </Container>
    </section>
  );
}
