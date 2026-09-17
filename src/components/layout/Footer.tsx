import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import type { SiteContent } from "@/lib/content";

interface FooterProps {
  site: SiteContent;
}

/** Placeholder footer — full layout comes later. */
export function Footer({ site }: FooterProps) {
  return (
    <footer className="border-t border-border-subtle bg-bg-base">
      <Container>
        <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="max-w-md font-sans text-body text-text-secondary">{site.footer.text}</p>
          <p className="font-mono text-label text-text-muted uppercase tracking-[0.04em]">
            {site.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
