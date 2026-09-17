"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import type { SiteContent } from "@/lib/content";

interface NavProps {
  site: SiteContent;
}

/** ONEDRAG wordmark left, "Book a call" button right, hamburger panel on mobile. Sits on a 1px rule. */
export function Nav({ site }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-base">
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="Onedrag home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-label text-text-secondary uppercase tracking-[0.04em] transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={site.links.bookCall} external variant="primary">
              Book a call
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center text-text-primary md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border-subtle bg-bg-base md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {site.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-label text-text-secondary uppercase tracking-[0.04em]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <Button href={site.links.bookCall} external variant="primary" className="w-full">
                  Book a call
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
