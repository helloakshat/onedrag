import { Hero } from "@/components/sections/Hero";
import { getHomeContent, getSiteContent } from "@/lib/content";

export default function Home() {
  const site = getSiteContent();
  const home = getHomeContent();

  return <Hero site={site} home={home} />;
}
