/**
 * Homepage content.
 *
 * ⚠️ Copy is written to spec and is production-quality in tone, but every
 * CLAIM (client names, testimonials) is PLACEHOLDER
 * until the client confirms it. See ASSETS.md.
 */

export const disciplines = [
  {
    title: "Ship Supplies",
    href: "/supplies",
    photo: "discipline-supplies",
    blurb:
      "Provisions, bonded stores, deck and engine consumables, safety gear and chemicals — ordered by description and IMPA code.",
    points: [
      "11 catalogued categories",
      "198 published lines with units",
      "Cold chain for fresh and frozen",
      "Quality check on every consignment",
    ],
  },
  {
    title: "Marine Spares",
    href: "/spares",
    photo: "spares-procurement",
    blurb:
      "Engine, turbocharger, pump, purifier and automation parts — ordered by maker, model and part number, against the nameplate.",
    points: [
      "15 equipment categories",
      "Genuine, equivalent or reconditioned",
      "Exchange units where a core exists",
      "Nothing substituted silently",
    ],
  },
  {
    title: "Technical Services",
    href: "/services",
    photo: "discipline-services",
    blurb:
      "Overhauls, hull and pipework, electrical and automation, and riding squads — scoped before anyone is mobilised.",
    points: [
      "22 service lines in five groups",
      "Scope states what is not included",
      "Repair teams afloat or in dock",
      "Riding squads supplied at sea",
    ],
  },
];

export const process = [
  {
    step: "01",
    title: "Requisition received",
    body: "Send it by email or WhatsApp, any hour. The 24×7 desk acknowledges immediately.",
  },
  {
    step: "02",
    title: "Quotation within 2 hours",
    body: "Priced line by line against your requisition, with IMPA codes and lead times stated.",
  },
  {
    step: "03",
    title: "Sourcing & quality check",
    body: "Goods gathered, inspected and packed to marine standard. Discrepancies flagged before dispatch.",
  },
  {
    step: "04",
    title: "Delivered alongside",
    body: "To the berth or by launch at anchorage, ahead of departure, with documentation complete.",
  },
];

export const whyUs = [
  {
    title: "Single-window sourcing",
    body: "One requisition, one quotation, one invoice — across every category and both disciplines.",
  },
  {
    title: "IMPA-coded catalogue",
    body: "Item lists published with codes, units and availability, so your purchasing team can quote straight from the page.",
  },
  {
    title: "Own warehousing",
    body: "Stock held near the ports we serve, which is what makes short-notice delivery realistic rather than aspirational.",
  },
  {
    title: "Quality check on receipt",
    body: "Every consignment inspected and documented before it leaves us. Short or damaged items are flagged, not shipped.",
  },
  {
    title: "Transparent pricing",
    body: "Line-item quotations with no bundled extras. What you approve is what you are invoiced.",
  },
  {
    title: "24×7 supply desk",
    body: "Vessels do not keep office hours. Neither does the desk that answers your requisition.",
  },
];

/* PLACEHOLDER — client to supply real names and written permission */
export const clients = [
  "Client One", "Client Two", "Client Three", "Client Four",
  "Client Five", "Client Six", "Client Seven", "Client Eight",
];

/* PLACEHOLDER — client to supply with attribution permission */
export const testimonials = [
  {
    quote:
      "Requisition went out at midnight and the quotation was back before the morning watch. Stores were alongside the same day.",
    name: "Name pending",
    role: "Chief Officer",
    vessel: "Bulk carrier",
  },
  {
    quote:
      "The item codes on their quotations match ours, which removes a whole round of clarification from every order.",
    name: "Name pending",
    role: "Purchasing Manager",
    vessel: "Tanker operator",
  },
  {
    quote:
      "They flagged a short-shipped item before dispatch instead of letting us find it on board. That is rarer than it should be.",
    name: "Name pending",
    role: "Superintendent",
    vessel: "Container fleet",
  },
];

