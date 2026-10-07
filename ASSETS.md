# Assets & Content Register

Everything the client must supply before launch. Nothing here blocks the build —
the site runs against deliberately obvious placeholders — but none of it can
ship as-is.

**Status key:** ⬜ not received · 🟨 partial · ✅ received and in place

---

## 1. Verified company facts — ⬜ BLOCKING

Currently placeholdered in `src/data/site.ts`. Every value marked `PLACEHOLDER`
in that file needs replacing.

| Item | Current placeholder | Needed |
|---|---|---|
| Main phone | `+91 00000 00000` | Real switchboard number |
| 24×7 emergency line | `+91 00000 00000` | Real out-of-hours number |
| WhatsApp business number | `wa.me/910000000000` | Real WhatsApp link — now drives the floating button on **every** page, so a wrong number here is the most visible placeholder on the site |
| Email | `supply@mishkoverseas.com` | Confirm this is live |
| Head office address | `Address line 1/2, Gandhidham` | Full registered address |
| Branch address(es) | `Address line 1/2, Mumbai` | Confirm branches exist, full addresses |
| Founding year | — | For the About timeline |
| GST number | — | Footer / contact page |
| IEC number | — | Footer / contact page |
| LinkedIn / Instagram URLs | `#` | Real profile URLs |

> ⚠️ The placeholders are written as obviously-fake strings on purpose. Do not
> replace them with "realistic looking" stand-ins — a plausible wrong phone
> number that reaches production is worse than a visibly empty one.

## 2. Statistics — ⬜ BLOCKING

Used in the header proof bar and homepage. All four are currently invented.

- Global ports served (currently 148 — mirrors `ports.length`; keep the two in step)
- Vessels supplied (placeholder: 500+)
- Years in trade (placeholder: 20+)
- Quote turnaround (placeholder: 2 hr) — **this one is a public promise; confirm it is deliverable**

## 3. Ports list — 🟨 PLACEHOLDER SET IN PLACE

`src/data/ports.ts` holds **148 ports across 30 countries**, matching the
client's stated "we cover 148 global ports". **Coordinates and UN/LOCODEs are
real published values.** Everything else — which ports are actually served,
active vs. on-request status, lead times and agent arrangements — is invented
and must be confirmed or replaced.

The list is in two tiers, and the distinction drives the whole ports section:

| Tier | Count | What it means | Has a page? |
|---|---|---|---|
| `core` | 21 | Indian west/east coasts + the UAE hubs. Own desk, published lead times, alongside/anchorage known. | Yes — `/ports/[slug]` |
| `network` | 127 | The global reach: Saudi, Oman, Suez & Red Sea, Far East, South East Asia, Australia, Europe & Gibraltar, Americas & Panama, Africa. Served through appointed local agents, quoted case by case. | No — listed on `/ports` only |

**Why network ports have no detail page:** 127 pages differing only by name and
LOCODE would read as thin, duplicate content and drag the 21 core port pages
down with them. A network port earns a page when there is real local detail to
put on it — fill `notes` and flip `tier` to `core`. See §11.

**The chart plot** (`src/components/marine/world-chart.tsx`) shows **every**
port, core and network — a Mercator world chart over real Natural Earth
coastline (public domain; credited on `/credits`). Core ports burn brass,
network ports are teal rings. The coastline is generated, not hand-authored:
`npm run gen:world -- <ne_110m_land.json>` rewrites `src/data/world-outline.ts`,
and the header of that file carries the fetch URL and the tuning knobs.

The trade lanes drawn on it are indicative routes between hubs, tuned by eye
to bend around land. They are decoration with a point, not surveyed tracks —
if the client objects to any lane implying a service we do not run, delete it
from `LANES` in the chart component.

Confirm per core port:

- Port name and UN/LOCODE
- Alongside and/or anchorage capability
- Typical delivery lead time
- Which supply categories and services are available there
- Local agent contact, if any

Confirm per region for the network tier: that we can in fact cover it, and
which countries have a standing agent vs. an ad-hoc one. If the real list
differs in size, the `148` figure in `src/data/site.ts` → `stats` must change
with it — the pages themselves all read `ports.length`.

## 4. Certifications — ⛔ REMOVED FROM SCOPE

The certifications page, the homepage certification strip, the ISO badge in the
hero and the nav/footer links were **removed at the client's request**.

Nothing certification-related is claimed anywhere on the site. If certifications
are added back later, the pattern to follow is the one the other pending
sections use: list what is held, and leave certificate numbers and expiry dates
as visible `pending` until the documents are supplied — a certificate number is
something an auditor or vetting inspector will check.

## 5. Photography — 🟨 STOCK IN PLACE, OWN PHOTOGRAPHY STILL WANTED

**20 licensed photographs are now live**, sourced from Wikimedia Commons under
licences permitting commercial use and modification (CC0, public domain, CC BY,
CC BY-SA). They cover the hero, both discipline cards, all 11 supply categories
and all 6 service pages.

> ⚠️ **Attribution is a licence condition.** Several images are CC BY or
> CC BY-SA, which legally require author, licence and source to be credited.
> That is published at **`/credits`** and linked from the footer. **Deleting
> that page, unlinking it, or removing an entry from it breaches the licence.**

> ⚠️ **These are illustrative images, not Mishk Overseas' own premises, stock,
> staff or vessels**, and nothing on the site presents them as such. The About
> page deliberately uses a port scene rather than a warehouse, because a stock
> warehouse photo beside copy about "our own warehousing" would read as a
> picture of theirs.

**Still worth supplying — real photography always beats stock here:**

| Shot | Why it matters |
|---|---|
| The actual warehouse and racking | Replaces the About page port scene; lets the site show real capacity |
| Goods palletised and shrink-wrapped | Proof of handling standard |
| Delivery van / supply launch alongside | The thing buyers actually care about |
| Team at work (not posed) | The only way to show real people |
| 5–6 shots per supply category | **Re-enables the gallery** — see below |

**The gallery is built but not mounted.** `src/components/catalogue/gallery.tsx`
is complete (lightbox, Escape, arrow keys, focus restore, scroll lock) but is
not rendered on category pages, because one photograph repeated six times is not
a gallery. Supply per-category photo sets and it can be switched back on.

**To swap in real photography:** drop files into `scripts/photos/raw/`, update
`scripts/photos/selection.json`, run `node scripts/photos/build.mjs`. It
re-encodes AVIF + WebP at two widths, regenerates the blurred placeholders and
rewrites `src/data/photos.ts`. Remove the corresponding `/credits` entries only
when the stock image they describe is gone.

## 6. Logos — ⬜

- Mishk Overseas logo in **SVG** (the current mark is a placeholder Plimsoll disc)
- Client logos + written permission to display
- Principal / brand partner logos + permission

## 7. Stores catalogue — 🟨 STRUCTURE BUILT, CODES OUTSTANDING

`src/data/supplies.ts` holds 11 categories and 198 published lines with item
names and units of issue. Item names are generic marine goods and are safe to
publish as they stand.

**What is outstanding — and it is the important half:**

| Field | Status |
|---|---|
| Item names | ✅ In place, safe to publish |
| Unit of issue | ✅ In place |
| **IMPA codes** | ⬜ **Deliberately empty** — see below |
| Availability | 🟨 Illustrative only, not connected to stock |

> **IMPA codes were not invented, on purpose.** A wrong six-digit code is not a
> cosmetic placeholder — a purchasing officer could order the wrong part from
> it. The column is built and searchable; values render as `pending` and each
> category page carries a visible notice. Supply the coded spreadsheet and the
> codes drop straight into `impaCode` in `src/data/supplies.ts`.

Also confirm: which lines the company genuinely holds in stock vs. indents, and
whether any listed line should be removed.

## 7b. Spares catalogue — 🟨 STRUCTURE BUILT, VERIFICATION OUTSTANDING

`src/data/spares.ts` holds **15 equipment categories, 187 lines and 101 named
makes**. Assembly names are generic marine equipment terms and are safe to
publish.

**What the client must confirm:**

| Item | Why |
|---|---|
| **The maker list** | 101 makes are listed as "makes we source for". Confirm the company genuinely can source each, and add any it is known for. Remove any it cannot. |
| **Availability** | Every ex-stock / on-indent / on-request flag is illustrative. |
| **Exchange units** | Several categories offer parts "on exchange against a core". Confirm that is really offered. |
| **Category coverage** | Whether all 15 equipment categories are genuinely served. |

> **No maker part numbers are published, deliberately** — a number is
> meaningless without its nameplate and a wrong one is something a purchaser
> would order against. The tables name assemblies only. Do not add part numbers
> without a verified source.

> **The independent-trader wording on `/spares` is a legal statement**, not
> marketing copy: listing a manufacturer means we source parts for that
> equipment, not that we are an authorised distributor, agent or licensee. Do
> not soften or remove it.

## 8. Testimonials — ⬜

Three, with name, rank, company or vessel type, and permission to publish.

## 9. Legal copy — 🟨 DRAFTS PUBLISHED, REVIEW OUTSTANDING

`/legal/privacy` and `/legal/terms` are written and live, but they carry a
visible **"Draft — not legally reviewed"** banner, are set to `noindex`, and are
excluded from the sitemap.

**What they need:**
- Review by a lawyer against India's **DPDP Act 2023**, and the **GDPR** where
  EU-based counterparties are served.
- Registered entity name, address and **grievance officer** named in the privacy
  policy (a DPDP requirement).
- Confirmed **data retention period** for enquiry correspondence.
- Confirmed **cross-border transfer basis** — the hosting provider and Resend
  both process data outside India.
- **Governing law and jurisdiction** clause in the terms.

The privacy policy currently states truthfully that the site sets no cookies and
runs no analytics. **If analytics are added in phase 6, this policy must be
updated before they go live.**

Remove the draft banner in one place: `src/components/layout/legal-page.tsx`.
Then flip `/legal/*` into the sitemap and drop the `noindex`.

---

## 9b. Email delivery — ⬜ BLOCKING for the quote form

The quote and contact forms are fully built — validated, rate-limited, honeypot
protected, with attachment handling and a quotable reference — but **they cannot
send until email is configured.**

Set in the deployment environment (see `.env.example`):

| Variable | What it is |
|---|---|
| `RESEND_API_KEY` | API key from resend.com |
| `MAIL_FROM` | Sending address on a **verified** domain |
| `MAIL_TO` | The supply desk inbox that receives requisitions |

Until then both pages show a visible "Form not yet connected" warning *before*
the user types, and any submission returns an explicit failure with the phone
and email fallback. **The forms never report success they did not achieve** —
but that also means no requisition can arrive through the site until this is
done.

Also decide before launch: whether the server log is an acceptable fallback for
undeliverable submissions, or whether a database / Google Sheet write should be
added in `logUndeliverable()`. Logs are not durable.

## 10. Service capability detail — ⬜ BLOCKING for /services pages

`src/data/services.ts` has **22 service lines in 5 groups** with descriptions,
capability lists and scope boundaries. Two fields are deliberately empty:

| Field | Why it is empty |
|---|---|
| `equipment` | A lathe swing or rewinding rating the company does not have is a capability claim a buyer books a job on. Needs the real workshop inventory. |
| `cases` | "We fixed X at Y in Z hours" is a track-record claim. Needs real jobs, with permission to describe them. |

Both render as visible "Pending client detail" panels on the live pages.

**Also requires sign-off:** `scope.included` and `scope.excluded` on all 22
services are drafted to industry norms, but they are a **commercial
commitment** — what the company will and will not do for the quoted price. The
client must review every line before launch. Each page currently says so on its
face.

## 11. Per-port local knowledge — ⬜ BLOCKING for port page SEO

This is the single highest-value piece of outstanding content.

The 21 core `/ports/[slug]` pages currently differ only by name, LOCODE,
coordinates, lead time, delivery mode and nearby ports. The supplies and
services blocks are identical on every one of them, which search engines can
read as thin or duplicate content — on exactly the pages that are supposed to
rank for "ship chandler Mundra" and similar.

**What fixes it:** two or three sentences per port of genuine local knowledge —
which berths, anchorage practice, customs or immigration quirks, the local
agent arrangement, anything a competitor could not copy. Populate `notes` in
`src/data/ports.ts`. The section renders automatically once the field is filled
and stays hidden while it is empty.

Also confirm per port: whether coverage is real, alongside vs. anchorage
capability, and actual lead times. Coordinates are correct and need no review.

The same field is the gate for promoting a network port to its own page: write
`notes`, set `tier: "core"`, fill in `leadTime`, `alongside` and `anchorage`,
and the page, the sitemap entry and the OG card all appear on their own.

## 12. Browser verification — ⬜ NEVER DONE

**Nothing on this site has been checked in a real browser.** It was built and
verified through served HTML, compiled CSS, a jsdom accessibility audit and
transfer-size measurement — all of which catch structural faults but none of
which see the page.

Before launch, in an actual browser:

| Check | Why the scripted checks cannot cover it |
|---|---|
| **Lighthouse** on `/`, a category page, `/quote` | LCP, CLS and INP need a rendering engine. Never measured. |
| **axe DevTools** on the same pages | jsdom has no layout, so colour-contrast and target-size rules are skipped. (`npm run contrast` covers the token palette separately.) |
| **Visual pass at 375 / 768 / 1440px** | Layout, the mega-menu hover feel, the wave-cut section edges, the ports chart plot. |
| **Keyboard pass** | Mega-menu arrow keys, drawer focus trap, gallery lightbox. Logic is written and reviewed, never exercised. |
| **Real requisition through `/quote`** | Including an attachment — confirm the ops email and the autoresponder both arrive. |
| **Print `/supplies/catalogue`** | The print stylesheet has never been rendered. |
| **OG cards** in the LinkedIn Post Inspector | Confirm crops and text fit at real sizes. |

Placeholders are visible in the UI by design: images carry a **Photo pending**
tag, the logo wall is captioned as placeholder wordmarks, and testimonials are
attributed to "Name pending". Nothing fake-but-plausible is presented as real.

Run `grep -rn "PLACEHOLDER" src/` to find them.


## Where placeholders live in code

| File | What is placeholdered |
|---|---|
| `src/data/site.ts` | All contact details, addresses, statistics, social URLs |
| `src/data/ports.ts` | Port coverage, tier, active status, lead times (coordinates and LOCODEs are real) |
| `src/data/home.ts` | Client names, testimonials, certification claims |
| `src/data/services.ts` | Equipment specs, case notes (both empty); scope wording needs sign-off |
| `src/data/spares.ts` | Maker list, availability flags, exchange-basis claims |
| `.env.example` | `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` — forms cannot send until these are set |
| `src/components/layout/legal-page.tsx` | The "not legally reviewed" draft banner |
| `src/components/media/photo-placeholder.tsx` | Every image on the site — renders a visible "Photo pending" tag |
| `src/app/icon.svg` | Favicon — generic Plimsoll mark, replace with real brand mark |
| `public/img/` | Not yet populated; all imagery pending |
