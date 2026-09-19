import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";

interface GridLinesProps {
  className?: string;
}

/** Boundary -> col-start, plus its line treatment (CLAUDE.md §5). */
const LINES = [
  { colStart: 4, style: "border-l-[3px] border-dashed border-grid-line" }, // C3
  { colStart: 5, style: "border-l border-solid border-grid-line-solid" }, // C4
  { colStart: 6, style: "border-l-[3px] border-dashed border-grid-line" }, // C5
];

/**
 * Dashed vertical construction lines on the column boundaries. Rendered
 * through the same Container + Grid as the content, so they land exactly on
 * the column boundaries at any viewport width.
 */
export function GridLines({ className }: GridLinesProps) {
  return (
    <div
      className={cn(
        // The 6-column grid collapses on mobile, so its boundary lines would
        // just cut across content — hide them below md.
        "pointer-events-none absolute inset-x-0 top-0 bottom-0 z-[3] hidden md:block",
        className,
      )}
      aria-hidden="true"
    >
      <Container className="z-[3] h-full">
        <Grid className="h-full">
          {LINES.map((line) => (
            <div
              key={line.colStart}
              className={cn("h-full", line.style)}
              style={{ gridColumnStart: line.colStart }}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
