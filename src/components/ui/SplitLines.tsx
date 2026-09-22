import { cn } from "@/lib/utils";

interface SplitLinesProps {
  /** One entry per rendered line, straight from the content JSON. */
  lines: string[];
  className?: string;
}

/**
 * Renders authored line breaks as block spans.
 *
 * Every line but the last keeps a trailing space, so the text layer reads
 * "Data sync" rather than "Datasync" — what a screen reader announces, what
 * a copy/paste yields, and what a crawler indexes. The space costs nothing
 * visually: it sits at the end of a block box, where CSS collapses it.
 */
export function SplitLines({ lines, className }: SplitLinesProps) {
  return lines.map((line, i) => (
    <span key={`${line}-${i}`} className={cn("block", className)}>
      {i < lines.length - 1 ? `${line} ` : line}
    </span>
  ));
}
