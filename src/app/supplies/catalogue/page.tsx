import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClasses } from "@/components/ui/button";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { availabilityLabels, supplies, totalItems } from "@/data/supplies";
import { countryCount, ports } from "@/data/ports";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Full Catalogue",
  description:
    "The complete Mishk Overseas supply catalogue — 11 categories and 198 lines with units of issue and availability. Print or download as CSV.",
  alternates: { canonical: "/supplies/catalogue" },
};

/**
 * The whole catalogue on one page, print-optimised.
 *
 * This is the "downloadable catalogue" without shipping a stale PDF: Save as
 * PDF from the browser produces a document generated from live data, so it
 * cannot drift from the site the way a hand-made brochure does. The CSV route
 * covers the case where the buyer wants to paste it into a requisition.
 */
export default function CataloguePage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <div className="print:hidden">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Supplies", href: "/supplies" },
              { label: "Full catalogue" },
            ]}
          />
        </div>

        {/* --- Document header (prints) --------------------------------- */}
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <PlimsollBullet className="size-7 text-brass-500 print:text-black" />
            <span className="font-display text-xl font-semibold print:text-black">
              {site.name}
            </span>
          </div>

          <h1 className="mt-8 text-4xl lg:text-5xl print:text-3xl print:text-black">
            Supply catalogue
          </h1>
          <HairlineRule className="my-6 print:hidden" width="w-20" />

          <p className="measure text-cream-200 print:text-black">
            {supplies.length} categories · {totalItems} lines · delivered to{" "}
            {ports.length} ports across {countryCount} countries. Availability
            is indicative; confirm at enquiry.
          </p>

          <dl className="mt-6 grid gap-x-8 gap-y-2 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4 print:text-black">
            {[
              ["Enquiries", site.email.display],
              ["Supply desk", site.phone.display],
              ["Availability", "In stock · On indent · On request"],
              ["IMPA codes", "Pending catalogue confirmation"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-slate-400 print:text-neutral-600">{k}</dt>
                <dd className="text-cream-200 print:text-black">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <a
              href="/supplies/catalogue.csv"
              download
              className={buttonClasses()}
            >
              Download as CSV
            </a>
            <Link
              href="/quote"
              className={buttonClasses({ variant: "outline" })}
            >
              Request a Quote
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-400 print:hidden">
            To save a PDF, print this page and choose &ldquo;Save as PDF&rdquo;.
          </p>
        </header>

        {/* --- Categories ------------------------------------------------ */}
        <div className="space-y-12">
          {supplies.map((category) => (
            <section
              key={category.slug}
              className="break-inside-avoid print:break-inside-auto"
            >
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-600 pb-3 print:border-neutral-400">
                <h2 className="font-display text-2xl font-semibold print:text-black">
                  {category.name}
                </h2>
                <p className="font-mono text-xs text-slate-400 print:text-neutral-600">
                  {category.items.length} lines · {category.tagline}
                </p>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-600 print:border-neutral-400">
                    <th scope="col" className="eyebrow py-2 pr-4 text-slate-400 print:text-neutral-600">
                      Item
                    </th>
                    <th scope="col" className="eyebrow py-2 pr-4 text-slate-400 print:text-neutral-600">
                      IMPA
                    </th>
                    <th scope="col" className="eyebrow py-2 pr-4 text-slate-400 print:text-neutral-600">
                      Unit
                    </th>
                    <th scope="col" className="eyebrow py-2 text-slate-400 print:text-neutral-600">
                      Availability
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
                    <tr
                      key={item.name}
                      className="border-b border-navy-600/50 print:border-neutral-300"
                    >
                      <th
                        scope="row"
                        className="py-2 pr-4 font-normal text-cream-50 print:text-black"
                      >
                        {item.name}
                      </th>
                      <td className="py-2 pr-4 font-mono text-xs text-slate-400/70 print:text-neutral-600">
                        {item.impaCode ?? "pending"}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs text-cream-200 print:text-black">
                        {item.unit}
                      </td>
                      <td className="py-2 font-mono text-xs text-cream-200 print:text-black">
                        {availabilityLabels[item.availability]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

        <footer className="mt-14 border-t border-navy-600 pt-6 print:border-neutral-400">
          <p className="text-xs text-slate-400 print:text-neutral-600">
            Catalogue information is published in good faith as a guide and is
            not an offer. Confirm specification and availability on the
            quotation before ordering. {site.name} · {site.email.display}
          </p>
        </footer>
      </Container>
    </main>
  );
}
