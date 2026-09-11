import "server-only";
import { Resend } from "resend";

/**
 * Transactional email.
 *
 * ⚠️ DESIGN RULE: this module NEVER reports success it did not achieve.
 * A quote form that silently drops a requisition is worse than no form —
 * the buyer believes their order is in hand and finds out at the berth.
 *
 * If RESEND_API_KEY is absent or the send fails, `send()` returns
 * `{ ok: false }` and the submission is written to the server log so it is
 * at least recoverable. The caller must surface a failure to the user with
 * the phone and email fallback.
 */

export type MailResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: "unconfigured" | "failed"; detail?: string };

export type Attachment = { filename: string; content: Buffer };

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? "Mishk Overseas <onboarding@resend.dev>";
const opsInbox = process.env.MAIL_TO;

export const mailConfigured = Boolean(apiKey && opsInbox);

const client = apiKey ? new Resend(apiKey) : null;

export async function send({
  to,
  subject,
  text,
  replyTo,
  attachments,
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<MailResult> {
  if (!client) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to,
      subject,
      text,
      replyTo,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    if (error) {
      return { ok: false, reason: "failed", detail: error.message };
    }
    return { ok: true, id: data?.id ?? null };
  } catch (err) {
    return {
      ok: false,
      reason: "failed",
      detail: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export function opsAddress() {
  return opsInbox;
}

/**
 * Last-resort capture. Called whenever a send fails, so a requisition that
 * could not be emailed is still in the platform logs rather than gone.
 *
 * ⚠️ Logs are not a durable store. Before launch, either confirm Resend is
 * configured and monitored, or add a database/Sheet write here.
 */
export function logUndeliverable(kind: string, payload: unknown) {
  console.error(
    `[UNDELIVERED ${kind}] ${new Date().toISOString()}\n` +
      JSON.stringify(payload, null, 2),
  );
}
