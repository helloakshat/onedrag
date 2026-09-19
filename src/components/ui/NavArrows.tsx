"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  label: string;
  className?: string;
}

/** Two 45×45 square arrows. Border and glyphs inherit the section's text colour. */
export function NavArrows({ onPrev, onNext, label, className }: NavArrowsProps) {
  const button =
    "flex h-[45px] w-[45px] items-center justify-center border border-current text-current transition-opacity duration-[var(--dur-fast)] hover:opacity-60";

  return (
    <div className={cn("flex", className)}>
      <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className={button}>
        <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={`Next ${label}`}
        className={cn(button, "-ml-px")}
      >
        <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}
