import { cn } from "@/lib/utils";

interface SectionChipProps {
  number: string;
  label: string;
  /** On dark bands the label block goes translucent white instead of grey. */
  onDark?: boolean;
  className?: string;
}

/** Two blocks touching, zero gap: a 33×33 accent square, then the label block. */
export function SectionChip({ number, label, onDark = false, className }: SectionChipProps) {
  return (
    <div
      className={cn("inline-flex h-[33px] items-stretch font-mono text-label uppercase", className)}
    >
      <span className="flex w-[33px] shrink-0 items-center justify-center bg-spine text-text-on-dark">
        {number}
      </span>
      <span
        className={cn(
          "flex items-center pt-0 pr-3 pb-0 pl-[10px]",
          onDark ? "bg-white/12 text-text-on-dark" : "bg-border-subtle text-text-primary",
        )}
      >
        {label}
      </span>
    </div>
  );
}
