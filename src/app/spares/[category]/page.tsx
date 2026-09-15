import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { SparesTable } from "@/components/catalogue/spares-table";
import { Photo } from "@/components/media/photo";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { getSpares, spares } from "@/data/spares";

export function generateStaticParams() {
  return spares.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/spares/[category]">): Promise<Metadata> {
  const { category } = await params;
  const data = getSpares(category);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: `/spares/${data.slug}` },
  };
}

export default async function SparesCategoryPage({
  params,
}: PageProps<"/spares/[category]">) {
  const { category } = await params;
  const data = getSpares(category);
  if (!data) notFound();

  const related = data.related
    .map((slug) => getSpares(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const exStock = data.items.filter((i) => i.availability === "stock").length;

  return (
    <main id="main" className="flex-1">
      {/* --- Hero -------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Spares", href: "/spares" },
              { label: data.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <p className="eyebrow mb-4 text-brass-500">{data.tagline}</p>
              <h1 className="text-4xl lg:text-6xl">{data.name}</h1>
              <HairlineRule className="my-7" width="w-20" />
              <div className="measure space-y-4">
                {data.description.map((p) => (
                  <p key={p.slice(0, 24)} className="text-cream-200">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Badge tone="brass">{data.items.length} lines</Badge>
                <Badge tone="teal" dot>
                  {exStock} ex-stock
                </Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className={buttonClasses()}>
                  Send a spares enquiry
                </Link>
                <Link href="/ports" className={buttonClasses({ variant: "outline" })}>
                  Where we deliver
                </Link>
              </div>
            </div>

            <Photo
              id={data.photo}
              ratio="portrait"
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="rounded-md border border-navy-600"
            />
          </div>
        </Container>
      </section>

      {/* --- Makers ------------------------------------------------------ */}
      <Section eyebrow="Makes" title="Equipment we source for.">
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {data.makers.map((m) => (
              <li
                key={m}
                className="rounded-sm border border-navy-600 bg-navy-800 px-3.5 py-2 font-mono text-sm text-cream-200"
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={70}>
          <p className="mt-5 font-mono text-xs leading-relaxed text-slate-400">
            Independent trader — listing a make is not a claim of authorised
            distributorship. Other makes sourced on request.
          </p>
        </Reveal>
      </Section>

      {/* --- Parts list -------------------------------------------------- */}
      <Section
        tone="panel"
        eyebrow="Parts list"
        title={`${data.name} — what we quote`}
        lede="Search by part or assembly, or filter by availability. Anything not listed is sourced against the nameplate."
      >
        <Reveal>
          <SparesTable items={data.items} categoryName={data.name} />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 rounded-md border border-brass-500/30 bg-brass-500/[0.06] px-5 py-4 text-sm leading-relaxed text-cream-200">
            <strong className="font-semibold text-brass-400">
              No part numbers are published.
            </strong>{" "}
            A maker part number is only meaningful against the nameplate it
            belongs to, and a wrong one is something a purchaser would order
            against. Send the maker, type, serial number and the number from
            your manual, and we quote to it.
          </p>
        </Reveal>
      </Section>

      {/* --- Sourcing notes ---------------------------------------------- */}
      <Section eyebrow="Sourcing" title="How this category is quoted.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.sourcing.map((q, i) => (
            <Reveal key={q.title} delay={(i % 3) * 60}>
              <div className="flex h-full items-start gap-4 rounded-md border border-navy-600 bg-navy-800 p-6">
                <PlimsollBullet className="mt-0.5 size-5 shrink-0 text-brass-500" />
                <div>
                  <h3 className="text-base font-semibold text-cream-50">
                    {q.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {q.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- Related ------------------------------------------------------ */}
      {related.length > 0 && (
        <Section tone="panel" eyebrow="Related" title="Often ordered alongside.">
          <ul className="grid gap-5 sm:grid-cols-3">
            {related.map((c, i) => (
              <Reveal key={c.slug} as="li" delay={i * 60}>
                <Link
                  href={`/spares/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-900 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                >
                  <Photo id={c.photo} ratio="wide" sizes="(min-width: 640px) 33vw, 100vw" />
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-cream-50">{c.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{c.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <QuoteCTA />
    </main>
  );
}
