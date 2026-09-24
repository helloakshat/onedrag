"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";

interface CalEmbedProps {
  /** cal.com path, e.g. "helloakshat/book" — derived from site.links.bookCall. */
  calLink: string;
  className?: string;
}

const NAMESPACE = "book";

/**
 * Inline cal.com booker for the contacts band.
 *
 * The script is third party and the band closes the page, so nothing loads
 * until the reader is within 600px of it — the embed costs nothing on first
 * paint, which is what keeps the §11 performance gate reachable.
 *
 * Its chrome is an iframe we cannot style: the booker's own corners stay
 * rounded despite the zero-radius rule (CLAUDE.md §2). The container around
 * it is square, and the brand colour is read from --spine rather than
 * restated here.
 */
export function CalEmbed({ calLink, className }: CalEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInRange(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inRange) return;

    let cancelled = false;
    (async () => {
      const api = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      const spine = getComputedStyle(document.documentElement)
        .getPropertyValue("--spine")
        .trim();
      // cal-bg is not honoured by the embed, so the booker keeps its own
      // #171717 surface — --cal-surface matches it on our side instead.
      const vars: Record<string, string> = spine ? { "cal-brand": spine } : {};
      api("ui", {
        // pinned so the surrounding surface can match it — otherwise the
        // booker follows each viewer's system preference and the seam shows
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        // the type requires both themes; the booker is pinned dark either way
        cssVarsPerTheme: { light: vars, dark: vars },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [inRange]);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {inRange ? (
        <Cal
          namespace={NAMESPACE}
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" }}
        />
      ) : null}
    </div>
  );
}
