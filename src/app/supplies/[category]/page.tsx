import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { ItemTable } from "@/components/catalogue/item-table";
import { Photo } from "@/components/media/photo";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { getCategory, supplies } from "@/data/supplies";

export function generateStaticParams() {
  return supplies.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/supplies/[category]">): Promise<Metadata> {
  const { category } = await params;
  const data = getCategory(category);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: `/supplies/${data.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/supplies/[category]">) {
  const { category } = await params;
  const data = getCategory(category);
  if (!data) notFound();

  const related = data.related
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const inStock = data.items.filter((i) => i.availability === "stock").length;

  return (
    <main id="main" className="flex-1">
      {/* --- Compact hero ----------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Supplies", href: "/supplies" },
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
                  {inStock} in stock
                </Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className={buttonClasses()}>
                  Request a Quote
                </Link>
                <Link
                  href="/ports"
                  className={buttonClasses({ variant: "outline" })}
                >
                  Where we deliver
                </Link>
              </div>
            </div>

            <Photo
              id={data.slug}
              ratio="portrait"
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="rounded-md border border-navy-600"
            />
          </div>
        </Container>
      </section>

      {/* --- Item table -------------------------------------------------- */}
      <Section
        eyebrow="Catalogue"
        title={`${data.name} — item list`}
        lede="Search by item or unit, or filter by availability. Lines not listed are sourced to order against your codes."
      >
        <Reveal>
          <ItemTable items={data.items} categoryName={data.name} />
        </Reveal>

        {/* Honest about the one column that is not yet populated. */}
        <Reveal delay={80}>
          <p className="mt-6 rounded-md border border-brass-500/30 bg-brass-500/[0.06] px-5 py-4 text-sm leading-relaxed text-cream-200">
            <strong className="font-semibold text-brass-400">
              IMPA codes pending.
            </strong>{" "}
            The code column is built and searchable but deliberately unpopulated
            — a wrong six-digit code is worse than none, because a purchaser
            could order against it. Codes are published as soon as the coded
            catalogue is confirmed.
          </p>
        </Reveal>
      </Section>

      {/* --- Quality & handling ------------------------------------------ */}
      <Section
        tone="panel"
        eyebrow="Quality & handling"
        title="How this category is handled."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {data.quality.map((q, i) => (
            <Reveal key={q.title} delay={(i % 2) * 60}>
              <div className="flex h-full items-start gap-4 rounded-md border border-navy-600 bg-navy-900 p-6">
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

      {/* Gallery section removed until per-category photo sets exist — one
          photograph repeated six times is not a gallery. <Gallery> is built
          and keyboard-complete, ready to re-enable. See ASSETS.md §5. */}

      {/* --- Related ------------------------------------------------------ */}
      {related.length > 0 && (
        <Section
          tone="panel"
          eyebrow="Related"
          title="Often ordered alongside."
        >
          <ul className="grid gap-5 sm:grid-cols-3">
            {related.map((c, i) => (
              <Reveal key={c.slug} as="li" delay={i * 60}>
                <Link
                  href={`/supplies/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-900 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                >
                  <Photo id={c.slug} ratio="wide" sizes="(min-width: 640px) 33vw, 100vw" />
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-cream-50">
                      {c.name}
                    </h3>
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
