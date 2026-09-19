"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SectionChip } from "@/components/ui/SectionChip";
import { Crosshair } from "@/components/ui/Crosshair";
import type { SiteContent } from "@/lib/content";

interface NavProps {
  site: SiteContent;
  chip: { number: string; label: string };
}

/**
 * 96px header on the column grid: wordmark at C0, section chip at C2, and
 * the CTA + hamburger closing flush on C6. The bottom rule is edge-to-edge,
 * not container width.
 */
export function Nav({ site, chip }: NavProps) {
  const [open, setOpen] = useState(false);

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
