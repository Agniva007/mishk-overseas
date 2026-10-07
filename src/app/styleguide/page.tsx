import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { CompassRose } from "@/components/marine/compass-rose";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { ChainDivider } from "@/components/marine/chain-divider";
import { WaveEdge } from "@/components/marine/wave-edge";
import { PortTag } from "@/components/marine/port-tag";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { DepthStat } from "@/components/marine/depth-stat";
import { ChartGrid } from "@/components/marine/chart-grid";
import { Section, Subhead, Stage, Swatch, ContrastRow } from "./_components";
import { MotionDemo } from "./motion-demo";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "The Mishk Overseas design system — Deep Navy + Brass. Tokens, typography, maritime motifs and components.",
  robots: { index: false, follow: false },
};

const NAV = [
  { id: "colour", index: "01", label: "Colour" },
  { id: "typography", index: "02", label: "Typography" },
  { id: "space", index: "03", label: "Space & form" },
  { id: "motifs", index: "04", label: "Marine motifs" },
  { id: "components", index: "05", label: "Components" },
  { id: "motion", index: "06", label: "Motion" },
  { id: "accessibility", index: "07", label: "Accessibility" },
  { id: "navigation", index: "08", label: "Navigation" },
];

export default function StyleguidePage() {
  return (
    <main id="main" className="flex-1">
        {/* ---------- Hero ------------------------------------------------- */}
        <div className="relative overflow-hidden border-b border-navy-600">
          <ChartGrid />
          <CompassRose className="absolute -right-24 -top-28 size-[34rem] text-cream-50/[0.05] lg:size-[42rem]" />
          <Container className="relative py-20 lg:py-28">
            <p className="eyebrow mb-4 text-brass-500">
              Ship chandling &amp; marine technical services
            </p>
            <h1 className="max-w-4xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Supplying the world&rsquo;s fleet, port after port.
            </h1>
            <HairlineRule className="my-8" width="w-28" />
            <p className="measure text-lg text-cream-200">
              This page is the design system, rendered live. Every token,
              typeface, motif and component below is the real implementation —
              not a mockup. Review it here before any page gets built.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg">Request a Quote</Button>
              <Button size="lg" variant="outline">
                Browse Supplies
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Badge tone="teal" dot>
                148 Global Ports
              </Badge>
              <Badge tone="neutral">24/7 Response</Badge>
              <Badge tone="neutral">30 Countries</Badge>
            </div>
          </Container>
        </div>

        <Container className="lg:flex lg:gap-16">
          {/* ---------- Section nav --------------------------------------- */}
          <nav
            aria-label="Design system sections"
            className="hidden w-52 shrink-0 lg:block"
          >
            <ul className="sticky top-24 space-y-1 border-l border-navy-600 py-2">
              {NAV.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex items-center gap-3 border-l border-transparent py-2 pl-4 text-sm text-slate-400 transition-colors hover:border-brass-500 hover:text-brass-500"
                  >
                    <span className="font-mono text-[0.6875rem]">{s.index}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 divide-y divide-navy-600">
            {/* ================= 01 COLOUR ============================== */}
            <Section
              id="colour"
              index="01"
              title="Colour"
              intro={
                <>
                  Dark-first. Roughly 70% navy family, 20% cream and paper, 8%
                  brass, 2% signal. Brass is punctuation — never paragraph.
                </>
              }
            >
              <Subhead>Navy — the deep-water base</Subhead>
              <div className="mb-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
                <Swatch name="navy-900" hex="#0A1B2A" role="Page ground" />
                <Swatch name="navy-800" hex="#0F2438" role="Panels, cards, nav bar" />
                <Swatch name="navy-700" hex="#16324B" role="Card hover, inset wells" />
                <Swatch name="navy-600" hex="#1F4460" role="Borders, dividers" />
              </div>

              <Subhead>Brass — the accent</Subhead>
              <div className="mb-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
                <Swatch name="brass-500" hex="#C9A227" role="CTAs, rules, active states, numerals" />
                <Swatch name="brass-400" hex="#DCBB4B" role="Hover, lighter fill" />
                <Swatch name="brass-100" hex="#F5E9C0" role="Tint on dark, subtle badges" />
                <Swatch name="brass-700" hex="#7A5F0F" role="Text-safe brass on paper sections" />
              </div>

              <Subhead>Text on navy</Subhead>
              <div className="mb-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
                <Swatch name="cream-50" hex="#F2EDE3" role="Primary text" />
                <Swatch name="cream-200" hex="#D9D2C4" role="Secondary text" />
                <Swatch name="slate-400" hex="#8A99A8" role="Muted, meta, captions" />
                <Swatch name="paper-50" hex="#FBF9F5" role="Light-section ground" />
              </div>

              <Subhead>Signal</Subhead>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                <Swatch name="teal-500" hex="#2E7D8F" role="In stock, port active — fills & borders" />
                <Swatch name="teal-300" hex="#57AFC2" role="Text-safe teal on navy" />
                <Swatch name="rust-500" hex="#B4552F" role="Urgent, 24×7 — fills & borders" />
                <Swatch name="rust-300" hex="#D97A4E" role="Text-safe rust on navy" />
              </div>
            </Section>

            {/* ================= 02 TYPOGRAPHY ========================== */}
            <Section
              id="typography"
              index="02"
              title="Typography"
              intro={
                <>
                  Three families, hard cap. Fraunces carries the heritage
                  shipping-house tone, Inter does the work, JetBrains Mono
                  handles anything a buyer might copy — IMO numbers, IMPA codes,
                  LOCODEs.
                </>
              }
            >
              <div className="space-y-8">
                <Stage label="Fraunces — display">
                  <p className="mb-4 font-mono text-xs text-slate-400">
                    H1 · 600 · clamp(2.75rem, 6vw, 5rem) · −0.02em · lh 0.98
                  </p>
                  <p className="font-display text-5xl font-semibold leading-[0.98] tracking-tight lg:text-7xl">
                    Supplying the world&rsquo;s fleet
                  </p>
                  <p className="mt-8 mb-4 font-mono text-xs text-slate-400">
                    H2 · 600 · clamp(2rem, 3.5vw, 3rem)
                  </p>
                  <p className="font-display text-3xl font-semibold tracking-tight lg:text-5xl">
                    Provisions, bonded stores &amp; deck supplies
                  </p>
                </Stage>

                <Stage label="Inter — interface">
                  <p className="mb-4 font-mono text-xs text-slate-400">
                    H3 / card title · 600 · 1.25rem
                  </p>
                  <p className="text-xl font-semibold text-cream-50">
                    Deck &amp; Engine Stores
                  </p>
                  <p className="mt-8 mb-4 font-mono text-xs text-slate-400">
                    Body · 400 · 1.0625rem · lh 1.65 · max 68ch
                  </p>
                  <p className="measure text-cream-200">
                    Mishk Overseas supplies vessels alongside and at anchorage
                    at 148 ports worldwide. Requisitions received by the
                    24-hour desk are quoted within two hours, sourced against
                    IMPA codes, quality-checked on receipt, and delivered to the
                    vessel before departure.
                  </p>
                  <p className="mt-8 mb-4 font-mono text-xs text-slate-400">
                    Eyebrow · 600 · 0.75rem · 0.14em · uppercase
                  </p>
                  <p className="eyebrow text-brass-500">Ports we serve</p>
                </Stage>

                <Stage label="JetBrains Mono — data">
                  <p className="mb-4 font-mono text-xs text-slate-400">
                    Specs, codes and identifiers · tabular numerals
                  </p>
                  <dl className="grid gap-x-8 gap-y-3 font-mono text-sm sm:grid-cols-2">
                    {[
                      ["Vessel", "MV SOUTHERN CROSS"],
                      ["IMO", "9436729"],
                      ["Port of call", "INMUN · Mundra"],
                      ["ETA", "2026-09-18 04:30 LT"],
                      ["IMPA code", "59 01 21"],
                      ["Lead time", "4–6 hrs"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-navy-600 pb-2">
                        <dt className="text-slate-400">{k}</dt>
                        <dd className="text-cream-50">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Stage>
              </div>
            </Section>

            {/* ================= 03 SPACE & FORM ======================== */}
            <Section
              id="space"
              index="03"
              title="Space &amp; form"
              intro={
                <>
                  4px base unit. Tight radii throughout — sharp corners read as
                  engineering, pill shapes read as consumer software.
                </>
              }
            >
              <Subhead>Radius</Subhead>
              <div className="mb-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {[
                  ["rounded-none", "0px", "Full-bleed bands"],
                  ["rounded-sm", "2px", "Buttons, chips, badges"],
                  ["rounded-md", "4px", "Cards, inputs, panels"],
                  ["rounded-lg", "6px", "Images, hero media"],
                ].map(([cls, px, use]) => (
                  <div key={cls}>
                    <div
                      className={`h-20 border border-brass-500/50 bg-navy-700 ${cls}`}
                    />
                    <p className="mt-3 font-mono text-xs text-brass-500">{px}</p>
                    <p className="text-xs text-slate-400">{use}</p>
                  </div>
                ))}
              </div>

              <Subhead>Section rhythm</Subhead>
              <Stage className="space-y-3">
                {[
                  ["Section padding", "py-20 → py-32", "Mobile → desktop"],
                  ["Container", "max-w-[1280px]", "px-5 mobile / px-10 desktop"],
                  ["Grid", "12 / 6 / 4 columns", "gap-6"],
                  ["Hero", "min-h-[88vh]", "Never full 100vh"],
                  ["Body measure", "68ch", "Hard cap on paragraph width"],
                ].map(([k, v, note]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-navy-600 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-cream-50">{k}</span>
                    <span className="font-mono text-xs text-brass-500">{v}</span>
                    <span className="w-full text-xs text-slate-400 sm:w-auto">
                      {note}
                    </span>
                  </div>
                ))}
              </Stage>
            </Section>

            {/* ================= 04 MOTIFS ============================== */}
            <Section
              id="motifs"
              index="04"
              title="Marine motifs"
              intro={
                <>
                  Eight recurring devices. These are what make the site read as
                  marine rather than as a generic dark corporate template — so
                  they are used deliberately and sparingly, never decoratively.
                </>
              }
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <Stage label="01 · Hairline rule with brass terminal">
                  <div className="space-y-6">
                    <HairlineRule width="w-32" />
                    <HairlineRule width="w-48" terminal="both" />
                    <HairlineRule width="w-24" align="right" terminal="start" />
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Section dividers and under-headline accents. Evokes a
                    chart&rsquo;s scale bar.
                  </p>
                </Stage>

                <Stage label="02 · Depth-sounding numerals">
                  <div className="grid grid-cols-2 gap-8">
                    <DepthStat value={148} label="Global ports served" />
                    <DepthStat value={2} suffix="hr" label="Quote turnaround" />
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Counts up once on scroll. Reads like a depth annotation.
                  </p>
                </Stage>

                <Stage label="03 · Compass rose watermark">
                  <div className="relative h-48 overflow-hidden rounded-md bg-navy-900">
                    <CompassRose className="absolute -right-10 -top-10 size-64 text-cream-50/[0.07]" />
                    <div className="relative p-6">
                      <p className="eyebrow text-brass-500">Ports we serve</p>
                      <p className="mt-2 font-display text-2xl">
                        India, the Gulf &amp; 148 ports beyond
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    4–7% opacity, bleeding off the hero and footer. Never
                    interactive; always <code className="font-mono">aria-hidden</code>.
                  </p>
                </Stage>

                <Stage label="06 · Port tags (UN/LOCODE)">
                  <div className="flex flex-wrap gap-2">
                    <PortTag code="INMUN" name="Mundra" active />
                    <PortTag code="INIXY" name="Kandla" active />
                    <PortTag code="INNSA" name="Nhava Sheva" />
                    <PortTag code="INMAA" name="Chennai" />
                    <PortTag code="INVTZ" name="Visakhapatnam" />
                    <PortTag code="AEJEA" name="Jebel Ali" />
                    <PortTag code="INCCU" name="Kolkata" />
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Filled tag = supply available now. Outline = on request.
                  </p>
                </Stage>

                <Stage label="07 · Plimsoll bullets">
                  <ul className="space-y-3">
                    {[
                      "Single-window sourcing across every category",
                      "IMPA / ISSA-coded catalogue",
                      "Quality check on every consignment",
                      "24×7 supply desk",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <PlimsollBullet className="mt-0.5 size-5 text-brass-500" />
                        <span className="text-sm text-cream-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-slate-400">
                    The load-line disc. Also the favicon.
                  </p>
                </Stage>

                <Stage label="08 · Chart-grid texture">
                  <div className="relative h-48 overflow-hidden rounded-md bg-navy-900">
                    <div className="chart-grid absolute inset-0" />
                    <div className="relative p-6">
                      <p className="font-mono text-xs text-slate-400">
                        48px grid · 3% opacity · masked downward
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Gives flat navy some tooth. Sits behind dark sections only.
                  </p>
                </Stage>
              </div>

              {/* Full-bleed motifs need their own width */}
              <div className="mt-6 space-y-6">
                <Stage label="05 · Wave-cut section edge" className="!p-0">
                  <div className="bg-navy-900 pt-10">
                    <p className="px-6 pb-8 text-sm text-cream-200">
                      A navy section, ending&hellip;
                    </p>
                    <WaveEdge />
                  </div>
                  <div className="bg-paper-50 px-6 py-8">
                    <p className="text-sm text-ink-900">
                      &hellip;entering a paper section. 24px amplitude — it
                      should be noticed only on second look.
                    </p>
                  </div>
                  <div className="bg-paper-50">
                    <WaveEdge fill="text-navy-900" flip />
                  </div>
                  <div className="bg-navy-900 px-6 py-8">
                    <p className="text-sm text-cream-200">
                      And back to navy, flipped.
                    </p>
                  </div>
                </Stage>

                <Stage label="04 · Chain divider">
                  <ChainDivider />
                  <p className="mt-6 text-xs text-slate-400">
                    Hard rule: once per page, maximum — between the trust band
                    and the footer. Used more than that, it becomes wallpaper.
                  </p>
                </Stage>
              </div>
            </Section>

            {/* ================= 05 COMPONENTS ========================== */}
            <Section
              id="components"
              index="05"
              title="Components"
              intro="Primitives, retokenised. No default library styling survives into production."
            >
              <div className="space-y-6">
                <Stage label="Buttons">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="brass">Request a Quote</Button>
                      <Button variant="outline">Browse Supplies</Button>
                      <Button variant="ghost">View all ports →</Button>
                      <Button variant="teal">Check availability</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                    <p className="text-xs text-slate-400">
                      One filled-brass button per screen. Everything else is
                      outline or ghost — that is what keeps the primary CTA
                      loud.
                    </p>
                  </div>
                </Stage>

                <Stage label="Badges & availability chips">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="brass">Own delivery</Badge>
                    <Badge tone="teal" dot>
                      In stock
                    </Badge>
                    <Badge tone="neutral">On indent</Badge>
                    <Badge tone="rust" dot>
                      24×7 emergency
                    </Badge>
                  </div>
                </Stage>

                <Stage label="Cards — hover to see the lift">
                  <div className="grid gap-5 sm:grid-cols-3">
                    {[
                      ["Provisions", "Fresh, frozen and dry stores"],
                      ["Bonded Stores", "Duty-free tobacco and beverages"],
                      ["Deck Stores", "Ropes, paints, tools and hardware"],
                    ].map(([title, desc]) => (
                      <Card key={title} interactive className="p-5">
                        <p className="font-mono text-xs text-brass-500">
                          Supplies
                        </p>
                        <p className="mt-2 text-lg font-semibold text-cream-50">
                          {title}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">{desc}</p>
                      </Card>
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Hover: lift 4px, border goes brass, 180ms ease-marine.
                  </p>
                </Stage>

                <Stage label="Form fields">
                  <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="sg-vessel">Vessel name</Label>
                      <Input id="sg-vessel" placeholder="MV Southern Cross" />
                    </div>
                    <div>
                      <Label htmlFor="sg-imo">IMO number</Label>
                      <Input id="sg-imo" className="font-mono" placeholder="9436729" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="sg-req">Requisition details</Label>
                      <Textarea
                        id="sg-req"
                        placeholder="Paste your requisition, or attach it below."
                      />
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    Real <code className="font-mono">&lt;label&gt;</code> on every
                    field. Placeholder is example text, never the label.
                  </p>
                </Stage>

                <Stage label="On paper — the light-section rhythm" paper>
                  <p className="eyebrow mb-3 text-brass-700">Why Mishk</p>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-ink-900">
                    One window for the whole requisition
                  </h3>
                  <p className="mt-3 max-w-xl text-ink-900/75">
                    Paper sections carry the document-heavy content — catalogue
                    tables, scope of work, certifications. Note the brass here is{" "}
                    <code className="font-mono text-brass-700">brass-700</code>,
                    not <code className="font-mono">brass-500</code>: the bright
                    brass fails contrast on light grounds.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex h-11 items-center rounded-sm bg-ink-900 px-6 text-sm font-semibold text-cream-50 transition-colors hover:bg-navy-700">
                      Request a Quote
                    </button>
                    <button className="inline-flex h-11 items-center rounded-sm border border-ink-900/25 px-6 text-sm text-ink-900 transition-colors hover:border-ink-900">
                      Download catalogue
                    </button>
                  </div>
                </Stage>
              </div>
            </Section>

            {/* ================= 06 MOTION ============================== */}
            <Section
              id="motion"
              index="06"
              title="Motion"
              intro="Restrained. This is a trust site, not a showreel — motion confirms an action or reveals content, and never performs."
            >
              <Stage label="Section entrance · 600ms · ease-marine · 60ms stagger">
                <MotionDemo />
              </Stage>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Section entrance", "opacity 0→1, y 24→0, 600ms, once at 20% viewport"],
                  ["Card grid", "children staggered 60ms"],
                  ["Statistics", "count up over 1.4s on scroll, once"],
                  ["Hero image", "scale 1.06→1.0 over 1.2s on load — no scroll parallax"],
                  ["Card hover", "translateY(−4px) + brass border, 180ms"],
                  ["Reduced motion", "all of the above collapses to instant"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-navy-600 p-4">
                    <p className="text-sm font-semibold text-cream-50">{k}</p>
                    <p className="mt-1 font-mono text-xs text-slate-400">{v}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ================= 07 ACCESSIBILITY ======================= */}
            <Section
              id="accessibility"
              index="07"
              title="Accessibility"
              intro={
                <>
                  Target is WCAG 2.2 AA. Every ratio below is computed from the
                  actual token values, not estimated — three pairs failed and
                  the palette was revised to fix them.
                </>
              }
            >
              <Stage label="Measured contrast ratios" className="overflow-x-auto">
                <table className="w-full min-w-[42rem] text-left">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="pb-3 pr-4 eyebrow text-slate-400">Foreground</th>
                      <th className="pb-3 pr-4 eyebrow text-slate-400">Ground</th>
                      <th className="pb-3 pr-4 eyebrow text-right text-slate-400">Ratio</th>
                      <th className="pb-3 pr-4 eyebrow text-slate-400">Verdict</th>
                      <th className="pb-3 eyebrow text-slate-400">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ContrastRow fg="cream-50" bg="navy-900" ratio={14.96} verdict="body" note="Primary body copy" />
                    <ContrastRow fg="cream-200" bg="navy-900" ratio={11.61} verdict="body" note="Secondary copy" />
                    <ContrastRow fg="brass-400" bg="navy-900" ratio={9.35} verdict="body" note="Brass hover state" />
                    <ContrastRow fg="brass-500" bg="navy-900" ratio={7.22} verdict="body" note="Passes, but reserved for accents by style rule" />
                    <ContrastRow fg="slate-400" bg="navy-900" ratio={5.99} verdict="body" note="Muted / caption text" />
                    <ContrastRow fg="teal-300" bg="navy-900" ratio={6.91} verdict="body" note="Added — the text-safe teal" />
                    <ContrastRow fg="rust-300" bg="navy-900" ratio={5.69} verdict="body" note="Added — the text-safe rust" />
                    <ContrastRow fg="teal-500" bg="navy-900" ratio={3.70} verdict="large" note="Fills, borders, dots — not body copy" />
                    <ContrastRow fg="rust-500" bg="navy-900" ratio={3.56} verdict="large" note="Fills, borders, dots — not body copy" />
                    <ContrastRow fg="ink-900" bg="paper-50" ratio={16.60} verdict="body" note="Light-section body copy" />
                    <ContrastRow fg="brass-500" bg="paper-50" ratio={2.30} verdict="fail" note="The original palette used this. It failed outright — brass-700 was added to replace it." />
                    <ContrastRow fg="brass-700" bg="paper-50" ratio={5.75} verdict="body" note="The replacement. Brass for light sections." />
                    <ContrastRow fg="rust-500" bg="paper-50" ratio={4.66} verdict="body" note="Safe on light grounds" />
                    <ContrastRow fg="teal-500" bg="paper-50" ratio={4.49} verdict="large" note="Marginal — use teal only for large text on paper" />
                    <ContrastRow fg="navy-900" bg="brass-500" ratio={7.22} verdict="body" note="Primary button label" />
                  </tbody>
                </table>
              </Stage>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Focus", "2px brass outline, 2px offset, on every interactive element. Tab through this page to check."],
                  ["Motifs", "All decorative SVG is aria-hidden and pointer-events-none."],
                  ["Forms", "Real labels, aria-describedby error text, no placeholder-as-label."],
                  ["Motion", "prefers-reduced-motion collapses every entrance and counter."],
                  ["Skip link", "First tab stop on every page jumps to #main."],
                  ["Verification", "axe-core audit before launch, on every template."],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-navy-600 p-4">
                    <p className="text-sm font-semibold text-cream-50">{k}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{v}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ================= 08 NAVIGATION ========================== */}
            <Section
              id="navigation"
              index="08"
              title="Navigation"
              intro={
                <>
                  The header, mega-menu, mobile drawer and footer are live on
                  this page — scroll up and down, hover <em>Supplies</em>, and
                  narrow the window below 1024px to see the drawer.
                </>
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Utility strip",
                    "36px, navy-800. Pulsing teal dot on the 24×7 desk, phone, email and WhatsApp. Hidden below md, where it moves into the drawer.",
                  ],
                  [
                    "Header",
                    "Sticky. Transparent over a hero, then navy-900/92 + backdrop-blur with a hairline once scrolled past 80px. Solid on every non-hero route.",
                  ],
                  [
                    "Mega-menu",
                    "Two category columns plus a promo panel. Opens on hover with a 140ms close delay so a diagonal mouse path survives.",
                  ],
                  [
                    "Mega-menu keyboard",
                    "Trigger is a button with aria-expanded / aria-controls. Enter toggles, ArrowDown enters the panel, Escape closes and returns focus. Blur out of the header closes it.",
                  ],
                  [
                    "Mobile drawer",
                    "Full-screen dialog with aria-modal. Panels become accordions, body scroll locks, focus is trapped, Escape closes and restores focus to the burger.",
                  ],
                  [
                    "Footer",
                    "Four columns: company, supplies, services + company, offices. Chain divider above, compass rose watermark bottom-right.",
                  ],
                  [
                    "Floating WhatsApp",
                    "Fixed bottom-right at z-30, under the header and drawer. Brand green, so it is recognised at a glance. Label slides in on hover or keyboard focus, pointer devices only. Wrapped in a named <aside> — a fixed element belongs to no other landmark. Hidden in print.",
                  ],
                  [
                    "24×7 block",
                    "The only rust-toned element on the page. rust-300 text on a rust-500/10 field — rust-500 itself is border and dot only.",
                  ],
                  [
                    "Active route",
                    "The current top-level section shows brass in the nav, matched on prefix so /supplies/provisions still lights Supplies.",
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-navy-600 p-4">
                    <p className="text-sm font-semibold text-cream-50">{k}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-md border border-rust-500/40 bg-rust-500/10 p-5">
                <p className="eyebrow mb-2 text-rust-300">Placeholder data</p>
                <p className="text-sm leading-relaxed text-cream-200">
                  Every phone number, address and statistic in the header and
                  footer is a deliberately obvious placeholder
                  (<code className="font-mono text-xs">+91 00000 00000</code>)
                  held in <code className="font-mono text-xs">src/data/site.ts</code>.
                  They are written that way so nothing fake-but-plausible can
                  reach production by accident. Replace them from the client
                  brief before launch — see ASSETS.md.
                </p>
              </div>
            </Section>
          </div>
      </Container>
    </main>
  );
}
