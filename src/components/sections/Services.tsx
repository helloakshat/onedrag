import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { FounderNote } from "@/components/ui/FounderNote";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SplitCell } from "@/components/ui/SplitCell";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, SiteContent } from "@/lib/content";

interface ServicesProps {
  site: SiteContent;
  home: HomeContent;
}

export function Services({ site, home }: ServicesProps) {
  const { chip, heading, note, items, moreLabel, ctaLabel, ctaHref } = home.services;

  return (
    <SectionShell
      id="services"
      variant="rail"
      number={chip.number}
      label={chip.label}
      heading={heading}
      bg="paper"
      rail={
        <Reveal>
          <FounderNote name={site.founder.name} role={site.founder.role} message={note} />
        </Reveal>
      }
    >
      <div className="grid grid-cols-2">
        {items.map((item, i) => (
          <SplitCell
            key={item.description}
            icon={<ServiceIcon name={item.icon} />}
            title={item.title}
            description={item.description}
            index={i}
            total={items.length}
            href={item.href}
          />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
        <p className="font-mono text-label text-text-primary uppercase md:col-span-2">
          <span className="text-spine">+</span> {moreLabel}
        </p>

        <div className="md:col-span-2 md:col-start-3">
          {/* TODO: replace — point at /services once the index page exists. */}
          <Button href={ctaHref} variant="secondary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
