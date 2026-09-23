"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SectionChip } from "@/components/ui/SectionChip";
import { Crosshair } from "@/components/ui/Crosshair";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { cn } from "@/lib/utils";
import type { NavLink, SiteContent } from "@/lib/content";

export interface SectionRef {
  /** DOM id of the section element on the page. */
  id: string;
  number: string;
  label: string;
}

interface NavProps {
  site: SiteContent;
  /** Composed on the server from site.json + content/services — see lib/navigation. */
  links: NavLink[];
}

/**
 * The observed sections are read off the DOM — every section carries its
 * own chip as data attributes (see SectionShell) — so the header tracks
 * whatever page is mounted without the layout holding a per-page list.
 *
 * A zero-height root line at the viewport midpoint: a section "wins" the
 * chip the moment it crosses the middle of the screen. Because the observed
 * sections are contiguous, at most one is intersecting at a time.
 *
 * The chip starts empty and stays empty while the first section — the hero,
 * which carries a chip of its own — holds the midpoint. Two identical chips
 * stacked at the top of the page read as a rendering fault, so the header
 * only picks the sequence up once the hero is scrolled past, and drops it
 * again on the way back up.
 */
function useSectionSpy() {
  const pathname = usePathname();
  const [chip, setChip] = useState<SectionRef | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chip-number]"));
    if (els.length === 0) return;

    const chipFor = (el: HTMLElement): SectionRef => ({
      id: el.id,
      number: el.dataset.chipNumber ?? "",
      label: el.dataset.chipLabel ?? "",
    });

    const hero = els[0];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Gaps between observed sections (e.g. the trusted-by strip) leave
          // nothing intersecting — hold the last value rather than clearing.
          if (!entry.isIntersecting) continue;
          setChip(entry.target === hero ? null : chipFor(entry.target as HTMLElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return chip;
}

/**
 * 96px header on the column grid: wordmark at C0, section chip at C2, and
 * the CTA + hamburger closing flush on C6. The bottom rule is edge-to-edge,
 * not container width.
 */
const MENU_ID = "main-menu";

export function Nav({ site, links }: NavProps) {
  const [open, setOpen] = useState(false);
  const chip = useSectionSpy();
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // The panel overlays the page, so it has to give the page back: a click
  // anywhere outside it, Escape, a menu item, or a route change all close it.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // A route change closes it without pulling focus — the new page owns that.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => {
    setOpen(false);
    // focus goes back to the control that opened it, not to the top of the page
    triggerRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-paper">
      <Container>
        <Grid className="h-24 items-center">
          <Link href="/" aria-label="Onedrag home" className="col-start-1 self-center">
            <Logo />
          </Link>

          <div className="col-start-3 hidden self-center md:block">
            {/* empty until the hero is scrolled past — see useSectionSpy */}
            {chip ? <SectionChip number={chip.number} label={chip.label} /> : null}
          </div>

          <div className="col-start-5 col-span-2 flex items-center justify-end self-center">
            <div className="relative">
              <Crosshair className="absolute -top-3.5 left-0" />
              <Button
                href={site.links.bookCall}
                external
                variant="primary"
                size="md"
                className="before:hidden"
              >
                Book a call
              </Button>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-[45px] w-[45px] shrink-0 items-center justify-center transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] motion-reduce:transition-none",
                open ? "bg-spine text-text-on-fill" : "bg-dark text-text-on-dark",
              )}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </Grid>
      </Container>

      <MenuOverlay
        id={MENU_ID}
        open={open}
        links={links}
        onNavigate={() => setOpen(false)}
        panelRef={panelRef}
      />
    </header>
  );
}
