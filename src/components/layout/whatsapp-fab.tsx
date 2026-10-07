import { site } from "@/data/site";

/**
 * Floating WhatsApp button, bottom-right on every page.
 *
 * WhatsApp is how most of this trade actually sends a requisition at 0300, so
 * it gets a persistent target rather than only a line in the utility strip
 * (which is hidden below `md`) and a link on /quote.
 *
 * Deliberately a server component: the hover label is pure CSS, so this ships
 * no JavaScript. It sits at z-30 — under the sticky header (z-40) and the
 * mobile drawer (z-50), so it never floats over open navigation.
 *
 * ⚠️ The destination is `site.whatsapp`, which is PLACEHOLDER until the client
 * confirms the number. See ASSETS.md §1.
 */
export function WhatsAppFab() {
  return (
    /* A named landmark, not a bare anchor: a fixed element is outside every
       other landmark, and axe's `region` rule flags that on every route. Same
       reason the utility strip is a named <section>. */
    <aside
      aria-label="Quick contact"
      className={[
        "fixed z-30 print:hidden",
        /* Clear of the home indicator on a notched phone; 0px elsewhere. */
        "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
        "right-[calc(1.25rem+env(safe-area-inset-right,0px))]",
      ].join(" ")}
    >
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message the 24×7 supply desk on WhatsApp (opens in a new tab)"
        className="group relative flex items-center focus-visible:outline-none"
      >
        {/* Label reveals on hover / keyboard focus. Absolute and
            pointer-events-none on purpose: laid out in flow it would reserve
            its width while invisible, leaving a 200px dead hover target
            floating over the page. Pointer devices only — a touch screen has
            no hover, and the circle is self-explanatory. */}
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2",
            "select-none whitespace-nowrap rounded-sm border border-navy-600",
            "bg-navy-800/95 px-3.5 py-2 backdrop-blur-sm lg:block",
            "font-mono text-xs tracking-wide text-cream-200 shadow-lg shadow-navy-900/50",
            "translate-x-2 opacity-0 transition-[opacity,transform] duration-[180ms] ease-marine",
            "group-hover:translate-x-0 group-hover:opacity-100",
            "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          ].join(" ")}
        >
          WhatsApp the desk · 24×7
        </span>

        <span
          className={[
            "grid size-14 shrink-0 place-items-center rounded-full",
            /* WhatsApp brand green — the point of this button is that it is
               recognised at a glance, so it keeps its own colour rather than
               the site palette. */
            "bg-[#25d366] text-white",
            "shadow-lg shadow-navy-900/60 ring-1 ring-navy-900/40",
            "transition-[transform,background-color] duration-[180ms] ease-marine",
            "group-hover:-translate-y-0.5 group-hover:bg-[#1ebe57]",
            "group-focus-visible:ring-2 group-focus-visible:ring-brass-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-navy-900",
          ].join(" ")}
        >
          <WhatsAppGlyph className="size-7" />
        </span>
      </a>
    </aside>
  );
}

/**
 * WhatsApp wordless mark. Path from Simple Icons (CC0); the mark itself is
 * Meta's trademark, used here only to label a link to WhatsApp.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
