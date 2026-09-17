import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full px-[var(--grid-gutter)]",
        className,
      )}
      style={{ maxWidth: "var(--grid-max-width)" }}
    >
      {children}
    </div>
  );
}
