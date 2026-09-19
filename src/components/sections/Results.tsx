import { SectionShell } from "@/components/layout/SectionShell";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/lib/content";

interface ResultsProps {
  home: HomeContent;
}

export function Results({ home }: ResultsProps) {
  const { chip, heading, items } = home.results;

  return (
    <SectionShell
      id="results"
      variant="rail"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="paper-alt"
    >
      <div className="relative">
        <p className="absolute -top-2 right-0 hidden font-mono text-[13px] text-faint uppercase md:block">
          01 / 0{items.length}
        </p>

        {items.map((item, i) => (
          <Reveal key={item.description} delay={i * 0.06}>
            {/* items-baseline puts the numeral, label and description on one baseline */}
            <div className="grid min-h-[120px] grid-cols-1 items-baseline gap-4 border-b border-dashed border-grid-line py-6 md:grid-cols-4 md:gap-0 md:py-10">
              <p className="font-sans text-[48px] leading-none font-medium text-text-primary">
                <CountUp value={item.value} suffix={item.suffix} />
              </p>

              <h3 className="font-mono text-label leading-[1.45] text-text-primary uppercase">
                {item.label.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p className="font-sans text-[16px] leading-[1.5] text-copy md:col-span-2">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
