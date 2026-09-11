import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClasses } from "@/components/ui/button";
import { PendingPanel } from "@/components/catalogue/pending-panel";
import { Photo } from "@/components/media/photo";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { DepthStat } from "@/components/marine/depth-stat";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { whyUs } from "@/data/home";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mishk Overseas supplies and services vessels at Indian and Gulf ports — ship chandling across eleven catalogued categories and six technical service lines.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Who we are</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            A chandler and a repair contractor, under one roof.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            Most vessels calling at an Indian port need both stores and a
            technician. Running the two through separate suppliers means two
            quotations, two schedules and a handover in the middle. We do both,
            which removes the handover.
          </p>
        </Container>
      </section>

      <section className="border-b border-navy-600 bg-navy-800 py-14">
        <Container>
          <ul className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <Reveal key={s.label} as="li" delay={i * 60}>
                <DepthStat value={s.value} suffix={s.suffix} label={s.label} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate-400">
            Figures pending client confirmation
          </p>
        </Container>
      </section>

      <Section eyebrow="The company" title="How we work, and why.">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div className="measure space-y-5 text-cream-200">
            <p>
              A ship supplier is judged on two things: whether the goods arrive
              before the vessel sails, and whether what arrives is what was
              ordered. Everything else — the catalogue, the pricing, the
              website — is in service of those two.
            </p>
            <p>
              So the things we have built the business around are unglamorous.
              Stock held near the ports we serve, because that is what makes a
              four-hour lead time real rather than aspirational. A published
              catalogue, so a purchaser can write a requisition without a phone
              call. Inspection before dispatch, so a short-shipped line is
              caught by us and not discovered on board. And a desk that answers
              at three in the morning, because that is when a vessel finds out
              what it is missing.
            </p>
            <p>
              On the technical side the same logic applies: scope the job before
              mobilising, state what is and is not included, and re-quote rather
              than run up an open-ended bill when the work turns out larger than
              the defect report suggested.
            </p>
          </div>

          {/* Deliberately a port scene, not a warehouse. The copy beside this
              describes Mishk's own stock and premises; an illustrative stock
              photo of a warehouse next to it would read as a picture of
              theirs. A general maritime image cannot be misread that way.
              Swap for a real facility photo when one is supplied. */}
          <Photo
            id="hero"
            ratio="portrait"
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="rounded-md border border-navy-600"
          />
        </div>
      </Section>

      <Section tone="panel" eyebrow="Our history" title="The company timeline.">
        <Reveal>
          <PendingPanel
            title="Timeline not yet published"
            body="Founding year, milestones and the branch history are factual claims about the company that only the client can confirm. The timeline renders as soon as those dates are supplied — see ASSETS.md §1."
          />
        </Reveal>
      </Section>

      <Section eyebrow="What we hold to" title="Six things we do not compromise on.">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 60}>
              <div className="flex items-start gap-4">
                <PlimsollBullet className="mt-1 size-5 shrink-0 text-brass-500" />
                <div>
                  <h3 className="text-base font-semibold text-cream-50">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="panel" eyebrow="Leadership" title="The people behind it.">
        <Reveal>
          <PendingPanel
            title="Leadership profiles not yet published"
            body="Names, roles and photographs of the management team are pending. Publishing invented people would be straightforwardly dishonest, so the section stays empty until the client supplies them."
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/clients" className={buttonClasses()}>
              Clients &amp; partners
            </Link>
            <Link href="/ports" className={buttonClasses({ variant: "outline" })}>
              Ports we serve
            </Link>
          </div>
        </Reveal>
      </Section>

      <QuoteCTA />
    </main>
  );
}
