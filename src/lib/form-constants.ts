/**
 * Form constants shared by client components and server actions.
 *
 * ⚠️ This module must stay free of zod (and any other server-only import).
 * `validation.ts` imports zod at module scope, so a client component pulling
 * a constant from there ships the whole of zod to the browser — it added
 * ~390 KB to the quote route before this split.
 */

/** Max requisition attachment, per §4.5. Enforced on both sides. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_UPLOAD_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
  "image/jpeg",
  "image/png",
];

/** Human-readable file size for error messages. */
export const formatBytes = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.ceil(bytes / 1024)} KB`;
