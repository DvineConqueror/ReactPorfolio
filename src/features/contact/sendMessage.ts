import type { ContactFormValues } from "../../domain/contact";

const unavailable = "Your message couldn’t be sent. Please try again or email me directly.";

export async function sendMessage(values: ContactFormValues, turnstileToken: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, turnstileToken, website: "" }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Couldn’t connect to send your message. Check your connection and try again, or email me directly.");
  }
  if (response.ok) return;
  if (response.status === 429) throw new Error("Too many attempts. Wait a minute and try again, or email me directly.");
  if (response.status === 400 || response.status === 403) throw new Error("Verification couldn’t be completed. Please try a new verification or email me directly.");
  if (response.status === 422 || response.status === 413) throw new Error("Please check your form entries and try again, or email me directly.");
  throw new Error(unavailable);
}
