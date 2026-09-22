"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/layout/SectionShell";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/layout/Grid";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { TopoTexture } from "@/components/ui/TopoTexture";
import type { HomeContent, NavLink, SiteContent } from "@/lib/content";

interface FooterProps {
  /** Chip number — contacts closes each page's sequence, so it differs per route. */
  number: string;
  site: SiteContent;
  home: HomeContent;
  /** The same composed menu the header renders, in the same order. */
  navLinks: NavLink[];
}

const inputClasses =
  "w-full border-0 border-b border-grid-line bg-transparent pb-4 font-mono text-label text-text-primary uppercase placeholder:text-faint focus:border-text-primary focus:outline-none";

export function Footer({ site, home, number, navLinks }: FooterProps) {
  const { chip, heading, email, legalLinks, form, copyright, location } = home.contacts;

  // No form backend — submitting hands off to the Typeform in site.json.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(site.links.getInTouch, "_blank", "noopener,noreferrer");
  };

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
                      <Link
                        href={entry.href}
                        className="font-mono text-label text-text-primary uppercase transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-inout)] hover:opacity-60"
                      >
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:col-span-2">
            <input
              type="text"
              name="name"
              required
              placeholder={form.namePlaceholder}
              aria-label={form.namePlaceholder}
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              required
              placeholder={form.emailPlaceholder}
              aria-label={form.emailPlaceholder}
              className={inputClasses}
            />
            <Button variant="secondary" type="submit" className="w-full">
              {form.submitLabel}
            </Button>
          </form>
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
