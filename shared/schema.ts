import { z } from "zod";

// Contact form schema without database
export const insertMessageSchema = z.object({
  name: z.string().min(1, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Wiadomość jest wymagana"),
}).refine((data) => data.email || data.phone, {
  message: "Email lub numer telefonu jest wymagany",
  path: ["email"],
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
