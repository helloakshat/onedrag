import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionChip } from "@/components/ui/SectionChip";

interface RailProps {
  number: string;
  label: string;
  heading: ReactNode;
  className?: string;
}

/** The 490px left column holding a section chip + heading, heading constrained to ~370px. */
export function Rail({ number, label, heading, className }: RailProps) {
  return (
    <div
      className={cn("col-span-6 flex flex-col gap-6 md:col-span-2", className)}
      style={{ maxWidth: "var(--rail-width)" }}
    >
      <SectionChip number={number} label={label} />
      <h2
        className="font-sans text-h2 leading-[1.05] font-medium tracking-[-0.03em] text-text-primary"
        style={{ maxWidth: "var(--rail-heading-max)" }}
      >
        {heading}
      </h2>
    </div>
  );
}
