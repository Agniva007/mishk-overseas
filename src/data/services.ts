/**
 * Technical services.
 *
 * ⚠️ WHAT IS SAFE HERE: descriptions of what each service IS, generic
 *    capability lists, and scope boundaries. These describe an industry
 *    offering, not a specific claim about this company's assets or history.
 *
 * ⚠️ WHAT IS DELIBERATELY EMPTY:
 *    - `equipment` — listing a lathe capacity or a rewinding rating the
 *      company may not own is a capability claim a buyer would rely on.
 *    - `cases` — "we fixed X at Y in Z hours" is a track-record claim.
 *    Both render as visible "pending" panels until the client supplies them.
 *    See ASSETS.md §10.
 *
 * ⚠️ `scope` is a commercial commitment. Written to industry norms, but it
 *    MUST be signed off by the client before launch.
 */

export type ServiceDetail = {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  capabilities: string[];
  scope: { included: string[]; excluded: string[] };
  /** PENDING — client to supply. Empty renders a placeholder panel. */
  equipment: { item: string; spec: string }[];
  /** PENDING — client to supply. Empty renders a placeholder panel. */
  cases: { vessel: string; port: string; problem: string; turnaround: string }[];
  related: string[];
  seo: { title: string; description: string };
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "ship-repair",
    name: "Ship Repair",
    tagline: "Running repairs afloat and in dock",
    description: [
      "Repair teams mobilised to the vessel — alongside, at anchorage or in dock — for running repairs, defect rectification and planned maintenance that cannot wait for the next docking.",
      "Work is scoped against the defect report before anyone is mobilised, so the team arrives with the right trades and the right consumables. Where a job turns out to be larger than the report suggested, we stop and re-quote rather than running up an open-ended bill.",
    ],
    capabilities: [
      "Defect rectification alongside or at anchorage",
      "Planned maintenance during port stay",
      "Steel renewal and structural repair",
      "Pipework and valve overhaul",
      "Pump and compressor overhaul",
      "Dry-dock support and supervision",
    ],
    scope: {
      included: [
        "Attendance and scoping against your defect report",
        "Labour, supervision and standard consumables",
        "Tooling and portable equipment",
        "Work report with photographs on completion",
        "Coordination with class or flag surveyor where required",
      ],
      excluded: [
        "Class and flag survey fees",
        "Spare parts, unless quoted as a separate line",
        "Port dues, launch hire and gangway watch",
        "Gas-freeing and tank cleaning, quoted separately",
        "Waste disposal ashore",
      ],
    },
    equipment: [],
    cases: [],
    related: ["spares-procurement", "mechanical-electrical", "riding-squads"],
    seo: {
      title: "Ship Repair Services",
      description:
        "Running repairs, defect rectification and planned maintenance carried out afloat, at anchorage or in dock at Indian and Gulf ports.",
    },
  },

  {
    slug: "spares-procurement",
    name: "Spares Procurement",
    tagline: "OEM and equivalent sourcing",
    description: [
      "Sourcing of equipment spares against maker, model and part number — not against a description. Send the nameplate data and the part list, and we quote to it.",
      "Where an OEM part carries an unacceptable lead time, we will offer a qualified equivalent and say plainly that it is an equivalent, with the specification difference stated. What we will not do is substitute silently and let it be discovered during fitting.",
    ],
    capabilities: [
      "OEM sourcing against maker and part number",
      "Qualified equivalents where lead time demands it",
      "Main and auxiliary engine spares",
      "Pump, compressor and purifier parts",
      "Boiler and heat exchanger parts",
      "Expediting and delivery tracking to the port of call",
    ],
    scope: {
      included: [
        "Sourcing against supplied maker, model and part number",
        "Quotation with lead time and origin stated per line",
        "Equivalents flagged explicitly, never substituted silently",
        "Consolidation and forwarding to the port of call",
        "Delivery documentation and packing list",
      ],
      excluded: [
        "Customs duties and clearance charges, unless quoted",
        "Installation and commissioning, quoted as a repair scope",
        "Warranty beyond that offered by the manufacturer",
        "Parts identification where no nameplate data is supplied",
      ],
    },
    equipment: [],
    cases: [],
    related: ["ship-repair", "mechanical-electrical"],
    seo: {
      title: "Marine Spares Procurement",
      description:
        "OEM and qualified-equivalent marine spares sourced against maker, model and part number, consolidated and delivered to the port of call.",
    },
  },

  {
    slug: "motor-rewinding",
    name: "Motor Rewinding",
    tagline: "Workshop and on-board electrical repair",
    description: [
      "Rewinding and overhaul of marine electric motors, generators and transformers, carried out in workshop or on board depending on the size of the unit and the time available.",
      "Units are tested before and after work, and the test results are issued with the job. A motor returned without an insulation resistance reading is a motor nobody can sign for.",
    ],
    capabilities: [
      "AC and DC motor rewinding",
      "Generator and alternator overhaul",
      "Transformer repair and rewinding",
      "Bearing replacement and shaft repair",
      "Insulation resistance and high-voltage testing",
      "Dynamic balancing",
    ],
    scope: {
      included: [
        "Collection from and return to the vessel",
        "Stripping, cleaning and inspection report",
        "Rewinding to original specification",
        "Pre- and post-work test results issued with the job",
        "Reinstallation where quoted",
      ],
      excluded: [
        "Replacement units where repair is not viable",
        "Foundation or alignment work, quoted as a repair scope",
        "Cabling and switchgear work beyond the terminal box",
      ],
    },
    equipment: [],
    cases: [],
    related: ["mechanical-electrical", "ship-repair"],
    seo: {
      title: "Marine Motor Rewinding",
      description:
        "Rewinding and overhaul of marine motors, generators and transformers, in workshop or on board, with test results issued on completion.",
    },
  },

  {
    slug: "fabrication-welding",
    name: "Fabrication & Welding",
    tagline: "Steel renewal, pipe work and structural repair",
    description: [
      "Fabrication and welding for steel renewal, pipe replacement and structural repair, carried out to the procedure the class society requires for the location and the material.",
      "Welders are qualified to the procedure being used, and the qualification records are available for survey. Hot work is planned around the vessel's permit system rather than in spite of it.",
    ],
    capabilities: [
      "Steel plate renewal and doubling",
      "Pipe spool fabrication and replacement",
      "Structural repair to class procedure",
      "Tank and void space repair",
      "Handrail, ladder and grating fabrication",
      "On-board and workshop welding",
    ],
    scope: {
      included: [
        "Welding to an approved procedure with qualified welders",
        "Qualification records available for survey",
        "Material supply where quoted",
        "Surface preparation to the specified standard",
        "Hot work coordinated with the vessel's permit system",
      ],
      excluded: [
        "Gas-freeing and atmosphere testing, quoted separately",
        "Class attendance and survey fees",
        "Coating and painting, quoted as a separate scope",
        "Staging and scaffolding, unless quoted",
      ],
    },
    equipment: [],
    cases: [],
    related: ["ship-repair", "mechanical-electrical"],
    seo: {
      title: "Marine Fabrication & Welding",
      description:
        "Steel renewal, pipe fabrication and structural repair to class-approved welding procedures, on board or in workshop at Indian and Gulf ports.",
    },
  },

  {
    slug: "mechanical-electrical",
    name: "Mechanical & Electrical",
    tagline: "Running repairs and survey support",
    description: [
      "General mechanical and electrical attendance for running repairs, fault-finding and survey preparation — the work that keeps a vessel operational between planned maintenance windows.",
      "Fault-finding is charged on attendance and reported in writing, so you have a diagnosis you can act on even if the repair itself goes to another window or another port.",
    ],
    capabilities: [
      "Fault-finding and diagnosis with written report",
      "Switchboard and starter panel repair",
      "Automation and control system attendance",
      "Pump, valve and machinery overhaul",
      "Survey preparation and support",
      "Emergency attendance at short notice",
    ],
    scope: {
      included: [
        "Attendance, diagnosis and written fault report",
        "Labour, supervision and standard consumables",
        "Test and measurement equipment",
        "Recommendation with a priced repair option",
      ],
      excluded: [
        "Spare parts, quoted separately once diagnosed",
        "Manufacturer-specific software and licences",
        "Class survey fees",
        "Standby time outside the agreed attendance window",
      ],
    },
    equipment: [],
    cases: [],
    related: ["ship-repair", "motor-rewinding", "spares-procurement"],
    seo: {
      title: "Marine Mechanical & Electrical Services",
      description:
        "Running repairs, fault-finding with written reports, and survey support for machinery and electrical systems at Indian and Gulf ports.",
    },
  },

  {
    slug: "riding-squads",
    name: "Riding Squads",
    tagline: "Crew supplied to work at sea",
    description: [
      "Riding squads placed on board to carry out maintenance during the voyage — chipping, painting, steel preparation and general deck work — so that time in port is not spent on work that can be done under way.",
      "Squad members are documented, certificated and insured for the voyage before they join. Scope, duration and disembarkation port are agreed in writing in advance, because a squad without a defined end date is a cost without a defined end.",
    ],
    capabilities: [
      "Chipping, scaling and surface preparation",
      "Painting and coating application",
      "Tank and hold cleaning support",
      "General deck maintenance under way",
      "Supervised squads with a working foreman",
      "Join and disembark at agreed ports",
    ],
    scope: {
      included: [
        "Documented, certificated and insured personnel",
        "Travel to the joining port",
        "Working foreman and supervision",
        "Tools and personal protective equipment",
        "Agreed scope, duration and disembarkation port in writing",
      ],
      excluded: [
        "Accommodation and messing on board",
        "Paint, coatings and consumables, supplied as a chandling line",
        "Visa and immigration charges beyond standard documentation",
        "Extension beyond the agreed disembarkation port",
      ],
    },
    equipment: [],
    cases: [],
    related: ["ship-repair", "fabrication-welding"],
    seo: {
      title: "Marine Riding Squads",
      description:
        "Documented and certificated riding squads supplied to carry out maintenance under way, with scope, duration and disembarkation port agreed in advance.",
    },
  },
];

export const getService = (slug: string) =>
  serviceDetails.find((s) => s.slug === slug);
