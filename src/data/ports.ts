/**
 * Ports served.
 *
 * ⚠️ PLACEHOLDER SET — this is a plausible Indian + Gulf port list, NOT a
 * client-confirmed one. Coordinates are real (used for the chart plot);
 * coverage, lead times and agents are invented. See ASSETS.md §3.
 */

export type Coast = "west" | "east" | "gulf";

export type Port = {
  slug: string;
  name: string;
  locode: string;
  coast: Coast;
  lat: number;
  lng: number;
  /** Supply available now vs. on request. */
  active: boolean;
  leadTime: string;
  /** Delivery modes available. PLACEHOLDER — client to confirm per port. */
  alongside: boolean;
  anchorage: boolean;
  /** Nearby ports served from the same base, by slug. */
  nearby: string[];
  /**
   * Per-port local knowledge — berths, anchorage practice, customs quirks,
   * agent arrangements. PENDING for every port.
   *
   * ⚠️ This is the field that makes these pages rank. Without it the 21 port
   * pages differ only by name, LOCODE, coordinates and lead time — the rest
   * of the body is identical, which search engines can read as thin or
   * duplicate content. Two or three sentences of genuine local detail per
   * port fixes that, and only the client can write them. See ASSETS.md §3.
   */
  notes?: string;
};

/**
 * Derived, not stored: an active port carries the full catalogue and the full
 * service list; an on-request port is served through a partner agent and is
 * quoted case by case. Kept as a function so it stays in one place when the
 * client confirms real per-port coverage.
 */
export const coverageFor = (port: Port) =>
  port.active
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

export const ports: Port[] = [
  /* --- West coast ------------------------------------------------------- */
  { slug: "kandla", name: "Kandla (Deendayal)", locode: "INIXY", coast: "west", lat: 23.03, lng: 70.22, active: true, leadTime: "4–6 hrs" , alongside: true, anchorage: true, nearby: ["mundra", "sikka"] },
  { slug: "mundra", name: "Mundra", locode: "INMUN", coast: "west", lat: 22.74, lng: 69.70, active: true, leadTime: "4–6 hrs" , alongside: true, anchorage: true, nearby: ["kandla", "sikka"] },
  { slug: "sikka", name: "Sikka", locode: "INSIK", coast: "west", lat: 22.43, lng: 69.84, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["kandla", "mundra", "okha"] },
  { slug: "okha", name: "Okha", locode: "INOKH", coast: "west", lat: 22.47, lng: 69.07, active: false, leadTime: "8–12 hrs" , alongside: false, anchorage: true, nearby: ["sikka", "porbandar"] },
  { slug: "porbandar", name: "Porbandar", locode: "INPBD", coast: "west", lat: 21.64, lng: 69.60, active: false, leadTime: "8–12 hrs" , alongside: false, anchorage: true, nearby: ["okha", "sikka"] },
  { slug: "mumbai", name: "Mumbai", locode: "INBOM", coast: "west", lat: 18.94, lng: 72.84, active: true, leadTime: "4–6 hrs" , alongside: true, anchorage: true, nearby: ["nhava-sheva"] },
  { slug: "nhava-sheva", name: "Nhava Sheva", locode: "INNSA", coast: "west", lat: 18.95, lng: 72.95, active: true, leadTime: "4–6 hrs" , alongside: true, anchorage: true, nearby: ["mumbai"] },
  { slug: "mormugao", name: "Mormugao", locode: "INMRM", coast: "west", lat: 15.40, lng: 73.80, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["new-mangalore", "mumbai"] },
  { slug: "new-mangalore", name: "New Mangalore", locode: "INNML", coast: "west", lat: 12.92, lng: 74.80, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["mormugao", "cochin"] },
  { slug: "cochin", name: "Cochin", locode: "INCOK", coast: "west", lat: 9.97, lng: 76.26, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["new-mangalore", "tuticorin"] },

  /* --- East coast ------------------------------------------------------- */
  { slug: "tuticorin", name: "Tuticorin", locode: "INTUT", coast: "east", lat: 8.76, lng: 78.18, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["cochin", "chennai"] },
  { slug: "chennai", name: "Chennai", locode: "INMAA", coast: "east", lat: 13.09, lng: 80.29, active: true, leadTime: "4–6 hrs" , alongside: true, anchorage: true, nearby: ["ennore", "krishnapatnam"] },
  { slug: "ennore", name: "Ennore (Kamarajar)", locode: "INENR", coast: "east", lat: 13.24, lng: 80.32, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["chennai", "krishnapatnam"] },
  { slug: "krishnapatnam", name: "Krishnapatnam", locode: "INKRI", coast: "east", lat: 14.28, lng: 80.12, active: false, leadTime: "8–12 hrs" , alongside: false, anchorage: true, nearby: ["chennai", "ennore"] },
  { slug: "visakhapatnam", name: "Visakhapatnam", locode: "INVTZ", coast: "east", lat: 17.69, lng: 83.28, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["paradip", "chennai"] },
  { slug: "paradip", name: "Paradip", locode: "INPRT", coast: "east", lat: 20.26, lng: 86.68, active: true, leadTime: "8–12 hrs" , alongside: true, anchorage: true, nearby: ["visakhapatnam", "haldia"] },
  { slug: "haldia", name: "Haldia", locode: "INHAL", coast: "east", lat: 22.03, lng: 88.10, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: true, nearby: ["kolkata", "paradip"] },
  { slug: "kolkata", name: "Kolkata", locode: "INCCU", coast: "east", lat: 22.55, lng: 88.31, active: true, leadTime: "6–8 hrs" , alongside: true, anchorage: false, nearby: ["haldia"] },

  /* --- Gulf ------------------------------------------------------------- */
  { slug: "jebel-ali", name: "Jebel Ali", locode: "AEJEA", coast: "gulf", lat: 25.01, lng: 55.06, active: true, leadTime: "8–12 hrs" , alongside: true, anchorage: true, nearby: ["fujairah", "khor-fakkan"] },
  { slug: "fujairah", name: "Fujairah", locode: "AEFJR", coast: "gulf", lat: 25.17, lng: 56.35, active: true, leadTime: "8–12 hrs" , alongside: true, anchorage: true, nearby: ["khor-fakkan", "jebel-ali"] },
  { slug: "khor-fakkan", name: "Khor Fakkan", locode: "AEKLF", coast: "gulf", lat: 25.35, lng: 56.36, active: false, leadTime: "12–24 hrs" , alongside: false, anchorage: true, nearby: ["fujairah", "jebel-ali"] },
];

export const coastLabels: Record<Coast, string> = {
  west: "West Coast",
  east: "East Coast",
  gulf: "Gulf",
};

/**
 * Indicative coastline for the chart plot — a simplified traverse of the
 * Indian peninsula, west to east. Not survey data; it exists to give the port
 * dots a recognisable frame.
 */
export const coastline: [number, number][] = [
  [23.7, 68.6], [22.8, 69.1], [22.2, 69.0], [21.6, 69.6], [20.9, 70.4],
  [20.7, 71.0], [21.5, 72.2], [20.4, 72.8], [19.3, 72.8], [18.9, 72.8],
  [17.9, 73.1], [17.0, 73.3], [15.9, 73.5], [15.4, 73.8], [14.8, 74.1],
  [13.9, 74.5], [12.9, 74.8], [11.9, 75.4], [11.2, 75.8], [10.5, 76.0],
  [9.97, 76.26], [8.9, 76.6], [8.5, 77.0], [8.08, 77.55], [8.76, 78.18],
  [9.3, 79.3], [10.3, 79.8], [10.8, 79.85], [11.7, 79.8], [12.5, 80.2],
  [13.09, 80.29], [14.28, 80.12], [15.7, 80.6], [16.2, 81.1], [16.9, 82.3],
  [17.69, 83.28], [18.9, 84.4], [19.3, 84.9], [20.26, 86.68], [21.6, 87.4],
  [22.03, 88.10], [21.8, 88.9],
];
