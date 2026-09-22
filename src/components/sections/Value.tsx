import { SectionShell } from "@/components/layout/SectionShell";
import { FounderNote } from "@/components/ui/FounderNote";
import { SplitLines } from "@/components/ui/SplitLines";
import { NumberBadge } from "@/components/ui/NumberBadge";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, SiteContent, ValuePoint } from "@/lib/content";

interface ValueProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  site: SiteContent;
  home: HomeContent;
}

function Point({ point }: { point: ValuePoint }) {
  return (
    <div className="flex flex-col">
      <NumberBadge value={point.number} />
      <h3 className="mt-[90px] font-mono text-label leading-[1.45] text-text-primary uppercase">
        <SplitLines lines={point.title} />
      </h3>
    </div>
  );
}

/** Mobile 2x2: number block on top, title beneath, tight spacing, no stagger. */
function MobilePoint({ point }: { point: ValuePoint }) {
  return (
    <div className="flex min-h-[140px] flex-col justify-between">
      <NumberBadge value={point.number} />
      <h3 className="font-mono text-label leading-[1.45] text-text-primary uppercase">
        <SplitLines lines={point.title} />
      </h3>
    </div>
  );
}

export function Value({ site, home, number }: ValueProps) {
  const { chip, heading, note, moreLabel, points } = home.value;
  const founder = (
    <FounderNote name={site.founder.name} role={site.founder.role} message={note} />
  );

  return (
    <SectionShell
      id="value"
      variant="rail"
      number={number}
      label={chip.label}
      heading={heading}
      bg="paper"
      decor={
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] opacity-45">
          <TopoTexture />
        </div>
      }
    >
      {/*
        Mobile: a plain 2x2 — the desktop stagger only reads as a deliberate
        offset when the two columns sit side by side. Serialised into one
        column it's just unexplained empty space, so mobile gets its own
        tight grid instead of a reflowed version of the desktop one.
      */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:hidden">
        {points.map((point, i) => (
          <Reveal key={point.number} delay={i * 0.04}>
            <MobilePoint point={point} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 md:hidden">
        <Reveal delay={0.16}>{founder}</Reveal>
      </div>

      {/*
        Strict 2×2 on the field: .01/.03 at C2, .02/.04 at C4. The left
        column is pushed 120px down — a structured offset, not drift.
      */}
      <div className="hidden min-h-[640px] md:grid md:grid-cols-4 md:gap-y-0">
        <div className="flex flex-col gap-16 md:col-span-2 md:mt-[120px]">
          <Reveal>
            <Point point={points[0]} />
          </Reveal>
          <Reveal delay={0.06}>
            <Point point={points[2]} />
          </Reveal>
          <Reveal delay={0.12}>{founder}</Reveal>
        </div>

        <div className="flex flex-col gap-16 md:col-span-2 md:col-start-3">
          <Reveal delay={0.06}>
            <Point point={points[1]} />
          </Reveal>
          <Reveal delay={0.12}>
            <Point point={points[3]} />
          </Reveal>
        </div>

        {/* bottom-right of the field, at C5 — desktop only */}
        <div className="md:col-start-4 md:row-start-2 md:self-end">
          <Reveal delay={0.18}>
            <p className="font-mono text-label whitespace-nowrap text-text-primary uppercase">
              <span className="text-spine">+</span> {moreLabel}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
