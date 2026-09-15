import type { NextConfig } from "next";

/**
 * Redirects for routes that existed before spares was split out of services.
 *
 * The site has not been deployed, so nothing should be indexed — but these
 * paths were published in IMPLEMENTATION.md and may exist in a preview
 * deployment or someone's bookmarks. They cost nothing and prevent a 404.
 *
 * `permanent: true` emits a 308. Remove these only once you are certain no
 * inbound link uses the old paths.
 */
const legacyServiceRedirects = [
  // Spares is no longer a service — it is its own section.
  { source: "/services/spares-procurement", destination: "/spares" },
  // Renamed when the six services became twenty-two.
  { source: "/services/ship-repair", destination: "/services/steel-hull-repair" },
  { source: "/services/fabrication-welding", destination: "/services/pipe-fabrication" },
  { source: "/services/mechanical-electrical", destination: "/services/electrical-repair" },
  // Certifications were removed from scope at the client's request.
  { source: "/about/certifications", destination: "/about" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyServiceRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
