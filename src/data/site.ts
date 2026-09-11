/**
 * Global site configuration.
 *
 * ⚠️  Every value marked PLACEHOLDER must be replaced with client-verified
 * detail before launch. See ASSETS.md. Deliberately obvious placeholders are
 * used so nothing fake-but-plausible can reach production by accident.
 */

export const site = {
  name: "Mishk Overseas",
  /* PLACEHOLDER — confirm the production domain before launch. Used as the
     metadataBase for canonicals, Open Graph and the sitemap. */
  url: "https://mishkoverseas.com",
  tagline: "Ship Chandling & Marine Technical Services",
  description:
    "Ship chandling and marine technical services across Indian and Gulf ports. Provisions, bonded stores, deck and engine supplies, ship repair and spares. 24×7 supply desk.",

  /* PLACEHOLDER — client to confirm */
  phone: { display: "+91 00000 00000", href: "tel:+910000000000" },
  emergency: { display: "+91 00000 00000", href: "tel:+910000000000" },
  email: { display: "supply@mishkoverseas.com", href: "mailto:supply@mishkoverseas.com" },
  whatsapp: "https://wa.me/910000000000",

  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],

  /* PLACEHOLDER — client to confirm every figure */
  stats: [
    { value: 48, suffix: "+", label: "Ports served" },
    { value: 500, suffix: "+", label: "Vessels supplied" },
    { value: 20, suffix: "+", label: "Years in trade" },
    { value: 2, suffix: "hr", label: "Quote turnaround" },
  ],

  /* PLACEHOLDER — client to confirm addresses */
  offices: [
    {
      label: "Head Office",
      lines: ["Address line 1", "Address line 2", "Gandhidham, Gujarat"],
      phone: "+91 00000 00000",
      email: "supply@mishkoverseas.com",
    },
    {
      label: "Branch",
      lines: ["Address line 1", "Address line 2", "Mumbai, Maharashtra"],
      phone: "+91 00000 00000",
      email: "mumbai@mishkoverseas.com",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string; blurb?: string };

/** Photo id for a catalogue/service link — the last path segment. */
export const photoIdFor = (href: string) => href.split("/").pop() ?? "";

export const supplyCategories: NavLink[] = [
  { label: "Provisions", href: "/supplies/provisions", blurb: "Fresh, frozen & dry stores" },
  { label: "Bonded Stores", href: "/supplies/bonded-stores", blurb: "Duty-free tobacco & beverages" },
  { label: "Deck Stores", href: "/supplies/deck-stores", blurb: "Ropes, tools & hardware" },
  { label: "Engine Stores", href: "/supplies/engine-stores", blurb: "Gaskets, packing & fittings" },
  { label: "Cabin Stores", href: "/supplies/cabin-stores", blurb: "Linen, galley & housekeeping" },
  { label: "Safety Equipment", href: "/supplies/safety-equipment", blurb: "LSA, FFA & PPE" },
  { label: "Lubricants & Chemicals", href: "/supplies/lubricants-chemicals", blurb: "Oils, greases & tank cleaners" },
  { label: "Marine Paints", href: "/supplies/marine-paints", blurb: "Anti-fouling & primers" },
  { label: "Electrical Stores", href: "/supplies/electrical-stores", blurb: "Cables, lamps & switchgear" },
  { label: "Charts & Publications", href: "/supplies/charts-publications", blurb: "Admiralty charts & flags" },
  { label: "Medical Supplies", href: "/supplies/medical-supplies", blurb: "Ship medicine chest" },
];

export const services: NavLink[] = [
  { label: "Ship Repair", href: "/services/ship-repair", blurb: "Afloat & in dock" },
  { label: "Spares Procurement", href: "/services/spares-procurement", blurb: "OEM & equivalent sourcing" },
  { label: "Motor Rewinding", href: "/services/motor-rewinding", blurb: "Workshop & on-board" },
  { label: "Fabrication & Welding", href: "/services/fabrication-welding", blurb: "Steel renewal & pipe work" },
  { label: "Mechanical & Electrical", href: "/services/mechanical-electrical", blurb: "Running repairs & surveys" },
  { label: "Riding Squads", href: "/services/riding-squads", blurb: "Crew supplied at sea" },
];

export const aboutLinks: NavLink[] = [
  { label: "About Mishk Overseas", href: "/about", blurb: "Who we are" },
  { label: "Clients & Partners", href: "/clients", blurb: "Who we supply" },
];

/** Top-level nav. `panel` entries open the mega-menu. */
export const primaryNav = [
  { label: "Supplies", href: "/supplies", panel: "supplies" as const },
  { label: "Services", href: "/services", panel: "services" as const },
  { label: "Ports", href: "/ports" },
  { label: "About", href: "/about", panel: "about" as const },
  { label: "Contact", href: "/contact" },
];

export const panels = {
  supplies: {
    title: "Ship Supplies",
    href: "/supplies",
    items: supplyCategories,
    promo: {
      eyebrow: "Catalogue",
      title: "IMPA-coded item lists",
      body: "Every category published with units and availability — view the full list, or take it as a CSV.",
      cta: "View the full catalogue",
      href: "/supplies/catalogue",
    },
  },
  services: {
    title: "Technical Services",
    href: "/services",
    items: services,
    promo: {
      eyebrow: "24×7",
      title: "Vessel alongside now?",
      body: "Riding squads and repair teams mobilised to any port on our list.",
      cta: "Request a quote",
      href: "/quote",
    },
  },
  about: {
    title: "About",
    href: "/about",
    items: aboutLinks,
    promo: {
      eyebrow: "Coverage",
      title: "21 ports, one supplier",
      body: "India's west and east coasts and the Gulf — supplies and technical attendance from a single desk.",
      cta: "See the ports",
      href: "/ports",
    },
  },
} as const;

export type PanelKey = keyof typeof panels;
