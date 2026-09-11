"use server";

import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import {
  logUndeliverable,
  mailConfigured,
  opsAddress,
  send,
  type Attachment,
} from "@/lib/mail";
import {
  ACCEPTED_UPLOAD_TYPES,
  MAX_UPLOAD_BYTES,
  formatBytes,
  quoteSchema,
} from "@/lib/validation";
import { site } from "@/data/site";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, keyed by field name. */
  errors?: Record<string, string>;
  /** Reference shown to the buyer on success. */
  reference?: string;
};

export const initialQuoteState: QuoteState = { status: "idle" };

/** Short human-quotable reference. Not a security token. */
function makeReference() {
  const now = new Date();
  const stamp =
    `${now.getUTCFullYear()}`.slice(2) +
    `${now.getUTCMonth() + 1}`.padStart(2, "0") +
    `${now.getUTCDate()}`.padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MO-${stamp}-${rand}`;
}

async function clientKey() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  /* --- Rate limit --------------------------------------------------------- */
  const limit = rateLimit(`quote:${await clientKey()}`);
  if (!limit.ok) {
    return {
      status: "error",
      message: `Too many submissions. Try again in ${Math.ceil(limit.resetInSeconds / 60)} minutes, or call us directly on ${site.phone.display}.`,
    };
  }

  /* --- Validate ----------------------------------------------------------- */
  const parsed = quoteSchema.safeParse({
    vesselName: formData.get("vesselName"),
    imo: formData.get("imo") ?? "",
    port: formData.get("port"),
    eta: formData.get("eta") ?? "",
    etd: formData.get("etd") ?? "",
    categories: formData.getAll("categories").map(String),
    message: formData.get("message") ?? "",
    company: formData.get("company"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    /* Honeypot tripped — respond like a normal validation failure. */
    if (errors.website) {
      return { status: "error", message: "Submission rejected." };
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const data = parsed.data;

  /* --- Attachment --------------------------------------------------------- */
  const attachments: Attachment[] = [];
  const file = formData.get("requisition");

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return {
        status: "error",
        message: `Attachment is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_UPLOAD_BYTES)} — email it to ${site.email.display} instead.`,
        errors: { requisition: "File too large" },
      };
    }
    if (file.type && !ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
      return {
        status: "error",
        message: "Attach a PDF, spreadsheet, CSV, text file or image.",
        errors: { requisition: "Unsupported file type" },
      };
    }
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  /* --- Compose ------------------------------------------------------------ */
  const reference = makeReference();
  const lines = [
    `REQUISITION — ${reference}`,
    "",
    `Vessel:       ${data.vesselName}`,
    `IMO:          ${data.imo || "—"}`,
    `Port of call: ${data.port}`,
    `ETA:          ${data.eta || "—"}`,
    `ETD:          ${data.etd || "—"}`,
    "",
    `Categories:   ${data.categories.length ? data.categories.join(", ") : "—"}`,
    `Attachment:   ${attachments.length ? attachments[0].filename : "none"}`,
    "",
    "Message:",
    data.message || "—",
    "",
    "— Contact —",
    `Company: ${data.company}`,
    `Name:    ${data.contactName}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone || "—"}`,
  ].join("\n");

  /* --- Send --------------------------------------------------------------- */
  const ops = opsAddress();

  if (!mailConfigured || !ops) {
    logUndeliverable("QUOTE", { reference, ...data });
    return {
      status: "error",
      message: `We could not submit the form — email is not yet configured on this site. Send your requisition to ${site.email.display} or call ${site.phone.display}. Your details were not lost, but please use one of those routes.`,
    };
  }

  const result = await send({
    to: ops,
    subject: `Requisition ${reference} — ${data.vesselName} at ${data.port}`,
    text: lines,
    replyTo: data.email,
    attachments,
  });

  if (!result.ok) {
    logUndeliverable("QUOTE", { reference, reason: result.reason, ...data });
    return {
      status: "error",
      message: `We could not deliver your requisition just now. Please email it to ${site.email.display} or call ${site.phone.display} — do not assume it reached us.`,
    };
  }

  /* Autoresponder is best-effort: its failure must not turn a delivered
     requisition into a reported failure. */
  await send({
    to: data.email,
    subject: `We have your requisition — ${reference}`,
    text: [
      `Thank you — your requisition has reached our supply desk.`,
      ``,
      `Reference:    ${reference}`,
      `Vessel:       ${data.vesselName}`,
      `Port of call: ${data.port}`,
      ``,
      `We aim to return a priced quotation within two hours. If it is urgent,`,
      `call ${site.phone.display} and quote the reference above.`,
      ``,
      `${site.name}`,
    ].join("\n"),
  });

  return {
    status: "success",
    reference,
    message: "Requisition received.",
  };
}
