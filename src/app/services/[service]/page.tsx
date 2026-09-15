import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClasses } from "@/components/ui/button";
import { PendingPanel } from "@/components/catalogue/pending-panel";
import { Photo } from "@/components/media/photo";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { getService, serviceDetails } from "@/data/services";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[service]">): Promise<Metadata> {
  const { service } = await params;
  const data = getService(service);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: `/services/${data.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[service]">) {
  const { service } = await params;
  const data = getService(service);
  if (!data) notFound();

  const related = data.related
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
              { label: "Services", href: "/services" },
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className={buttonClasses()}>
                  Request a Quote
                </Link>
                <Link
                  href="/spares"
                  className={buttonClasses({ variant: "outline" })}
                >
                  Parts for this job
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

      {/* --- Capabilities ------------------------------------------------ */}
      <Section eyebrow="Capability" title="What this covers.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.capabilities.map((c, i) => (
            <Reveal key={c} as="li" delay={(i % 3) * 50}>
              <div className="flex h-full items-start gap-3 rounded-md border border-navy-600 bg-navy-800 p-5">
                <PlimsollBullet className="mt-0.5 size-4 shrink-0 text-brass-500" />
                <span className="text-sm text-cream-200">{c}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Scope ------------------------------------------------------- */}
      <Section
        tone="panel"
        eyebrow="Scope of work"
        title="What is included, and what is not."
        lede="Stated up front because the argument nobody wants is the one that happens after the invoice."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-md border border-teal-500/40 bg-navy-900 p-6">
              <p className="eyebrow mb-4 text-teal-300">Included</p>
              <ul className="space-y-3">
                {data.scope.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-300" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-cream-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="h-full rounded-md border border-navy-600 bg-navy-900 p-6">
              <p className="eyebrow mb-4 text-slate-400">Not included</p>
              <ul className="space-y-3">
                {data.scope.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    <span className="text-sm text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className="mt-6 font-mono text-xs leading-relaxed text-slate-400">
            Scope wording is drafted to industry norms and requires client
            sign-off before launch — it is a commercial commitment, not copy.
          </p>
        </Reveal>
      </Section>

      {/* --- Equipment (pending) ----------------------------------------- */}
      <Section eyebrow="Workshop" title="Equipment and capacity.">
        <Reveal>
          {data.equipment.length > 0 ? (
            <div className="overflow-x-auto rounded-md border border-navy-600">
              <table className="w-full min-w-[32rem] text-left">
                <thead className="bg-navy-800">
                  <tr className="border-b border-navy-600">
                    <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">Equipment</th>
                    <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.equipment.map((e) => (
                    <tr key={e.item} className="border-b border-navy-600 last:border-0">
                      <th scope="row" className="px-5 py-3.5 text-sm font-normal text-cream-50">{e.item}</th>
                      <td className="px-5 py-3.5 font-mono text-xs text-cream-200">{e.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <PendingPanel
              title="Equipment list not yet published"
              body="Machine capacities are a capability claim a buyer would rely on when placing a job — a lathe swing or a rewinding rating that turns out to be wrong wastes a mobilisation. The table is built and will publish as soon as the client confirms the actual workshop inventory."
            />
          )}
        </Reveal>
      </Section>

      {/* --- Case notes (pending) ---------------------------------------- */}
      <Section tone="panel" eyebrow="Track record" title="Recent jobs.">
        <Reveal>
          {data.cases.length > 0 ? (
            <ul className="grid gap-5 lg:grid-cols-3">
              {data.cases.map((c) => (
                <li key={`${c.vessel}-${c.port}`} className="rounded-md border border-navy-600 bg-navy-900 p-6">
                  <p className="font-mono text-xs text-brass-500">{c.port}</p>
                  <p className="mt-2 text-base font-semibold text-cream-50">{c.vessel}</p>
                  <p className="mt-2 text-sm text-cream-200">{c.problem}</p>
                  <p className="mt-4 border-t border-navy-600 pt-3 font-mono text-xs text-teal-300">
                    Turnaround: {c.turnaround}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <PendingPanel
              title="Case notes not yet published"
              body="A described job — vessel type, port, defect and turnaround — is a track-record claim. These will publish once the client supplies real jobs with permission to describe them, anonymised where the charterer requires it."
            />
          )}
        </Reveal>
      </Section>

      {/* --- Related ------------------------------------------------------ */}
      {related.length > 0 && (
        <Section eyebrow="Related" title="Often run alongside.">
          <ul className="grid gap-5 sm:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} as="li" delay={i * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-800 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                >
                  <Photo id={s.photo} ratio="wide" sizes="(min-width: 640px) 33vw, 100vw" />
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-cream-50">{s.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{s.tagline}</p>
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
