import { describe, expect, it } from "vitest";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, contactPayloadSchema } from "./contact";

const valid = { name: "Henry Alicoben", email: "henry@example.com", subject: "Project inquiry", message: "I would like to discuss a secure product build.", turnstileToken: "token", website: "" };
describe("contactPayloadSchema", () => {
  it("accepts a bounded valid payload", () => expect(contactPayloadSchema.safeParse(valid).success).toBe(true));
  it("rejects honeypot and oversized fields", () => {
    expect(contactPayloadSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
    expect(contactPayloadSchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
  });
});

describe("contact form resolver compatibility", () => {
  const resolve = zodResolver(contactFormSchema);
  const options = { fields: {}, shouldUseNativeValidation: false };

  it("returns field errors instead of throwing for invalid Zod 4 input", async () => {
    const result = await resolve({ ...valid, name: "x", email: "invalid", message: "short" }, undefined, options);
    expect(result.errors.name?.message).toBe("Please enter at least 2 characters.");
    expect(result.errors.email?.message).toBe("Please enter a valid email address.");
    expect(result.errors.message?.message).toBe("Please share at least 20 characters.");
    expect(result.values).toEqual({});
  });

  it("keeps trimmed values ready for contact delivery", async () => {
    const result = await resolve({ ...valid, name: "  Henry Alicoben  ", email: " henry@example.com " }, undefined, options);
    expect(result.errors).toEqual({});
    expect(result.values).toEqual({ name: valid.name, email: valid.email, subject: valid.subject, message: valid.message });
  });
});
