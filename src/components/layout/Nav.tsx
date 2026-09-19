"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SectionChip } from "@/components/ui/SectionChip";
import { Crosshair } from "@/components/ui/Crosshair";
import type { SiteContent } from "@/lib/content";

export interface SectionRef {
  /** DOM id of the section element on the page. */
  id: string;
  number: string;
  label: string;
}

interface NavProps {
  site: SiteContent;
  /** In page order — the header chip tracks whichever one holds the viewport midpoint. */
  sections: SectionRef[];
}

/**
 * A zero-height root line at the viewport midpoint: a section "wins" the
 * chip the moment it crosses the middle of the screen. Because the observed
 * sections are contiguous, at most one is intersecting at a time.
 */
function useSectionSpy(sections: SectionRef[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const key = ids.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Gaps between observed sections (e.g. the trusted-by strip) leave
          // nothing intersecting — hold the last value rather than clearing.
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}

/**
 * 96px header on the column grid: wordmark at C0, section chip at C2, and
 * the CTA + hamburger closing flush on C6. The bottom rule is edge-to-edge,
 * not container width.
 */
export function Nav({ site, sections }: NavProps) {
  const [open, setOpen] = useState(false);
  const activeId = useSectionSpy(sections);
  const chip = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-paper">
      <Container>
        <Grid className="h-24 items-center">
          <Link href="/" aria-label="Onedrag home" className="col-start-1 self-center">
            <Logo />
          </Link>

          <div className="col-start-3 hidden self-center md:block">
            <SectionChip number={chip.number} label={chip.label} />
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
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-[45px] w-[45px] shrink-0 items-center justify-center bg-dark text-text-on-dark"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </Grid>
      </Container>

      {open && (
        <div className="border-t border-border-subtle bg-paper">
          <Container>
            <nav className="flex flex-col gap-1 py-6">
              {site.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-label text-text-secondary uppercase transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
