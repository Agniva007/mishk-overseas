import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { coastLabels, coverageFor, ports } from "@/data/ports";
import { supplies } from "@/data/supplies";
import { serviceGroups, servicesInGroup } from "@/data/services";
import { spares } from "@/data/spares";
import { site } from "@/data/site";

const getPort = (slug: string) => ports.find((p) => p.slug === slug);

export function generateStaticParams() {
  return ports.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) return {};

  /* These titles target exactly what buyers search: "ship chandler Mundra". */
  return {
    title: `Ship Chandler ${port.name}`,
    description: `Ship supply and marine technical services at ${port.name} (${port.locode}). Provisions, bonded stores, deck and engine supplies delivered ${port.alongside ? "alongside" : ""}${port.alongside && port.anchorage ? " or " : ""}${port.anchorage ? "at anchorage" : ""}. Typical lead time ${port.leadTime}.`,
    alternates: { canonical: `/ports/${port.slug}` },
  };
}

export default async function PortPage({
  params,
}: PageProps<"/ports/[slug]">) {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) notFound();

  const coverage = coverageFor(port);
  const nearby = port.nearby
    .map(getPort)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  /* Structured data — a LocalBusiness serving this port (§8). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Ship chandling and marine technical services",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: {
      "@type": "Place",
      name: port.name,
      identifier: port.locode,
      geo: {
        "@type": "GeoCoordinates",
        latitude: port.lat,
        longitude: port.lng,
      },
    },
  };

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Hero --------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Ports", href: "/ports" },
              { label: port.name },
            ]}
          />

          <p className="eyebrow mb-4 text-brass-500">
            {coastLabels[port.coast]} · Ship supply &amp; technical services
          </p>
          <div className="flex flex-wrap items-baseline gap-4">
            <h1 className="text-4xl lg:text-6xl">{port.name}</h1>
            <span className="rounded-sm border border-teal-500/45 px-2.5 py-1 font-mono text-sm tracking-wider text-teal-300">
              {port.locode}
            </span>
          </div>
          <HairlineRule className="my-7" width="w-20" />
          <p className="measure text-lg text-cream-200">
            Mishk Overseas supplies vessels calling at {port.name}
            {port.alongside && port.anchorage
              ? " both alongside and by launch at anchorage"
              : port.alongside
                ? " alongside"
                : " by launch at anchorage"}
            . Typical delivery lead time from receipt of a confirmed order is{" "}
            {port.leadTime}.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {port.active ? (
              <Badge tone="teal" dot>Own delivery</Badge>
            ) : (
              <Badge tone="neutral">Partner agent</Badge>
            )}
            <Badge tone="brass">{port.leadTime}</Badge>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className={buttonClasses()}>
              Request a Quote for {port.name}
            </Link>
            <a
              href={site.phone.href}
              className={buttonClasses({ variant: "outline" })}
            >
              {site.phone.display}
            </a>
          </div>
        </Container>
      </section>

      {/* --- Port facts --------------------------------------------------- */}
      <Section eyebrow="At this port" title={`Delivery at ${port.name}.`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "UN/LOCODE", v: port.locode },
            { k: "Coast", v: coastLabels[port.coast] },
            { k: "Lead time", v: port.leadTime },
            {
              k: "Delivery",
              v:
                [port.alongside && "Alongside", port.anchorage && "Anchorage"]
                  .filter(Boolean)
                  .join(" · ") || "On request",
            },
            { k: "Latitude", v: `${port.lat}° N` },
            { k: "Longitude", v: `${port.lng}° E` },
            { k: "Supplies", v: coverage.supplies },
            { k: "Services", v: coverage.services },
          ].map((f, i) => (
            <Reveal key={f.k} delay={(i % 4) * 50}>
              <div className="h-full rounded-md border border-navy-600 bg-navy-800 p-5">
                <p className="eyebrow text-slate-400">{f.k}</p>
                <p className="mt-2 font-mono text-sm text-cream-50">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-6 rounded-md border border-navy-600 bg-navy-800/60 px-5 py-4 text-sm text-cream-200">
            {coverage.note}
          </p>
        </Reveal>
      </Section>

      {/* --- Local knowledge (renders only when supplied) ----------------- */}
      {port.notes && (
        <Section eyebrow="Local knowledge" title={`Working at ${port.name}.`}>
          <Reveal>
            <p className="measure text-lg text-cream-200">{port.notes}</p>
          </Reveal>
        </Section>
      )}

      {/* --- What we supply here ------------------------------------------ */}
      <Section
        tone="panel"
        eyebrow="Supplies"
        title={`Stores delivered to ${port.name}.`}
        lede="Every catalogued category, with unit of issue and availability published."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supplies.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={(i % 3) * 40}>
              <Link
                href={`/supplies/${c.slug}`}
                className="flex items-center gap-3 rounded-md border border-navy-600 bg-navy-900 px-5 py-4 transition-colors hover:border-brass-500"
              >
                <PlimsollBullet className="size-4 shrink-0 text-brass-500" />
                <span className="text-sm text-cream-200">{c.name}</span>
                <span className="ml-auto font-mono text-xs text-slate-400">
                  {c.items.length}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Spares here --------------------------------------------------- */}
      <Section
        eyebrow="Spares"
        title={`Spares delivered to ${port.name}.`}
        lede="Sourced against the nameplate and consolidated to the port of call."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spares.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={(i % 3) * 40}>
              <Link
                href={`/spares/${c.slug}`}
                className="flex items-center gap-3 rounded-md border border-navy-600 bg-navy-800 px-5 py-4 transition-colors hover:border-brass-500"
              >
                <PlimsollBullet className="size-4 shrink-0 text-brass-500" />
                <span className="text-sm text-cream-200">
                  {c.name.replace(/ Spares$/, "")}
                </span>
                <span className="ml-auto font-mono text-xs text-slate-400">
                  {c.items.length}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Services here ------------------------------------------------ */}
      <Section
        tone="panel"
        eyebrow="Services"
        title={`Technical attendance at ${port.name}.`}
        lede="Grouped by discipline — every service is available at this port subject to scope."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g, i) => (
            <Reveal key={g.key} as="li" delay={(i % 3) * 50}>
              <Link
                href={`/services#${g.key}`}
                className="flex h-full flex-col rounded-md border border-navy-600 bg-navy-900 p-5 transition-colors hover:border-brass-500"
              >
                <span className="text-base font-semibold text-cream-50">
                  {g.name}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-slate-400">
                  {g.blurb}
                </span>
                <span className="mt-3 font-mono text-xs text-brass-500">
                  {servicesInGroup(g.key).length} services
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Nearby ------------------------------------------------------- */}
      {nearby.length > 0 && (
        <Section tone="panel" eyebrow="Nearby" title="Ports served from the same base.">
          <ul className="grid gap-4 sm:grid-cols-3">
            {nearby.map((p, i) => (
              <Reveal key={p.slug} as="li" delay={i * 60}>
                <Link
                  href={`/ports/${p.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-md border border-navy-600 bg-navy-900 p-5 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                >
                  <div>
                    <p className="text-base font-semibold text-cream-50">
                      {p.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {p.leadTime}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-sm border border-teal-500/40 px-2 py-0.5 font-mono text-[0.625rem] tracking-wider text-teal-300">
                    {p.locode}
                  </span>
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
