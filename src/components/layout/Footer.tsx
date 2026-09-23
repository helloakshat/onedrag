"use client";

import Link from "next/link";
import { SectionShell } from "@/components/layout/SectionShell";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { TopoTexture } from "@/components/ui/TopoTexture";
import { SplitLines } from "@/components/ui/SplitLines";
import type { HomeContent, NavLink, SiteContent } from "@/lib/content";

interface FooterProps {
  /** Chip number — contacts closes each page's sequence, so it differs per route. */
  number: string;
  site: SiteContent;
  home: HomeContent;
  /** The same composed menu the header renders, in the same order. */
  navLinks: NavLink[];
}

export function Footer({ site, home, number, navLinks }: FooterProps) {
  const { chip, heading, email, legalLinks, booking, copyright, location } = home.contacts;

  return (
    <>
      <SectionShell
        as="footer"
        id="contacts"
        variant="rail"
        number={number}
        label={chip.label}
        bg="paper"
        decor={
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] opacity-50">
            <TopoTexture />
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 border-b border-dashed border-grid-line pb-6 md:grid-cols-4 md:gap-0">
          <a
            href={`mailto:${email}`}
            className="font-mono text-label text-text-primary uppercase md:col-span-3"
          >
            {email}
          </a>
          <div className="flex gap-6">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="font-mono text-label text-text-primary uppercase transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-inout)] hover:opacity-60"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
          <div className="md:col-span-2 md:pr-8">
            <h2 className="font-sans text-h2 leading-[1.05] font-medium tracking-[-0.05em] text-text-primary">
              {heading}
            </h2>

            <div className="mt-14 flex flex-col gap-8 md:flex-row md:gap-16">
              {/* first column is the menu itself, same array and same order
                  as the header (CLAUDE.md §4); second is legal-only copy */}
              {[navLinks, legalLinks].map((column, i) => (
                <ul key={i} className="flex flex-col gap-3">
                  {column.map((entry) => (
                    <li key={entry.href}>
                      {entry.comingSoon ? (
                        // same rule as the menu: shown, muted, not a link
                        <span className="font-mono text-label text-faint uppercase">
                          {entry.label}
                        </span>
                      ) : (
                        <Link
                          href={entry.href}
                          className="font-mono text-label text-text-primary uppercase transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-inout)] hover:opacity-60"
                        >
                          {entry.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* There is no form and no form backend — booking is the only
              path in, so the right half of the band is the booking slot. */}
          <div className="flex flex-col justify-between gap-10 md:col-span-2">
            <p className="font-mono text-label leading-[1.45] text-text-primary uppercase">
              <SplitLines lines={booking.note} />
            </p>

            {/* TODO: replace — the cal.com embed goes here; until the booking
                URL is supplied this falls back to the button. */}
            <Button href={site.links.bookCall} external variant="secondary" className="w-full">
              {booking.ctaLabel}
            </Button>
          </div>
        </div>
      </SectionShell>

      <div className="relative bg-paper">
        <Container>
          {/* stacked wordmark / copyright / location on mobile; the desktop row is untouched */}
          <Grid className="items-center py-8 md:h-22 md:py-0">
            <div className="col-span-6 md:col-span-1 md:col-start-1">
              <Logo />
            </div>
            <p className="col-span-6 mt-4 font-mono text-[13px] text-faint uppercase md:col-span-2 md:col-start-3 md:mt-0">
              {copyright}
            </p>
            <p className="col-span-6 mt-4 font-mono text-[13px] text-faint uppercase md:col-start-6 md:mt-0">
              {location}
            </p>
          </Grid>
        </Container>
      </div>
    </>
  );
}
