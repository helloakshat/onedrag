import { ChevronRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { CapabilityItem, ServiceContent } from "@/lib/services";

interface CapabilitiesProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  service: ServiceContent;
}

/**
 * Two cards per row inside the content field — the field is 4 columns wide
 * (C2->C6), so a 2-column card spans exactly two of them and the boundary
 * between the pair lands on C4, the solid construction line.
 */
function CapabilityCard({ item, index, total }: { item: CapabilityItem; index: number; total: number }) {
  const isRight = index % 2 === 1;

  return (
    <div
      className={cn(
        "flex h-full min-h-[200px] flex-col gap-8 py-8 md:flex-row md:gap-6 md:py-10",
        // internal boundaries only — no outer frame
        isRight ? "md:border-l md:border-dashed md:border-grid-line md:pl-8" : "md:pr-8",
        // mobile stacks, so every cell but the last carries a rule
        index < total - 1 && "border-b border-dashed border-grid-line",
        // desktop: only the rows above the last one do
        index < total - 2 && "md:border-b md:border-dashed md:border-grid-line",
        index >= total - 2 && "md:border-b-0",
      )}
    >
      {/* icon top, mono title bottom — the left half of the card */}
      <div className="flex shrink-0 flex-col justify-between gap-8 md:w-[45%]">
        <CapabilityIcon name={item.icon} />

        <h3 className="font-mono text-label leading-[1.45] text-text-primary uppercase">
          <SplitLines lines={item.title} />
        </h3>
      </div>

      <ul className="flex flex-col gap-3 md:flex-1 md:self-end">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <ChevronRight
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-[4px] shrink-0 text-spine"
            />
            <span className="font-sans text-[15px] leading-[1.45] text-copy">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities({ service, number }: CapabilitiesProps) {
  const { chip, heading, note, items } = service.capabilities;

  return (
    <SectionShell
      id="capabilities"
      variant="rail"
      number={number}
      label={chip.label}
      heading={heading}
      bg="paper"
      rail={
        <Reveal>
          <p className="font-mono text-label leading-[1.45] text-text-primary uppercase">
            <SplitLines lines={note} />
          </p>
        </Reveal>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title.join(" ")} delay={(i % 2) * 0.06} className="h-full">
            <CapabilityCard item={item} index={i} total={items.length} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
