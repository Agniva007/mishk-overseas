import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { UtilityStrip } from "@/components/layout/utility-strip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { site } from "@/data/site";
import "./globals.css";

/* Three families, hard cap. Display / UI / data. See IMPLEMENTATION.md §2.2. */

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

/**
 * Organization structured data (§8). Kept minimal deliberately: address,
 * telephone and founding date are PLACEHOLDER in site.ts, and publishing
 * unverified contact details as structured data would feed them straight into
 * search results and knowledge panels. Add them here once ASSETS.md §1 lands.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  knowsAbout: [
    "Ship chandling",
    "Marine supplies",
    "Ship repair",
    "Marine spares procurement",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        {/* Reveal starts at opacity:0 and is shown by IntersectionObserver.
            Without JS that would hide the page, so force it visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-navy-900 text-cream-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-brass-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900"
        >
          Skip to content
        </a>
        <UtilityStrip />
        <Header />
        {children}
        <Footer />
        {/* Last in the DOM so it reads as supplementary; fixed, so it floats. */}
        <WhatsAppFab />
      </body>
    </html>
  );
}
