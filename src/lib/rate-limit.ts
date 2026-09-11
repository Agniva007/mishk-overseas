/**
 * Minimal fixed-window rate limiter.
 *
 * ⚠️ IN-MEMORY AND PER-INSTANCE. It resets on deploy and does not coordinate
 * across serverless instances, so it stops casual abuse, not a determined
 * attacker. If the form ever attracts real spam, move this to Upstash Redis
 * or Vercel KV — the interface below is deliberately swappable.
 */

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function rateLimit(key: string): {
  ok: boolean;
  remaining: number;
  resetInSeconds: number;
} {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now > existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1, resetInSeconds: WINDOW_MS / 1000 };
  }

  existing.count += 1;
  const resetInSeconds = Math.ceil((existing.resetAt - now) / 1000);

  /* Opportunistic sweep so the map cannot grow without bound. */
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }

  return {
    ok: existing.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - existing.count),
    resetInSeconds,
  };
}
