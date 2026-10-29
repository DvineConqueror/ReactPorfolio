import { afterEach, describe, expect, it, vi } from "vitest";
import { sendMessage } from "./sendMessage";

const values = { name: "Test visitor", email: "visitor@example.com", subject: "Project inquiry", message: "Please share more about your project work." };
afterEach(() => vi.unstubAllGlobals());

describe("contact delivery recovery", () => {
  it.each([404, 500, 502, 503])("hides infrastructure details for HTTP %s", async (status) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Set RESEND_API_KEY and ALLOWED_ORIGIN" }), { status })));
    await expect(sendMessage(values, "token")).rejects.toThrow("Your message couldn’t be sent. Please try again or email me directly.");
  });
  it.each([[400, "Verification"], [403, "Verification"], [413, "form entries"], [422, "form entries"], [429, "Wait a minute"]])("offers recovery for HTTP %s", async (status, message) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: Number(status) })));
    await expect(sendMessage(values, "token")).rejects.toThrow(String(message));
  });
  it("explains network failure without losing or changing the supplied message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const original = { ...values };
    await expect(sendMessage(values, "token")).rejects.toThrow("Check your connection");
    expect(values).toEqual(original);
  });
  it("delivers validated fields and verification token to the existing endpoint", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("", { status: 200 }));
    vi.stubGlobal("fetch", fetch);
    await sendMessage(values, "token");
    expect(fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST", body: JSON.stringify({ ...values, turnstileToken: "token", website: "" }) }));
  });
});
