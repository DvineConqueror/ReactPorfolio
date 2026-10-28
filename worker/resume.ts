export interface ResumeEnv {
  TURNSTILE_SECRET_KEY: string;
  ALLOWED_ORIGIN?: string;
  RESUME_RATE_LIMITER: { limit(input: { key: string }): Promise<{ success: boolean }> };
}

const MAX_BYTES = 4096;
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, noarchive" };
const error = (message: string, status: number, extra = {}) => Response.json({ message }, { status, headers: { ...headers, ...extra } });

export async function serveResume(request: Request, env: ResumeEnv, pdf: ArrayBuffer): Promise<Response> {
  if (request.method !== "POST") return error("Method not allowed.", 405, { Allow: "POST" });
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  const expectedOrigin = env.ALLOWED_ORIGIN || url.origin;
  const local = ["localhost", "127.0.0.1"].includes(url.hostname);
  const localVite = local && /^http:\/\/(localhost|127\.0\.0\.1):517\d$/.test(origin || "");
  if (origin !== expectedOrigin && !localVite) return error("Origin not allowed.", 403);
  if (!env.TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY.includes("your_") || !env.RESUME_RATE_LIMITER) return error("Résumé access is temporarily unavailable. Please contact me by email.", 503);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) return error("Send a JSON request.", 415);
  if (Number(request.headers.get("Content-Length")) > MAX_BYTES) return error("Request is too large.", 413);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  try {
    if (!(await env.RESUME_RATE_LIMITER.limit({ key: ip })).success) return error("Too many attempts. Try again in a minute.", 429, { "Retry-After": "60" });
  } catch { return error("Verification is temporarily unavailable. Try again shortly.", 503); }

  let token: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Complete verification and try again.", 400);
    let size = 0;
    let raw = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) { await reader.cancel(); return error("Request is too large.", 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const input: unknown = JSON.parse(raw);
    if (!input || typeof input !== "object" || !("turnstileToken" in input) || typeof input.turnstileToken !== "string" || !input.turnstileToken.trim() || input.turnstileToken.length > 2048) return error("Complete verification and try again.", 400);
    token = input.turnstileToken;
  } catch { return error("Invalid request. Complete verification and try again.", 400); }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, idempotency_key: crypto.randomUUID() }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return error("Verification is temporarily unavailable. Try again shortly.", 503);
    const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
    // Siteverify owns expiry and replay protection; action prevents reusing contact challenges.
    const expectedHostname = new URL(localVite && origin ? origin : expectedOrigin).hostname;
    if (result.success !== true || result.hostname !== expectedHostname || result.action !== "resume") return error("Verification failed or expired. Complete a new challenge and try again.", 403);
  } catch { return error("Verification is temporarily unavailable. Try again shortly.", 503); }

  return new Response(pdf, { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": 'inline; filename="Alicoben-Resume.pdf"' } });
}
