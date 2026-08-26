import { contactPayloadSchema } from "../src/domain/contact";

interface Env { ASSETS: Fetcher; CONTACT_RATE_LIMITER: RateLimit; TURNSTILE_SECRET_KEY: string; RESEND_API_KEY: string; CONTACT_FROM_EMAIL: string; CONTACT_TO_EMAIL: string; ALLOWED_ORIGIN?: string }
const MAX_BODY_BYTES = 16_384;

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ message: "Method not allowed." }, 405, { Allow: "POST" });
    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN || url.origin;
    const localHost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    const localWorkerOrigin = localHost && origin === url.origin;
    const localViteOrigin = localHost && /^https?:\/\/(localhost|127\.0\.0\.1):517\d$/.test(origin || "");
    if (!origin || (origin !== allowedOrigin && !localWorkerOrigin && !localViteOrigin)) return json({ message: "Origin not allowed." }, 403);
    const contactConfig = [env.TURNSTILE_SECRET_KEY, env.RESEND_API_KEY, env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL];
    if (contactConfig.some((value) => !value || value.includes("your_") || value.includes("your-domain.com"))) return json({ message: "Contact service is not configured. Add the Worker secrets and a verified sender address." }, 503);
    const length = Number(request.headers.get("Content-Length") || 0);
    if (length > MAX_BODY_BYTES) return json({ message: "Request is too large." }, 413);
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    // ponytail: anonymous form uses per-IP limits; add account/device keys only if shared-network false positives appear.
    const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({ key: ip });
    if (!withinLimit) return json({ message: "Too many messages. Please try again later." }, 429, { "Retry-After": "60" });

    let input: unknown;
    try {
      const raw = await request.text();
      if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json({ message: "Request is too large." }, 413);
      input = JSON.parse(raw);
    } catch { return json({ message: "Invalid request." }, 400); }

    const parsed = contactPayloadSchema.safeParse(input);
    if (!parsed.success) return json({ message: "Check the form fields and try again." }, 422);
    if (parsed.data.website) return json({ message: "Message received." }, 200);
    const verified = await verifyTurnstile(parsed.data.turnstileToken, ip, env.TURNSTILE_SECRET_KEY);
    if (!verified) return json({ message: "Verification failed. Refresh and try again." }, 400);

    const subject = parsed.data.subject.replace(/[\r\n]+/g, " ");
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: parsed.data.email, subject: `Portfolio: ${subject}`, text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nSubject: ${subject}\n\n${parsed.data.message}` }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => null);
    if (!emailResponse || !emailResponse.ok) {
      console.error("Contact email delivery failed", emailResponse ? { status: emailResponse.status } : { reason: "upstream unavailable" });
      return json({ message: "Message service is unavailable. Check the Resend key and verified sender address." }, 502);
    }
    return json({ message: "Message sent." }, 200);
  },
} satisfies ExportedHandler<Env>;

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret, response: token, remoteip: ip, idempotency_key: crypto.randomUUID() }), signal: AbortSignal.timeout(5000) });
    const result: { success?: boolean } = await response.json();
    return response.ok && result.success === true;
  } catch { return false; }
}

function json(body: object, status: number, extraHeaders: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8", "X-Content-Type-Options": "nosniff", ...extraHeaders } });
}
