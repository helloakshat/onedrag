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
      {/*
        Mobile: min-height 72px, not fixed — the question wraps to as many
        lines as it needs. items-start (not items-center) plus matching
        top padding on both children keeps the "+" centred against the
        FIRST line specifically, not the vertical centre of a wrapped
        multi-line question. Desktop keeps the original fixed h-22 row.
      */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[72px] w-full items-start justify-between gap-8 py-6 text-left md:h-22 md:min-h-0 md:items-center md:py-0"
      >
        <span className="font-mono text-label leading-[1.45] text-text-primary uppercase">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex h-[22px] w-[22px] shrink-0 items-center justify-center font-mono text-[22px] leading-none text-text-primary transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]",
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
