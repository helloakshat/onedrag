"use client";

import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { DitherImage } from "@/components/ui/DitherImage";
import { NavArrows } from "@/components/ui/NavArrows";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/lib/content";

interface TestimonialsProps {
  home: HomeContent;
}

// Below this many horizontal pixels of travel, a touch reads as a tap, not a swipe.
const SWIPE_THRESHOLD = 40;

export function Testimonials({ home }: TestimonialsProps) {
  const { chip, heading, rating, ratingOutOf, ratingNote, items } = home.testimonials;
  const [active, setActive] = useState(0);
  const current = items[active];
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const step = (delta: number) =>
    setActive((value) => (value + delta + items.length) % items.length);

  // the four thumbnails are the entries other than the active one
  const thumbnails = items.filter((_, i) => i !== active).slice(0, 4);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // ignore mostly-vertical drags so page scroll still works
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  };

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
        {/* large portrait, C2→C3 — swipeable on mobile, replacing the thumbnail row */}
        <div className="md:pr-8">
          {/* TODO: replace — dithered stand-in for the real portrait. */}
          <div
            className="aspect-[4/3] w-full touch-pan-y md:aspect-[4/5]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
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

        {/* arrows: below the quote and right-aligned on mobile, back to the C5 rail column on desktop */}
        <div className="flex justify-end md:col-start-4 md:block md:pl-8">
          <NavArrows onPrev={() => step(-1)} onNext={() => step(1)} label="testimonial" />
        </div>

        {/*
          Thumbnails are a desktop-only picker — mobile swipes the portrait
          instead (see onTouchStart/onTouchEnd above), so a small thumbnail
          strip would just duplicate that control.
        */}
        <div className="hidden gap-4 md:col-span-3 md:col-start-2 md:grid md:grid-cols-4 md:self-end md:pl-8">
          {thumbnails.map((item) => {
            const index = items.indexOf(item);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${item.name}`}
                className={cn(
                  "aspect-square w-full transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-inout)]",
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
