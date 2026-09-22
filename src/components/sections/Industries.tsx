"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { FounderNote } from "@/components/ui/FounderNote";
import { SplitLines } from "@/components/ui/SplitLines";
import { IndustryIcon } from "@/components/ui/IndustryIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent, IndustryItem, SiteContent } from "@/lib/content";

interface IndustriesProps {
  /** Chip number, spent by the page in render order — see lib/sections. */
  number: string;
  site: SiteContent;
  home: HomeContent;
}

function IndustryCell({ item, index }: { item: IndustryItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "min-h-[120px] md:grid md:min-h-[190px] md:grid-cols-2",
        index % 2 === 1 && "border-l border-dashed border-grid-line",
        index < 4 && "border-b border-dashed border-grid-line",
      )}
    >
      {/*
        Mobile: icon + name only, tap to expand the capability list inline.
        Desktop: unchanged two-column cell, list always visible.
      */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-col justify-between gap-6 py-9 pr-6 pl-6 text-left md:cursor-default md:justify-between md:pl-8"
      >
        <IndustryIcon name={item.icon} />
        <span className="flex items-end justify-between gap-3">
          <h3 className="font-mono text-label leading-[1.45] text-text-primary uppercase">
            <SplitLines lines={item.name} />
          </h3>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className={cn(
              "shrink-0 text-text-primary transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] md:hidden",
              open && "rotate-180",
            )}
          />
        </span>
      </button>

      {/* grid-rows 0fr -> 1fr animates height without a fixed max-height */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)] md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-2 px-6 pb-6">
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
      </div>

      <ul className="hidden flex-col justify-end gap-2 border-l border-dashed border-grid-line py-9 pr-6 pl-8 md:flex">
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

export function Industries({ site, home, number }: IndustriesProps) {
  const { chip, heading, note, items } = home.industries;

  return (
    <SectionShell
      id="industries"
      variant="rail"
      number={number}
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
          <IndustryCell key={item.name.join(" ")} item={item} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
