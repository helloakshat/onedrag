import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Our fluid type scale uses custom names (text-h2, text-label, …). Without
 * this, tailwind-merge classifies them as text *colours* and silently drops
 * them when merged alongside a real colour like text-text-primary.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "body-lg", "body", "label", "tile"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * "https://cal.com/helloakshat/book" -> "helloakshat/book".
 *
 * The embed addresses a booking page by path while every CTA links to the
 * full URL, so both read from the one `links.bookCall` key (CLAUDE.md §9)
 * rather than the path being restated in content.
 */
export function calLinkFrom(bookCallUrl: string): string {
  return bookCallUrl.replace(/^https?:\/\/(app\.)?cal\.com\//, "").replace(/\/$/, "");
}
