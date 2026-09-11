import { z } from "zod";

/* Constants live in a zod-free module so client components can import them
   without pulling zod into the browser bundle. */
export {
  MAX_UPLOAD_BYTES,
  ACCEPTED_UPLOAD_TYPES,
  formatBytes,
} from "./form-constants";

const trimmed = (max: number) => z.string().trim().max(max);

export const quoteSchema = z.object({
  /* --- Vessel ------------------------------------------------------------ */
  vesselName: trimmed(120).min(2, "Vessel name is required"),
  imo: trimmed(20).optional().or(z.literal("")),
  port: trimmed(120).min(2, "Port of call is required"),
  eta: trimmed(40).optional().or(z.literal("")),
  etd: trimmed(40).optional().or(z.literal("")),

  /* --- Requirement ------------------------------------------------------- */
  categories: z.array(z.string().max(60)).max(20).default([]),
  message: trimmed(5000).optional().or(z.literal("")),

  /* --- Contact ----------------------------------------------------------- */
  company: trimmed(160).min(2, "Company is required"),
  contactName: trimmed(120).min(2, "Your name is required"),
  email: trimmed(200).email("Enter a valid email address"),
  phone: trimmed(40).optional().or(z.literal("")),

  /* --- Anti-spam --------------------------------------------------------- */
  /* Honeypot: a real user never fills this; bots fill everything. */
  website: z.string().max(0, "Rejected").optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: trimmed(120).min(2, "Your name is required"),
  company: trimmed(160).optional().or(z.literal("")),
  email: trimmed(200).email("Enter a valid email address"),
  phone: trimmed(40).optional().or(z.literal("")),
  subject: trimmed(160).min(2, "Subject is required"),
  message: trimmed(5000).min(10, "Please add a little more detail"),
  website: z.string().max(0, "Rejected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
