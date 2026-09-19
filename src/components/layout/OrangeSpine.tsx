import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";

/**
 * A single fixed-position spine, not redrawn per section (CLAUDE.md §5).
 * It runs the full page height at C2 — the rail boundary and the left edge
 * of the content field.
 *
 * Positioned through the same Container + Grid as the content rather than a
 * calc() offset, so it stays locked to C2 at any viewport width.
 *
 * z-[4] sits above section backgrounds and decor but below Container's
 * z-10, so the line never cuts across text.
 */
export function OrangeSpine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[4] hidden md:block" aria-hidden="true">
      <Container className="z-[4] h-full">
        <Grid className="h-full">
          <div
            className="h-full w-px opacity-55"
            style={{
              gridColumnStart: 3,
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--spine) 0 3px, transparent 3px 7px)",
            }}
          />
        </Grid>
      </Container>
    </div>
  );
}
