import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { site } from "@/data/site";

/** §4.1 #13 — Quote CTA. The last thing before the footer. */
export function QuoteCTA() {
  return (
    <section className="relative overflow-hidden border-t border-navy-600 bg-navy-800">
      <ChartGrid />
      <CompassRose className="absolute -right-24 -top-24 size-[32rem] text-cream-50/[0.05]" />

      <Container className="relative py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4 text-brass-500">Request a quote</p>
          <h2 className="text-4xl lg:text-5xl">
            Vessel inbound? Send us the requisition.
          </h2>
          <HairlineRule className="my-7" width="w-20" />
          <p className="measure text-lg text-cream-200">
            Email it, WhatsApp it, or paste it into the form. Priced line by
            line against your codes and returned within two hours — at any hour.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/quote" className={buttonClasses({ size: "lg" })}>
              Request a Quote
            </Link>
            <a
              href={site.phone.href}
              className={buttonClasses({ variant: "outline", size: "lg" })}
            >
              {site.phone.display}
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-teal-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-teal-500" />
            Quotations returned within 2 hours, 24×7
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
