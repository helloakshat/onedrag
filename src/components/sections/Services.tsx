import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { FounderNote } from "@/components/ui/FounderNote";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent, ServiceItem, SiteContent } from "@/lib/content";

interface ServicesProps {
  site: SiteContent;
  home: HomeContent;
}

/**
 * 2x2 at every breakpoint — mobile keeps the same two-column grid as
 * desktop rather than dropping to a single column, so the divider scheme
 * below holds for both.
 */
function ServiceCell({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[160px] flex-col justify-between py-8 md:min-h-[240px] md:py-10",
        // internal boundaries only — no outer frame
        index % 2 === 1 && "border-l border-dashed border-grid-line",
        index < 2 && "border-b border-dashed border-grid-line",
      )}
    >
      {/* half divider as an overlay so it spans the cell while the rows below stay baseline-aligned */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 hidden border-l border-dashed border-grid-line md:block"
      />

      <div className="grid grid-cols-2">
        <div className="pr-6 pl-6 md:pl-8">
          <ServiceIcon name={item.icon} />
        </div>
      </div>

      <div className="grid grid-cols-2 items-baseline">
        <h3 className="pr-6 pl-6 font-mono text-label leading-[1.45] text-text-primary uppercase md:pl-8">
          {item.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* descriptions are desktop-only — four paragraphs makes the mobile section far too tall; the titles carry it */}
        <p className="hidden max-w-[240px] pr-6 pl-8 font-sans text-[16px] leading-[1.5] text-copy md:block">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function Services({ site, home }: ServicesProps) {
  const { chip, heading, note, items, moreLabel, ctaLabel, ctaHref } = home.services;

  return (
    <SectionShell
      id="services"
      variant="rail"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="paper"
      rail={
        <Reveal>
          <FounderNote name={site.founder.name} role={site.founder.role} message={note} />
        </Reveal>
      }
    >
      <div className="grid grid-cols-2">
        {items.map((item, i) => (
          <ServiceCell key={item.description} item={item} index={i} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
        <p className="font-mono text-label text-text-primary uppercase md:col-span-2">
          <span className="text-spine">+</span> {moreLabel}
        </p>

        <div className="md:col-span-2 md:col-start-3">
          {/* TODO: replace — point at /services once the index page exists. */}
          <Button href={ctaHref} variant="secondary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
