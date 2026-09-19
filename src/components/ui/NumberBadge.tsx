import { cn } from "@/lib/utils";

interface NumberBadgeProps {
  value: string;
  className?: string;
}

/** White 62×62 block: an accent dot followed by the step digits. */
export function NumberBadge({ value, className }: NumberBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[62px] w-[62px] items-center justify-center bg-bg-raised font-mono text-[22px] text-dark",
        className,
      )}
    >
      <span className="text-spine">.</span>
      {value}
    </span>
  );
}
