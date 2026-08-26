import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "../../domain/contact";
import { Turnstile } from "./Turnstile";

type SubmitState = { type: "idle" | "success" | "error"; message?: string };

export function ContactForm() {
  const [token, setToken] = useState("");
  const [verificationCycle, setVerificationCycle] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const onToken = useCallback((nextToken: string) => setToken(nextToken), []);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });
  const onSubmit = async (values: ContactFormValues) => {
    if (siteKey && !token) { setSubmitState({ type: "error", message: "Complete the verification, then try again." }); return; }
    setSubmitState({ type: "idle" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, turnstileToken: token, website: "" }) });
      const result = await readResponseMessage(response);
      if (!response.ok) {
        const message = response.status === 404
          ? "The contact API is not running here. Start npm run dev:worker; Vite will proxy it locally."
          : response.status === 403
          ? "This app origin is not allowed. Use the local Worker preview or update ALLOWED_ORIGIN."
          : response.status === 500
          ? "The local contact Worker is not running. Start npm run dev:worker and try again."
          : result || "Message could not be sent.";
        throw new Error(message);
      }
      reset(); setToken(""); setVerificationCycle((cycle) => cycle + 1); setSubmitState({ type: "success", message: "Message sent. I’ll reply soon." });
    } catch (error) { setSubmitState({ type: "error", message: error instanceof TypeError ? "The local contact Worker is not running. Start npm run dev:worker and try again." : error instanceof Error ? error.message : "Message could not be sent." }); }
  };
  return <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate><div className="field-row"><Field label="Name" error={errors.name?.message}><input autoComplete="name" {...register("name")} /></Field><Field label="Email" error={errors.email?.message}><input type="email" autoComplete="email" {...register("email")} /></Field></div><Field label="Subject" error={errors.subject?.message}><input {...register("subject")} /></Field><Field label="Project context" error={errors.message?.message}><textarea rows={6} {...register("message")} /></Field><input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />{siteKey ? <Turnstile key={verificationCycle} siteKey={siteKey} onToken={onToken} /> : <p className="form-note">Bot verification activates in Cloudflare deployment.</p>}<button className="button button-primary submit-button" disabled={isSubmitting} type="submit">{isSubmitting ? <><LoaderCircle className="spin" /> Sending</> : <>Send message <ArrowUpRight /></>}</button><p className={`form-status ${submitState.type}`} role="status" aria-live="polite">{submitState.message}</p></form>;
}

async function readResponseMessage(response: Response): Promise<string | undefined> {
  const body = await response.text();
  if (!body) return undefined;
  try {
    const result: unknown = JSON.parse(body);
    return typeof result === "object" && result !== null && "message" in result && typeof result.message === "string" ? result.message : undefined;
  } catch {
    return undefined;
  }
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactElement }) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return <label className="field" htmlFor={id}><span>{label}</span>{React.cloneElement(children, { id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined })}{error && <small id={`${id}-error`}>{error}</small>}</label>;
}
