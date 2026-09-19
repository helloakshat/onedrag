import { SectionShell } from "@/components/layout/SectionShell";
import { FounderNote } from "@/components/ui/FounderNote";
import { IndustryIcon } from "@/components/ui/IndustryIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent, IndustryItem, SiteContent } from "@/lib/content";

interface IndustriesProps {
  site: SiteContent;
  home: HomeContent;
}

function IndustryCell({ item, index }: { item: IndustryItem; index: number }) {
  return (
    <div
      className={cn(
        "grid min-h-[190px] grid-cols-2",
        index % 2 === 1 && "md:border-l md:border-dashed md:border-grid-line",
        index < 4 && "border-b border-dashed border-grid-line",
      )}
    >
      <div className="flex flex-col justify-between py-9 pr-6 md:pl-8">
        <IndustryIcon name={item.icon} />
        <h3 className="mt-8 font-mono text-label leading-[1.45] text-text-primary uppercase">
          {item.name.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
      </div>

      <ul className="flex flex-col justify-end gap-2 border-l border-dashed border-grid-line py-9 pr-6 pl-8">
        {item.capabilities.map((capability) => (
          <li key={capability} className="flex gap-2 font-sans text-[15px] leading-[1.5] text-copy">
            <span aria-hidden="true" className="text-spine">
              ›
            </span>
            {capability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Industries({ site, home }: IndustriesProps) {
  const { chip, heading, note, items } = home.industries;

  return (
    <SectionShell
      id="industries"
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
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <IndustryCell key={item.name.join(" ")} item={item} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
