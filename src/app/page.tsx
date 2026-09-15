import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { Disciplines } from "@/components/sections/disciplines";
import { CategoryGrid } from "@/components/sections/category-grid";
import { SparesGrid } from "@/components/sections/spares-grid";
import { PortsChart } from "@/components/sections/ports-chart";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { WhyUs } from "@/components/sections/why-us";
import { LogoWall } from "@/components/sections/logo-wall";
import { Testimonials } from "@/components/sections/testimonials";
import { QuoteCTA } from "@/components/sections/quote-cta";

/**
 * Homepage — the fourteen-section sequence from IMPLEMENTATION.md §4.1.
 * Sections 1, 2 and 14 (utility strip, header, footer) live in the root layout.
 */
export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <ProofBar />
      <Disciplines />
      <CategoryGrid />
      <SparesGrid />
      <PortsChart />
      <ProcessTimeline />
      <WhyUs />
      <LogoWall />
      <Testimonials />
      <QuoteCTA />
    </main>
  );
}
