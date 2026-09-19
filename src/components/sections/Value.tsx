import { SectionShell } from "@/components/layout/SectionShell";
import { FounderNote } from "@/components/ui/FounderNote";
import { NumberBadge } from "@/components/ui/NumberBadge";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, SiteContent, ValuePoint } from "@/lib/content";

interface ValueProps {
  site: SiteContent;
  home: HomeContent;
}

function Point({ point }: { point: ValuePoint }) {
  return (
    <div className="flex flex-col">
      <NumberBadge value={point.number} />
      <h3 className="mt-[90px] font-mono text-label leading-[1.45] text-text-primary uppercase">
        {point.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
    </div>
  );
}

export function Value({ site, home }: ValueProps) {
  const { chip, heading, note, moreLabel, points } = home.value;

  return (
    <SectionShell
      id="value"
      variant="rail"
      number={chip.number}
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
        Strict 2×2 on the field: .01/.03 at C2, .02/.04 at C4. The left
        column is pushed 120px down — a structured offset, not drift.
      */}
      <div className="grid min-h-[640px] grid-cols-1 content-start gap-y-16 md:grid-cols-4 md:gap-y-0">
        <div className="flex flex-col gap-16 md:col-span-2 md:mt-[120px]">
          <Reveal>
            <Point point={points[0]} />
          </Reveal>
          <Reveal delay={0.06}>
            <Point point={points[2]} />
          </Reveal>
          <Reveal delay={0.12}>
            <FounderNote name={site.founder.name} role={site.founder.role} message={note} />
          </Reveal>
        </div>

        <div className="flex flex-col gap-16 md:col-span-2 md:col-start-3">
          <Reveal delay={0.06}>
            <Point point={points[1]} />
          </Reveal>
          <Reveal delay={0.12}>
            <Point point={points[3]} />
          </Reveal>
        </div>

        {/* bottom-right of the field, at C5 */}
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
