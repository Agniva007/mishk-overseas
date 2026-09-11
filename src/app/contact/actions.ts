"use server";

import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { logUndeliverable, mailConfigured, opsAddress, send } from "@/lib/mail";
import { contactSchema } from "@/lib/validation";
import { site } from "@/data/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export const initialContactState: ContactState = { status: "idle" };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const h = await headers();
  const key =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`contact:${key}`);
  if (!limit.ok) {
    return {
      status: "error",
      message: `Too many messages. Try again in ${Math.ceil(limit.resetInSeconds / 60)} minutes, or call ${site.phone.display}.`,
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      errors[k] ??= issue.message;
    }
    if (errors.website) return { status: "error", message: "Submission rejected." };
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const data = parsed.data;
  const ops = opsAddress();

  if (!mailConfigured || !ops) {
    logUndeliverable("CONTACT", data);
    return {
      status: "error",
      message: `We could not send your message — email is not yet configured on this site. Please write to ${site.email.display} or call ${site.phone.display}.`,
    };
  }

  const result = await send({
    to: ops,
    subject: `Enquiry — ${data.subject}`,
    replyTo: data.email,
    text: [
      `Name:    ${data.name}`,
      `Company: ${data.company || "—"}`,
      `Email:   ${data.email}`,
      `Phone:   ${data.phone || "—"}`,
      "",
      `Subject: ${data.subject}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (!result.ok) {
    logUndeliverable("CONTACT", { reason: result.reason, ...data });
    return {
      status: "error",
      message: `We could not deliver your message. Please email ${site.email.display} or call ${site.phone.display}.`,
    };
  }

  return { status: "success", message: "Message sent." };
}
