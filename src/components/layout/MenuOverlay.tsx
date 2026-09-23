"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/content";

interface MenuOverlayProps {
  /** Matches the trigger's aria-controls. */
  id: string;
  open: boolean;
  links: NavLink[];
  onNavigate: () => void;
  panelRef: RefObject<HTMLElement | null>;
}

/**
 * Overlay dropdown, anchored under the header's bottom rule with its right
 * edge on the container's — the same edge the hamburger closes on.
 *
 * The wrapper is absolute so nothing below the header moves when it opens,
 * and it spans the full width only to carry the Container; pointer events are
 * handed to the panel alone so the page stays clickable around it.
 *
 * The panel is always in the DOM — its links are in the server HTML — and is
 * hidden with `visibility`, which also takes it out of the tab order rather
 * than leaving focusable items behind an invisible panel.
 */
export function MenuOverlay({ id, open, links, onNavigate, panelRef }: MenuOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full">
      <Container>
        <div className="flex justify-end">
          <nav
            ref={panelRef as RefObject<HTMLElement>}
            id={id}
            aria-label="Main menu"
            aria-hidden={!open}
            className={cn(
              "pointer-events-auto w-max max-w-[calc(100vw_-_2_*_var(--grid-gutter))] bg-dark px-8 py-8",
              "transition-[opacity,transform,visibility] duration-[var(--dur-fast)] ease-[var(--ease-out)] motion-reduce:transition-none",
              open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
            )}
          >
            <ul className="flex flex-col gap-7">
              {links.map((link) => (
                <li key={link.href}>
                  {link.comingSoon ? (
                    // no href, not focusable — the page does not exist yet
                    <span className="block font-mono text-label whitespace-nowrap text-faint uppercase">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      tabIndex={open ? undefined : -1}
                      className="block font-mono text-label whitespace-nowrap text-text-on-fill uppercase transition-colors duration-[var(--dur-hover)] ease-[var(--ease-inout)] hover:text-spine focus-visible:text-spine focus-visible:outline-none motion-reduce:transition-none"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}
