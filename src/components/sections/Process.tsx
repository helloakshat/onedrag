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
    <div className="flex flex-col pr-8">
      <NumberBadge value={step.number} />

      <h3 className="mt-[100px] font-mono text-label leading-[1.45] text-text-primary uppercase">
        {step.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="mt-6 font-mono text-[13px] text-faint uppercase">{step.connector} &gt;</p>

      <div className="relative mt-6">
        <StepIcon name={step.icon} />
        {!isLast && (
          // dotted run from this icon across to the next step's icon
          <span
            aria-hidden="true"
            className="absolute top-[22px] left-[52px] hidden h-px w-[calc(100%-52px+2rem)] md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--border-strong) 0 2px, transparent 2px 5px)",
            }}
          />
        )}
        {!isLast && (
          <span
            aria-hidden="true"
            className="absolute top-[18px] right-0 hidden md:block"
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

      <p className="mt-6 font-sans text-[16px] leading-[1.5] text-copy">{step.description}</p>
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
