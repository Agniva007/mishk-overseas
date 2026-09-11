import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { mailConfigured } from "@/lib/mail";
import { site } from "@/data/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Mishk Overseas supply desk — offices, 24×7 emergency line, email and WhatsApp for ship supply and marine technical services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Get in touch</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">Contact the desk.</h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            For a priced requisition use the quote form — it captures the vessel
            and port detail we need. For anything else, this reaches us just as
            fast.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <Reveal>
              {!mailConfigured && (
                <div className="mb-8 rounded-md border border-rust-500/50 bg-rust-500/10 p-5">
                  <p className="eyebrow mb-1.5 text-rust-300">Form not yet connected</p>
                  <p className="text-sm leading-relaxed text-cream-200">
                    Email delivery is not configured on this deployment. Write
                    to{" "}
                    <a href={site.email.href} className="text-brass-500 hover:text-brass-400">
                      {site.email.display}
                    </a>{" "}
                    or call{" "}
                    <a href={site.phone.href} className="text-brass-500 hover:text-brass-400">
                      {site.phone.display}
                    </a>{" "}
                    meanwhile.
                  </p>
                </div>
              )}
              <ContactForm />
            </Reveal>

            <Reveal delay={80} as="aside" className="space-y-6">
              <div className="rounded-md border border-rust-500/40 bg-rust-500/10 p-6">
                <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-rust-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-rust-500" />
                  24×7 Emergency
                </p>
                <a
                  href={site.emergency.href}
                  className="mt-3 block font-mono text-lg text-cream-50 transition-colors hover:text-brass-500"
                >
                  {site.emergency.display}
                </a>
                <p className="mt-2 text-xs text-cream-200">
                  Vessel alongside and sailing soon — call, do not email.
                </p>
              </div>

              {site.offices.map((office) => (
                <div key={office.label} className="rounded-md border border-navy-600 bg-navy-800 p-6">
                  <p className="eyebrow mb-3 text-teal-300">{office.label}</p>
                  <address className="not-italic text-sm leading-relaxed text-cream-200">
                    {office.lines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="mt-3 block font-mono text-xs text-cream-200 hover:text-brass-500"
                  >
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="block font-mono text-xs text-cream-200 hover:text-brass-500"
                  >
                    {office.email}
                  </a>
                </div>
              ))}

              <div className="rounded-md border border-navy-600 p-6">
                <p className="eyebrow mb-3 text-slate-400">Registration</p>
                <dl className="space-y-2 font-mono text-xs">
                  {[["GST", "Pending"], ["IEC", "Pending"], ["CIN", "Pending"]].map(
                    ([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="text-slate-400">{k}</dt>
                        <dd className="text-cream-200">{v}</dd>
                      </div>
                    ),
                  )}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Registration numbers publish once confirmed by the client.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="panel" eyebrow="Location" title="Find us.">
        <Reveal>
          <div className="flex aspect-[21/9] items-center justify-center rounded-md border border-dashed border-brass-500/35 bg-navy-900">
            <div className="max-w-md px-6 text-center">
              <p className="eyebrow mb-2 text-brass-400">Pending client detail</p>
              <p className="text-sm leading-relaxed text-cream-200">
                An embedded map goes here once the registered office address is
                confirmed. Plotting an unverified address would send drivers and
                couriers to the wrong gate.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
