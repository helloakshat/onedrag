import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Right-to-left marquee, paused on hover. The track renders its children
 * twice and translates -50%, which makes the loop seamless. Reduced motion
 * is handled globally in globals.css.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
