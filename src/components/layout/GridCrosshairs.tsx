import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";

export interface CrosshairMark {
  /** Tailwind col-start value — the mark sits on that column's left boundary. */
  col: number;
  /** Vertical position within the section, as a CSS length or percentage. */
  top: string;
}

interface GridCrosshairsProps {
  marks?: CrosshairMark[];
  className?: string;
}

/** C1 / C3 / C5 at staggered heights. */
export const DEFAULT_MARKS: CrosshairMark[] = [
  { col: 2, top: "18%" },
  { col: 6, top: "38%" },
  { col: 4, top: "76%" },
];

/**
 * Small register marks at column/row intersections. They only ever land on a
 * column boundary — never an arbitrary x.
 */
export function GridCrosshairs({ marks = DEFAULT_MARKS, className }: GridCrosshairsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[3] hidden md:block", className)}
      aria-hidden="true"
    >
      <Container className="z-[3] h-full">
        <Grid className="h-full">
          {marks.map((mark) => (
            <div
              key={`${mark.col}-${mark.top}`}
              className="relative h-full"
              style={{ gridColumnStart: mark.col }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                className="absolute -translate-x-1/2 -translate-y-1/2 opacity-30"
                style={{ top: mark.top }}
              >
                <path d="M4.5 0V9M0 4.5H9" stroke="var(--spine)" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
