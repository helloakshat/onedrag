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

const baseClasses =
  "relative inline-flex items-center justify-center whitespace-nowrap px-8 font-mono text-label uppercase transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]";

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12",
  lg: "h-[57px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-raised text-text-primary before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-spine hover:bg-bg-overlay",
  secondary: "bg-dark text-text-on-dark hover:opacity-90",
  accent: "bg-spine text-bg-raised hover:opacity-90",
};

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
        {children}
      </a>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
