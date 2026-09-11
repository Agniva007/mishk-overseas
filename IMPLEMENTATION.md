# Mishk Overseas — Website Implementation Plan

> **Project:** Corporate + catalogue website for Mishk Overseas, a ship chandling and marine technical-services company.
> **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · MDX content
> **Design direction:** *Deep Navy + Brass* — heritage-maritime, premium, deliberately differentiated from the flat-blue competitor set.
> **Date:** 2026-09-11

---

## 1. Competitive Reference Analysis

Four reference sites were studied. What each does well, and what Mishk should take or avoid.

| Site | Positioning | Strengths worth borrowing | Weaknesses to avoid |
|---|---|---|---|
| **shipsmithgroup.com** | Ship repair + surveys + maritime AI, Kolkata/Mumbai | Strong numeric proof bar (500+ ships / 180+ ports / 50+ yrs); "three disciplines, one partner" framing; testimonials with star rating; dedicated Certifications page | Spreads thin across three unrelated products; AI chatbot section dilutes the core trust message |
| **royalmarinesuppliers.in** | Marine logistics + ship services, Kandla/Gandhidham | Ruthlessly clear hero: "Serving All Major Indian Ports, 24×7"; contact details surfaced *above the fold*; clean Products-vs-Services split | Very plain visually; icon-only product cards feel low-budget; little depth beyond the homepage |
| **georgemarine.co.in** | Ship chandling since 1995, Goa | Ports list high on the page (huge for buyer intent); ISO 9001:2015 banner; named clients + brand partnerships (Shell Marine, Rochem) — the strongest trust section of the four | Dated stock photography; thin individual pages |
| **mahirmarine.com** | Ship chandling, Indian ports | Best product taxonomy: 9 photo-led category cards, each with real imagery instead of icons; downloadable brochure; WebP optimisation | Almost no contact/footer info; shallow site; no service pages |

### Synthesised strategy for Mishk

Take **Mahir's photo-led category grid**, **George's ports + clients + certifications trust stack**, **Royal's above-the-fold contact + 24×7 urgency**, and **ShipSmith's numeric proof bar** — and execute all of it on a design system that looks materially more premium than any of them.

The category that wins here is the one that looks like it can be trusted with a USD 40,000 provisioning order at 02:00 on a Sunday. That means: dark, calm, precise, fast, and with the phone number never more than one thumb-reach away.

---

## 2. Design System

### 2.1 Colour tokens

Defined once as CSS custom properties, consumed through Tailwind v4's `@theme`.

| Token | Hex | Role |
|---|---|---|
| `--navy-900` | `#0A1B2A` | Page ground. The deep-water base. |
| `--navy-800` | `#0F2438` | Raised panels, cards, nav bar |
| `--navy-700` | `#16324B` | Card hover, inset wells |
| `--navy-600` | `#1F4460` | Borders on dark, dividers |
| `--brass-500` | `#C9A227` | **Primary accent.** CTAs, rules, active states, numerals |
| `--brass-400` | `#DCBB4B` | Brass hover / lighter fill |
| `--brass-100` | `#F5E9C0` | Brass tint on dark, subtle badges |
| `--brass-700` | `#7A5F0F` | **Text-safe brass on paper sections** — `brass-500` fails on light grounds |
| `--cream-50` | `#F2EDE3` | Primary text on navy |
| `--cream-200` | `#D9D2C4` | Secondary text on navy |
| `--slate-400` | `#8A99A8` | Muted/meta text, captions |
| `--teal-500` | `#2E7D8F` | Signal — "in stock", "port active". **Fills, borders and dots only** |
| `--teal-300` | `#57AFC2` | Text-safe teal on navy |
| `--rust-500` | `#B4552F` | Urgent / "24×7 emergency". **Fills, borders and dots only** |
| `--rust-300` | `#D97A4E` | Text-safe rust on navy |
| `--paper-50` | `#FBF9F5` | Light-section ground (product catalogue, docs) |
| `--ink-900` | `#0A1B2A` | Text on light sections (same navy, reused) |

**Usage ratio:** roughly 70% navy family, 20% cream/paper, 8% brass, 2% teal/rust. Brass is punctuation, never paragraph.

**Light/dark:** the site is dark-first by design. The catalogue and document-heavy pages use `--paper-50` sections *within* the dark shell for readability — this alternation is a deliberate rhythm device, not a theme toggle. No user-facing theme switcher in v1.

### 2.2 Typography

| Role | Family | Weight / Size | Notes |
|---|---|---|---|
| Display / H1 | **Fraunces** (variable serif) | 600, `clamp(2.75rem, 6vw, 5rem)`, `-0.02em`, `line-height: 0.98` | Optical size axis set high. Gives the heritage-shipping-house feel. |
| H2 | Fraunces | 600, `clamp(2rem, 3.5vw, 3rem)` | |
| H3 / card titles | **Inter** | 600, `1.25rem`, `-0.01em` | |
| Body | Inter | 400, `1.0625rem`, `line-height: 1.65` | Max measure `68ch` |
| Eyebrow / label | Inter | 600, `0.75rem`, `0.14em` letterspacing, uppercase | Always brass or teal |
| Data / specs / IMO numbers | **JetBrains Mono** | 400/500, `0.875rem` | Port codes, part numbers, coordinates |

Load via `next/font/google` with `display: 'swap'`, subset `latin`. Three families is the ceiling — do not add a fourth.

### 2.3 Spatial system

- **Base unit:** 4px. Tailwind default scale.
- **Section vertical rhythm:** `py-20` mobile → `py-32` desktop. Hero is `min-h-[88vh]`.
- **Container:** `max-w-[1280px]`, `px-5` mobile / `px-10` desktop.
- **Grid:** 12-column desktop, 6-column tablet, 4-column mobile, `gap-6`.
- **Radius:** `rounded-sm` 2px (buttons, chips, badges) · `rounded-md` 4px (cards, inputs, panels) · `rounded-lg` 6px (images, hero media). Deliberately tight — sharp corners read as engineering, pill shapes read as consumer SaaS. Every surface uses an explicit step; Tailwind v4's bare `rounded` is not token-driven, so it is never used.
- **Borders:** `1px solid var(--navy-600)` on dark, `1px solid rgba(10,27,42,0.10)` on paper.

### 2.4 Maritime design motifs

These are what make the site read as *marine* rather than as a generic dark corporate template. Use sparingly and consistently.

1. **Hairline rule with a brass terminal** — a 1px cream/20% horizontal rule that ends in a 6px brass square. Section dividers and under-headline accents. Evokes a chart's scale bar.
2. **Depth-sounding numerals** — big statistics set in Fraunces with a brass `—` underline, and a small mono unit label beneath. Reads like a depth chart annotation.
3. **Compass rose watermark** — an 8-point rose as a 4%-opacity SVG, 640px, bleeding off the top-right of the hero and the footer. Never interactive, `aria-hidden`.
4. **Rope/chain divider** — a repeating 1px SVG link pattern used *once* per page maximum, between the trust band and the footer.
5. **Wave-cut section edge** — a very shallow (24px amplitude) SVG wave mask on the transition from a navy section into a paper section. Subtle; it should be noticed only on second look.
6. **Port tags** — UN/LOCODE codes (`INIXY`, `INMUN`) in JetBrains Mono inside a 1px teal outline chip. Used on the ports map and in supply-capability lists.
7. **Plimsoll mark** — the load-line disc, used as the favicon and as the bullet glyph in feature lists.
8. **Grid-on-navy texture** — a 48px nautical-chart grid at 3% opacity behind dark sections, fading out at the bottom via mask-image. Gives the flat navy some tooth.

### 2.5 Motion

Framer Motion, but restrained — this is a trust site, not a showreel.

- **Section entrance:** `opacity 0→1`, `y 24px→0`, `duration .6s`, `ease [0.22, 1, 0.36, 1]`, triggered at 20% viewport, `once: true`.
- **Card grids:** stagger children by `60ms`.
- **Statistic counters:** count up over `1.4s` when scrolled into view, once.
- **Hero:** the background image scales `1.06 → 1.0` over `1.2s` on load. No parallax on scroll (cheap-looking, and hurts CLS).
- **Hover:** cards lift `translateY(-4px)` + border goes brass, `180ms`.
- **Respect `prefers-reduced-motion: reduce`** — all of the above collapses to instant opacity changes. Non-negotiable.

### 2.6 Imagery direction

- **Hero:** a single strong photograph — a supply vessel alongside at night, cranes lit, or a bunker barge at a container terminal. Dark, cool-toned, with a `linear-gradient(to right, var(--navy-900) 0%, rgba(10,27,42,.6) 55%, transparent 100%)` scrim so the cream headline holds contrast ≥ 7:1.
- **Category cards:** square-cropped photographs of the actual goods (crates of provisions, coiled mooring rope, lifejacket racks, drums of lube oil), each with a navy `40%` multiply overlay that lifts to `20%` on hover. This is the single biggest visual upgrade over the reference sites — Royal Marine uses icons, Mahir uses photos, and Mahir wins.
- **Team/facility:** real warehouse and jetty photography, never stock handshakes.
- **Format:** AVIF with WebP fallback via `next/image`. Hero `priority`, everything else lazy. Every image gets an explicit `sizes`.
- **Delivered as:** pre-generated AVIF + WebP at two widths per slot with a 20px blurred LQIP inlined as a data URI, served through `<picture>` by `src/components/media/photo.tsx`. Hero is `eager`/`fetchPriority=high`; everything else lazy-loads. Total image payload 4.5 MB across 80 files, hero 138 KB AVIF at 1600px.
- **Placeholders:** `<PhotoPlaceholder>` remains as the fallback for any slot with no photograph, so a missing image shows a visible "photo pending" tag rather than a blank box.

### 2.7 Accessibility floor

Target is WCAG 2.2 AA. Every ratio below is **measured from the actual token values**, not estimated. The measurement pass changed the palette: three pairs failed and three tokens were added to fix them.

| Foreground | Ground | Ratio | Verdict |
|---|---|---:|---|
| `cream-50` | `navy-900` | 14.96:1 | AA body |
| `cream-200` | `navy-900` | 11.61:1 | AA body |
| `brass-400` | `navy-900` | 9.35:1 | AA body |
| `brass-500` | `navy-900` | 7.22:1 | AA body (reserved for accents by style rule, not by contrast) |
| `teal-300` | `navy-900` | 6.91:1 | AA body — **added** |
| `slate-400` | `navy-900` | 5.99:1 | AA body |
| `rust-300` | `navy-900` | 5.69:1 | AA body — **added** |
| `teal-500` | `navy-900` | 3.70:1 | Large text / UI only |
| `rust-500` | `navy-900` | 3.56:1 | Large text / UI only |
| `ink-900` | `paper-50` | 16.60:1 | AA body |
| `brass-700` | `paper-50` | 5.75:1 | AA body — **added** |
| `rust-500` | `paper-50` | 4.66:1 | AA body |
| `teal-500` | `paper-50` | 4.49:1 | Large text only (marginal) |
| `brass-500` | `paper-50` | **2.30:1** | **Fails. Never use brass-500 as text on paper.** |
| `navy-900` | `brass-500` | 7.22:1 | AA body — the primary button label |

Rules that follow from the table:
- **`teal-500` and `rust-500` are fills, borders and dots — never body copy.** Use `teal-300` / `rust-300` for text on navy.
- **`brass-500` must never be text on a paper section.** Light sections use `brass-700` for accents and `ink-900` for copy.

Plus:
- Visible focus: `2px solid var(--brass-500)` with `2px` offset, on every interactive element.
- All motifs `aria-hidden` and `pointer-events-none`. Skip-to-content link as the first tab stop.
- Full keyboard path through nav, mega-menu, quote form and gallery.
- Forms: real `<label>`s, `aria-describedby` error text, no placeholder-as-label.
- `prefers-reduced-motion: reduce` collapses every entrance animation and counter.
- Verified with axe-core on every template before launch.

The contrast script lives at `scripts/contrast.mjs` — re-run it after any palette change.

---

## 3. Information Architecture

```
/                               Home
/about                          About Mishk Overseas
  /about/certifications         ISO, ISSA/IMPA membership, licences
/supplies                       Ship Chandling overview (catalogue hub)
  /supplies/provisions
  /supplies/bonded-stores
  /supplies/deck-stores
  /supplies/engine-stores
  /supplies/cabin-stores
  /supplies/safety-equipment
  /supplies/lubricants-chemicals
  /supplies/marine-paints
  /supplies/electrical-stores
  /supplies/charts-publications
  /supplies/medical-supplies
/services                       Technical Services overview
  /services/ship-repair
  /services/spares-procurement
  /services/motor-rewinding
  /services/fabrication-welding
  /services/mechanical-electrical
  /services/riding-squads
/ports                          Ports We Serve (map + list)
  /ports/[slug]                 Per-port page — 12 to 15 key ports only
/quote                          Request a Quote (the money page)
/contact                        Contact + offices + 24×7 desk
/clients                        Clients & partners
/insights                       Blog / notices (MDX) — phase 3
  /insights/[slug]
/legal/privacy
/legal/terms
```

**Navigation bar:** `Supplies ▾ · Services ▾ · Ports · About ▾ · Contact` + a persistent brass **Request a Quote** button, and a mono `+91 ·············· · 24×7` strip.

`Supplies` and `Services` open a **mega-menu**: two columns of categories with 20px line icons, plus a right-hand promo panel ("Download the 2026 catalogue →"). On mobile these become an accordion inside a full-screen drawer.

---

## 4. Page Specifications

### 4.1 Home

Sections in order. Each is a component in `src/components/sections/`.

| # | Section | Spec |
|---|---|---|
| 1 | **Top utility strip** | Navy-800, 36px. Left: `24×7 GLOBAL SUPPLY DESK` with a pulsing teal dot. Right: phone, email, WhatsApp. Hidden below `md`, where it collapses into the drawer. |
| 2 | **Header** | Transparent over hero, becomes `navy-900/92` + `backdrop-blur-md` + bottom hairline after 80px scroll. Logo left, nav centre, brass CTA right. |
| 3 | **Hero** | `min-h-[88vh]`. Eyebrow `SHIP CHANDLING & MARINE TECHNICAL SERVICES`. H1 **"Supplying the world's fleet, port after port."** Sub: one sentence naming chandling + repair + 24×7 + ports count. Two CTAs: brass filled `Request a Quote`, cream outline `Browse Supplies`. Bottom-left: three inline proof chips — `48+ Ports`, `24/7 Response`, `ISO 9001:2015`. Compass rose watermark top-right. |
| 4 | **Proof bar** | Full-bleed navy-800 band, 4 depth-sounding numerals: *Ports Served · Vessels Supplied · Years in Trade · Avg. Response Time*. Counts up on scroll. Borrowed from ShipSmith, executed better. |
| 5 | **Two disciplines** | Two large side-by-side cards, each with a photograph, a heading (`Ship Supplies` / `Technical Services`), 4 bullet capabilities, and a brass text link. The clearest possible statement of what the company does. |
| 6 | **Supply categories** | The centrepiece. 11 photo cards in a 4/2/1 responsive grid. Each: square photo, navy overlay, category name in Inter 600, one-line descriptor, brass arrow on hover. Links to the category page. |
| 7 | **Ports we serve** | Split layout. Left: a stylised SVG map of India + Gulf with brass port dots (hover shows the port name + LOCODE). Right: a 3-column list of port names, each a `/ports/[slug]` link. CTA: `View all ports →`. |
| 8 | **How we work** | 4-step horizontal timeline on a brass hairline: *Enquiry received → Quotation within 2 hours → Sourcing & QC → Delivery alongside*. Mono step numbers. Sets service expectations and pre-answers the buyer's first question. |
| 9 | **Why Mishk** | Paper-50 section (first light break — entered through the wave-cut edge). 6 items, 2×3 grid, Plimsoll bullets: Single-window sourcing · IMPA/ISSA-coded catalogue · Own warehousing · QC on every consignment · Transparent pricing · 24×7 desk. |
| 10 | **Clients & partners** | Grayscale logo wall, brass-tinted on hover. Under it, a line of named principals. George Marine proves this section converts. |
| 11 | **Testimonials** | Three cards, navy-800, brass open-quote glyph, name + rank + vessel type. |
| 12 | **Certifications** | Horizontal strip of certificate marks (ISO 9001:2015, ISSA, IMPA, FSSAI, customs licence) in mono captions, linking to `/about/certifications`. |
| 13 | **Quote CTA** | Full-bleed dark photograph with heavy navy scrim. H2 **"Vessel inbound? Send us the requisition."** Brass CTA + a mono line: `Quotations returned within 2 hours, 24×7`. |
| 14 | **Footer** | 4 columns: company + logo + one-line description + socials · Supplies links · Services links · Offices (address blocks, phones, emails). Chain-link divider above. Bottom bar: copyright, legal links, `Made for the maritime trade` micro-line. Compass rose watermark bottom-right. |

### 4.2 Supply category page — `/supplies/[category]`

Reusable template, driven by data.

1. Compact hero: breadcrumb, category name (Fraunces), one-paragraph intro, category photograph at 40% width right.
2. **Item table** — the substance. Columns: `Item`, `IMPA Code` (mono), `Unit`, `Availability` (teal chip). Searchable and filterable client-side. This is what no competitor offers, and it is the single strongest differentiator for a buyer comparing four chandlers.
3. Photo gallery, 6 images, lightbox.
4. **Quality & handling** — cold-chain, HACCP, packing, documentation.
5. Inline mini quote form pre-filled with the category.
6. Related categories strip.

### 4.3 Service page — `/services/[service]`

1. Compact hero with breadcrumb.
2. Overview paragraph + capability bullets.
3. **Scope of work** — 2-column list of exactly what is and is not included.
4. Equipment / workshop capability table (mono specs).
5. Case note: 2–3 short anonymised jobs — vessel type, port, problem, turnaround.
6. Quote CTA.

### 4.4 Ports — `/ports` and `/ports/[slug]`

- **Index:** interactive SVG map, plus ports grouped by coast (West Coast, East Coast, Gulf & International). Each card: port name, LOCODE chip, services available there, a `Supply here →` link.
- **Detail:** port name + LOCODE, what Mishk supplies there, local agent contact, typical delivery lead time, anchorage vs alongside capability, nearby ports. These pages are the SEO engine — "ship chandler Mundra", "marine supplier Kandla" are exactly what buyers type.

### 4.5 Quote — `/quote`

Two-column: form left, reassurance panel right (2-hour response promise, 24×7 numbers, WhatsApp, "or email your requisition to …").

Form fields: Vessel name · IMO number (mono) · Port of call · ETA / ETD (date) · Categories required (multi-select chips) · Requisition upload (PDF/XLS, ≤10 MB) · Message · Company · Contact name · Email · Phone. Honeypot + rate limit; no CAPTCHA unless spam appears.

Submission: Next Server Action → Resend transactional email to the ops desk + autoresponder to the buyer → row appended to a Google Sheet (or Postgres in phase 3). Success state is a full panel with a reference number, not a toast.

### 4.6 About / Contact / Clients

- **About:** founding story, timeline (brass hairline with year markers), leadership cards, warehouse/facility photography, values, certifications teaser.
- **Contact:** office cards (HQ + branch), embedded map, 24×7 emergency block in rust-500, general enquiry form, and a mono line listing GST/IEC numbers — small detail, disproportionate trust payoff in B2B trade.
- **Clients:** logo wall, named shipping lines, principal brand partnerships, testimonials.

---

## 5. Component Inventory

```
src/components/
  layout/       Header · MegaMenu · MobileDrawer · Footer · UtilityStrip · Container · Section
  ui/           Button · Card · Badge · Chip · Input · Select · Textarea · FileDrop
                Accordion · Dialog · Tabs · Breadcrumb · Table        (shadcn/ui, retokenised)
  marine/       CompassRose · HairlineRule · ChainDivider · WaveEdge
                ChartGrid · PortTag · PlimsollBullet · DepthStat
  sections/     Hero · ProofBar · Disciplines · CategoryGrid · PortsMap
                ProcessTimeline · WhyUs · LogoWall · Testimonials
                CertStrip · QuoteCTA
  forms/        QuoteForm · ContactForm · MiniQuoteForm
  catalogue/    CategoryCard · ItemTable · ItemFilter · Lightbox
```

Every shadcn primitive is re-skinned to the tokens above on install — no default shadcn look survives into production.

---

## 6. Data Model

Content lives as typed TypeScript in `src/data/` for v1 (no CMS). Structured so a headless CMS can replace it later without touching components.

```ts
// src/data/types.ts
export type SupplyCategory = {
  slug: string; name: string; tagline: string;
  description: string;           // 2–3 paragraphs
  image: string; gallery: string[];
  items: SupplyItem[];
  quality: string[];             // handling / QC notes
  related: string[];             // category slugs
  seo: { title: string; description: string };
};

export type SupplyItem = {
  name: string; impaCode?: string; unit: string;
  availability: 'stock' | 'indent' | 'on-request';
};

export type Service = {
  slug: string; name: string; tagline: string;
  description: string; image: string;
  capabilities: string[];
  scope: { included: string[]; excluded: string[] };
  equipment?: { item: string; spec: string }[];
  cases?: { vessel: string; port: string; problem: string; turnaround: string }[];
  seo: { title: string; description: string };
};

export type Port = {
  slug: string; name: string; locode: string;
  coast: 'west' | 'east' | 'gulf' | 'international';
  lat: number; lng: number;      // for the SVG map
  services: string[];            // category + service slugs
  leadTime: string;              // e.g. "4–6 hours"
  alongside: boolean; anchorage: boolean;
  agent?: { name: string; phone: string; email: string };
  notes: string;
};
```

Files: `supplies.ts`, `services.ts`, `ports.ts`, `clients.ts`, `testimonials.ts`, `certifications.ts`, `offices.ts`, `site.ts` (global config — phones, emails, socials, stats).

---

## 7. Project Structure

```
mishk-overseas/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              fonts, metadata, JSON-LD, skip link
│  │  ├─ page.tsx                home
│  │  ├─ globals.css             @theme tokens, base layer
│  │  ├─ about/                  page.tsx + certifications/page.tsx
│  │  ├─ supplies/               page.tsx + [category]/page.tsx
│  │  ├─ services/               page.tsx + [service]/page.tsx
│  │  ├─ ports/                  page.tsx + [slug]/page.tsx
│  │  ├─ quote/                  page.tsx + actions.ts
│  │  ├─ contact/ clients/ legal/
│  │  ├─ sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
│  ├─ components/                (see §5)
│  ├─ data/                      (see §6)
│  ├─ lib/                       utils.ts · seo.ts · validation.ts (zod) · mail.ts
│  └─ hooks/                     useScrolled · useCountUp · useMediaQuery
├─ public/
│  ├─ img/{hero,categories,services,ports,team,clients,placeholder}/
│  ├─ docs/mishk-overseas-catalogue-2026.pdf
│  └─ favicon.ico  (Plimsoll mark)
├─ ASSETS.md                     photography + copy still owed by the client
├─ IMPLEMENTATION.md             this file
└─ README.md
```

---

## 8. SEO & Performance

**SEO**
- Per-route `generateMetadata`; unique title + 150-char description on every page.
- JSON-LD: `Organization` + `LocalBusiness` in the root layout; `Service` on service pages; `BreadcrumbList` on all nested routes; `FAQPage` on the quote page.
- `sitemap.ts` generated from the data files so new ports and categories are indexed automatically.
- **Primary targets:** `ship chandler [port]`, `marine supplier India`, `ship supply [port]`, `bonded stores [port]`, `ship repair [port]`. The `/ports/[slug]` pages exist specifically to own these; competitors have no equivalent.
- `opengraph-image.tsx` generating a branded navy/brass OG card per route.

**Performance — measured, not estimated**

Run `npm run build && npm run start`, then `npm run perf`. Figures below are gzipped bytes as served:

| Route | HTML | JS | CSS | App JS |
|---|---:|---:|---:|---:|
| `/` | 30 KB | 188 KB | 11 KB | 28 KB |
| `/supplies/provisions` | 18 KB | 196 KB | 11 KB | 36 KB |
| `/supplies/catalogue` | 23 KB | 187 KB | 11 KB | 27 KB |
| `/ports/mundra` | 16 KB | 187 KB | 11 KB | 27 KB |
| `/quote` | 15 KB | 187 KB | 11 KB | 27 KB |

> **Budget correction.** This document originally specified "route JS ≤ 130 KB gzipped". That target is **not achievable on this stack** — React 19 plus the Next 16 App Router is a ~160 KB gzipped floor before a line of application code runs (three vendor chunks at 70/44/39 KB). The budget is therefore restated as **app code ≤ 60 KB above the framework floor**, which every route meets at 27–36 KB. `npm run perf` exits non-zero if a route breaches it.

- Everything is static (SSG) except the two Server Actions. 84 pages prerendered.
- Fonts self-hosted via `next/font`, `display: swap`. OG cards use separate vendored static TTFs (satori cannot read variable fonts).
- No motion library — `Reveal` is ~40 lines of IntersectionObserver plus one CSS keyframe.
- Hero image, once supplied: ≤ 180 KB AVIF, `priority`, explicit dimensions.

**Not yet measured:** LCP, CLS, INP and Lighthouse scores all need a real browser. Run Lighthouse against the production build before launch — this project has had no browser pass.

---

## 9. Build Phases

| Phase | Scope | Est. |
|---|---|---|
| **0 — Setup** | ✅ *Done.* `create-next-app` (TS, Tailwind v4, App Router), Fraunces/Inter/JetBrains Mono, token layer in `globals.css`, base `Container`, lint clean, production build green. Remaining: Vercel deploy. | 0.5 d |
| **1 — Shell & design system** | ✅ *Done.* Token layer, three fonts, all eight `marine/` motifs, button/badge/card/input primitives, utility strip, header with accessible mega-menu, focus-trapped mobile drawer, four-column footer, and the `/styleguide` route documenting all of it. | 1.5 d |
| **2 — Home** | ✅ *Done.* All 14 sections built: hero, proof bar, two disciplines, 11-card category grid, ports chart plot, process timeline, why-us (paper break), logo wall, testimonials, cert strip, quote CTA. Entrance motion + counters wired with a no-JS fallback. Imagery is placeholdered. | 2 d |
| **3 — Data + catalogue** | ✅ *Done.* `supplies.ts` with 11 categories / 198 lines, `/supplies` hub, `[category]` template (11 SSG pages), searchable + filterable item table, keyboard-driven gallery lightbox, breadcrumbs, related categories. Plus `sitemap.ts`, `robots.ts`, `metadataBase` and a branded 404. **IMPA codes deliberately unpopulated** — see below. | 2 d |
| **4 — Services + ports** | ✅ *Done.* `services.ts` (6 lines with scope in/out), `/services` hub + template (6 SSG pages), `/ports` index with the shared chart plot, `/ports/[slug]` (21 SSG pages) with per-port metadata and `Service` JSON-LD. Sitemap flags flipped — 42 live URLs. **Equipment specs and case notes deliberately unpopulated.** | 1.5 d |
| **5 — Forms & remaining pages** | ✅ *Done.* Quote page with Server Action, zod validation, honeypot, rate limiter, 10 MB attachment handling, Resend delivery + autoresponder and a quotable reference. Contact page with its own action. About, certifications, clients, and privacy/terms drafts. Sitemap flags flipped — 47 live URLs. 19 validation tests via `npm run test:forms`. | 1.5 d |
| **6 — Polish & launch** | 🟨 *Mostly done.* 20 licensed photographs sourced, cropped and encoded (AVIF + WebP, two widths, inline LQIP) with a `/credits` attribution page; certifications removed from scope; dynamic OG cards; `Organization` JSON-LD; axe audit clean across 16 routes; payload budget measured and corrected; downloadable catalogue pulled forward from phase 7. **Outstanding:** Lighthouse/browser pass, client's own photography, analytics decision, domain + DNS. | 1.5 d |
| **7 — Phase 2 (later)** | MDX insights/blog, multilingual, CMS migration (Sanity/Payload), quote-tracking dashboard | — |

**Total for a launchable v1: ~10.5 working days.**

---

## 10. Content the Client Must Provide

Tracked in `ASSETS.md`, blocking phase 6.

1. **Verified company facts** — founding year, exact ports served, vessels supplied to date, registered addresses, GST/IEC, all phone numbers and emails, WhatsApp business number.
2. **Certifications** — ISO 9001:2015 certificate, ISSA/IMPA membership numbers, FSSAI licence, customs/port licences (scans).
3. **Photography** — warehouse interior, goods on pallets, delivery van/launch, team at work, at least one strong port/vessel hero shot. Minimum 25 usable images.
4. **Logos** — Mishk Overseas logo in SVG, plus client and principal logos with permission to display.
5. **Catalogue** — the item list per category, ideally with IMPA codes, as a spreadsheet.
6. **Testimonials** — three, with attribution permission.
7. **Legal copy** — privacy policy and terms, reviewed by the client.

Until these arrive, the site builds and ships against clearly-marked placeholder data in `src/data/` so no phase is blocked.

---

## 11. Decisions Recorded

- **Dark-first, not light.** Every competitor is white-and-blue. A navy-and-brass site is remembered; a white-and-blue one is compared on price.
- **No theme toggle in v1.** The alternating navy/paper rhythm is the design; a toggle would break it for no user benefit.
- **IMPA-coded item tables.** The highest-leverage content decision. It converts the site from a brochure into a procurement tool.
- **IMPA codes are NOT invented.** The column, its search and its styling are built, but values render as `pending` until the client's coded spreadsheet arrives. A wrong six-digit code is not a cosmetic placeholder — a purchasing officer could order the wrong part from it. Every category page carries a visible notice saying so. Populate `impaCode` in `src/data/supplies.ts` from the client file, never by inference.
- **Photography is licensed stock, credited, and never passed off as theirs.** 20 images from Wikimedia Commons under licences allowing commercial use. Several are CC BY / CC BY-SA, so `/credits` — author, licence, source per image, linked from the footer — is a **licence condition, not a courtesy**. The About page deliberately uses a port scene rather than a warehouse: a stock warehouse photo beside copy about "our own warehousing" would read as a picture of theirs. Swap in real photography via `scripts/photos/`.
- **The category gallery is built but not mounted.** One photograph repeated six times is not a gallery. `<Gallery>` is complete and keyboard-driven; it re-enables the moment per-category photo sets exist.
- **Certifications removed at the client's request.** The page, homepage strip, hero badge and nav links are gone; nothing certification-related is claimed anywhere.
- **The catalogue download is a live page, not a PDF file.** `/supplies/catalogue` renders the whole catalogue with a print stylesheet (Save as PDF gives a document generated from current data), and `/supplies/catalogue.csv` streams the same data for pasting into a requisition. A hand-made PDF brochure would drift from the site the moment a line changed; this cannot.
- **Analytics: none installed, deliberately.** The privacy policy currently states truthfully that the site sets no cookies and runs no trackers, which is a genuine (if small) trust asset for a B2B buyer. If analytics are wanted, prefer a cookieless option (Plausible, Vercel Analytics) — **and update the privacy policy before it goes live.**
- **The forms never report success they did not achieve.** `src/lib/mail.ts` returns `{ ok: false }` when Resend is unconfigured or a send fails; the action then surfaces a failure with the phone and email fallback and writes the submission to the server log. A quote form that silently swallows a requisition is worse than no form — the buyer believes the order is in hand and finds out at the berth. Both form pages also warn *before* the user types when email is not configured.
- **Legal documents ship as marked drafts and are `noindex`.** Privacy and terms are written to industry norms but carry a visible "not legally reviewed" banner and are excluded from the sitemap. They need review against India's DPDP Act 2023 and the GDPR. Remove the banner in `legal-page.tsx` — one place — when counsel signs off.
- **Certificate numbers, client names and leadership profiles are NOT invented.** A certificate number is something an auditor verifies; naming a shipping line as a customer without permission is both false and a commercial risk; inventing people is straightforwardly dishonest. All three render as pending panels.
- **Equipment specs and case notes are NOT invented.** Describing what a service *is* is safe; claiming a specific lathe capacity or a specific past job is a capability and track-record claim a buyer would rely on. Both render as visible "pending" panels. `scope.included` / `scope.excluded` ARE written — to industry norms — but they are a commercial commitment and each page says on its face that they need client sign-off.
- **Port pages carry a duplicate-content risk until `notes` is filled.** The 21 pages differ by name, LOCODE, coordinates, lead time, delivery mode and nearby ports, but the supplies and services blocks are identical across all of them. `Port.notes` exists for two or three sentences of genuine local knowledge per port — berths, anchorage practice, customs quirks — and only the client can write it. The section renders only when the field is populated.
- **The sitemap only emits routes that exist.** `src/app/sitemap.ts` carries a `BUILT` flag per route group; phases 4 and 5 flip them on. A sitemap advertising 404s is worse than a short one.
- **Per-port pages.** The only realistic path to ranking against established chandlers.
- **A chart plot, not a map.** The ports section projects real lat/lng onto a graticule with an indicative coastline, rather than drawing approximate cartography. It reads as a nautical chart, it is honest about precision, and it costs no map library.
- **No motion library.** `Reveal` is ~40 lines of IntersectionObserver plus one CSS keyframe. Framer Motion was specced in §2.5 but was not needed for the entrance/stagger/counter set, and omitting it keeps the route JS budget intact.
- **Typed TS data, not a CMS, in v1.** Ships faster, costs nothing to host, and the shape above migrates to Sanity or Payload in under a day when editing by non-developers actually becomes a need.
- **Three fonts, hard cap.** Fraunces (display), Inter (UI), JetBrains Mono (data).

---

## 12. Next Step

Approve this plan, then phase 0 begins: scaffold the Next.js app, lay in the token layer, and stand up `/styleguide` so the design system can be reviewed visually before a single page is built.
