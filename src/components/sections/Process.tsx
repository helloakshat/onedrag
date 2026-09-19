import { SectionShell } from "@/components/layout/SectionShell";
import { NumberBadge } from "@/components/ui/NumberBadge";
import { StepIcon } from "@/components/ui/StepIcon";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, ProcessStep } from "@/lib/content";

interface ProcessProps {
  home: HomeContent;
}

function Step({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  return (
    <div className="flex gap-6 md:flex-col md:gap-0 md:pr-8">
      {/* number block + the vertical connector running down to the next step */}
      <div className="relative shrink-0">
        <NumberBadge value={step.number} />
        {!isLast && (
          // Bridges from this badge's bottom (62px) through the list's own
          // row gap (56px = gap-y-14) to the top of the next badge, so the
          // line reads continuous regardless of how tall this step's copy is.
          <span
            aria-hidden="true"
            className="absolute top-[62px] left-1/2 h-[calc(100%-62px+56px)] w-px -translate-x-1/2 md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--border-strong) 0 2px, transparent 2px 5px)",
            }}
          />
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-mono text-label leading-[1.45] text-text-primary uppercase md:mt-[100px]">
          {step.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* connector label and step icon are desktop-only spatial devices */}
        <p className="mt-6 hidden font-mono text-[13px] text-faint uppercase md:block">
          {step.connector} &gt;
        </p>

        <div className="relative mt-6 hidden md:block">
          <StepIcon name={step.icon} />
          {!isLast && (
            // dotted run from this icon across to the next step's icon
            <span
              aria-hidden="true"
              className="absolute top-[22px] left-[52px] h-px w-[calc(100%-52px+2rem)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--border-strong) 0 2px, transparent 2px 5px)",
              }}
            />
          )}
          {!isLast && (
            <span
              aria-hidden="true"
              className="absolute top-[18px] right-0"
              style={{
                width: 0,
                height: 0,
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                borderLeft: "5px solid var(--border-strong)",
              }}
            />
          )}
        </div>

        <p className="mt-3 font-sans text-[16px] leading-[1.5] text-copy md:mt-6">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function Process({ home }: ProcessProps) {
  const { chip, heading, note, steps } = home.process;

  return (
    <SectionShell
      id="process"
      variant="field"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="paper"
      rail={
        <Reveal>
          <p className="font-mono text-label leading-[1.45] text-text-primary uppercase">
            {note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      }
    >
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-4 md:gap-y-0">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.06}>
            <Step step={step} isLast={i === steps.length - 1} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
