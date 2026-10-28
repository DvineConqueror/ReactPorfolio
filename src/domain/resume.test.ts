import { afterEach, describe, expect, it, vi } from "vitest";
import { serveResume, type ResumeEnv } from "../../worker/resume";

const bytes = new TextEncoder().encode("%PDF-private-test").buffer;
const request = (body: unknown = { turnstileToken: "challenge-token" }, extra: RequestInit = {}) => new Request("https://portfolio.example/api/resume", { method: "POST", headers: { Origin: "https://portfolio.example", "Content-Type": "application/json" }, body: JSON.stringify(body), ...extra });
function env(): ResumeEnv { return { TURNSTILE_SECRET_KEY: "test-secret", RESUME_RATE_LIMITER: { limit: vi.fn().mockResolvedValue({ success: true }) } }; }
const verify = (value: object = { success: true, hostname: "portfolio.example", action: "resume" }) => vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(value)));
afterEach(() => vi.unstubAllGlobals());

describe("protected résumé", () => {
  it("returns exact private PDF only after successful scoped verification", async () => {
    verify(); const response = await serveResume(request(), env(), bytes);
    expect(response.status).toBe(200); expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Cache-Control")).toBe("private, no-store"); expect(response.headers.get("X-Robots-Tag")).toContain("noindex");
    expect(await response.arrayBuffer()).toEqual(bytes);
    expect(fetch).toHaveBeenCalledOnce();
    const call = vi.mocked(fetch).mock.calls[0]; expect(call?.[0]).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
  });
  it.each([
    { success: false, "error-codes": ["invalid-input-response"] },
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: true, hostname: "attacker.example", action: "resume" },
    { success: true, hostname: "portfolio.example", action: "contact" },
    { success: true },
  ])("rejects invalid, expired/replayed or incorrectly scoped challenges: %j", async (result) => {
    verify(result); const response = await serveResume(request(), env(), bytes); expect(response.status).toBe(403); expect(response.headers.get("Content-Type")).not.toContain("pdf");
  });
  it("does not validate or disclose bytes for malformed or oversized requests", async () => {
    verify();
    for (const body of [null, {}, { turnstileToken: "" }, { turnstileToken: 1 }, { turnstileToken: "x".repeat(2049) }]) expect((await serveResume(request(body), env(), bytes)).status).toBe(400);
    expect((await serveResume(request({}, { body: "invalid" }), env(), bytes)).status).toBe(400);
    expect((await serveResume(request({ turnstileToken: "x".repeat(5000) }), env(), bytes)).status).toBe(413);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects missing/foreign origins, wrong method and content type", async () => {
    verify();
    expect((await serveResume(request({}, { headers: { Origin: "https://evil.example", "Content-Type": "application/json" } }), env(), bytes)).status).toBe(403);
    expect((await serveResume(request({}, { headers: { "Content-Type": "application/json" } }), env(), bytes)).status).toBe(403);
    expect((await serveResume(request({}, { headers: { Origin: "https://portfolio.example", "Content-Type": "text/plain" } }), env(), bytes)).status).toBe(415);
    expect((await serveResume(new Request("https://portfolio.example/api/resume"), env(), bytes)).status).toBe(405);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rate limits before Siteverify, with Retry-After", async () => {
    verify(); const config = env(); config.RESUME_RATE_LIMITER.limit = vi.fn().mockResolvedValue({ success: false });
    const response = await serveResume(request(), config, bytes); expect(response.status).toBe(429); expect(response.headers.get("Retry-After")).toBe("60"); expect(fetch).not.toHaveBeenCalled();
  });
  it("fails closed on unavailable configuration or verification service", async () => {
    verify(); expect((await serveResume(request(), { ...env(), TURNSTILE_SECRET_KEY: "" }, bytes)).status).toBe(503);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline"))); expect((await serveResume(request(), env(), bytes)).status).toBe(503);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("upstream error", { status: 500 }))); expect((await serveResume(request(), env(), bytes)).status).toBe(503);
  });
});
