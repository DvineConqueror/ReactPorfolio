import { describe, expect, it } from "vitest";
import { contactPayloadSchema } from "./contact";

const valid = { name: "Henry Alicoben", email: "henry@example.com", subject: "Project inquiry", message: "I would like to discuss a secure product build.", turnstileToken: "token", website: "" };
describe("contactPayloadSchema", () => {
  it("accepts a bounded valid payload", () => expect(contactPayloadSchema.safeParse(valid).success).toBe(true));
  it("rejects honeypot and oversized fields", () => {
    expect(contactPayloadSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
    expect(contactPayloadSchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
  });
});
