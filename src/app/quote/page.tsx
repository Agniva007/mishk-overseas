import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { mailConfigured } from "@/lib/mail";
import { site } from "@/data/site";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Send your requisition to the 24×7 supply desk. Priced line by line against your codes and returned within two hours, at any hour.",
  alternates: { canonical: "/quote" },
};

const ASSURANCES = [
  {
    title: "Quoted within two hours",
    body: "Any hour, any day. If your requisition arrives at 03:00 it is priced by 05:00.",
  },
  {
    title: "Priced line by line",
    body: "Against your own codes, with lead time stated per line. Nothing bundled.",
  },
  {
    title: "No silent substitution",
    body: "If we cannot supply exactly what you asked for, we say so and offer an alternative — we do not swap it quietly.",
  },
];

export default function QuotePage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">24×7 supply desk</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            Send us the requisition.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            Paste it, attach it, or just tell us the vessel and the port and we
            will come back with questions. Whatever format your purchasing
            system produces is fine.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            {/* --- Form ------------------------------------------------ */}
            <Reveal>
              {/* Honest about configuration state — a form that cannot send
                  must say so before the buyer types, not after. */}
              {!mailConfigured && (
                <div className="mb-8 rounded-md border border-rust-500/50 bg-rust-500/10 p-5">
                  <p className="eyebrow mb-1.5 text-rust-300">
                    Form not yet connected
                  </p>
                  <p className="text-sm leading-relaxed text-cream-200">
                    Email delivery is not configured on this deployment, so this
                    form cannot send yet. Use{" "}
                    <a
                      href={site.email.href}
                      className="text-brass-500 hover:text-brass-400"
                    >
                      {site.email.display}
                    </a>{" "}
                    or{" "}
                    <a
                      href={site.phone.href}
                      className="text-brass-500 hover:text-brass-400"
                    >
                      {site.phone.display}
                    </a>{" "}
                    meanwhile. Set <code className="font-mono text-xs">RESEND_API_KEY</code>{" "}
                    and <code className="font-mono text-xs">MAIL_TO</code> to enable it.
                  </p>
                </div>
              )}
              <QuoteForm />
            </Reveal>

            {/* --- Reassurance panel ----------------------------------- */}
            <Reveal delay={80} as="aside">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-md border border-navy-600 bg-navy-800 p-6">
                  <p className="eyebrow mb-4 text-brass-500">What happens next</p>
                  <ul className="space-y-5">
                    {ASSURANCES.map((a) => (
                      <li key={a.title} className="flex items-start gap-3">
                        <PlimsollBullet className="mt-0.5 size-4 shrink-0 text-brass-500" />
                        <div>
                          <p className="text-sm font-semibold text-cream-50">
                            {a.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">
                            {a.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-rust-500/40 bg-rust-500/10 p-6">
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-rust-300">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-rust-500" />
                    Vessel sailing soon?
                  </p>
                  <p className="mt-3 text-sm text-cream-200">
                    Call the desk rather than using the form.
                  </p>
                  <a
                    href={site.emergency.href}
                    className="mt-3 block font-mono text-lg text-cream-50 transition-colors hover:text-brass-500"
                  >
                    {site.emergency.display}
                  </a>
                </div>

                <div className="rounded-md border border-navy-600 p-6">
                  <p className="eyebrow mb-3 text-slate-400">Or email it</p>
                  <a
                    href={site.email.href}
                    className="block font-mono text-sm text-cream-200 transition-colors hover:text-brass-500"
                  >
                    {site.email.display}
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block font-mono text-sm text-teal-300 transition-colors hover:text-brass-500"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
