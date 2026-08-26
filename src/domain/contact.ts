import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(5, "Please add a little more detail.").max(120),
  message: z.string().trim().min(20, "Please share at least 20 characters.").max(3000),
});
export const contactPayloadSchema = contactFormSchema.extend({ turnstileToken: z.string().min(1).max(2048), website: z.string().max(0) });
export type ContactFormValues = z.infer<typeof contactFormSchema>;
