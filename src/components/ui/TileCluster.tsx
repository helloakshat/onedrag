import { cn } from "@/lib/utils";

interface TileClusterProps {
  className?: string;
}

const COLUMN_A = ["02", "03", "04"];
const COLUMN_B = ["05", "06", "07"];

function Tile({ label }: { label: string }) {
  return (
    <>
      <span className="flex h-[33px] w-[33px] items-center justify-center bg-tile-fill font-mono text-tile text-faint">
        {label}
      </span>
      {/*
        Separates the labels in the text layer — without it the column reads
        "050607" to anything scraping text. A white-space-only node between
        flex children is not rendered as a flex item, so the layout is
        untouched. The cluster stays aria-hidden either way; this is for
        copy/paste and crawlers, which ignore aria.
      */}
      {" "}
    </>
  );
}

/**
 * Seven numbered tiles: "01" alone, then two stacked columns. Two dotted
 * leader lines run from the cluster's right edge toward the heading,
 * stopping short of C2.
 */
export function TileCluster({ className }: TileClusterProps) {
  return (
    <div className={cn("flex items-center", className)} aria-hidden="true">
      <div className="flex items-center gap-2">
        <Tile label="01" />

        <div className="flex flex-col gap-2">
          {COLUMN_A.map((label) => (
            <Tile key={label} label={label} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {COLUMN_B.map((label) => (
            <Tile key={label} label={label} />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[33px] pr-4 pl-2">
        <span className="h-px w-full border-t border-dashed border-border-strong" />
        <span className="h-px w-full border-t border-dashed border-border-strong" />
      </div>
    </div>
  );
}
