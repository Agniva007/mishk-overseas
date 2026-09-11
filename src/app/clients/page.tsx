import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PendingPanel } from "@/components/catalogue/pending-panel";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { Testimonials } from "@/components/sections/testimonials";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { clients } from "@/data/home";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description:
    "Shipping lines, operators and managers supplied by Mishk Overseas, and the principals whose products we carry.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Clients" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Trusted by</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            Clients &amp; partners.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            Client names and marks are published only with written permission,
            which is why this page is shorter than the fleet we supply.
          </p>
        </Container>
      </section>

      <Section eyebrow="Fleets" title="Operators we supply.">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-navy-600 bg-navy-600 sm:grid-cols-4">
          {clients.map((name, i) => (
            <Reveal key={name} as="li" delay={(i % 4) * 50}>
              <div className="flex h-28 items-center justify-center bg-navy-800 px-4 transition-colors duration-200 hover:bg-navy-700">
                <span className="text-center font-display text-lg font-semibold tracking-tight text-slate-400">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={200}>
          <PendingPanel
            className="mt-8"
            title="Client names and logos not yet published"
            body="These are placeholder wordmarks. Naming a shipping line as a customer requires their written permission, and claiming one without it is both a false statement and a commercial risk. Real names and marks publish once the client supplies them with permissions — see ASSETS.md §6."
          />
        </Reveal>
      </Section>

      <Testimonials />

      <Section eyebrow="Principals" title="Brands we carry.">
        <Reveal>
          <PendingPanel
            title="Principal and brand partnerships not yet published"
            body="Claiming to be an authorised distributor for a lubricant or coatings manufacturer is a claim that manufacturer can dispute. Partnerships publish once the client confirms which are current and supplies the permissions."
          />
        </Reveal>
      </Section>

      <QuoteCTA />
    </main>
  );
}
