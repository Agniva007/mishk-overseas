/**
 * Supply catalogue.
 *
 * ⚠️ ITEM NAMES are real categories of marine goods and are safe to publish.
 * ⚠️ IMPA CODES ARE DELIBERATELY ABSENT. A wrong code is not a cosmetic
 *    placeholder — a purchaser could order the wrong part from it. The column
 *    renders as "pending" until the client's coded spreadsheet lands
 *    (ASSETS.md §7). Populate `impaCode` from that file, never by inference.
 * ⚠️ AVAILABILITY is illustrative until stock data is connected.
 */

export type Availability = "stock" | "indent" | "on-request";

export type SupplyItem = {
  name: string;
  /** IMPA six-digit code. Undefined renders as "pending" in the table. */
  impaCode?: string;
  unit: string;
  availability: Availability;
};

export type SupplyCategory = {
  slug: string;
  name: string;
  tagline: string;
  /** Two or three paragraphs. */
  description: string[];
  items: SupplyItem[];
  /** Handling, cold chain, QC and documentation notes. */
  quality: { title: string; body: string }[];
  related: string[];
  seo: { title: string; description: string };
};

export const availabilityLabels: Record<Availability, string> = {
  stock: "In stock",
  indent: "On indent",
  "on-request": "On request",
};

export const supplies: SupplyCategory[] = [
  {
    slug: "provisions",
    name: "Provisions",
    tagline: "Fresh, frozen and dry stores",
    description: [
      "Full provisioning for crews of any size, drawn from vetted local suppliers and held under temperature control until the moment of delivery. Fresh produce is bought against your requisition rather than from standing stock, so what arrives alongside is as close to the delivery date as the port allows.",
      "Orders are packed by store type — chill, freeze and dry separated and labelled — so the cook is not sorting pallets on deck. Every consignment is inspected and weighed before dispatch, and short or substituted lines are flagged to you before the van leaves, not discovered on board.",
    ],
    items: [
      { name: "Fresh vegetables, assorted", unit: "KG", availability: "stock" },
      { name: "Fresh fruit, assorted", unit: "KG", availability: "stock" },
      { name: "Potatoes", unit: "KG", availability: "stock" },
      { name: "Onions", unit: "KG", availability: "stock" },
      { name: "Eggs, fresh", unit: "CTN", availability: "stock" },
      { name: "Milk, UHT", unit: "LTR", availability: "stock" },
      { name: "Butter, salted", unit: "KG", availability: "stock" },
      { name: "Cheese, processed", unit: "KG", availability: "stock" },
      { name: "Beef, frozen boneless", unit: "KG", availability: "stock" },
      { name: "Mutton, frozen", unit: "KG", availability: "stock" },
      { name: "Chicken, frozen whole", unit: "KG", availability: "stock" },
      { name: "Fish, frozen fillet", unit: "KG", availability: "stock" },
      { name: "Prawns, frozen", unit: "KG", availability: "indent" },
      { name: "Rice, long grain", unit: "KG", availability: "stock" },
      { name: "Wheat flour", unit: "KG", availability: "stock" },
      { name: "Pulses, assorted", unit: "KG", availability: "stock" },
      { name: "Cooking oil", unit: "LTR", availability: "stock" },
      { name: "Sugar, refined", unit: "KG", availability: "stock" },
      { name: "Tea, loose", unit: "KG", availability: "stock" },
      { name: "Coffee, instant", unit: "KG", availability: "stock" },
      { name: "Spices, assorted", unit: "KG", availability: "stock" },
      { name: "Canned goods, assorted", unit: "CTN", availability: "stock" },
      { name: "Mineral water, bottled", unit: "CTN", availability: "stock" },
      { name: "Bread, fresh", unit: "PC", availability: "indent" },
    ],
    quality: [
      { title: "Cold chain", body: "Chill at 0–4 °C and freeze at −18 °C from our store to the ship's side, in insulated transport. Temperature logged at loading and on delivery." },
      { title: "Sourcing", body: "Fresh produce bought to order against your requisition, not drawn from standing stock." },
      { title: "Packing", body: "Chill, freeze and dry separated, labelled by store type and manifested line by line." },
      { title: "Documentation", body: "Delivery note, weight sheet and temperature record issued with every consignment." },
    ],
    related: ["bonded-stores", "cabin-stores", "medical-supplies"],
    seo: {
      title: "Ship Provisions Supply",
      description: "Fresh, frozen and dry provisions supplied to vessels at Indian and Gulf ports. Cold chain maintained to the ship's side, inspected and manifested before dispatch.",
    },
  },

  {
    slug: "bonded-stores",
    name: "Bonded Stores",
    tagline: "Duty-free tobacco, beverages and sundries",
    description: [
      "Duty-free bonded supply handled under customs licence, with the paperwork prepared ahead of the vessel's arrival so clearance does not become the thing that delays delivery.",
      "Bond orders are sealed and manifested separately from general stores and delivered against the master's signature. Declaration and seal numbers are recorded on the delivery note.",
    ],
    items: [
      { name: "Cigarettes, assorted brands", unit: "CTN", availability: "stock" },
      { name: "Rolling tobacco", unit: "PC", availability: "stock" },
      { name: "Beer, canned", unit: "CTN", availability: "stock" },
      { name: "Spirits, assorted", unit: "BTL", availability: "stock" },
      { name: "Wine, assorted", unit: "BTL", availability: "indent" },
      { name: "Soft drinks, canned", unit: "CTN", availability: "stock" },
      { name: "Confectionery, assorted", unit: "CTN", availability: "stock" },
      { name: "Toiletries, assorted", unit: "PC", availability: "stock" },
      { name: "Shaving requisites", unit: "PC", availability: "stock" },
      { name: "Lighters and matches", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "Customs licence", body: "Supplied under bonded store licence. Declarations prepared before arrival." },
      { title: "Sealed delivery", body: "Bond sealed and manifested separately, released against the master's signature." },
      { title: "Records", body: "Seal and declaration numbers recorded on the delivery note and retained." },
    ],
    related: ["provisions", "cabin-stores"],
    seo: {
      title: "Bonded Stores Supply",
      description: "Duty-free bonded stores — tobacco, beverages and sundries — supplied under customs licence with declarations prepared ahead of arrival.",
    },
  },

  {
    slug: "deck-stores",
    name: "Deck Stores",
    tagline: "Ropes, rigging, tools and hardware",
    description: [
      "Mooring and rigging consumables, deck hardware and hand tools, supplied to the standard the work actually requires rather than the cheapest equivalent on the shelf.",
      "Rope and wire are supplied with manufacturer certification where the application calls for it. Where a specification is ambiguous on your requisition we query it before quoting, which is faster than replacing the wrong item after delivery.",
    ],
    items: [
      { name: "Mooring rope, polypropylene", unit: "COIL", availability: "stock" },
      { name: "Mooring rope, polyester", unit: "COIL", availability: "indent" },
      { name: "Wire rope, galvanised", unit: "MTR", availability: "indent" },
      { name: "Manila rope", unit: "COIL", availability: "stock" },
      { name: "Heaving line", unit: "PC", availability: "stock" },
      { name: "Rat guard", unit: "PC", availability: "stock" },
      { name: "Shackle, bow, galvanised", unit: "PC", availability: "stock" },
      { name: "Thimble, galvanised", unit: "PC", availability: "stock" },
      { name: "Turnbuckle", unit: "PC", availability: "stock" },
      { name: "Chain, short link, galvanised", unit: "MTR", availability: "indent" },
      { name: "Canvas tarpaulin", unit: "PC", availability: "stock" },
      { name: "Lashing strap with ratchet", unit: "PC", availability: "stock" },
      { name: "Wire brush", unit: "PC", availability: "stock" },
      { name: "Chipping hammer", unit: "PC", availability: "stock" },
      { name: "Scraper, deck", unit: "PC", availability: "stock" },
      { name: "Hand tool set, general", unit: "SET", availability: "stock" },
      { name: "Spanner set, combination", unit: "SET", availability: "stock" },
      { name: "Grinding disc", unit: "PC", availability: "stock" },
      { name: "Emery cloth", unit: "ROLL", availability: "stock" },
      { name: "Cotton waste", unit: "KG", availability: "stock" },
    ],
    quality: [
      { title: "Certification", body: "Rope, wire and lifting hardware supplied with manufacturer certificates where the application requires them." },
      { title: "Specification queries", body: "Ambiguous lines are queried before quotation rather than substituted after delivery." },
      { title: "Inspection", body: "Every consignment checked against the requisition line by line before dispatch." },
    ],
    related: ["engine-stores", "marine-paints", "safety-equipment"],
    seo: {
      title: "Deck Stores Supply",
      description: "Mooring rope, rigging hardware, deck tools and consumables supplied to vessels at Indian and Gulf ports, with certification where required.",
    },
  },

  {
    slug: "engine-stores",
    name: "Engine Stores",
    tagline: "Gaskets, packing, fittings and consumables",
    description: [
      "Engine room consumables and general fittings — jointing, packing, fasteners, pipe and valve items — held against the requisitions we see most often so that routine lines do not go on indent.",
      "For equipment-specific parts, the spares procurement service sources against maker, model and part number rather than description. Send the nameplate data and we will quote to it.",
    ],
    items: [
      { name: "Gasket sheet, non-asbestos", unit: "SHT", availability: "stock" },
      { name: "Gland packing, graphite", unit: "KG", availability: "stock" },
      { name: "O-ring set, assorted", unit: "SET", availability: "stock" },
      { name: "Jointing compound", unit: "PC", availability: "stock" },
      { name: "Bolt and nut, assorted", unit: "KG", availability: "stock" },
      { name: "Stud bolt, high tensile", unit: "PC", availability: "indent" },
      { name: "Split pin, assorted", unit: "BOX", availability: "stock" },
      { name: "Pipe, seamless steel", unit: "MTR", availability: "indent" },
      { name: "Pipe fitting, assorted", unit: "PC", availability: "stock" },
      { name: "Valve, gate, bronze", unit: "PC", availability: "indent" },
      { name: "Valve, globe, steel", unit: "PC", availability: "indent" },
      { name: "Ball bearing, assorted", unit: "PC", availability: "indent" },
      { name: "V-belt, assorted", unit: "PC", availability: "stock" },
      { name: "Welding electrode, mild steel", unit: "KG", availability: "stock" },
      { name: "Welding electrode, stainless", unit: "KG", availability: "indent" },
      { name: "Oxygen cylinder", unit: "PC", availability: "on-request" },
      { name: "Acetylene cylinder", unit: "PC", availability: "on-request" },
      { name: "Filter element, fuel", unit: "PC", availability: "indent" },
      { name: "Filter element, lube oil", unit: "PC", availability: "indent" },
      { name: "Rag, cotton, white", unit: "KG", availability: "stock" },
    ],
    quality: [
      { title: "Maker-specific parts", body: "Equipment spares are sourced against maker, model and part number — send nameplate data, not descriptions." },
      { title: "Gas cylinders", body: "Oxygen and acetylene supplied on exchange basis subject to port regulation and vessel certification." },
      { title: "Material certificates", body: "Issued for pressure-retaining and load-bearing items where the specification requires them." },
    ],
    related: ["deck-stores", "lubricants-chemicals", "electrical-stores"],
    seo: {
      title: "Engine Stores Supply",
      description: "Engine room consumables — gaskets, packing, fasteners, pipe fittings, valves and welding consumables — supplied to vessels at Indian and Gulf ports.",
    },
  },

  {
    slug: "cabin-stores",
    name: "Cabin Stores",
    tagline: "Linen, galley equipment and housekeeping",
    description: [
      "Accommodation and galley supply — bedding, linen, tableware, cleaning materials and laundry consumables — for vessels turning over crew or restocking after a long voyage.",
      "Linen and galley items are supplied in crew-count sets where that is what you need, so the requisition can be written per person rather than per item.",
    ],
    items: [
      { name: "Bed sheet, single", unit: "PC", availability: "stock" },
      { name: "Pillow case", unit: "PC", availability: "stock" },
      { name: "Blanket", unit: "PC", availability: "stock" },
      { name: "Pillow", unit: "PC", availability: "stock" },
      { name: "Bath towel", unit: "PC", availability: "stock" },
      { name: "Mattress, single", unit: "PC", availability: "indent" },
      { name: "Curtain, cabin", unit: "PC", availability: "indent" },
      { name: "Dinner plate", unit: "PC", availability: "stock" },
      { name: "Cup and saucer", unit: "SET", availability: "stock" },
      { name: "Cutlery set", unit: "SET", availability: "stock" },
      { name: "Cooking pot, stainless", unit: "PC", availability: "stock" },
      { name: "Frying pan", unit: "PC", availability: "stock" },
      { name: "Kitchen knife set", unit: "SET", availability: "stock" },
      { name: "Detergent powder", unit: "KG", availability: "stock" },
      { name: "Dishwashing liquid", unit: "LTR", availability: "stock" },
      { name: "Disinfectant", unit: "LTR", availability: "stock" },
      { name: "Toilet paper", unit: "ROLL", availability: "stock" },
      { name: "Garbage bag", unit: "ROLL", availability: "stock" },
      { name: "Mop and bucket", unit: "SET", availability: "stock" },
      { name: "Broom, hard bristle", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "Crew-count sets", body: "Linen and galley items supplied in per-person sets so requisitions can be written by crew number." },
      { title: "Food-contact items", body: "Galley and tableware items supplied food-grade and certified where required." },
      { title: "Packing", body: "Delivered bagged and labelled by cabin or department where the requisition specifies it." },
    ],
    related: ["provisions", "bonded-stores"],
    seo: {
      title: "Cabin Stores Supply",
      description: "Cabin and galley stores — linen, bedding, tableware, cleaning materials and housekeeping consumables — supplied to vessels at Indian and Gulf ports.",
    },
  },

  {
    slug: "safety-equipment",
    name: "Safety Equipment",
    tagline: "LSA, FFA and personal protective equipment",
    description: [
      "Life-saving appliances, fire-fighting equipment and PPE supplied to the certification the vessel's flag and class require — which is the part of this category where substitution is not an option.",
      "Items subject to type approval are supplied with their certificates. Where a survey or servicing interval is due, we will say so at quotation rather than supply an item that will not satisfy the next inspection.",
    ],
    items: [
      { name: "Lifejacket, SOLAS approved", unit: "PC", availability: "stock" },
      { name: "Lifebuoy, SOLAS approved", unit: "PC", availability: "stock" },
      { name: "Lifebuoy light, self-igniting", unit: "PC", availability: "indent" },
      { name: "Immersion suit", unit: "PC", availability: "indent" },
      { name: "Line-throwing appliance", unit: "PC", availability: "on-request" },
      { name: "Pyrotechnic distress signal", unit: "SET", availability: "on-request" },
      { name: "Fire extinguisher, dry powder", unit: "PC", availability: "stock" },
      { name: "Fire extinguisher, CO₂", unit: "PC", availability: "stock" },
      { name: "Fire hose with coupling", unit: "PC", availability: "stock" },
      { name: "Fire nozzle", unit: "PC", availability: "stock" },
      { name: "Fireman's outfit", unit: "SET", availability: "indent" },
      { name: "Breathing apparatus, SCBA", unit: "SET", availability: "indent" },
      { name: "Safety helmet", unit: "PC", availability: "stock" },
      { name: "Safety goggles", unit: "PC", availability: "stock" },
      { name: "Safety shoes", unit: "PAIR", availability: "stock" },
      { name: "Work gloves, assorted", unit: "PAIR", availability: "stock" },
      { name: "Boiler suit", unit: "PC", availability: "stock" },
      { name: "Safety harness, full body", unit: "PC", availability: "indent" },
      { name: "Ear defenders", unit: "PC", availability: "stock" },
      { name: "Gas detector, portable", unit: "PC", availability: "on-request" },
    ],
    quality: [
      { title: "Type approval", body: "LSA and FFA items supplied with type-approval certificates. No uncertified substitution, on any line." },
      { title: "Survey intervals", body: "Where an item is due for servicing or survey we flag it at quotation rather than supply it." },
      { title: "Flag and class", body: "Specification checked against the vessel's flag and class requirements before quoting." },
    ],
    related: ["deck-stores", "medical-supplies", "electrical-stores"],
    seo: {
      title: "Marine Safety Equipment Supply",
      description: "SOLAS-approved life-saving and fire-fighting appliances and PPE supplied to vessels at Indian and Gulf ports, with type-approval certification.",
    },
  },

  {
    slug: "lubricants-chemicals",
    name: "Lubricants & Chemicals",
    tagline: "Oils, greases and tank cleaners",
    description: [
      "Marine lubricants, greases and maintenance chemicals in drum and pail quantities, supplied against your specification rather than a nearest equivalent.",
      "Chemicals are delivered with safety data sheets, and the packing and labelling meet the requirements for carriage on board. Where a product is restricted at a given port we will tell you at quotation.",
    ],
    items: [
      { name: "Cylinder oil", unit: "DRUM", availability: "indent" },
      { name: "System oil", unit: "DRUM", availability: "indent" },
      { name: "Trunk piston engine oil", unit: "DRUM", availability: "indent" },
      { name: "Hydraulic oil", unit: "DRUM", availability: "stock" },
      { name: "Gear oil", unit: "DRUM", availability: "stock" },
      { name: "Compressor oil", unit: "PAIL", availability: "stock" },
      { name: "Grease, multipurpose", unit: "PAIL", availability: "stock" },
      { name: "Grease, high temperature", unit: "PAIL", availability: "indent" },
      { name: "Tank cleaner, alkaline", unit: "DRUM", availability: "stock" },
      { name: "Degreaser, solvent based", unit: "DRUM", availability: "stock" },
      { name: "Carbon remover", unit: "PAIL", availability: "stock" },
      { name: "Rust remover", unit: "PAIL", availability: "stock" },
      { name: "Boiler water treatment", unit: "PAIL", availability: "indent" },
      { name: "Cooling water treatment", unit: "PAIL", availability: "indent" },
      { name: "Oil spill dispersant", unit: "DRUM", availability: "on-request" },
      { name: "Sewage treatment chemical", unit: "PAIL", availability: "indent" },
      { name: "Test kit, boiler water", unit: "SET", availability: "indent" },
      { name: "Hand cleaner, industrial", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "Safety data sheets", body: "SDS supplied with every chemical line, in English, at delivery." },
      { title: "Port restrictions", body: "Restricted products flagged at quotation for the port of delivery." },
      { title: "Packing", body: "Labelled and packed to the standard required for carriage and stowage on board." },
    ],
    related: ["engine-stores", "marine-paints"],
    seo: {
      title: "Marine Lubricants & Chemicals Supply",
      description: "Marine lubricating oils, greases, tank cleaners and maintenance chemicals supplied in drum and pail quantities with safety data sheets.",
    },
  },

  {
    slug: "marine-paints",
    name: "Marine Paints",
    tagline: "Anti-fouling, primers and topcoats",
    description: [
      "Protective coatings for hull, deck and tank work, supplied with the thinners, primers and application consumables that the system actually requires — a paint order that arrives without the matching thinner is a wasted delivery.",
      "Where you are maintaining an existing scheme, send the previous product and we will match the system rather than supply a coating that will not bond to it.",
    ],
    items: [
      { name: "Anti-fouling paint", unit: "PAIL", availability: "indent" },
      { name: "Anti-corrosive primer", unit: "PAIL", availability: "stock" },
      { name: "Zinc-rich primer", unit: "PAIL", availability: "indent" },
      { name: "Epoxy primer, two-pack", unit: "SET", availability: "indent" },
      { name: "Topcoat, alkyd", unit: "PAIL", availability: "stock" },
      { name: "Deck paint, non-slip", unit: "PAIL", availability: "stock" },
      { name: "Tank coating, epoxy", unit: "SET", availability: "on-request" },
      { name: "Heat resistant paint", unit: "PAIL", availability: "indent" },
      { name: "Boot-top paint", unit: "PAIL", availability: "indent" },
      { name: "Thinner, matched to system", unit: "LTR", availability: "stock" },
      { name: "Paint brush, assorted", unit: "PC", availability: "stock" },
      { name: "Paint roller with tray", unit: "SET", availability: "stock" },
      { name: "Spray gun, airless", unit: "PC", availability: "on-request" },
      { name: "Masking tape", unit: "ROLL", availability: "stock" },
      { name: "Drop sheet", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "System matching", body: "Send the existing product and we will match the coating system rather than supply an incompatible one." },
      { title: "Consumables included", body: "Thinners, primers and application items quoted alongside the coating, not left to a second order." },
      { title: "Shelf life", body: "Batch and expiry stated at quotation. Short-dated stock is not supplied without your agreement." },
    ],
    related: ["deck-stores", "lubricants-chemicals"],
    seo: {
      title: "Marine Paints & Coatings Supply",
      description: "Anti-fouling, primers, topcoats and tank coatings supplied with matched thinners and application consumables at Indian and Gulf ports.",
    },
  },

  {
    slug: "electrical-stores",
    name: "Electrical Stores",
    tagline: "Cables, lamps, switchgear and instruments",
    description: [
      "Marine-grade electrical consumables and fittings — cable, lighting, switchgear, batteries and test equipment — for routine maintenance and running repairs.",
      "Voltage, frequency and enclosure rating are confirmed against the vessel's system before quotation. Send the nameplate rather than the description where an item is equipment-specific.",
    ],
    items: [
      { name: "Marine cable, multicore", unit: "MTR", availability: "indent" },
      { name: "Cable gland, brass", unit: "PC", availability: "stock" },
      { name: "Cable tie, assorted", unit: "BOX", availability: "stock" },
      { name: "Fluorescent tube", unit: "PC", availability: "stock" },
      { name: "LED lamp, marine", unit: "PC", availability: "stock" },
      { name: "Floodlight, deck", unit: "PC", availability: "indent" },
      { name: "Navigation light bulb", unit: "PC", availability: "stock" },
      { name: "Torch, explosion proof", unit: "PC", availability: "indent" },
      { name: "Battery, dry cell", unit: "PC", availability: "stock" },
      { name: "Battery, lead acid", unit: "PC", availability: "indent" },
      { name: "Fuse, assorted", unit: "BOX", availability: "stock" },
      { name: "Circuit breaker", unit: "PC", availability: "indent" },
      { name: "Contactor", unit: "PC", availability: "indent" },
      { name: "Relay", unit: "PC", availability: "indent" },
      { name: "Terminal block", unit: "PC", availability: "stock" },
      { name: "Insulation tape", unit: "ROLL", availability: "stock" },
      { name: "Multimeter, digital", unit: "PC", availability: "stock" },
      { name: "Megger tester", unit: "PC", availability: "on-request" },
      { name: "Soldering iron with solder", unit: "SET", availability: "stock" },
    ],
    quality: [
      { title: "System match", body: "Voltage, frequency and enclosure rating confirmed against the vessel's system before quoting." },
      { title: "Marine grade", body: "Fittings supplied to marine specification, not general industrial equivalents." },
      { title: "Equipment parts", body: "Send nameplate data for equipment-specific items rather than a description." },
    ],
    related: ["engine-stores", "safety-equipment"],
    seo: {
      title: "Marine Electrical Stores Supply",
      description: "Marine cable, lighting, switchgear, batteries and test instruments supplied to vessels at Indian and Gulf ports.",
    },
  },

  {
    slug: "charts-publications",
    name: "Charts & Publications",
    tagline: "Admiralty charts, publications and flags",
    description: [
      "Navigational charts and publications supplied corrected and current, with the correction status stated at delivery so the bridge is not left verifying it.",
      "Digital and paper products both supplied. Where a publication has a newer edition than the one requisitioned we will say so before supplying the older one.",
    ],
    items: [
      { name: "Admiralty chart, paper", unit: "PC", availability: "indent" },
      { name: "Chart correction service", unit: "SET", availability: "on-request" },
      { name: "Sailing directions", unit: "PC", availability: "indent" },
      { name: "List of lights", unit: "PC", availability: "indent" },
      { name: "List of radio signals", unit: "PC", availability: "indent" },
      { name: "Nautical almanac", unit: "PC", availability: "indent" },
      { name: "Tide tables", unit: "PC", availability: "indent" },
      { name: "Mariner's handbook", unit: "PC", availability: "indent" },
      { name: "IMO publication, assorted", unit: "PC", availability: "indent" },
      { name: "Chart portfolio case", unit: "PC", availability: "stock" },
      { name: "Parallel ruler", unit: "PC", availability: "stock" },
      { name: "Divider, brass", unit: "PC", availability: "stock" },
      { name: "Signal flag set", unit: "SET", availability: "indent" },
      { name: "Ensign, national", unit: "PC", availability: "stock" },
      { name: "Courtesy flag", unit: "PC", availability: "stock" },
      { name: "Logbook, deck", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "Correction status", body: "Charts supplied corrected, with the correction date stated on the delivery note." },
      { title: "Edition check", body: "Superseded editions flagged before supply, never shipped silently." },
      { title: "Digital products", body: "Licence and permit handling arranged where digital charts are supplied." },
    ],
    related: ["deck-stores", "safety-equipment"],
    seo: {
      title: "Nautical Charts & Publications Supply",
      description: "Corrected Admiralty charts, nautical publications, flags and bridge instruments supplied to vessels at Indian and Gulf ports.",
    },
  },

  {
    slug: "medical-supplies",
    name: "Medical Supplies",
    tagline: "Ship medicine chest and first aid",
    description: [
      "Medicine chest replenishment to the vessel's flag state requirement, supplied against the ship's medical scale rather than a generic list.",
      "Expiry dates are stated at quotation and short-dated stock is not supplied without agreement. Controlled items are handled under the appropriate licence and documentation.",
    ],
    items: [
      { name: "Medicine chest replenishment", unit: "SET", availability: "on-request" },
      { name: "First aid kit, complete", unit: "SET", availability: "stock" },
      { name: "Bandage, assorted", unit: "BOX", availability: "stock" },
      { name: "Sterile dressing", unit: "BOX", availability: "stock" },
      { name: "Adhesive plaster", unit: "BOX", availability: "stock" },
      { name: "Antiseptic solution", unit: "PC", availability: "stock" },
      { name: "Burn dressing", unit: "BOX", availability: "stock" },
      { name: "Splint set", unit: "SET", availability: "indent" },
      { name: "Stretcher, marine", unit: "PC", availability: "indent" },
      { name: "Oxygen resuscitator", unit: "SET", availability: "on-request" },
      { name: "Thermometer, clinical", unit: "PC", availability: "stock" },
      { name: "Blood pressure monitor", unit: "PC", availability: "indent" },
      { name: "Disposable gloves", unit: "BOX", availability: "stock" },
      { name: "Face mask, surgical", unit: "BOX", availability: "stock" },
      { name: "Syringe, disposable", unit: "BOX", availability: "indent" },
      { name: "Medical logbook", unit: "PC", availability: "stock" },
    ],
    quality: [
      { title: "Flag state scale", body: "Supplied against the vessel's medical scale and flag requirement, not a generic list." },
      { title: "Expiry dates", body: "Stated at quotation. Short-dated stock is not supplied without your written agreement." },
      { title: "Controlled items", body: "Handled under the applicable licence with documentation issued at delivery." },
    ],
    related: ["safety-equipment", "provisions"],
    seo: {
      title: "Ship Medical Supplies",
      description: "Medicine chest replenishment and first aid supplies to flag state scale, supplied to vessels at Indian and Gulf ports with expiry dates stated.",
    },
  },
];

export const getCategory = (slug: string) =>
  supplies.find((c) => c.slug === slug);

export const totalItems = supplies.reduce((n, c) => n + c.items.length, 0);
