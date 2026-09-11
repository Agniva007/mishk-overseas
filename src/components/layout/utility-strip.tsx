import { site } from "@/data/site";
import { Container } from "./container";

/**
 * The 36px strip above the header. Puts the 24×7 desk and the phone number
 * above the fold — the single highest-value thing the reference sites do.
 * Hidden below `md`, where it collapses into the mobile drawer.
 */
export function UtilityStrip() {
  return (
    /* A named <section> so the strip is a landmark — without one, axe's
       `region` rule flags it as content outside any landmark. */
    <section
      aria-label="Supply desk contact"
      className="hidden border-b border-navy-600/60 bg-navy-800 md:block"
    >
      <Container className="flex h-9 items-center justify-between">
        <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream-200">
          <span
            aria-hidden="true"
            className="size-1.5 animate-pulse rounded-full bg-teal-500"
          />
          24×7 Global Supply Desk
        </p>

        <div className="flex items-center gap-6 font-mono text-[0.6875rem] tracking-wide">
          <a
            href={site.phone.href}
            className="text-cream-200 transition-colors hover:text-brass-500"
          >
            {site.phone.display}
          </a>
          <a
            href={site.email.href}
            className="hidden text-cream-200 transition-colors hover:text-brass-500 lg:inline"
          >
            {site.email.display}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 transition-colors hover:text-brass-500"
          >
            WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
