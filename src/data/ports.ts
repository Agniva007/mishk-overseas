/**
 * Ports served.
 *
 * ⚠️ PLACEHOLDER SET — the shape of the coverage is client-stated ("we cover
 * 148 global ports"), the individual entries are not yet client-confirmed.
 * Coordinates and UN/LOCODEs are real published values; which ports are
 * actually served, the lead times and the agent arrangements are NOT.
 * See ASSETS.md §3 before publishing.
 *
 * Two tiers, and the distinction is the whole point of this file:
 *
 *   core    — the Indian coasts and the UAE hubs. Own desk, own delivery or a
 *             named partner, published lead times, and a /ports/[slug] page.
 *   network — the global reach. Served through the agent network, quoted case
 *             by case. Listed on /ports and in the quote form, but NO detail
 *             page: 127 pages differing only by name and LOCODE would read as
 *             thin, duplicate content and drag the core port pages down with
 *             them. They earn a page when there is real local detail to put
 *             on it — see `notes`.
 */

export type Region =
  | "india-west"
  | "india-east"
  | "middle-east"
  | "suez"
  | "far-east"
  | "south-east-asia"
  | "oceania"
  | "europe"
  | "americas"
  | "africa";

/** `core` ports get a detail page; `network` ports are listed only. */
export type Tier = "core" | "network";

export type Port = {
  slug: string;
  name: string;
  locode: string;
  region: Region;
  country: string;
  lat: number;
  lng: number;
  tier: Tier;
  /** Supply available now vs. on request. Network ports are always on request. */
  active: boolean;
  leadTime: string;
  /** Delivery modes. Known for core ports; on request everywhere else. */
  alongside?: boolean;
  anchorage?: boolean;
  /** Nearby ports served from the same base, by slug. Core ports only. */
  nearby?: string[];
  /**
   * Per-port local knowledge — berths, anchorage practice, customs quirks,
   * agent arrangements. PENDING for every port.
   *
   * ⚠️ This is the field that makes these pages rank. Without it the core port
   * pages differ only by name, LOCODE, coordinates and lead time — the rest of
   * the body is identical, which search engines can read as thin or duplicate
   * content. Two or three sentences of genuine local detail per port fixes
   * that, and only the client can write them. See ASSETS.md §3.
   */
  notes?: string;
};

/**
 * Derived, not stored. An active core port carries the full catalogue and the
 * full service list; an on-request core port is served through a partner agent;
 * a network port is reached through the global agent network and quoted case by
 * case. Kept as a function so it stays in one place when the client confirms
 * real per-port coverage.
 */
export const coverageFor = (port: Port) => {
  if (port.tier === "network") {
    return {
      supplies: "Catalogued categories on request",
      services: "Attendance arranged through the local agent",
      note: "Part of our global network. Supplied and attended through an appointed local agent, quoted against the requisition and the vessel's window.",
    };
  }
  return port.active
    ? {
        supplies: "All 11 catalogued categories",
        services: "Full technical services, subject to scope",
        note: "Own delivery. Requisitions quoted within two hours.",
      }
    : {
        supplies: "Catalogued categories on request",
        services: "Attendance arranged case by case",
        note: "Served through a partner agent. Confirm availability at enquiry.",
      };
};

/* --- Network port shorthand ---------------------------------------------- */
/* 127 of the 148 entries share every field but name, code and position, so
   they are written as tuples rather than 127 near-identical object literals. */

type NetRow = [slug: string, name: string, locode: string, lat: number, lng: number];

const net = (region: Region, country: string, rows: NetRow[]): Port[] =>
  rows.map(([slug, name, locode, lat, lng]) => ({
    slug,
    name,
    locode,
    region,
    country,
    lat,
    lng,
    tier: "network",
    active: false,
    leadTime: "On request",
  }));

/* --- Core: India & the UAE hubs ------------------------------------------ */

const corePorts: Port[] = [
  /* West coast */
  { slug: "kandla", name: "Kandla (Deendayal)", locode: "INIXY", region: "india-west", country: "India", lat: 23.03, lng: 70.22, tier: "core", active: true, leadTime: "4–6 hrs", alongside: true, anchorage: true, nearby: ["mundra", "sikka"] },
  { slug: "mundra", name: "Mundra", locode: "INMUN", region: "india-west", country: "India", lat: 22.74, lng: 69.70, tier: "core", active: true, leadTime: "4–6 hrs", alongside: true, anchorage: true, nearby: ["kandla", "sikka"] },
  { slug: "sikka", name: "Sikka", locode: "INSIK", region: "india-west", country: "India", lat: 22.43, lng: 69.84, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["kandla", "mundra", "okha"] },
  { slug: "okha", name: "Okha", locode: "INOKH", region: "india-west", country: "India", lat: 22.47, lng: 69.07, tier: "core", active: false, leadTime: "8–12 hrs", alongside: false, anchorage: true, nearby: ["sikka", "porbandar"] },
  { slug: "porbandar", name: "Porbandar", locode: "INPBD", region: "india-west", country: "India", lat: 21.64, lng: 69.60, tier: "core", active: false, leadTime: "8–12 hrs", alongside: false, anchorage: true, nearby: ["okha", "sikka"] },
  { slug: "mumbai", name: "Mumbai", locode: "INBOM", region: "india-west", country: "India", lat: 18.94, lng: 72.84, tier: "core", active: true, leadTime: "4–6 hrs", alongside: true, anchorage: true, nearby: ["nhava-sheva"] },
  { slug: "nhava-sheva", name: "Nhava Sheva", locode: "INNSA", region: "india-west", country: "India", lat: 18.95, lng: 72.95, tier: "core", active: true, leadTime: "4–6 hrs", alongside: true, anchorage: true, nearby: ["mumbai"] },
  { slug: "mormugao", name: "Mormugao", locode: "INMRM", region: "india-west", country: "India", lat: 15.40, lng: 73.80, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["new-mangalore", "mumbai"] },
  { slug: "new-mangalore", name: "New Mangalore", locode: "INNML", region: "india-west", country: "India", lat: 12.92, lng: 74.80, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["mormugao", "cochin"] },
  { slug: "cochin", name: "Cochin", locode: "INCOK", region: "india-west", country: "India", lat: 9.97, lng: 76.26, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["new-mangalore", "tuticorin"] },

  /* East coast */
  { slug: "tuticorin", name: "Tuticorin", locode: "INTUT", region: "india-east", country: "India", lat: 8.76, lng: 78.18, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["cochin", "chennai"] },
  { slug: "chennai", name: "Chennai", locode: "INMAA", region: "india-east", country: "India", lat: 13.09, lng: 80.29, tier: "core", active: true, leadTime: "4–6 hrs", alongside: true, anchorage: true, nearby: ["ennore", "krishnapatnam"] },
  { slug: "ennore", name: "Ennore (Kamarajar)", locode: "INENR", region: "india-east", country: "India", lat: 13.24, lng: 80.32, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["chennai", "krishnapatnam"] },
  { slug: "krishnapatnam", name: "Krishnapatnam", locode: "INKRI", region: "india-east", country: "India", lat: 14.28, lng: 80.12, tier: "core", active: false, leadTime: "8–12 hrs", alongside: false, anchorage: true, nearby: ["chennai", "ennore"] },
  { slug: "visakhapatnam", name: "Visakhapatnam", locode: "INVTZ", region: "india-east", country: "India", lat: 17.69, lng: 83.28, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["paradip", "chennai"] },
  { slug: "paradip", name: "Paradip", locode: "INPRT", region: "india-east", country: "India", lat: 20.26, lng: 86.68, tier: "core", active: true, leadTime: "8–12 hrs", alongside: true, anchorage: true, nearby: ["visakhapatnam", "haldia"] },
  { slug: "haldia", name: "Haldia", locode: "INHAL", region: "india-east", country: "India", lat: 22.03, lng: 88.10, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: true, nearby: ["kolkata", "paradip"] },
  { slug: "kolkata", name: "Kolkata", locode: "INCCU", region: "india-east", country: "India", lat: 22.55, lng: 88.31, tier: "core", active: true, leadTime: "6–8 hrs", alongside: true, anchorage: false, nearby: ["haldia"] },

  /* UAE hubs — our own desk, which is why they are core and not network. */
  { slug: "jebel-ali", name: "Jebel Ali", locode: "AEJEA", region: "middle-east", country: "United Arab Emirates", lat: 25.01, lng: 55.06, tier: "core", active: true, leadTime: "8–12 hrs", alongside: true, anchorage: true, nearby: ["fujairah", "khor-fakkan"] },
  { slug: "fujairah", name: "Fujairah", locode: "AEFJR", region: "middle-east", country: "United Arab Emirates", lat: 25.17, lng: 56.35, tier: "core", active: true, leadTime: "8–12 hrs", alongside: true, anchorage: true, nearby: ["khor-fakkan", "jebel-ali"] },
  { slug: "khor-fakkan", name: "Khor Fakkan", locode: "AEKLF", region: "middle-east", country: "United Arab Emirates", lat: 25.35, lng: 56.36, tier: "core", active: false, leadTime: "12–24 hrs", alongside: false, anchorage: true, nearby: ["fujairah", "jebel-ali"] },
];

/* --- Network: the global reach ------------------------------------------- */

const networkPorts: Port[] = [
  /* Middle East & the Arabian Gulf ------------------------------------- */
  ...net("middle-east", "United Arab Emirates", [
    ["khalifa-port", "Khalifa Port", "AEKHL", 24.80, 54.64],
    ["mina-zayed", "Mina Zayed (Abu Dhabi)", "AEAUH", 24.52, 54.38],
    ["sharjah", "Sharjah (Port Khalid)", "AESHJ", 25.36, 55.38],
    ["hamriyah", "Hamriyah", "AEHAM", 25.47, 55.50],
    ["ajman", "Ajman", "AEAJM", 25.41, 55.44],
    ["ras-al-khaimah", "Ras Al Khaimah (Mina Saqr)", "AERKT", 25.98, 56.05],
  ]),
  ...net("middle-east", "Saudi Arabia", [
    ["dammam", "Dammam (King Abdul Aziz)", "SADMM", 26.50, 50.20],
    ["jubail", "Jubail", "SAJUB", 27.00, 49.66],
    ["ras-tanura", "Ras Tanura", "SARTA", 26.64, 50.16],
    ["ras-al-khair", "Ras Al Khair", "SARAK", 27.52, 49.25],
  ]),
  ...net("middle-east", "Oman", [
    ["sohar", "Sohar", "OMSOH", 24.50, 56.63],
    ["muscat", "Muscat (Sultan Qaboos)", "OMMCT", 23.63, 58.57],
    ["mina-al-fahal", "Mina Al Fahal", "OMMFH", 23.63, 58.50],
    ["salalah", "Salalah", "OMSLL", 16.95, 54.01],
    ["duqm", "Duqm", "OMDQM", 19.67, 57.70],
    ["sur", "Sur", "OMSUR", 22.57, 59.53],
    ["khasab", "Khasab", "OMKHS", 26.20, 56.25],
  ]),

  /* Suez, Egypt & the Red Sea ------------------------------------------ */
  ...net("suez", "Egypt", [
    ["port-said", "Port Said", "EGPSD", 31.26, 32.30],
    ["suez", "Suez (Port Tewfik)", "EGSUZ", 29.93, 32.55],
    ["ain-sokhna", "Ain Sokhna", "EGSOK", 29.63, 32.35],
    ["alexandria", "Alexandria", "EGALY", 31.18, 29.87],
    ["el-dekheila", "El Dekheila", "EGEDK", 31.13, 29.81],
    ["damietta", "Damietta", "EGDAM", 31.47, 31.76],
  ]),
  ...net("suez", "Saudi Arabia", [
    ["jeddah", "Jeddah (Islamic Port)", "SAJED", 21.47, 39.17],
    ["king-abdullah-port", "King Abdullah Port", "SAKAC", 22.46, 39.11],
    ["yanbu", "Yanbu", "SAYNB", 24.09, 38.06],
  ]),

  /* Far East ------------------------------------------------------------ */
  ...net("far-east", "China", [
    ["shanghai", "Shanghai", "CNSHA", 31.23, 121.47],
    ["ningbo", "Ningbo", "CNNGB", 29.87, 121.55],
    ["zhoushan", "Zhoushan", "CNZOS", 30.00, 122.10],
    ["qingdao", "Qingdao", "CNTAO", 36.07, 120.32],
    ["tianjin", "Tianjin (Xingang)", "CNTSN", 38.98, 117.71],
    ["dalian", "Dalian", "CNDLC", 38.93, 121.63],
    ["yantai", "Yantai", "CNYNT", 37.54, 121.39],
    ["rizhao", "Rizhao", "CNRZH", 35.38, 119.55],
    ["lianyungang", "Lianyungang", "CNLYG", 34.75, 119.45],
    ["zhangjiagang", "Zhangjiagang", "CNZJG", 31.95, 120.55],
    ["nanjing", "Nanjing", "CNNKG", 32.08, 118.73],
    ["caofeidian", "Caofeidian", "CNCFD", 38.95, 118.50],
    ["shenzhen", "Shenzhen (Shekou)", "CNSHK", 22.48, 113.91],
    ["yantian", "Yantian", "CNYTN", 22.58, 114.27],
    ["guangzhou", "Guangzhou", "CNCAN", 23.10, 113.43],
    ["xiamen", "Xiamen", "CNXMN", 24.48, 118.08],
    ["fuzhou", "Fuzhou", "CNFOC", 26.08, 119.30],
  ]),
  ...net("far-east", "Japan", [
    ["yokohama", "Yokohama", "JPYOK", 35.45, 139.66],
    ["tokyo", "Tokyo", "JPTYO", 35.62, 139.78],
    ["chiba", "Chiba", "JPCHB", 35.57, 140.07],
    ["kawasaki", "Kawasaki", "JPKWS", 35.51, 139.73],
    ["nagoya", "Nagoya", "JPNGO", 35.08, 136.88],
    ["osaka", "Osaka", "JPOSA", 34.65, 135.43],
    ["kobe", "Kobe", "JPUKB", 34.68, 135.19],
    ["mizushima", "Mizushima", "JPMIZ", 34.51, 133.73],
    ["kitakyushu", "Kitakyushu (Moji)", "JPKKJ", 33.90, 130.93],
    ["tomakomai", "Tomakomai", "JPTMK", 42.63, 141.62],
  ]),
  ...net("far-east", "Hong Kong", [
    ["hong-kong", "Hong Kong", "HKHKG", 22.30, 114.17],
  ]),

  /* South East Asia ----------------------------------------------------- */
  ...net("south-east-asia", "Singapore", [
    ["singapore", "Singapore", "SGSIN", 1.26, 103.83],
    ["jurong", "Jurong", "SGJUR", 1.30, 103.70],
  ]),
  ...net("south-east-asia", "Vietnam", [
    ["ho-chi-minh", "Ho Chi Minh City", "VNSGN", 10.77, 106.70],
    ["haiphong", "Haiphong", "VNHPH", 20.86, 106.72],
    ["vung-tau", "Vung Tau", "VNVUT", 10.35, 107.08],
    ["phu-my", "Phu My (Cai Mep)", "VNPMY", 10.58, 107.03],
    ["da-nang", "Da Nang", "VNDAD", 16.11, 108.21],
    ["quy-nhon", "Quy Nhon", "VNUIH", 13.76, 109.23],
    ["dung-quat", "Dung Quat", "VNDQU", 15.42, 108.78],
    ["cam-pha", "Cam Pha", "VNCPH", 21.02, 107.35],
    ["can-tho", "Can Tho", "VNVCA", 10.03, 105.78],
  ]),

  /* Australia & Oceania -------------------------------------------------- */
  ...net("oceania", "Australia", [
    ["sydney", "Sydney", "AUSYD", -33.86, 151.21],
    ["melbourne", "Melbourne", "AUMEL", -37.84, 144.92],
    ["brisbane", "Brisbane", "AUBNE", -27.38, 153.17],
    ["fremantle", "Fremantle", "AUFRE", -32.05, 115.75],
    ["adelaide", "Adelaide", "AUADL", -34.78, 138.49],
    ["newcastle-au", "Newcastle", "AUNTL", -32.92, 151.78],
    ["port-kembla", "Port Kembla", "AUPKL", -34.47, 150.90],
    ["geelong", "Geelong", "AUGEX", -38.11, 144.39],
    ["port-hedland", "Port Hedland", "AUPHE", -20.31, 118.57],
    ["dampier", "Dampier", "AUDAM", -20.66, 116.71],
    ["gladstone", "Gladstone", "AUGLT", -23.84, 151.25],
    ["townsville", "Townsville", "AUTSV", -19.25, 146.83],
    ["darwin", "Darwin", "AUDRW", -12.47, 130.85],
  ]),

  /* Europe & the Gibraltar Strait ---------------------------------------- */
  ...net("europe", "United Kingdom", [
    ["london", "London", "GBLON", 51.51, 0.07],
    ["tilbury", "Tilbury", "GBTIL", 51.46, 0.36],
    ["southampton", "Southampton", "GBSOU", 50.90, -1.40],
    ["felixstowe", "Felixstowe", "GBFXT", 51.95, 1.33],
    ["liverpool", "Liverpool", "GBLIV", 53.43, -3.00],
    ["immingham", "Immingham", "GBIMM", 53.63, -0.19],
    ["hull", "Hull", "GBHUL", 53.74, -0.29],
    ["teesport", "Teesport", "GBTEE", 54.60, -1.15],
    ["milford-haven", "Milford Haven", "GBMLF", 51.70, -5.03],
    ["aberdeen", "Aberdeen", "GBABD", 57.14, -2.08],
    ["belfast", "Belfast", "GBBEL", 54.61, -5.92],
  ]),
  ...net("europe", "Gibraltar", [
    ["gibraltar", "Gibraltar", "GIGIB", 36.14, -5.36],
  ]),
  ...net("europe", "Spain", [
    ["algeciras", "Algeciras", "ESALG", 36.13, -5.44],
  ]),

  /* Americas & Panama ---------------------------------------------------- */
  ...net("americas", "United States", [
    ["houston", "Houston", "USHOU", 29.73, -95.28],
    ["new-orleans", "New Orleans", "USMSY", 29.93, -90.08],
    ["corpus-christi", "Corpus Christi", "USCRP", 27.81, -97.40],
    ["mobile", "Mobile", "USMOB", 30.70, -88.04],
    ["new-york", "New York & New Jersey", "USNYC", 40.70, -74.02],
    ["baltimore", "Baltimore", "USBAL", 39.26, -76.58],
    ["norfolk", "Norfolk", "USORF", 36.87, -76.33],
    ["charleston", "Charleston", "USCHS", 32.79, -79.93],
    ["savannah", "Savannah", "USSAV", 32.08, -81.10],
    ["los-angeles", "Los Angeles", "USLAX", 33.74, -118.26],
    ["long-beach", "Long Beach", "USLGB", 33.75, -118.19],
    ["oakland", "Oakland", "USOAK", 37.80, -122.32],
    ["seattle", "Seattle", "USSEA", 47.60, -122.34],
  ]),
  ...net("americas", "Panama", [
    ["balboa", "Balboa", "PABLB", 8.95, -79.57],
    ["cristobal", "Cristobal", "PACTB", 9.35, -79.90],
    ["colon", "Colon", "PAONX", 9.36, -79.89],
    ["manzanillo-pa", "Manzanillo (MIT)", "PAMIT", 9.37, -79.82],
  ]),

  /* Africa --------------------------------------------------------------- */
  ...net("africa", "South Africa", [
    ["durban", "Durban", "ZADUR", -29.87, 31.03],
    ["richards-bay", "Richards Bay", "ZARCB", -28.80, 32.03],
    ["cape-town", "Cape Town", "ZACPT", -33.91, 18.43],
    ["port-elizabeth", "Port Elizabeth", "ZAPLZ", -33.96, 25.63],
  ]),
  ...net("africa", "Namibia", [
    ["walvis-bay", "Walvis Bay", "NAWVB", -22.95, 14.50],
  ]),
  ...net("africa", "Angola", [
    ["luanda", "Luanda", "AOLAD", -8.78, 13.23],
  ]),
  ...net("africa", "Republic of the Congo", [
    ["pointe-noire", "Pointe Noire", "CGPNR", -4.78, 11.84],
  ]),
  ...net("africa", "Nigeria", [
    ["lagos-apapa", "Lagos (Apapa)", "NGAPP", 6.44, 3.37],
    ["onne", "Onne", "NGONN", 4.71, 7.15],
  ]),
  ...net("africa", "Togo", [
    ["lome", "Lomé", "TGLFW", 6.13, 1.29],
  ]),
  ...net("africa", "Ghana", [
    ["tema", "Tema", "GHTEM", 5.63, -0.01],
    ["takoradi", "Takoradi", "GHTKD", 4.89, -1.75],
  ]),
  ...net("africa", "Côte d'Ivoire", [
    ["abidjan", "Abidjan", "CIABJ", 5.29, -4.01],
  ]),
  ...net("africa", "Senegal", [
    ["dakar", "Dakar", "SNDKR", 14.68, -17.42],
  ]),
  ...net("africa", "Morocco", [
    ["tanger-med", "Tanger Med", "MAPTM", 35.88, -5.50],
  ]),
  ...net("africa", "Djibouti", [
    ["djibouti", "Djibouti", "DJJIB", 11.60, 43.14],
  ]),
  ...net("africa", "Kenya", [
    ["mombasa", "Mombasa", "KEMBA", -4.06, 39.65],
  ]),
  ...net("africa", "Tanzania", [
    ["dar-es-salaam", "Dar es Salaam", "TZDAR", -6.82, 39.30],
  ]),
  ...net("africa", "Mauritius", [
    ["port-louis", "Port Louis", "MUPLU", -20.16, 57.50],
  ]),
];

export const ports: Port[] = [...corePorts, ...networkPorts];

/** Ports with their own detail page. */
export const detailPorts = ports.filter((p) => p.tier === "core");

export const portsInRegion = (region: Region) =>
  ports.filter((p) => p.region === region);

/**
 * Network ports grouped by country, countries in the order they appear in the
 * data. One country per heading keeps a 30-port region readable.
 */
export const networkByCountry = (region: Region) => {
  const groups = new Map<string, Port[]>();
  for (const port of ports) {
    if (port.region !== region || port.tier !== "network") continue;
    const list = groups.get(port.country);
    if (list) list.push(port);
    else groups.set(port.country, [port]);
  }
  return [...groups].map(([country, list]) => ({ country, ports: list }));
};

/** Distinct countries across the whole network, for the coverage headline. */
export const countryCount = new Set(ports.map((p) => p.country)).size;

export const regionLabels: Record<Region, string> = {
  "india-west": "India — West Coast",
  "india-east": "India — East Coast",
  "middle-east": "Middle East & Arabian Gulf",
  suez: "Suez, Egypt & the Red Sea",
  "far-east": "Far East",
  "south-east-asia": "South East Asia",
  oceania: "Australia & Oceania",
  europe: "Europe & the Gibraltar Strait",
  americas: "Americas & Panama",
  africa: "Africa",
};

/** Short form for tight spaces — chart legends, mega-menu, OG cards. */
export const regionShortLabels: Record<Region, string> = {
  "india-west": "West Coast",
  "india-east": "East Coast",
  "middle-east": "Arabian Gulf",
  suez: "Suez & Red Sea",
  "far-east": "Far East",
  "south-east-asia": "South East Asia",
  oceania: "Oceania",
  europe: "Europe",
  americas: "Americas",
  africa: "Africa",
};

/** Display order: home ground first, then outward along the trade lanes. */
export const regionOrder: Region[] = [
  "india-west",
  "india-east",
  "middle-east",
  "suez",
  "far-east",
  "south-east-asia",
  "oceania",
  "europe",
  "americas",
  "africa",
];

/** Latitude/longitude for display — the network crosses both hemispheres. */
export const formatLat = (lat: number) =>
  `${Math.abs(lat).toFixed(2)}° ${lat < 0 ? "S" : "N"}`;
export const formatLng = (lng: number) =>
  `${Math.abs(lng).toFixed(2)}° ${lng < 0 ? "W" : "E"}`;
