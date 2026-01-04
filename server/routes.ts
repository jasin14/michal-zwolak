import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);

      // Send email notification using Resend if API key is provided
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        try {
          await resend.emails.send({
            from: "Kontakt - Michał Zwolak <onboarding@resend.dev>",
            to: "michalzwolak87@gmail.com",
            subject: `Nowa wiadomość od: ${input.name}`,
            text: `
              Imię i Nazwisko: ${input.name}
              Email: ${input.email || 'Nie podano'}
              Telefon: ${input.phone || 'Nie podano'}
              Wiadomość: ${input.message}
            `,
          });
        } catch (emailError) {
          console.error("Failed to send email via Resend:", emailError);
        }
      }

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
