"use client";

import { useState } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { DitherImage } from "@/components/ui/DitherImage";
import { NavArrows } from "@/components/ui/NavArrows";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/lib/content";

interface TestimonialsProps {
  home: HomeContent;
}

export function Testimonials({ home }: TestimonialsProps) {
  const { chip, heading, rating, ratingOutOf, ratingNote, items } = home.testimonials;
  const [active, setActive] = useState(0);
  const current = items[active];

  const step = (delta: number) =>
    setActive((value) => (value + delta + items.length) % items.length);

  // the four thumbnails are the entries other than the active one
  const thumbnails = items.filter((_, i) => i !== active).slice(0, 4);

  return (
    <SectionShell
      id="testimonials"
      variant="field"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="paper-alt"
      rail={
        <div>
          <p className="font-sans text-[40px] leading-[1.1] font-medium text-text-primary">
            {current.name}
          </p>
          <p className="mt-4 font-sans text-[16px] leading-[1.5] text-copy">
            {current.role}, {current.company}
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0">
        {/* large portrait, C2→C3 */}
        <div className="md:pr-8">
          {/* TODO: replace — dithered stand-in for the real portrait. */}
          <div className="aspect-[4/5] w-full">
            <DitherImage seed={current.name} cols={40} rows={50} />
          </div>
        </div>

        {/* quote, C4→C5 */}
        <div className="md:col-start-3 md:px-8">
          <p aria-hidden="true" className="font-sans text-[40px] leading-none text-spine">
            &ldquo;
          </p>
          <p className="mt-4 font-sans text-[16px] leading-[1.5] text-copy">{current.quote}</p>
        </div>

        {/* arrows, C5→C6 */}
        <div className="md:col-start-4 md:pl-8">
          <NavArrows onPrev={() => step(-1)} onNext={() => step(1)} label="testimonial" />
        </div>

        {/*
          Thumbnails sit in their own row aligned to the bottom of the large
          portrait rather than overlapping it — overlapping reads as a bug.
        */}
        <div className="grid grid-cols-4 gap-4 md:col-span-3 md:col-start-2 md:self-end md:pl-8">
          {thumbnails.map((item) => {
            const index = items.indexOf(item);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${item.name}`}
                className={cn(
                  "aspect-square w-full transition-opacity duration-[var(--dur-fast)]",
                  "opacity-70 hover:opacity-100",
                )}
              >
                {/* TODO: replace — dithered stand-in for the real portrait. */}
                <DitherImage seed={item.name} cols={24} rows={24} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-0">
        <p className="font-sans text-[48px] leading-none font-medium text-text-primary">
          {rating}
          <span className="align-super font-mono text-label text-copy">{ratingOutOf}</span>
        </p>

        <p className="font-mono text-label leading-[1.45] text-text-primary uppercase">
          {ratingNote.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </SectionShell>
  );
}
