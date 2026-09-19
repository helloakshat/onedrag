import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { GridLines } from "@/components/layout/GridLines";
import { GridCrosshairs, type CrosshairMark } from "@/components/layout/GridCrosshairs";
import { SectionChip } from "@/components/ui/SectionChip";
import { Reveal } from "@/components/ui/Reveal";
import { HeadingReveal } from "@/components/ui/HeadingReveal";

type SectionVariant = "rail" | "field";
type SectionBackground = "paper" | "paper-alt" | "white" | "dark";

interface SectionShellProps {
  variant: SectionVariant;
  number: string;
  label: string;
  /** Omit when the section places its own heading in the content field. */
  heading?: ReactNode;
  bg?: SectionBackground;
  /** Extra rail content — sits under the chip/heading on "rail", fills the empty rail on "field". */
  rail?: ReactNode;
  /** Decorative background layer (e.g. TopoTexture), behind the content. */
  decor?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  /** The contacts block is the page footer, but shares this layout. */
  as?: "section" | "footer";
  crosshairs?: CrosshairMark[];
}

const bgClasses: Record<SectionBackground, string> = {
  paper: "bg-paper text-text-primary",
  "paper-alt": "bg-paper-alt text-text-primary",
  white: "bg-bg-raised text-text-primary",
  dark: "bg-dark text-text-on-dark",
};

/**
 * Every section below the hero renders through this shell (CLAUDE.md §5).
 *
 * variant="rail"  — chip + heading sit in the rail (C0→C2), content fills C2→C6.
 * variant="field" — rail is free for supporting copy; chip + heading + content all start at C2.
 */
export function SectionShell({
  variant,
  number,
  label,
  heading,
  bg = "paper",
  rail,
  decor,
  children,
  className,
  id,
  as: Tag = "section",
  crosshairs,
}: SectionShellProps) {
  const isDark = bg === "dark";

  const headingNode = heading ? (
    <HeadingReveal delay={0.06}>
      <h2
        // max-width keeps a rail heading inside the rail — it must never
        // cross the spine at C2.
        className={cn(
          "max-w-[var(--rail-heading-max)] font-sans text-h2 leading-[1.05] font-medium tracking-[-0.05em]",
          isDark ? "text-text-on-dark" : "text-text-primary",
        )}
      >
        {heading}
      </h2>
    </HeadingReveal>
  ) : null;

  const chipNode = (
    <Reveal>
      <SectionChip number={number} label={label} onDark={isDark} />
    </Reveal>
  );

  return (
    <Tag
      id={id}
      className={cn("relative border-b border-grid-line-solid", bgClasses[bg], className)}
    >
      {decor}
      <GridLines />
      <GridCrosshairs marks={crosshairs} />

      <Container className="py-20 md:py-[140px]">
        <Grid>
          {variant === "rail" ? (
            <>
              <div className="col-span-6 md:col-span-2">
                {chipNode}
                {headingNode ? <div className="mt-8">{headingNode}</div> : null}
                {rail ? <div className="mt-16">{rail}</div> : null}
              </div>
              <div className="col-span-6 mt-12 md:col-span-4 md:col-start-3 md:mt-0">
                {children}
              </div>
            </>
          ) : (
            <>
              {rail ? (
                <div className="col-span-6 md:col-span-2 md:col-start-1 md:row-span-2 md:self-center">
                  {rail}
                </div>
              ) : null}
              <div className="col-span-6 md:col-span-2 md:col-start-3 md:row-start-1">
                {chipNode}
                {headingNode ? <div className="mt-8">{headingNode}</div> : null}
              </div>
              <div className="col-span-6 mt-12 md:col-span-4 md:col-start-3 md:row-start-2 md:mt-16">
                {children}
              </div>
            </>
          )}
        </Grid>
      </Container>
    </Tag>
  );
}
