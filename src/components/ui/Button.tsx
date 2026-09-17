import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
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
  "relative inline-flex h-[57px] items-center justify-center whitespace-nowrap px-8 font-mono text-label uppercase tracking-[0.04em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-raised text-text-primary before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-accent hover:bg-bg-overlay",
  secondary: "bg-surface-dark text-text-on-dark hover:opacity-90",
};

export function Button({ children, variant = "primary", className, ...rest }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

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
