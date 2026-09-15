/**
 * Every photograph the site needs, with the Commons search terms to find it.
 *
 * `queries` are tried in order; the first acceptable candidate wins. Order
 * them most-specific first.
 */
export const SLOTS = [
  // --- Hero / feature -----------------------------------------------------
  { id: "hero", alt: "A container ship berthed at a terminal beneath gantry cranes", ratio: "wide", queries: [
    "container ship port terminal gantry crane",
    "cargo ship berth port night",
    "container terminal ship loading",
  ]},
  { id: "discipline-supplies", alt: "Cartons stacked on high warehouse racking", ratio: "wide", queries: [
    "warehouse pallets stacked goods logistics",
    "cargo crates warehouse storage",
  ]},
  { id: "discipline-services", alt: "An engine room with valves, pipework and gauges", ratio: "wide", queries: [
    "ship engine room machinery",
    "marine engine maintenance workshop",
  ]},

  // --- Supply categories (square) ----------------------------------------
  { id: "provisions", alt: "Crates of fresh vegetables and greens at a wholesale market", ratio: "square", queries: [
    "fresh vegetables crates market produce",
    "vegetables boxes grocery wholesale",
  ]},
  { id: "bonded-stores", alt: "Bottles of spirits on a duty-free shelf", ratio: "square", queries: [
    "cigarette cartons shop shelf",
    "bottles spirits shelf duty free",
    "beverage cans stacked",
  ]},
  { id: "deck-stores", alt: "A coil of mooring rope and wire rope on a ship's deck", ratio: "square", queries: [
    "mooring rope coiled ship deck bollard",
    "ship rope coil deck",
  ]},
  { id: "engine-stores", alt: "A red-topped industrial valve with a flanged steel body", ratio: "square", queries: [
    "pipe fittings valves industrial",
    "bolts nuts fasteners industrial",
  ]},
  { id: "cabin-stores", alt: "Folded towels and linen stacked in piles", ratio: "square", queries: [
    "folded linen towels stacked",
    "stainless steel kitchen pots commercial",
  ]},
  { id: "safety-equipment", alt: "An orange lifebuoy with a heaving line, mounted on a ship's rail", ratio: "square", queries: [
    "life jackets lifejacket rack ship",
    "fire extinguisher red ship",
    "lifebuoy ring ship",
  ]},
  { id: "lubricants-chemicals", alt: "Workers in hard hats beside stacked drums in a store", ratio: "square", queries: [
    "oil drums barrels industrial stacked",
    "blue barrels drums storage",
  ]},
  { id: "marine-paints", alt: "A worker painting the blue hull of a ship from a stage", ratio: "square", queries: [
    "paint cans buckets industrial",
    "ship hull painting workers",
  ]},
  { id: "electrical-stores", alt: "A switchboard panel with ammeters and indicator lamps", ratio: "square", queries: [
    "electrical switchboard panel cables industrial",
    "cable reels electrical wire",
  ]},
  { id: "charts-publications", alt: "A nautical chart with dividers, pencil and a parallel rule", ratio: "square", queries: [
    "nautical chart navigation dividers",
    "nautical chart map table",
  ]},
  { id: "medical-supplies", alt: "A surgical instrument laid on a sterile blue drape", ratio: "square", queries: [
    "first aid kit medical supplies bandage",
    "medicine cabinet supplies",
  ]},

  // --- Services (wide) ----------------------------------------------------
  { id: "ship-repair", alt: "A ship's propeller in dry dock with a worker on a staging", ratio: "wide", queries: [
    "ship dry dock repair hull",
    "shipyard repair vessel dock",
  ]},
  { id: "spares-procurement", alt: "A brass gear wheel in a machine assembly", ratio: "wide", queries: [
    "machine parts spare components warehouse",
    "bearings gears machine parts",
  ]},
  { id: "motor-rewinding", alt: "The copper stator winding of an electric motor", ratio: "wide", queries: [
    "electric motor stator winding coil",
    "electric motor repair workshop",
  ]},
  { id: "fabrication-welding", alt: "A welder striking an arc on steel plate, sparks flying", ratio: "wide", queries: [
    "welder welding steel sparks shipyard",
    "welding metal fabrication worker",
  ]},
  { id: "mechanical-electrical", alt: "A technician in safety glasses working on machinery at a bench", ratio: "wide", queries: [
    "engineer working machinery tools maintenance",
    "technician electrical panel testing",
  ]},
  { id: "riding-squads", alt: "Crew in high-visibility gear and harnesses working on deck", ratio: "wide", queries: [
    "workers ship deck painting maintenance",
    "crew working ship deck",
  ]},
  // --- Spares & extended services (wide) ----------------------------------
  { id: "turbocharger", alt: "An engineer working on a turbine rotor and blades", ratio: "wide", queries: ["turbine rotor blades"] },
  { id: "marine-pump", alt: "Centrifugal and mixed-flow pump impellers", ratio: "wide", queries: ["pump impeller"] },
  { id: "hydraulic", alt: "A hydraulic cylinder and machined ram", ratio: "wide", queries: ["hydraulic cylinder"] },
  { id: "pcb-electronics", alt: "A technician repairing electronics at a test bench", ratio: "wide", queries: ["electronic circuit board repair"] },
  { id: "bridge-nav", alt: "A ship's bridge console with navigation displays", alt2: "", ratio: "wide", queries: ["ship bridge console"] },
  { id: "underwater-diver", alt: "A commercial diver being fitted with a diving helmet", ratio: "wide", queries: ["commercial diver underwater"] },
  { id: "refrigeration", alt: "Refrigeration compressors in a machinery plant room", ratio: "wide", queries: ["refrigeration compressor"] },
  { id: "deck-winch", alt: "An anchor windlass and cable on a ship's deck", ratio: "wide", queries: ["anchor windlass"] },
];
