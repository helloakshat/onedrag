import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SplitCellProps {
  icon: ReactNode;
  /** One entry per rendered line. */
  title: string[];
  description: string;
  /** Position in a two-column grid — drives the internal dashed boundaries. */
  index: number;
  total: number;
  /** When set the whole cell is the link to that service page. */
  href?: string;
}

/**
 * The 2x2 split cell shared by the home services section and a service
 * page's scope section: icon top-left, mono title bottom-left, description
 * bottom-right, the two baselines aligned.
 *
 * 2 columns at every breakpoint — mobile keeps the same two-column grid as
 * desktop rather than dropping to a single column, so the divider scheme
 * holds for both.
 */
export function SplitCell({ icon, title, description, index, total, href }: SplitCellProps) {
  const className = cn(
    "group relative flex min-h-[160px] flex-col justify-between py-8 md:min-h-[240px] md:py-10",
    // internal boundaries only — no outer frame
    index % 2 === 1 && "border-l border-dashed border-grid-line",
    index < total - 2 && "border-b border-dashed border-grid-line",
  );

  const body = (
    <>
      {/*
        The only affordance that a cell goes somewhere. Absolute so it costs
        no layout — a linked cell has to stay the same height as an unlinked
        one beside it. It sits in the empty top-right quadrant, above the
        bottom-aligned description. Always on below md, where there is no
        hover to reveal it.
      */}
      {href ? (
        <span
          aria-hidden="true"
          className="absolute top-8 right-6 text-spine transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-inout)] md:top-10 md:right-8 md:opacity-0 md:group-hover:opacity-100"
        >
          &rarr;
        </span>
      ) : null}

      {/* half divider as an overlay so it spans the cell while the rows below stay baseline-aligned */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 hidden border-l border-dashed border-grid-line md:block"
      />

      <div className="grid grid-cols-2">
        <div className="pr-6 pl-6 md:pl-8">{icon}</div>
      </div>

      <div className="grid grid-cols-2 items-baseline">
        <h3 className="pr-6 pl-6 font-mono text-label leading-[1.45] text-text-primary uppercase md:pl-8">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* descriptions are desktop-only — four paragraphs makes the mobile section far too tall; the titles carry it */}
        <p className="hidden max-w-[240px] pr-6 pl-8 font-sans text-[16px] leading-[1.5] text-copy md:block">
          {description}
        </p>
      </div>
    </>
  );

  // A linked cell is the anchor itself, so the whole cell is the hit area.
  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
