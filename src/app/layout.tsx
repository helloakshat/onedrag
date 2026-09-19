import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { OrangeSpine } from "@/components/layout/OrangeSpine";
import { getHomeContent, getSiteContent } from "@/lib/content";
import { getCaseStudyIndex } from "@/lib/case-studies";
import type { SectionRef } from "@/components/layout/Nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const site = getSiteContent();
const home = getHomeContent();

/**
 * Page order, for the header scroll-spy chip. Numbers and labels stay in
 * content/ (CLAUDE.md §4); only the DOM ids live here. 05 comes from the
 * case-study index rather than home.json.
 */
const sections: SectionRef[] = [
  { id: "intro", ...home.hero.chip },
  { id: "services", ...home.services.chip },
  { id: "process", ...home.process.chip },
  { id: "results", ...home.results.chip },
  { id: "work", ...getCaseStudyIndex().chip },
  { id: "industries", ...home.industries.chip },
  { id: "value", ...home.value.chip },
  { id: "testimonials", ...home.testimonials.chip },
  { id: "faq", ...home.faq.chip },
  { id: "contacts", ...home.contacts.chip },
];

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <OrangeSpine />
        <SmoothScroll>
          <Nav site={site} sections={sections} />
          <main className="flex-1">{children}</main>
          <Footer site={site} home={home} />
        </SmoothScroll>
      </body>
    </html>
  );
}
