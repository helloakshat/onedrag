import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { OrangeSpine } from "@/components/layout/OrangeSpine";
import { getSiteContent } from "@/lib/content";
import { getNavLinks } from "@/lib/navigation";
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
const navLinks = getNavLinks();

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
          <Nav site={site} links={navLinks} />
          {/* Each page renders its own <main> and contacts band: chip numbers
              are page order, and contacts closes the sequence (lib/sections). */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
