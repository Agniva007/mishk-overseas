# Mishk Overseas

Ship chandling and marine technical services. Next.js 15 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

- **`/`** — placeholder homepage (real build is phase 2)
- **`/styleguide`** — the design system, rendered live. Start here.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run contrast` | WCAG audit of the palette — **run after any colour change** |
| `npm run test:forms` | Validation and rate-limit checks for the quote/contact forms |
| `npm run audit:a11y` | axe-core audit over 15 routes (needs a running server) |
| `npm run perf` | Gzipped payload budget (needs `npm run start`) |

## Environment

Copy `.env.example` to `.env.local`. **The quote and contact forms cannot send
until `RESEND_API_KEY` and `MAIL_TO` are set** — until then both pages show a
visible "not connected" warning and every submission returns an explicit
failure with the phone/email fallback. They never fake success.

## Deployment

See [`DEPLOY.md`](./DEPLOY.md). Outstanding content is tracked in
[`ASSETS.md`](./ASSETS.md).

## Design system

Deep Navy + Brass, dark-first. Full specification in [`IMPLEMENTATION.md`](./IMPLEMENTATION.md):

- §2.1 colour tokens · §2.2 typography · §2.4 the eight marine motifs · §2.7 measured contrast
- Tokens are defined once in `src/app/globals.css` under `@theme` and consumed as Tailwind utilities. Never hard-code a hex outside that block.

### Structure

```
src/
  app/styleguide/     the living design system
  components/marine/  the eight maritime motifs
  components/ui/      button, badge, card, input — retokenised primitives
  components/layout/  container
  hooks/              use-count-up
  lib/utils.ts        cn()
scripts/contrast.mjs  palette accessibility audit
```

## Colour rules worth knowing before you write CSS

- `teal-500` / `rust-500` are **fills, borders and dots only** — 3.7:1 and 3.6:1 on navy. Use `teal-300` / `rust-300` for text.
- `brass-500` **must never be text on a paper section** — 2.30:1. Use `brass-700`.
- Bare Tailwind `rounded` is not token-driven in v4. Always use `rounded-sm` / `rounded-md` / `rounded-lg`.

## Photography

20 licensed images from Wikimedia Commons live in `public/img/` (AVIF + WebP,
two widths each). The manifest is **generated** — edit
`scripts/photos/selection.json`, not `src/data/photos.ts`, then run:

```bash
node scripts/photos/build.mjs
```

**`/credits` is a licence condition.** Several images are CC BY / CC BY-SA,
which require attribution. Do not delete that page or unlink it from the footer.

These are illustrative stock images, not photographs of the company's own
premises or staff, and must never be captioned as though they were.

## Two traps worth knowing

- **Do not import from `src/lib/validation.ts` in a client component.** It
  imports zod at module scope; a constant pulled from there ships ~390 KB of
  zod to the browser. Use `src/lib/form-constants.ts` instead.
- **OG cards need static font files.** Satori cannot parse the variable
  Fraunces the site uses, so `src/assets/fonts/` holds static cuts used only
  at build time.
- **`sharp`'s `position: "attention"` crop occasionally lands on a blurred
  foreground.** Set `"position": "centre"` for that slot in
  `scripts/photos/selection.json` and rebuild. Always check the result —
  `node scripts/photos/sheet.mjs <dir> <out.jpg>` makes a contact sheet.
