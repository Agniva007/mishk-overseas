import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { supplies } from "@/data/supplies";
import { services } from "@/data/site";
import { ports } from "@/data/ports";

/**
 * Generated from the data files, so new categories, services and ports are
 * indexed automatically (§8).
 *
 * ⚠️ Only routes that ACTUALLY EXIST are emitted. A sitemap advertising 404s
 * is worse than a short sitemap — flip each flag below as its phase lands.
 * /styleguide is never included (noindex), and /legal/* is intentionally
 * omitted: the documents are unreviewed drafts and should not be indexed
 * until counsel signs them off.
 */
const BUILT = {
  home: true,
  supplies: true, // phase 3
  services: true, // phase 4
  ports: true, // phase 4
  quote: true, // phase 5
  company: true, // phase 5 — about, clients, contact
};

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const entry = (path: string, priority: number) => ({
    url: url(path),
    changeFrequency: "monthly" as const,
    priority,
  });

  const routes: MetadataRoute.Sitemap = [];

  if (BUILT.home) routes.push(entry("/", 1));

  if (BUILT.supplies) {
    routes.push(entry("/supplies", 0.9));
    routes.push(entry("/supplies/catalogue", 0.7));
    routes.push(...supplies.map((c) => entry(`/supplies/${c.slug}`, 0.8)));
  }

  if (BUILT.services) {
    routes.push(entry("/services", 0.9));
    routes.push(...services.map((s) => entry(s.href, 0.7)));
  }

  if (BUILT.ports) {
    routes.push(entry("/ports", 0.8));
    routes.push(...ports.map((p) => entry(`/ports/${p.slug}`, 0.7)));
  }

  if (BUILT.quote) routes.push(entry("/quote", 0.8));

  if (BUILT.company) {
    routes.push(
      entry("/contact", 0.7),
      entry("/about", 0.6),
      entry("/clients", 0.5),
      entry("/credits", 0.3),
    );
  }

  return routes;
}
