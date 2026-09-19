import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { OrangeSpine } from "@/components/layout/OrangeSpine";
import { getHomeContent, getSiteContent } from "@/lib/content";
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
 * The header chip tracks the section holding the viewport midpoint, read
 * off the DOM so each route supplies its own sequence (see Nav). This is
 * only what renders on the server, before that resolves.
 */
const defaultChip = { id: "intro", ...home.hero.chip };

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
          <Nav site={site} defaultChip={defaultChip} />
          <main className="flex-1">{children}</main>
          <Footer site={site} home={home} />
        </SmoothScroll>
      </body>
    </html>
  );
}
