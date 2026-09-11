# Deployment

The site is fully static except two Server Actions (quote and contact), so any
Node-capable host works. Vercel is the path of least resistance for Next 16.

---

## 1. Before you deploy

| Check | Why |
|---|---|
| Set `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` | **The forms cannot send without these.** They will show a visible "not connected" warning and refuse every submission. See ASSETS.md §9b. |
| Set `site.url` in `src/data/site.ts` to the real domain | Drives canonicals, Open Graph URLs and the sitemap. Wrong value = wrong canonicals across 84 pages. |
| Verify the `MAIL_FROM` sending domain in Resend | Unverified domains bounce. |
| Replace the placeholder contact details | `grep -rn "PLACEHOLDER" src/` |

## 2. Environment variables

Copy `.env.example`. On Vercel, set these under Project → Settings →
Environment Variables for **Production** and **Preview**.

```
RESEND_API_KEY=re_...
MAIL_FROM="Mishk Overseas <supply@yourdomain.com>"
MAIL_TO=supply@yourdomain.com
```

## 3. Deploy

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or connect the Git repository in the Vercel dashboard — it detects Next.js
with no configuration.

## 4. Domain & DNS

1. Add the domain in Vercel → Project → Settings → Domains.
2. Point DNS at Vercel (`A 76.76.21.21`, or `CNAME cname.vercel-dns.com` for
   a subdomain — use the values Vercel shows, they change).
3. Wait for the TLS certificate to issue.
4. Redirect `www` → apex (or the reverse), and **keep it consistent with
   `site.url`** or canonicals will fight the redirect.

## 5. After deploying

```bash
# Payload budget against the live site
PERF_BASE=https://yourdomain.com npm run perf

# Accessibility audit against the live site
AUDIT_BASE=https://yourdomain.com npm run audit:a11y
```

Then, in a browser — none of this has been verified in one yet:

- **Run Lighthouse** on `/`, a category page and `/quote`. LCP, CLS and INP
  have never been measured on this project.
- **Run axe DevTools** on the same pages. The scripted audit uses jsdom, which
  has no layout engine and therefore skips colour-contrast and target-size.
- **Send a real test requisition** through `/quote`, including an attachment,
  and confirm both the ops email and the autoresponder arrive.
- **Check the OG cards** with the LinkedIn Post Inspector and
  `https://cards-dev.twitter.com/validator` — port pages each have their own.

## 6. Search Console

1. Verify the domain.
2. Submit `https://yourdomain.com/sitemap.xml` (48 URLs).
3. The `/ports/[slug]` pages are the SEO engine — **they will underperform
   until `Port.notes` is populated** (ASSETS.md §11). Watch them for
   duplicate-content warnings.

## 7. Things that are deliberately not indexed

| Path | Why |
|---|---|
| `/styleguide` | Internal design reference. `noindex` + disallowed in robots.txt. |
| `/legal/privacy`, `/legal/terms` | Unreviewed drafts. `noindex` and excluded from the sitemap until counsel signs off — then remove the banner in `src/components/layout/legal-page.tsx`, drop the `robots` override, and add them to `sitemap.ts`. |

## 8. Rollback

Vercel keeps every deployment. Promote a previous one from the dashboard —
there is no database, so a rollback is complete and instant.
