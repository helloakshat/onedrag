import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { FounderNote } from "@/components/ui/FounderNote";
import { SplitCell } from "@/components/ui/SplitCell";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/lib/content";
import type { ServiceContent } from "@/lib/services";

interface ScopeProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  site: SiteContent;
  service: ServiceContent;
}

/** 2x2 on the same split-cell pattern as the home services section. */
export function Scope({ site, service, number }: ScopeProps) {
  const { chip, heading, note, items, moreLabel, ctaLabel } = service.scope;

  return (
    <SectionShell
      id="scope"
      variant="rail"
      number={number}
      label={chip.label}
      heading={heading}
      bg="white"
      rail={
        <Reveal>
          <FounderNote name={site.founder.name} role={site.founder.role} message={note} />
        </Reveal>
      }
    >
      <div className="grid grid-cols-2">
        {items.map((item, i) => (
          <SplitCell
            key={item.description}
            icon={<CapabilityIcon name={item.icon} />}
            title={item.title}
            description={item.description}
            index={i}
            total={items.length}
          />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
        <p className="font-mono text-label text-text-primary uppercase md:col-span-2">
          <span className="text-spine">+</span> {moreLabel}
        </p>

        {/* C4 -> C6: the right half of the content field */}
        <div className="md:col-span-2 md:col-start-3">
          <Button href={site.links.bookCall} external variant="secondary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
