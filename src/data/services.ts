/**
 * Technical services.
 *
 * Structured after the reference set (omship.in), grouped into five families
 * so 22 services stay navigable. Each service is its own page — "turbocharger
 * overhaul Mundra" is a real search term and deserves one.
 *
 * ⚠️ WHAT IS SAFE HERE: descriptions of what each service IS, generic
 *    capability lists, and scope boundaries. These describe an industry
 *    offering, not a claim about this company's assets or history.
 *
 * ⚠️ DELIBERATELY EMPTY on every service:
 *    - `equipment` — a lathe capacity or rewinding rating the company may not
 *      own is a capability claim a buyer books a mobilisation on.
 *    - `cases` — "we fixed X at Y in Z hours" is a track-record claim.
 *    Both render as visible "pending" panels. See ASSETS.md §10.
 *
 * ⚠️ `scope` is a COMMERCIAL COMMITMENT. Written to industry norms; it MUST be
 *    signed off by the client before launch. Each page says so on its face.
 *
 * NOTE: spares supply is NOT a service. It lives in spares.ts under /spares.
 */

export type ServiceGroupKey =
  | "engine-machinery"
  | "hull-deck"
  | "electrical-electronics"
  | "hotel-auxiliary"
  | "crew";

export type ServiceGroup = {
  key: ServiceGroupKey;
  name: string;
  blurb: string;
};

export const serviceGroups: ServiceGroup[] = [
  { key: "engine-machinery", name: "Engine & Machinery", blurb: "Main and auxiliary propulsion, and the machinery that keeps it running." },
  { key: "hull-deck", name: "Hull, Steel & Deck", blurb: "Structural repair, pipework, deck equipment and everything below the waterline." },
  { key: "electrical-electronics", name: "Electrical & Electronics", blurb: "Power distribution, automation, navigation and communication systems." },
  { key: "hotel-auxiliary", name: "Hotel & Auxiliary", blurb: "Climate, galley and the safety equipment that has to pass survey." },
  { key: "crew", name: "Crew", blurb: "People placed on board to do the work under way." },
];

export type ServiceDetail = {
  slug: string;
  name: string;
  tagline: string;
  group: ServiceGroupKey;
  description: string[];
  capabilities: string[];
  scope: { included: string[]; excluded: string[] };
  /** PENDING — client to supply. Empty renders a placeholder panel. */
  equipment: { item: string; spec: string }[];
  /** PENDING — client to supply. Empty renders a placeholder panel. */
  cases: { vessel: string; port: string; problem: string; turnaround: string }[];
  related: string[];
  /** Photo id in src/data/photos.ts. */
  photo: string;
  seo: { title: string; description: string };
};

/* Scope lines that genuinely apply across most attendances. Kept as constants
   so a change to the commercial position happens in one place. */
const INC_ATTEND = "Attendance and scoping against your defect report";
const INC_LABOUR = "Labour, supervision and standard consumables";
const INC_REPORT = "Written work report with photographs on completion";
const EXC_CLASS = "Class and flag survey attendance fees";
const EXC_SPARES = "Spare parts, quoted separately — see /spares";
const EXC_PORT = "Port dues, launch hire and gangway watch";

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "main-engine-overhaul",
    name: "Main Engine Overhaul",
    tagline: "Top overhauls, unit overhauls and defect rectification",
    group: "engine-machinery",
    description: [
      "Main engine overhauls carried out alongside, at anchorage or in dock \u2014 top overhauls, unit overhauls, bearing renewal and defect rectification, scoped against your planned maintenance schedule or the defect report.",
      "Clearances and readings are recorded before and after and issued with the job. A main engine handed back without a measurement record is one the superintendent cannot close out.",
    ],
    capabilities: [
      "Top overhaul \u2014 cylinder cover, piston and rings",
      "Unit overhaul including liner renewal",
      "Main, crankpin and crosshead bearing renewal",
      "Chain and timing adjustment",
      "Crankshaft deflection measurement",
      "Scavenge space inspection and cleaning",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Special tools for the engine type",
        "Before-and-after clearance and deflection records",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Crankshaft grinding or machining ashore",
        "Staging and scaffolding unless quoted",
        EXC_PORT,
      ],
    },
    equipment: [],
    cases: [],
    related: ["auxiliary-engine-repair", "turbocharger-overhaul", "fuel-injection"],
    photo: "discipline-services",
    seo: {
      title: "Main Engine Overhaul",
      description: "Main engine top and unit overhauls, bearing renewal and defect rectification afloat or in dock, with clearance records issued on completion.",
    },
  },

  {
    slug: "auxiliary-engine-repair",
    name: "Auxiliary Engine & Generator Repair",
    tagline: "Gensets, emergency sets and alternators",
    group: "engine-machinery",
    description: [
      "Overhaul, fault-finding and repair of auxiliary diesel generators and their alternators \u2014 the sets that decide whether a vessel keeps power while the main engine is opened up.",
      "Load tests are run on completion and the results issued. Where a set is failing to take load we diagnose before quoting a repair, because the cause is as often the governor or the AVR as the engine.",
    ],
    capabilities: [
      "Top and full overhaul of auxiliary engines",
      "Alternator overhaul, bearing and diode renewal",
      "AVR and governor fault-finding",
      "Load testing and load sharing adjustment",
      "Emergency generator servicing to class requirement",
      "Crankcase and bearing inspection",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Load test on completion with recorded results",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Alternator rewinding \u2014 quoted under Motor Rewinding",
        "Foundation and alignment work unless quoted",
      ],
    },
    equipment: [],
    cases: [],
    related: ["main-engine-overhaul", "motor-rewinding", "electrical-repair"],
    photo: "mechanical-electrical",
    seo: {
      title: "Auxiliary Engine & Generator Repair",
      description: "Auxiliary engine and generator overhaul, alternator repair, AVR and governor fault-finding, with load testing on completion.",
    },
  },

  {
    slug: "turbocharger-overhaul",
    name: "Turbocharger Overhaul",
    tagline: "Inspection, cleaning, balancing and reassembly",
    group: "engine-machinery",
    description: [
      "Turbocharger inspection and overhaul for main and auxiliary engines \u2014 rotor removal, cleaning, bearing renewal, balancing and reassembly with recorded clearances.",
      "Rotors are dynamically balanced and the balance record is issued with the job. Where a cartridge exchange is faster or cheaper than an overhaul we will say so rather than sell the longer job.",
    ],
    capabilities: [
      "Rotor removal and refit on board",
      "Nozzle ring and turbine cleaning",
      "Journal and thrust bearing renewal",
      "Dynamic balancing with recorded results",
      "Cartridge exchange arranged where preferable",
      "Clearance measurement before and after",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Dynamic balancing and balance record",
        "Clearance records before and after",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Rotor or shaft renewal \u2014 quoted separately once inspected",
        "Exhaust piping and expansion joint renewal",
      ],
    },
    equipment: [],
    cases: [],
    related: ["main-engine-overhaul", "auxiliary-engine-repair", "pump-repair"],
    photo: "turbocharger",
    seo: {
      title: "Marine Turbocharger Overhaul",
      description: "Turbocharger inspection, cleaning, bearing renewal, dynamic balancing and reassembly for ABB, MAN, Mitsubishi MET and Napier units.",
    },
  },

  {
    slug: "fuel-injection",
    name: "Fuel Injection Servicing",
    tagline: "Injectors, pumps and pressure testing",
    group: "engine-machinery",
    description: [
      "Cleaning, testing and calibration of fuel injectors and high-pressure fuel pumps, with pop pressure and spray pattern recorded for every unit.",
      "Poor combustion is usually an injection problem before it is an engine problem. Testing the full set costs little against the fuel a badly atomising injector wastes over a voyage.",
    ],
    capabilities: [
      "Injector pop testing and spray pattern check",
      "Nozzle renewal and reassembly",
      "Fuel pump element and plunger renewal",
      "Calibration to maker's pressure",
      "Full-set testing with recorded results",
      "On-board and workshop attendance",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Pop pressure and spray pattern record per unit",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Fuel analysis and bunker testing",
        "Common rail control system repair \u2014 quoted under Automation",
      ],
    },
    equipment: [],
    cases: [],
    related: ["main-engine-overhaul", "auxiliary-engine-repair", "automation-pcb"],
    photo: "spares-procurement",
    seo: {
      title: "Fuel Injection System Servicing",
      description: "Marine fuel injector and high-pressure pump testing, nozzle renewal and calibration, with pop pressure and spray pattern recorded per unit.",
    },
  },

  {
    slug: "pump-repair",
    name: "Pump Repair",
    tagline: "Ballast, bilge, fire, cooling and cargo pumps",
    group: "engine-machinery",
    description: [
      "Overhaul and repair of shipboard pumps \u2014 centrifugal, screw, gear and reciprocating \u2014 covering impeller and wear ring renewal, mechanical seal replacement and shaft repair.",
      "Performance is checked against the duty point on completion, not just run-and-see. A pump that turns but does not make its head has not been repaired.",
    ],
    capabilities: [
      "Centrifugal pump overhaul and seal renewal",
      "Impeller and wear ring renewal",
      "Shaft repair and sleeve renewal",
      "Screw and gear pump overhaul",
      "Alignment and coupling renewal",
      "Performance check against duty point",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Alignment on refit",
        "Performance check against the rated duty",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Shaft manufacture ashore unless quoted",
        "Pipework modification \u2014 quoted under Pipe Fabrication",
      ],
    },
    equipment: [],
    cases: [],
    related: ["main-engine-overhaul", "hydraulic-systems", "pipe-fabrication"],
    photo: "marine-pump",
    seo: {
      title: "Marine Pump Repair",
      description: "Overhaul of ballast, bilge, fire, cooling and cargo pumps \u2014 impellers, mechanical seals, wear rings and shafts, checked against duty point.",
    },
  },

  {
    slug: "boiler-repair",
    name: "Boiler Repair & Re-tubing",
    tagline: "Leak repair, re-tubing and pressure testing",
    group: "engine-machinery",
    description: [
      "Repair and maintenance of auxiliary and exhaust gas boilers \u2014 tube leak repair, partial and full re-tubing, refractory renewal, burner servicing and hydraulic pressure testing.",
      "Re-tubing is quoted against the drawing and the tube material specification. Pressure testing is carried out to class requirement and witnessed where the survey calls for it.",
    ],
    capabilities: [
      "Tube plugging and leak repair",
      "Partial and full re-tubing",
      "Refractory and insulation renewal",
      "Burner overhaul and combustion setting",
      "Water level control and gauge renewal",
      "Hydraulic pressure testing to class requirement",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Welding to an approved procedure by qualified welders",
        "Hydraulic pressure test with recorded results",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Gas-freeing and atmosphere testing, quoted separately",
        "Chemical cleaning and descaling unless quoted",
        "Insulation disposal ashore",
      ],
    },
    equipment: [],
    cases: [],
    related: ["pipe-fabrication", "pump-repair", "steel-hull-repair"],
    photo: "fabrication-welding",
    seo: {
      title: "Marine Boiler Repair & Re-tubing",
      description: "Auxiliary and exhaust gas boiler repair \u2014 tube leak repair, re-tubing, refractory renewal, burner overhaul and hydraulic pressure testing.",
    },
  },

  {
    slug: "hydraulic-systems",
    name: "Hydraulic System Repair",
    tagline: "Power packs, cylinders, valves and hoses",
    group: "engine-machinery",
    description: [
      "Repair and maintenance of marine hydraulic systems serving deck machinery, steering gear, hatch covers and cargo equipment \u2014 pumps, motors, valves, cylinders and hoses.",
      "System pressure and flow are checked against the maker's figures on completion. Hose assemblies are made up to measured length on site, which is usually faster than waiting for an ordered length to arrive.",
    ],
    capabilities: [
      "Power pack overhaul and pump renewal",
      "Cylinder reseal and rod repair",
      "Directional and relief valve servicing",
      "Hose assembly made up to length on site",
      "System flushing and oil sampling",
      "Pressure and flow testing against maker's figures",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Hose assemblies made up on site to measured length",
        "Pressure and flow test on completion",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Hydraulic oil supply \u2014 a Ship Supplies line",
        "Cylinder rod re-chroming ashore",
        "Steel foundation work \u2014 quoted under Steel & Hull",
      ],
    },
    equipment: [],
    cases: [],
    related: ["deck-machinery-repair", "pump-repair", "steel-hull-repair"],
    photo: "hydraulic",
    seo: {
      title: "Marine Hydraulic System Repair",
      description: "Repair of marine hydraulic systems \u2014 power packs, cylinders, directional valves and hose assemblies, pressure tested against maker's figures.",
    },
  },

  {
    slug: "steel-hull-repair",
    name: "Steel & Hull Structure Repair",
    tagline: "Plate renewal, cropping and structural repair",
    group: "hull-deck",
    description: [
      "Steel renewal and structural repair to hull plating, frames, tank boundaries and deck structure, carried out to the welding procedure the class society approves for the location and material.",
      "Welders are qualified to the procedure in use and the qualification records are available for survey. Hot work is planned around the vessel's permit system rather than in spite of it.",
    ],
    capabilities: [
      "Hull plate cropping and renewal",
      "Frame, bracket and stiffener renewal",
      "Tank and void space steel repair",
      "Crack arrest and doubler fitting",
      "Deck and hatch coaming repair",
      "Class-approved welding procedures",
    ],
    scope: {
      included: [
        "Welding to an approved procedure with qualified welders",
        "Welder qualification records available for survey",
        INC_LABOUR,
        "Surface preparation to the specified standard",
        "Hot work coordinated with the vessel's permit system",
      ],
      excluded: [
        "Gas-freeing and atmosphere testing, quoted separately",
        EXC_CLASS,
        "Coating and painting \u2014 quoted as a separate scope",
        "Staging and scaffolding unless quoted",
        "Steel material where supplied by owner",
      ],
    },
    equipment: [],
    cases: [],
    related: ["pipe-fabrication", "tank-cleaning"],
    photo: "ship-repair",
    seo: {
      title: "Ship Steel & Hull Structure Repair",
      description: "Hull plate renewal, frame and stiffener repair and crack rectification to class-approved welding procedures, afloat or in dock.",
    },
  },

  {
    slug: "pipe-fabrication",
    name: "Pipe Fabrication & Welding",
    tagline: "Steel, copper and stainless pipework",
    group: "hull-deck",
    description: [
      "Fabrication and renewal of shipboard pipework in steel, copper, cupro-nickel and stainless \u2014 spool manufacture, on-board fitting and pressure testing.",
      "Spools are made against the removed section or a dimensioned sketch and pressure tested before handover. Pipe runs through tanks and void spaces are coordinated with the permit system.",
    ],
    capabilities: [
      "Spool fabrication to sample or sketch",
      "Steel, copper, cupro-nickel and stainless welding",
      "Ballast, bilge, fuel and cooling line renewal",
      "Flange, bend and reducer manufacture",
      "Pressure testing on completion",
      "On-board and workshop fabrication",
    ],
    scope: {
      included: [
        "Welding to an approved procedure with qualified welders",
        INC_LABOUR,
        "Pressure testing with recorded results",
        "Pipe material where quoted",
        INC_REPORT,
      ],
      excluded: [
        "Gas-freeing and tank entry, quoted separately",
        EXC_CLASS,
        "Insulation and lagging renewal",
        "Coating of new pipework unless quoted",
      ],
    },
    equipment: [],
    cases: [],
    related: ["steel-hull-repair", "pump-repair", "boiler-repair"],
    photo: "fabrication-welding",
    seo: {
      title: "Marine Pipe Fabrication & Welding",
      description: "Shipboard pipe spool fabrication and renewal in steel, copper, cupro-nickel and stainless, welded to approved procedures and pressure tested.",
    },
  },

  {
    slug: "deck-machinery-repair",
    name: "Deck Machinery Repair",
    tagline: "Winches, windlass, cranes and hatch covers",
    group: "hull-deck",
    description: [
      "Repair and overhaul of mooring winches, anchor windlasses, provision and deck cranes, steering gear and hatch cover systems \u2014 mechanical, hydraulic and electrical together rather than in three separate visits.",
      "Brake holding capacity is tested on completion where the equipment is on a load path. Hatch cover ultrasonic tightness testing can be arranged alongside the mechanical work.",
    ],
    capabilities: [
      "Mooring winch and windlass overhaul",
      "Brake lining renewal and holding test",
      "Crane slew ring and wire renewal",
      "Hatch cover cleat, wheel and packing renewal",
      "Steering gear ram and seal renewal",
      "Combined mechanical, hydraulic and electrical attendance",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Brake holding test on completion where applicable",
        "Function test through full range",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Wire rope supply \u2014 a Ship Supplies line",
        "Hatch cover ultrasonic tightness testing unless quoted",
        "Steel renewal \u2014 quoted under Steel & Hull",
      ],
    },
    equipment: [],
    cases: [],
    related: ["hydraulic-systems", "steel-hull-repair", "electrical-repair"],
    photo: "deck-winch",
    seo: {
      title: "Deck Machinery Repair",
      description: "Overhaul of mooring winches, windlasses, cranes, steering gear and hatch covers \u2014 mechanical, hydraulic and electrical, with brake testing on completion.",
    },
  },

  {
    slug: "propeller-shaft",
    name: "Propeller Polishing & Shaft Alignment",
    tagline: "Polishing, shaft alignment and sterntube work",
    group: "hull-deck",
    description: [
      "Propeller polishing to restore surface finish and fuel efficiency, and shaft alignment to remove vibration and protect bearings \u2014 carried out afloat by divers or in dock.",
      "Roughness is measured before and after polishing and the reading issued. A polished propeller with no before-and-after figure is an invoice without evidence.",
    ],
    capabilities: [
      "Propeller polishing to Rubert comparator grade",
      "Roughness measured before and after",
      "Underwater polishing by certified divers",
      "Shaft alignment and sighting",
      "Sterntube seal renewal",
      "Propeller blade edge repair",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Roughness grade recorded before and after",
        "Video or photographic record where carried out underwater",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Propeller removal and machining ashore",
        "Shaft withdrawal and bearing renewal \u2014 quoted separately",
        "Diving permissions and port approvals",
      ],
    },
    equipment: [],
    cases: [],
    related: ["underwater-services", "steel-hull-repair", "deck-machinery-repair"],
    photo: "ship-repair",
    seo: {
      title: "Propeller Polishing & Shaft Alignment",
      description: "Propeller polishing to measured Rubert grade, underwater by certified divers or in dock, plus shaft alignment and sterntube seal renewal.",
    },
  },

  {
    slug: "tank-cleaning",
    name: "Tank Cleaning & Sludge Removal",
    tagline: "Fuel, ballast and cargo tanks",
    group: "hull-deck",
    description: [
      "Cleaning of fuel, ballast, bilge and cargo tanks with sludge removal and disposal, prepared to the standard the next operation requires \u2014 inspection, hot work, coating or cargo.",
      "Atmosphere is tested and certified before entry and monitored throughout. Sludge is landed to a licensed reception facility with the disposal receipt issued to the vessel.",
    ],
    capabilities: [
      "Fuel and lube oil tank cleaning",
      "Ballast and void space cleaning",
      "Cargo tank preparation between grades",
      "Sludge and slop removal",
      "Gas-freeing and atmosphere certification",
      "Preparation for hot work, inspection or coating",
    ],
    scope: {
      included: [
        "Atmosphere testing and gas-free certification",
        "Entry procedure and standby manning",
        INC_LABOUR,
        "Sludge landed to a licensed reception facility",
        "Disposal receipt issued to the vessel",
      ],
      excluded: [
        EXC_PORT,
        "Reception facility charges where levied by the port",
        "Coating and painting after cleaning",
        "Steel repair revealed by cleaning \u2014 re-quoted",
        EXC_CLASS,
      ],
    },
    equipment: [],
    cases: [],
    related: ["steel-hull-repair", "underwater-services", "boiler-repair"],
    photo: "lubricants-chemicals",
    seo: {
      title: "Marine Tank Cleaning & Sludge Removal",
      description: "Fuel, ballast and cargo tank cleaning with gas-free certification, sludge removal and licensed disposal receipts.",
    },
  },

  {
    slug: "underwater-services",
    name: "Underwater Hull Cleaning & Inspection",
    tagline: "Diver hull cleaning, IWS and video survey",
    group: "hull-deck",
    description: [
      "Hull and propeller cleaning and underwater inspection by certified commercial divers, carried out at anchorage or alongside without taking the vessel out of service.",
      "Inspections are recorded on video with a written report, in the format class accepts for in-water survey where that is what the job is for.",
    ],
    capabilities: [
      "Hull cleaning and fouling removal",
      "Propeller polishing underwater",
      "Sea chest and grating cleaning",
      "In-water survey (IWS) support for class",
      "Video and written inspection report",
      "Rudder, sterntube and anode inspection",
    ],
    scope: {
      included: [
        "Certified commercial divers and surface support",
        INC_LABOUR,
        "Video record and written inspection report",
        "Coordination with the attending surveyor where required",
      ],
      excluded: [
        EXC_CLASS,
        "Port and harbour authority diving permissions where chargeable",
        "Underwater welding or steel repair \u2014 quoted separately",
        "Anode renewal materials",
      ],
    },
    equipment: [],
    cases: [],
    related: ["propeller-shaft", "tank-cleaning", "steel-hull-repair"],
    photo: "underwater-diver",
    seo: {
      title: "Underwater Hull Cleaning & Inspection",
      description: "Diver hull and propeller cleaning, sea chest clearing and in-water survey support with video and written reports, at anchorage or alongside.",
    },
  },

  {
    slug: "electrical-repair",
    name: "Electrical Repair & Troubleshooting",
    tagline: "Switchboards, distribution and lighting",
    group: "electrical-electronics",
    description: [
      "Fault-finding and repair across the vessel's electrical distribution \u2014 main and emergency switchboards, starters, distribution boards, lighting and cabling.",
      "Fault-finding is charged on attendance and reported in writing, so you have a diagnosis you can act on even if the repair itself waits for the next port or the next window.",
    ],
    capabilities: [
      "Main and emergency switchboard repair",
      "Breaker servicing and contact renewal",
      "Starter panel and contactor renewal",
      "Insulation resistance testing and reporting",
      "Cable fault location and renewal",
      "Lighting and emergency lighting repair",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Test and measurement equipment",
        "Insulation resistance readings recorded",
        "Written fault report with a priced repair option",
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Motor rewinding \u2014 quoted under Motor Rewinding",
        "High-voltage work unless specifically quoted",
        "Standby time outside the agreed attendance window",
      ],
    },
    equipment: [],
    cases: [],
    related: ["motor-rewinding", "automation-pcb", "auxiliary-engine-repair"],
    photo: "electrical-stores",
    seo: {
      title: "Marine Electrical Repair & Troubleshooting",
      description: "Switchboard, breaker, starter and cabling repair with insulation resistance testing and written fault reports, at Indian and Gulf ports.",
    },
  },

  {
    slug: "motor-rewinding",
    name: "Motor Rewinding & Panel Servicing",
    tagline: "Workshop and on-board electrical repair",
    group: "electrical-electronics",
    description: [
      "Rewinding and overhaul of marine electric motors, generators and transformers, in workshop or on board depending on the size of the unit and the time available.",
      "Units are tested before and after work and the results issued with the job. A motor returned without an insulation resistance reading is a motor nobody can sign for.",
    ],
    capabilities: [
      "AC and DC motor rewinding",
      "Generator and alternator rewinding",
      "Transformer repair and rewinding",
      "Bearing replacement and shaft repair",
      "Insulation resistance and high-voltage testing",
      "Control panel repair and refurbishment",
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
        "Foundation or alignment work \u2014 quoted under the relevant repair scope",
        "Cabling and switchgear work beyond the terminal box",
        EXC_SPARES,
      ],
    },
    equipment: [],
    cases: [],
    related: ["electrical-repair", "auxiliary-engine-repair", "automation-pcb"],
    photo: "motor-rewinding",
    seo: {
      title: "Marine Motor Rewinding",
      description: "Rewinding and overhaul of marine motors, generators and transformers, in workshop or on board, with test results issued on completion.",
    },
  },

  {
    slug: "automation-pcb",
    name: "Automation & PCB Repair",
    tagline: "Control systems, PLCs and board-level repair",
    group: "electrical-electronics",
    description: [
      "Fault-finding and repair of engine room automation, alarm and monitoring systems, and board-level repair of PCBs where a replacement module is obsolete or carries an unacceptable lead time.",
      "Board repair is quoted after inspection, not before. Where a board is beyond economic repair we say so rather than returning an invoice and a board that still does not work.",
    ],
    capabilities: [
      "Alarm and monitoring system fault-finding",
      "PLC and I/O module diagnosis",
      "Board-level PCB repair and component renewal",
      "Sensor and transmitter calibration",
      "Oil mist detector servicing",
      "Obsolete system support and replacement advice",
    ],
    scope: {
      included: [
        INC_ATTEND,
        "Inspection and repair quotation before work proceeds",
        INC_LABOUR,
        "Functional test on completion",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Maker-specific software, licences and passwords",
        "System replacement and re-engineering \u2014 quoted separately",
        "Boards assessed as beyond economic repair, reported not repaired",
      ],
    },
    equipment: [],
    cases: [],
    related: ["electrical-repair", "navigation-comms", "fuel-injection"],
    photo: "pcb-electronics",
    seo: {
      title: "Marine Automation & PCB Repair",
      description: "Engine room automation and alarm system fault-finding, PLC diagnosis and board-level PCB repair for obsolete and long-lead modules.",
    },
  },

  {
    slug: "navigation-comms",
    name: "Navigation & Communication Equipment",
    tagline: "Radar, GMDSS, ECDIS and VDR",
    group: "electrical-electronics",
    description: [
      "Servicing and repair of bridge navigation and radio equipment \u2014 radar, ECDIS, GPS, AIS, echo sounder and GMDSS installations \u2014 together with the annual testing the equipment has to pass.",
      "Where work supports a radio survey or VDR annual performance test, the documentation is prepared in the form the surveyor expects. Equipment is type-approved, so replacements are the approved variant rather than a commercial equivalent.",
    ],
    capabilities: [
      "Radar servicing and magnetron renewal",
      "ECDIS and chart system support",
      "GMDSS installation servicing",
      "VDR annual performance test (APT) support",
      "Radio survey preparation and documentation",
      "EPIRB and SART battery renewal",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Type-approved replacement parts with the approval stated",
        "Test and survey documentation in the surveyor's format",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Radio survey and flag inspection fees",
        "Chart and publication supply \u2014 a Ship Supplies line",
        "Satellite airtime and subscription charges",
      ],
    },
    equipment: [],
    cases: [],
    related: ["gyro-autopilot", "automation-pcb", "safety-servicing"],
    photo: "bridge-nav",
    seo: {
      title: "Marine Navigation & Communication Equipment Servicing",
      description: "Radar, ECDIS, GMDSS and VDR servicing with APT support and radio survey documentation at Indian and Gulf ports.",
    },
  },

  {
    slug: "gyro-autopilot",
    name: "Gyrocompass & Autopilot Repair",
    tagline: "Calibration, alignment and steering control",
    group: "electrical-electronics",
    description: [
      "Repair and calibration of gyrocompasses, autopilots and steering control systems, including sensitive element renewal, repeater alignment and sea trial verification.",
      "Calibration is verified against a known heading and the result recorded. An autopilot signed off without a verification record is one that fails at the first port state inspection.",
    ],
    capabilities: [
      "Gyrocompass overhaul and sensitive element renewal",
      "Repeater alignment throughout the vessel",
      "Autopilot control unit repair and setup",
      "Rudder feedback and follow-up unit calibration",
      "Magnetic compass adjustment coordination",
      "Sea trial verification with recorded results",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Calibration verified against a known heading",
        "Verification record issued with the job",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Magnetic compass adjuster's fee where a licensed adjuster is required",
        "Steering gear mechanical repair \u2014 quoted under Deck Machinery",
        "Sea trial time and fuel",
      ],
    },
    equipment: [],
    cases: [],
    related: ["navigation-comms", "automation-pcb", "deck-machinery-repair"],
    photo: "bridge-nav",
    seo: {
      title: "Gyrocompass & Autopilot Repair",
      description: "Gyrocompass overhaul, repeater alignment and autopilot calibration with sea trial verification and recorded results.",
    },
  },

  {
    slug: "hvac-refrigeration",
    name: "AC & Refrigeration Repair",
    tagline: "Provision plant, accommodation AC and reefer",
    group: "hotel-auxiliary",
    description: [
      "Repair and servicing of marine air conditioning, provision refrigeration and reefer container plant \u2014 compressors, condensers, expansion valves, controls and refrigerant handling.",
      "Refrigerant is recovered and logged rather than vented, which is both the regulation and the difference between a repair that passes inspection and one that does not.",
    ],
    capabilities: [
      "Accommodation AC plant servicing",
      "Provision room refrigeration repair",
      "Reefer container plant attendance",
      "Compressor overhaul and renewal",
      "Leak detection and refrigerant recovery",
      "Controls, thermostat and expansion valve renewal",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Refrigerant recovery, handling and logging",
        "Leak test and performance check on completion",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Refrigerant gas supply \u2014 charged per quantity used",
        "Insulation renewal in cold rooms",
        "Electrical supply and cabling work \u2014 quoted under Electrical Repair",
      ],
    },
    equipment: [],
    cases: [],
    related: ["galley-equipment", "electrical-repair", "pump-repair"],
    photo: "refrigeration",
    seo: {
      title: "Marine AC & Refrigeration Repair",
      description: "Accommodation air conditioning, provision refrigeration and reefer plant repair with refrigerant recovery, leak testing and performance checks.",
    },
  },

  {
    slug: "galley-equipment",
    name: "Galley Equipment Repair",
    tagline: "Ovens, ranges, dishwashers and cold rooms",
    group: "hotel-auxiliary",
    description: [
      "Repair and servicing of galley appliances \u2014 ranges, ovens, deep fryers, dishwashers, mixers, cold rooms and the extraction that keeps the galley usable.",
      "Galley equipment is a habitability item at port state inspection as well as a crew welfare one. Faults are reported with a priced repair option so they can be planned rather than deferred indefinitely.",
    ],
    capabilities: [
      "Range, oven and hotplate repair",
      "Dishwasher and food waste unit servicing",
      "Cold room and refrigerator repair",
      "Extraction fan and duct cleaning",
      "Element, thermostat and control renewal",
      "Electrical safety testing of galley appliances",
    ],
    scope: {
      included: [
        INC_ATTEND,
        INC_LABOUR,
        "Electrical safety test on repaired appliances",
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        "Replacement appliances \u2014 quoted as a supply line",
        "Galley deck and bulkhead repair",
        "Extraction duct steel renewal",
      ],
    },
    equipment: [],
    cases: [],
    related: ["hvac-refrigeration", "electrical-repair"],
    photo: "cabin-stores",
    seo: {
      title: "Marine Galley Equipment Repair",
      description: "Repair and servicing of galley ranges, ovens, dishwashers, cold rooms and extraction, with electrical safety testing on completion.",
    },
  },

  {
    slug: "safety-servicing",
    name: "Safety Equipment Servicing",
    tagline: "LSA, FFA, EPIRB, SART and SSAS",
    group: "hotel-auxiliary",
    description: [
      "Inspection and servicing of life-saving and fire-fighting appliances to the intervals SOLAS requires \u2014 lifeboats and davits, liferaft arrangements, breathing apparatus, extinguishers and distress equipment.",
      "Every service produces the certificate and report the next survey will ask for. Where an item is beyond service life we say so at inspection rather than servicing something that has to be renewed anyway.",
    ],
    capabilities: [
      "Lifeboat and davit annual and five-yearly examination",
      "On-load release gear overhaul and testing",
      "Breathing apparatus and compressor testing",
      "Fire extinguisher inspection and refilling",
      "EPIRB, SART and SSAS testing and battery renewal",
      "Immersion suit and lifejacket inspection",
    ],
    scope: {
      included: [
        "Inspection and servicing to the SOLAS interval",
        "Certificates and reports in the form the surveyor expects",
        "Defect list with items beyond service life identified",
        INC_LABOUR,
        INC_REPORT,
      ],
      excluded: [
        EXC_SPARES,
        EXC_CLASS,
        "Replacement LSA and FFA units \u2014 a Ship Supplies line",
        "Liferaft servicing where an approved station must be used",
        "Davit load testing where a separate approved body is required",
      ],
    },
    equipment: [],
    cases: [],
    related: ["navigation-comms", "deck-machinery-repair", "riding-squads"],
    photo: "safety-equipment",
    seo: {
      title: "Marine Safety Equipment Servicing",
      description: "SOLAS servicing of lifeboats, davits, release gear, breathing apparatus, extinguishers, EPIRB, SART and SSAS with certificates issued.",
    },
  },

  {
    slug: "riding-squads",
    name: "Riding Squads",
    tagline: "Crew supplied to work at sea",
    group: "crew",
    description: [
      "Riding squads placed on board to carry out maintenance during the voyage \u2014 chipping, painting, steel preparation and general deck work \u2014 so time in port is not spent on work that can be done under way.",
      "Squad members are documented, certificated and insured before they join. Scope, duration and disembarkation port are agreed in writing in advance, because a squad without a defined end date is a cost without a defined end.",
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
        "Paint, coatings and consumables \u2014 a Ship Supplies line",
        "Visa and immigration charges beyond standard documentation",
        "Extension beyond the agreed disembarkation port",
      ],
    },
    equipment: [],
    cases: [],
    related: ["steel-hull-repair", "tank-cleaning", "underwater-services"],
    photo: "riding-squads",
    seo: {
      title: "Marine Riding Squads",
      description: "Documented and certificated riding squads supplied to carry out maintenance under way, with scope, duration and disembarkation port agreed in advance.",
    },
  },

];

export const getService = (slug: string) =>
  serviceDetails.find((s) => s.slug === slug);

export const servicesInGroup = (key: ServiceGroupKey) =>
  serviceDetails.filter((s) => s.group === key);
