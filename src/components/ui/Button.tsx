import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent";
type ButtonSize = "md" | "lg";

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// overflow-hidden keeps the arrow clipped to the button while it slides in.
const baseClasses =
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap px-8 font-mono text-label uppercase transition-colors duration-[var(--dur-hover)] ease-[var(--ease-inout)]";

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12",
  lg: "h-[57px]",
};

/**
 * Every variant fills --spine with white text on hover (CLAUDE.md §2 keeps
 * orange as a mark at rest; the fill is a hover-only state).
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-raised text-text-primary before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-spine hover:bg-spine hover:text-text-on-fill",
  secondary: "bg-dark text-text-on-fill hover:bg-spine hover:text-text-on-fill",
  accent: "bg-spine text-text-on-fill hover:bg-accent-hover",
};

/**
 * Arrow slides in from the left ahead of the label, pushing the label ~20px
 * right. Pure CSS group-hover so Button stays a server component.
 */
function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center">
      <span
        aria-hidden="true"
        className="absolute left-0 -translate-x-3 opacity-0 transition-[opacity,transform] duration-[var(--dur-hover)] ease-[var(--ease-inout)] group-hover:translate-x-0 group-hover:opacity-100"
      >
        &rarr;
      </span>
      <span className="transition-transform duration-[var(--dur-hover)] ease-[var(--ease-inout)] group-hover:translate-x-5">
        {children}
      </span>
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "lg",
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as ButtonAsLink;
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...anchorRest}
      >
        <ButtonLabel>{children}</ButtonLabel>
      </a>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      <ButtonLabel>{children}</ButtonLabel>
    </button>
  );
}
