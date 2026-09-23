import { DitheredCover } from "@/components/ui/DitheredCover";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCoverProps {
  study: CaseStudy;
  className?: string;
}

/**
 * TODO: replace — the construction block standing in for a real cover.
 *
 * Deliberately not a picture: flat --dark carrying the same dashed grid the
 * page is built on, with the client's name set in the mono label face. A
 * generated pseudo-photograph only ever reads as a broken image.
 */
function CoverBlock({ client }: { client: string }) {
  return (
    <div className="relative h-full w-full border border-grid-line-solid bg-dark">
      {/* the section's own column boundaries, carried across the block */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/4 w-px border-l border-dashed border-grid-line opacity-40" />
        <div className="absolute inset-y-0 left-1/2 w-px border-l border-grid-line-solid opacity-40" />
        <div className="absolute inset-y-0 left-3/4 w-px border-l border-dashed border-grid-line opacity-40" />
        <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-grid-line opacity-40" />
      </div>

      <p className="absolute bottom-5 left-5 font-mono text-[13px] text-text-on-dark uppercase">
        <span className="text-spine">/ </span>
        {client}
      </p>
    </div>
  );
}

/**
 * One cover, two paths. Drop a real file at
 * public/images/case-studies/<slug>/cover.jpg and the loader picks it up
 * (see lib/case-studies) — it then runs through the dither in
 * DitheredCover, and this file needs no edit.
 */
export function CaseStudyCover({ study, className }: CaseStudyCoverProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      {study.coverFile ? (
        <DitheredCover src={study.coverFile} alt={`${study.client} — ${study.title}`} />
      ) : (
        <CoverBlock client={study.client} />
      )}
    </div>
  );
}
