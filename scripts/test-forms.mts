/** Sanity checks for form validation and rate limiting. npm run test:forms */
import { quoteSchema, contactSchema, MAX_UPLOAD_BYTES } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

let failed = 0;
const check = (name: string, cond: boolean) => {
  console.log(`  ${cond ? "pass" : "FAIL"}  ${name}`);
  if (!cond) failed++;
};

const valid = {
  vesselName: "MV Southern Cross",
  imo: "9436729",
  port: "Mundra",
  eta: "2026-09-18",
  etd: "2026-09-19",
  categories: ["Provisions", "Deck Stores"],
  message: "Full provisioning for 22 crew.",
  company: "Acme Shipping",
  contactName: "A. Buyer",
  email: "buyer@example.com",
  phone: "+911234567890",
  website: "",
};

console.log("\nQUOTE SCHEMA");
check("accepts a complete valid submission", quoteSchema.safeParse(valid).success);
check("rejects missing vessel name", !quoteSchema.safeParse({ ...valid, vesselName: "" }).success);
check("rejects missing port", !quoteSchema.safeParse({ ...valid, port: "" }).success);
check("rejects malformed email", !quoteSchema.safeParse({ ...valid, email: "not-an-email" }).success);
check("rejects a filled honeypot", !quoteSchema.safeParse({ ...valid, website: "http://spam" }).success);
check("allows optional IMO to be empty", quoteSchema.safeParse({ ...valid, imo: "" }).success);
check("allows zero categories", quoteSchema.safeParse({ ...valid, categories: [] }).success);
check("trims whitespace", quoteSchema.safeParse({ ...valid, vesselName: "  MV Test  " })
  .success && quoteSchema.parse({ ...valid, vesselName: "  MV Test  " }).vesselName === "MV Test");
check("caps message length", !quoteSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success);
check("caps category count", !quoteSchema.safeParse({ ...valid, categories: Array(21).fill("x") }).success);

console.log("\nCONTACT SCHEMA");
const c = { name: "A", company: "", email: "a@b.com", phone: "", subject: "Hi there", message: "A message long enough.", website: "" };
check("rejects a one-character name", !contactSchema.safeParse(c).success);
check("accepts a valid message", contactSchema.safeParse({ ...c, name: "Alice" }).success);
check("rejects a too-short message", !contactSchema.safeParse({ ...c, name: "Alice", message: "short" }).success);
check("rejects a filled honeypot", !contactSchema.safeParse({ ...c, name: "Alice", website: "x" }).success);

console.log("\nRATE LIMIT (5 per 10 min)");
const key = "test-" + Math.random();
const results = Array.from({ length: 7 }, () => rateLimit(key).ok);
check("allows the first five", results.slice(0, 5).every(Boolean));
check("blocks the sixth", results[5] === false);
check("blocks the seventh", results[6] === false);
check("keys are independent", rateLimit("other-" + Math.random()).ok);

console.log("\nCONSTANTS");
check("upload cap is 10 MB", MAX_UPLOAD_BYTES === 10 * 1024 * 1024);

console.log(failed ? `\n  ${failed} check(s) FAILED\n` : "\n  All checks passed.\n");
process.exit(failed ? 1 : 0);
