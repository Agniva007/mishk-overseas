/**
 * Marine spares catalogue.
 *
 * THE DIVIDING LINE WITH SUPPLIES (this is the editorial rule — apply it to
 * every new item):
 *   SUPPLIES = ordered by description and IMPA code. Generic, interchangeable.
 *              "Gasket sheet, non-asbestos, 2mm". Lives in supplies.ts.
 *   SPARES   = ordered by maker, model and part number. The nameplate matters.
 *              "MAN B&W 6S50MC exhaust valve spindle". Lives here.
 * If a buyer must quote the nameplate to get the right item, it is a spare.
 *
 * ⚠️ NO PART NUMBERS ARE PUBLISHED. Item entries name the assembly, never a
 *    specific maker part number — a wrong number is something a purchaser
 *    would order against. Same rule as the IMPA codes in supplies.ts.
 *
 * ⚠️ MAKER NAMES are listed as makes we source FOR. That is ordinary practice
 *    for a spares trader and is not a claim of authorised distributorship.
 *    The wording on the hub page says so explicitly — do not strengthen it.
 *
 * ⚠️ AVAILABILITY is illustrative until real stock data is connected.
 */

export type Availability = "stock" | "indent" | "on-request";

export type SparePart = {
  name: string;
  /** Condition or supply basis, e.g. "new, reconditioned or exchange". */
  note?: string;
  availability: Availability;
};

export type SparesCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  /** Makes commonly sourced for. NOT a distributorship claim. */
  makers: string[];
  items: SparePart[];
  sourcing: { title: string; body: string }[];
  related: string[];
  /** Photo id in src/data/photos.ts. */
  photo: string;
  seo: { title: string; description: string };
};

export const availabilityLabels: Record<Availability, string> = {
  stock: "Ex-stock",
  indent: "On indent",
  "on-request": "On request",
};

const NAMEPLATE = {
  title: "Send the nameplate, not a description",
  body: "Maker, type, serial number and the part number from the manual. A photograph of the nameplate and of the part is usually faster than a written description, and removes a round of clarification.",
};

const GENUINE = {
  title: "Genuine, OEM-equivalent or reconditioned",
  body: "We quote whichever you ask for and label each line plainly. Where an equivalent is offered in place of a genuine part, it is stated as an equivalent with the specification difference noted — never substituted silently.",
};

export const spares: SparesCategory[] = [
  {
    slug: "main-engine",
    name: "Main Engine Spares",
    tagline: "Two-stroke and four-stroke propulsion",
    description: [
      "Running gear, combustion components and fuel equipment for slow- and medium-speed main engines, quoted against the maker, type and part number from your manual.",
      "Large components are offered new, reconditioned or on an exchange basis where a core is available. Lead time and origin are stated per line, because on a main engine part the lead time is usually the decision.",
    ],
    makers: ["MAN B&W", "Wärtsilä", "Sulzer", "Mitsubishi", "Hitachi", "Hyundai (HiMSEN)"],
    items: [
      { name: "Cylinder cover, complete", note: "new, reconditioned or exchange", availability: "indent" },
      { name: "Cylinder liner", availability: "indent" },
      { name: "Piston crown and skirt", note: "exchange basis where a core is available", availability: "indent" },
      { name: "Piston ring set", availability: "stock" },
      { name: "Exhaust valve spindle and seat", availability: "indent" },
      { name: "Exhaust valve housing", availability: "on-request" },
      { name: "Fuel injection valve / injector", availability: "stock" },
      { name: "Fuel injection pump and plunger set", availability: "indent" },
      { name: "Starting air valve", availability: "indent" },
      { name: "Main bearing shell", availability: "indent" },
      { name: "Crankpin bearing shell", availability: "indent" },
      { name: "Crosshead bearing", availability: "on-request" },
      { name: "Stuffing box segments", availability: "indent" },
      { name: "Cylinder lubricator and quills", availability: "indent" },
      { name: "Chain and chain tightener", availability: "on-request" },
      { name: "Indicator cock", availability: "stock" },
      { name: "Overhaul gasket and O-ring kit", availability: "stock" },
    ],
    sourcing: [NAMEPLATE, GENUINE,
      { title: "Exchange units", body: "Cylinder covers, pistons and fuel equipment can often be supplied on exchange against a returnable core, which cuts both cost and lead time. Ask at enquiry — it is not always offered unless requested." },
    ],
    related: ["auxiliary-engine", "turbocharger", "fuel-equipment"],
    photo: "discipline-services",
    seo: {
      title: "Main Engine Spares",
      description: "Main engine spares for MAN B&W, Wärtsilä, Sulzer and other makes — cylinder covers, liners, pistons, bearings and fuel equipment, new, reconditioned or on exchange.",
    },
  },

  {
    slug: "auxiliary-engine",
    name: "Auxiliary Engine & Generator Spares",
    tagline: "Gensets, emergency sets and alternators",
    description: [
      "Parts for auxiliary diesel generators and their alternators, including the medium- and high-speed sets most commonly fitted as ship service and emergency generators.",
      "Complete gensets and alternator rotors are sourced to order. For routine overhauls we hold the consumable end — gaskets, bearings, injectors, filters — against the sets we see most often.",
    ],
    makers: ["Yanmar", "Daihatsu", "MAN", "Wärtsilä", "Caterpillar", "Cummins", "Mitsubishi", "Volvo Penta", "Stamford", "Taiyo"],
    items: [
      { name: "Cylinder head, complete", note: "new, reconditioned or exchange", availability: "indent" },
      { name: "Cylinder liner", availability: "indent" },
      { name: "Piston and piston ring set", availability: "indent" },
      { name: "Connecting rod bearing", availability: "indent" },
      { name: "Main bearing set", availability: "indent" },
      { name: "Fuel injector / nozzle assembly", availability: "stock" },
      { name: "Fuel injection pump element", availability: "indent" },
      { name: "Inlet and exhaust valve set", availability: "indent" },
      { name: "Valve seat and guide", availability: "indent" },
      { name: "Governor and actuator", availability: "on-request" },
      { name: "Alternator diode and AVR", availability: "indent" },
      { name: "Alternator bearing", availability: "stock" },
      { name: "Top overhaul gasket kit", availability: "stock" },
      { name: "Lube oil and fuel filter element", availability: "stock" },
      { name: "Water pump and impeller", availability: "indent" },
    ],
    sourcing: [NAMEPLATE, GENUINE,
      { title: "Emergency generator parts", body: "Emergency set spares are quoted against the class requirement for the vessel, not the nearest commercial equivalent — the set has to satisfy survey." },
    ],
    related: ["main-engine", "electrical-automation", "fuel-equipment"],
    photo: "spares-procurement",
    seo: {
      title: "Auxiliary Engine & Generator Spares",
      description: "Auxiliary engine and generator spares for Yanmar, Daihatsu, Caterpillar, Cummins and other makes — heads, liners, injectors, bearings and alternator parts.",
    },
  },

  {
    slug: "turbocharger",
    name: "Turbocharger Spares",
    tagline: "Rotors, cartridges and bearing sets",
    description: [
      "Turbocharger spares and complete cartridge assemblies for the main makes fitted to marine main and auxiliary engines.",
      "Rotor assemblies are balanced before dispatch and supplied with the balance record. Where a reconditioned cartridge will do, it is usually both faster and materially cheaper than new — we will quote both.",
    ],
    makers: ["ABB (VTR / TPL / A100)", "MAN (NA / TCA / TCR)", "Mitsubishi (MET)", "Napier", "KBB", "IHI"],
    items: [
      { name: "Rotor assembly, balanced", note: "new or reconditioned, balance record supplied", availability: "indent" },
      { name: "Cartridge / core assembly", note: "exchange basis available", availability: "indent" },
      { name: "Nozzle ring", availability: "indent" },
      { name: "Turbine blade set", availability: "on-request" },
      { name: "Compressor wheel", availability: "indent" },
      { name: "Journal bearing set", availability: "stock" },
      { name: "Thrust bearing", availability: "stock" },
      { name: "Labyrinth seal / sealing air ring", availability: "indent" },
      { name: "Overhaul gasket and O-ring kit", availability: "stock" },
      { name: "Silencer and air filter element", availability: "stock" },
      { name: "Lube oil pump", availability: "indent" },
      { name: "Special tools for overhaul", availability: "on-request" },
    ],
    sourcing: [NAMEPLATE, GENUINE,
      { title: "Balance records", body: "Rotors and cartridges are supplied with the balancing certificate. A rotor without one is a rotor the superintendent cannot sign off." },
    ],
    related: ["main-engine", "auxiliary-engine", "air-compressor"],
    photo: "turbocharger",
    seo: {
      title: "Turbocharger Spares",
      description: "Turbocharger spares and exchange cartridges for ABB VTR and TPL, MAN NA and TCA, Mitsubishi MET, Napier and KBB — rotors, nozzle rings and bearing sets.",
    },
  },

  {
    slug: "pumps",
    name: "Pumps & Pump Spares",
    tagline: "Centrifugal, screw, gear and reciprocating",
    description: [
      "Complete pump units and their wearing parts — ballast, bilge, fire, cooling, fuel transfer, cargo and sanitary — for the makes commonly fitted in the engine room and on deck.",
      "Mechanical seals, wear rings and impellers are the lines that actually stop a pump, so those are what we hold. Complete units are sourced to order against the duty point as well as the model, because a same-model replacement is not always the same duty.",
    ],
    makers: ["Shinko", "Taiko Kikai", "Naniwa", "Teikoku", "Allweiler", "IMO", "Grundfos", "Desmi", "Azcue", "Hamworthy"],
    items: [
      { name: "Centrifugal pump, complete", availability: "indent" },
      { name: "Impeller", availability: "indent" },
      { name: "Mechanical seal", availability: "stock" },
      { name: "Shaft sleeve", availability: "indent" },
      { name: "Wear ring / casing ring", availability: "indent" },
      { name: "Pump shaft", availability: "indent" },
      { name: "Bearing and bearing housing", availability: "stock" },
      { name: "Screw pump rotor set", availability: "on-request" },
      { name: "Gear pump gear set", availability: "indent" },
      { name: "Coupling and coupling element", availability: "stock" },
      { name: "Gland packing set", availability: "stock" },
      { name: "Overhaul gasket kit", availability: "stock" },
      { name: "Electric motor for pump unit", availability: "indent" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Quote the duty, not just the model", body: "Capacity, head and the medium pumped. A same-model unit built to a different duty point will fit the foundation and still fail to do the job." },
      GENUINE,
    ],
    related: ["purifier-separator", "fresh-water-generator", "pipeline-valves"],
    photo: "marine-pump",
    seo: {
      title: "Marine Pumps & Pump Spares",
      description: "Marine pump spares and complete units for Shinko, Taiko Kikai, Teikoku, Allweiler, Desmi and other makes — impellers, mechanical seals, wear rings and shafts.",
    },
  },

  {
    slug: "air-compressor",
    name: "Air Compressor Spares",
    tagline: "Starting air, service air and control air",
    description: [
      "Spares for main and topping-up air compressors, service air compressors and their coolers, valves and safety fittings.",
      "Valve plates and rings are consumable and are held; crankshafts and complete blocks are sourced to order. Safety valves are supplied set and certified where the survey requires it.",
    ],
    makers: ["Sperre", "Tanabe", "Hatlapa", "Matsubara", "Yanmar", "J.P. Sauer", "Bitzer"],
    items: [
      { name: "Valve plate / suction and delivery valve assembly", availability: "stock" },
      { name: "Valve ring and spring set", availability: "stock" },
      { name: "Piston and piston ring set", availability: "indent" },
      { name: "Cylinder liner", availability: "indent" },
      { name: "Connecting rod and bearing", availability: "indent" },
      { name: "Crankshaft", availability: "on-request" },
      { name: "Intercooler and aftercooler element", availability: "indent" },
      { name: "Unloader assembly", availability: "indent" },
      { name: "Safety valve", note: "supplied set and certified on request", availability: "indent" },
      { name: "Pressure switch and gauge", availability: "stock" },
      { name: "Air filter element", availability: "stock" },
      { name: "Complete overhaul kit", availability: "stock" },
    ],
    sourcing: [NAMEPLATE, GENUINE,
      { title: "Certified safety valves", body: "Where a safety valve must satisfy survey it is supplied set to the stated pressure and certified. Say so at enquiry — an uncertified valve is cheaper and useless for that purpose." },
    ],
    related: ["main-engine", "pumps", "pipeline-valves"],
    photo: "engine-stores",
    seo: {
      title: "Marine Air Compressor Spares",
      description: "Air compressor spares for Sperre, Tanabe, Hatlapa, Matsubara and J.P. Sauer — valve plates, piston and ring sets, coolers, unloaders and overhaul kits.",
    },
  },

  {
    slug: "purifier-separator",
    name: "Purifier & Separator Spares",
    tagline: "Fuel, lube oil and bilge separators",
    description: [
      "Bowl parts, gravity discs and overhaul kits for centrifugal purifiers and clarifiers handling fuel oil, lubricating oil and bilge water.",
      "Bowl discs and seal rings are the lines that determine whether an overhaul succeeds, and they are held. Complete bowls and gear assemblies are sourced to order.",
    ],
    makers: ["Alfa Laval", "Mitsubishi (Selfjector)", "Westfalia (GEA)", "Samgong", "Heishin"],
    items: [
      { name: "Bowl disc set", availability: "indent" },
      { name: "Bowl body and bowl hood", availability: "on-request" },
      { name: "Sliding bowl bottom", availability: "indent" },
      { name: "Gravity disc set", availability: "stock" },
      { name: "Distributor", availability: "indent" },
      { name: "Main seal ring and O-ring kit", availability: "stock" },
      { name: "Horizontal and vertical shaft", availability: "on-request" },
      { name: "Worm wheel and friction block", availability: "indent" },
      { name: "Ball bearing set", availability: "stock" },
      { name: "Operating water valve / paring disc", availability: "indent" },
      { name: "Complete overhaul kit", note: "typically supplied as an intermediate or major service kit", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Say which service interval", body: "Purifier kits are sold as intermediate or major service sets and they are not the same parts. Quoting the interval avoids a kit that is missing the one item you needed." },
      GENUINE,
    ],
    related: ["pumps", "fresh-water-generator", "environmental"],
    photo: "lubricants-chemicals",
    seo: {
      title: "Purifier & Separator Spares",
      description: "Purifier and separator spares for Alfa Laval, Mitsubishi Selfjector, Westfalia GEA and Samgong — bowl discs, gravity discs, seal rings and service kits.",
    },
  },

  {
    slug: "fresh-water-generator",
    name: "Fresh Water Generator Spares",
    tagline: "Evaporators, plates and ejectors",
    description: [
      "Plate packs, gaskets, ejectors and controls for vacuum evaporator type fresh water generators, plus the salinometers and solenoids that take them offline when they go faulty.",
      "Plate packs are the long-lead item and the one most often needed at short notice, so send the plant model and plate count early even if the order follows later.",
    ],
    makers: ["Alfa Laval", "Sondex", "Atlas", "Sasakura", "Nirex", "Danfoss"],
    items: [
      { name: "Evaporator plate pack", availability: "indent" },
      { name: "Condenser plate pack", availability: "indent" },
      { name: "Plate gasket set", availability: "stock" },
      { name: "Ejector nozzle", availability: "indent" },
      { name: "Ejector pump and spares", availability: "indent" },
      { name: "Distillate pump", availability: "indent" },
      { name: "Salinometer and electrode cell", availability: "indent" },
      { name: "Solenoid valve", availability: "stock" },
      { name: "Sight glass and gasket", availability: "stock" },
      { name: "Complete gasket and O-ring kit", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Plate count matters", body: "Two plants of the same model can carry different plate counts. Send the count as well as the model, or the pack that arrives will not build up to the right stack height." },
      GENUINE,
    ],
    related: ["purifier-separator", "pumps", "boiler-heat-exchanger"],
    photo: "refrigeration",
    seo: {
      title: "Fresh Water Generator Spares",
      description: "Fresh water generator spares for Alfa Laval, Sondex, Atlas, Sasakura and Nirex — evaporator plate packs, gaskets, ejectors, salinometers and solenoids.",
    },
  },

  {
    slug: "boiler-heat-exchanger",
    name: "Boiler & Heat Exchanger Spares",
    tagline: "Burners, tubes, plates and controls",
    description: [
      "Burner parts, tubes, gauge fittings and controls for auxiliary and exhaust gas boilers, and plate packs and gaskets for coolers and heaters throughout the engine room.",
      "Burner nozzles, photocells and ignition electrodes are the parts a boiler actually stops for, and they are held. Tube renewal and re-tubing sets are sourced against the drawing.",
    ],
    makers: ["Aalborg", "Alfa Laval", "Miura", "Kangrim", "Volcano", "Saacke", "Weishaupt", "APV"],
    items: [
      { name: "Burner nozzle / atomiser tip", availability: "stock" },
      { name: "Ignition electrode and transformer", availability: "stock" },
      { name: "Photocell / flame eye", availability: "stock" },
      { name: "Burner fan and motor", availability: "indent" },
      { name: "Boiler tube", note: "quoted against the drawing", availability: "indent" },
      { name: "Water level gauge glass and fittings", availability: "stock" },
      { name: "Water level control and electrode", availability: "indent" },
      { name: "Safety valve", note: "supplied set and certified on request", availability: "indent" },
      { name: "Feed water regulator", availability: "indent" },
      { name: "Plate heat exchanger plate pack", availability: "indent" },
      { name: "Heat exchanger gasket set", availability: "stock" },
      { name: "Refractory and insulation material", availability: "indent" },
    ],
    sourcing: [NAMEPLATE, GENUINE,
      { title: "Pressure parts", body: "Tubes, safety valves and other pressure-retaining items are supplied with material certificates where class requires them. Tell us if the job is under survey." },
    ],
    related: ["fresh-water-generator", "pipeline-valves", "pumps"],
    photo: "fabrication-welding",
    seo: {
      title: "Boiler & Heat Exchanger Spares",
      description: "Boiler and heat exchanger spares for Aalborg, Alfa Laval, Miura, Kangrim and Saacke — burner nozzles, electrodes, tubes, gauge fittings and plate packs.",
    },
  },

  {
    slug: "deck-machinery",
    name: "Deck Machinery Spares",
    tagline: "Winches, windlass, cranes and hatch covers",
    description: [
      "Parts for mooring winches, anchor windlasses, provision and deck cranes, steering gear and hatch cover systems — mechanical, hydraulic and electrical.",
      "Brake linings, gypsy wheels and hydraulic seals are the routine lines. Gearboxes and complete winch units are sourced to order against the maker's drawing.",
    ],
    makers: ["Hatlapa", "Rolls-Royce (Brattvaag)", "MacGregor", "TTS", "Kawasaki", "Mitsubishi", "IHI", "Flutek"],
    items: [
      { name: "Brake band and lining", availability: "stock" },
      { name: "Gypsy / cable lifter", availability: "on-request" },
      { name: "Warping drum and clutch", availability: "indent" },
      { name: "Winch gearbox and gear set", availability: "on-request" },
      { name: "Hydraulic motor for winch drive", availability: "indent" },
      { name: "Crane slew bearing", availability: "on-request" },
      { name: "Crane wire rope and sheave", availability: "indent" },
      { name: "Hatch cover cleat and wheel", availability: "indent" },
      { name: "Hatch cover rubber packing", availability: "stock" },
      { name: "Steering gear ram seal kit", availability: "indent" },
      { name: "Rudder carrier bearing", availability: "on-request" },
      { name: "Limit switch and encoder", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Load-bearing parts", body: "Brake components, wire and lifting parts are supplied with certification where the application requires it. No uncertified substitution on a load path." },
      GENUINE,
    ],
    related: ["hydraulics", "electrical-automation", "lifeboat-lsa"],
    photo: "deck-winch",
    seo: {
      title: "Deck Machinery Spares",
      description: "Deck machinery spares for Hatlapa, MacGregor, TTS, Kawasaki and Rolls-Royce Brattvaag — winch brake linings, gypsies, hydraulic motors and hatch cover parts.",
    },
  },

  {
    slug: "hydraulics",
    name: "Hydraulic Equipment & Spares",
    tagline: "Pumps, motors, valves, cylinders and hoses",
    description: [
      "Hydraulic power pack components and system parts for deck machinery, steering gear, hatch covers and cargo systems.",
      "Seal kits and filter elements are held; pumps, motors and complete cylinders are sourced against the model and, where it matters, the displacement and pressure rating rather than the model alone.",
    ],
    makers: ["Rexroth", "Parker", "Kawasaki", "Danfoss", "Eaton (Vickers)", "Yuken", "Hydac", "Sun Hydraulics"],
    items: [
      { name: "Hydraulic pump, variable displacement", availability: "indent" },
      { name: "Hydraulic motor", availability: "indent" },
      { name: "Directional control valve", availability: "indent" },
      { name: "Relief and pressure control valve", availability: "stock" },
      { name: "Hydraulic cylinder, complete", availability: "on-request" },
      { name: "Cylinder seal kit", availability: "stock" },
      { name: "Pump and motor seal kit", availability: "stock" },
      { name: "Hydraulic hose assembly", note: "made up to length with fittings", availability: "stock" },
      { name: "Quick coupling and adaptor", availability: "stock" },
      { name: "Return and pressure filter element", availability: "stock" },
      { name: "Accumulator and bladder", availability: "indent" },
      { name: "Pressure gauge and transducer", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Hoses made to length", body: "Hose assemblies are made up to your measured length with the fittings you specify. Send the old assembly or a dimensioned sketch — a hose that is 100mm short is scrap." },
      GENUINE,
    ],
    related: ["deck-machinery", "pumps", "pipeline-valves"],
    photo: "hydraulic",
    seo: {
      title: "Marine Hydraulic Equipment & Spares",
      description: "Marine hydraulic spares for Rexroth, Parker, Kawasaki, Danfoss and Yuken — pumps, motors, valves, cylinder seal kits, hose assemblies and filter elements.",
    },
  },

  {
    slug: "electrical-automation",
    name: "Electrical, Automation & Electronics",
    tagline: "Switchboards, PCBs, sensors and controls",
    description: [
      "Switchboard components, automation and alarm system parts, PCBs, sensors and instrumentation for engine room and bridge systems.",
      "Obsolete boards are common on older automation systems. Where a board is no longer manufactured we will say so and offer repair or a tested used unit rather than quoting a new part that does not exist.",
    ],
    makers: ["Siemens", "ABB", "Schneider", "Autronica", "Kongsberg", "Terasaki", "Norcontrol", "Selco", "Deif", "Woodward"],
    items: [
      { name: "Air circuit breaker and spares", availability: "indent" },
      { name: "Moulded case circuit breaker", availability: "stock" },
      { name: "Contactor and overload relay", availability: "stock" },
      { name: "Automatic voltage regulator (AVR)", availability: "indent" },
      { name: "Synchronising and load sharing unit", availability: "indent" },
      { name: "Printed circuit board (PCB)", note: "repair or tested used unit offered where obsolete", availability: "on-request" },
      { name: "PLC module and I/O card", availability: "indent" },
      { name: "Alarm and monitoring system sensor", availability: "indent" },
      { name: "Pressure and temperature transmitter", availability: "stock" },
      { name: "Level switch and float", availability: "stock" },
      { name: "Panel meter and transducer", availability: "stock" },
      { name: "Tachometer and pick-up", availability: "indent" },
      { name: "Oil mist detector and spares", availability: "on-request" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Obsolescence is stated, not hidden", body: "If a board or module is out of production we say so at quotation and offer repair, a tested used unit, or the maker's replacement path — rather than quoting something that will never ship." },
      GENUINE,
    ],
    related: ["auxiliary-engine", "navigation-communication", "deck-machinery"],
    photo: "pcb-electronics",
    seo: {
      title: "Marine Electrical, Automation & Electronics Spares",
      description: "Marine electrical and automation spares — breakers, contactors, AVRs, PCBs, PLC modules, transmitters and sensors for Siemens, ABB, Terasaki, Autronica and Deif systems.",
    },
  },

  {
    slug: "navigation-communication",
    name: "Navigation & Communication Spares",
    tagline: "Radar, GMDSS, gyro and autopilot",
    description: [
      "Replacement units and spares for bridge navigation and radio equipment — radar, ECDIS, gyro, autopilot, GPS, AIS, VDR and GMDSS installations.",
      "Much of this equipment is type-approved, so the replacement has to be the approved variant rather than a commercial equivalent. We quote the approved part and say which approval it carries.",
    ],
    makers: ["Furuno", "JRC", "Sperry", "Tokyo Keiki", "Simrad", "Anschütz", "Sailor (Cobham)", "Transas", "Kelvin Hughes"],
    items: [
      { name: "Radar magnetron", availability: "stock" },
      { name: "Radar scanner motor and gearbox", availability: "indent" },
      { name: "Radar display unit and PCB", availability: "on-request" },
      { name: "Gyrocompass sphere / sensitive element", availability: "on-request" },
      { name: "Autopilot control unit", availability: "indent" },
      { name: "GPS and AIS antenna", availability: "stock" },
      { name: "GMDSS radio battery", availability: "stock" },
      { name: "EPIRB and SART battery", note: "replacement to maker's schedule", availability: "indent" },
      { name: "VDR capsule and battery", availability: "on-request" },
      { name: "Echo sounder transducer", availability: "indent" },
      { name: "Speed log sensor", availability: "indent" },
      { name: "Printer and recording paper", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Type approval is not optional", body: "Bridge and radio equipment must carry the approval the vessel's flag requires. We quote the approved variant and state the approval — a commercial equivalent will fail the radio survey." },
      GENUINE,
    ],
    related: ["electrical-automation", "lifeboat-lsa"],
    photo: "bridge-nav",
    seo: {
      title: "Navigation & Communication Equipment Spares",
      description: "Bridge and radio spares for Furuno, JRC, Sperry, Tokyo Keiki, Anschütz and Sailor — magnetrons, scanner motors, gyro parts, antennas, GMDSS and VDR batteries.",
    },
  },

  {
    slug: "pipeline-valves",
    name: "Pipeline & Valve Spares",
    tagline: "Maker-specific valves, actuators and fittings",
    description: [
      "Valve internals, actuators and remote control system parts for engine room and cargo pipelines — the maker-specific end, where the part has to match the valve body already fitted.",
      "Generic stock valves and fittings ordered by size and material sit under Ship Supplies. This category is for parts identified by the valve maker and model.",
    ],
    makers: ["Kitz", "Toa", "Naniwa", "Damcos", "Pleiger", "Nakakita", "Yoshitake", "AVK"],
    items: [
      { name: "Valve seat and disc set", availability: "indent" },
      { name: "Valve spindle and gland", availability: "indent" },
      { name: "Valve repair kit", availability: "stock" },
      { name: "Butterfly valve liner and seat", availability: "indent" },
      { name: "Hydraulic valve actuator", availability: "indent" },
      { name: "Pneumatic valve actuator", availability: "indent" },
      { name: "Remote valve control system parts", availability: "on-request" },
      { name: "Solenoid pilot valve", availability: "stock" },
      { name: "Steam trap and strainer element", availability: "stock" },
      { name: "Expansion joint / bellows", availability: "indent" },
      { name: "Pressure reducing valve", availability: "indent" },
      { name: "Sounding pipe self-closing valve", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Generic valves are a Supplies line", body: "If the requisition reads \"gate valve, bronze, 50mm\" it is a Ship Supplies item and cheaper as one. This category is for parts that must match a specific valve already fitted." },
      GENUINE,
    ],
    related: ["pumps", "hydraulics", "boiler-heat-exchanger"],
    photo: "engine-stores",
    seo: {
      title: "Marine Pipeline & Valve Spares",
      description: "Maker-specific valve spares and actuators for Kitz, Toa, Damcos, Pleiger and Nakakita — seats, discs, spindles, repair kits and remote valve control parts.",
    },
  },

  {
    slug: "environmental",
    name: "Environmental Equipment Spares",
    tagline: "OWS, sewage plant, incinerator and BWTS",
    description: [
      "Parts for the pollution prevention equipment that has to work at survey — oily water separators, sewage treatment plants, incinerators and ballast water treatment systems.",
      "Oil content meter cells and sensors are the items that most often put an OWS out of compliance, and they are held. Filter coalescers and incinerator refractory are sourced to order.",
    ],
    makers: ["Victor Marine", "RWO (Veolia)", "Alfa Laval", "Taiko Kikai", "Hamworthy", "Jowa", "Atlas", "Detegasa"],
    items: [
      { name: "Oil content meter cell and sensor", availability: "indent" },
      { name: "OWS coalescer filter element", availability: "indent" },
      { name: "OWS separator element", availability: "indent" },
      { name: "Three-way / bilge solenoid valve", availability: "stock" },
      { name: "Sewage plant aerator and diffuser", availability: "indent" },
      { name: "Sewage plant macerator pump", availability: "indent" },
      { name: "Chlorinator and dosing unit spares", availability: "indent" },
      { name: "Incinerator burner nozzle", availability: "indent" },
      { name: "Incinerator refractory lining", availability: "on-request" },
      { name: "BWTS UV lamp and quartz sleeve", availability: "indent" },
      { name: "BWTS filter element", availability: "indent" },
      { name: "Sampling point and flow meter", availability: "stock" },
    ],
    sourcing: [NAMEPLATE,
      { title: "Compliance parts", body: "Oil content meters, BWTS consumables and sampling equipment are supplied to the type-approved specification, because this is equipment a PSC inspector will test rather than look at." },
      GENUINE,
    ],
    related: ["purifier-separator", "pumps", "boiler-heat-exchanger"],
    photo: "lubricants-chemicals",
    seo: {
      title: "Marine Environmental Equipment Spares",
      description: "Spares for oily water separators, sewage treatment plants, incinerators and BWTS — oil content meter cells, coalescer elements, UV lamps and macerator pumps.",
    },
  },

  {
    slug: "lifeboat-lsa",
    name: "Lifeboat, Davit & LSA Spares",
    tagline: "Lifeboat engines, release gear and davits",
    description: [
      "Lifeboat engine parts, on-load release gear components, davit and winch spares, and the replaceable elements of life-saving appliances.",
      "Release gear and davit brake parts are supplied to the maker's specification only. This is the one category where an equivalent is never offered, because the equipment has to satisfy annual and five-yearly examination.",
    ],
    makers: ["Bukh", "Yanmar", "Sole Diesel", "Vanguard", "Schat-Harding", "Hatecke", "Jiangyin Neptune", "Norsafe"],
    items: [
      { name: "Lifeboat engine, complete", availability: "on-request" },
      { name: "Lifeboat engine overhaul kit", availability: "indent" },
      { name: "Lifeboat engine impeller and water pump", availability: "stock" },
      { name: "Starter motor and battery", availability: "stock" },
      { name: "On-load release gear components", note: "maker's parts only — no equivalents", availability: "indent" },
      { name: "Hydrostatic interlock unit", availability: "indent" },
      { name: "Davit winch brake lining", availability: "indent" },
      { name: "Davit wire rope", note: "supplied certified", availability: "indent" },
      { name: "Fall preventer device", availability: "indent" },
      { name: "Liferaft hydrostatic release unit", availability: "stock" },
      { name: "Lifeboat hatch seal and window", availability: "indent" },
      { name: "Sprinkler and air support system parts", availability: "on-request" },
    ],
    sourcing: [NAMEPLATE,
      { title: "No equivalents, ever", body: "Release gear, davit brakes and falls are supplied as the maker's parts with certification. An equivalent saves money once and fails the next five-yearly examination." },
      { title: "Examination records", body: "Parts are supplied with the documentation the annual and five-yearly thorough examination requires. Tell us the due date at enquiry." },
    ],
    related: ["deck-machinery", "navigation-communication"],
    photo: "safety-equipment",
    seo: {
      title: "Lifeboat, Davit & LSA Spares",
      description: "Lifeboat engine and davit spares for Bukh, Yanmar, Schat-Harding, Hatecke and Norsafe — overhaul kits, on-load release gear, brake linings and certified falls.",
    },
  },
];

export const getSpares = (slug: string) => spares.find((c) => c.slug === slug);

export const totalSpareLines = spares.reduce((n, c) => n + c.items.length, 0);

/** Every make named across the catalogue, de-duplicated and sorted. */
export const allMakers = [...new Set(spares.flatMap((c) => c.makers))].sort(
  (a, b) => a.localeCompare(b),
);
