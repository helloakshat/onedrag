"use client";

import { useState } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { FounderNote } from "@/components/ui/FounderNote";
import { cn } from "@/lib/utils";
import type { FaqItem, HomeContent, SiteContent } from "@/lib/content";

interface FaqProps {
  site: SiteContent;
  home: HomeContent;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-dashed border-grid-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex h-22 w-full items-center justify-between gap-8 text-left"
      >
        <span className="font-mono text-label leading-[1.45] text-text-primary uppercase">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 font-mono text-[22px] text-text-primary transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]",
            isOpen && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      {/* grid-rows 0fr -> 1fr animates height without a fixed max-height */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[70ch] pb-8 font-sans text-[16px] leading-[1.5] text-copy">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ site, home }: FaqProps) {
  const { chip, heading, note, items, moreLabel, ctaLabel } = home.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="faq"
      variant="field"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="white"
      rail={<FounderNote name={site.founder.name} role={site.founder.role} message={note} />}
    >
      <div>
        {items.map((item, i) => (
          <AccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
        <p className="font-mono text-label leading-[1.45] text-text-primary uppercase md:col-span-2">
          {moreLabel.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="md:col-span-2 md:col-start-3">
          <Button href={site.links.getInTouch} external variant="secondary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
