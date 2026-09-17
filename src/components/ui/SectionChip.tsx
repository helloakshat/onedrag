import { cn } from "@/lib/utils";

interface SectionChipProps {
  number: string;
  label: string;
  className?: string;
}

/** Two-block section marker, e.g. "01 / INTRO". No gap between blocks — they read as one object. */
export function SectionChip({ number, label, className }: SectionChipProps) {
  return (
    <div
      className={cn(
        "inline-flex h-[31px] items-stretch font-mono text-label uppercase tracking-[0.04em]",
        className,
      )}
    >
      <span className="flex w-[31px] shrink-0 items-center justify-center bg-accent text-text-on-dark">
        {number}
      </span>
      <span className="flex items-center bg-border-subtle pt-0 pr-3 pb-0 pl-[10px] text-text-primary">
        / {label}
      </span>
    </div>
  );
}
