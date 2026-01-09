import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgoowajo';
const DAILY_LIMIT = 10;

// Simple in-memory rate limiter
const dailySubmissions: { count: number; date: string } = { count: 0, date: '' };

function checkRateLimit(): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0];
  
  // Reset counter if it's a new day
  if (dailySubmissions.date !== today) {
    dailySubmissions.count = 0;
    dailySubmissions.date = today;
  }
  
  if (dailySubmissions.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  dailySubmissions.count++;
  return { allowed: true, remaining: DAILY_LIMIT - dailySubmissions.count };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);

      // Check rate limit
      const rateLimit = checkRateLimit();
      if (!rateLimit.allowed) {
        console.warn('Daily submission limit reached');
        return res.status(429).json({ 
          message: 'Przekroczono dzienny limit wiadomości. Spróbuj ponownie jutro.',
          remaining: 0
        });
      }

      // Send form data to Formspree
      try {
        // Build payload - only include non-empty fields
        const formData: Record<string, string> = {
          name: input.name,
          message: input.message,
        };
        
        if (input.email) {
          formData.email = input.email;
        }
        if (input.phone) {
          formData.phone = input.phone;
        }

        const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!formspreeResponse.ok) {
          const errorData = await formspreeResponse.json().catch(() => ({}));
          console.error('Formspree error:', errorData);
          return res.status(500).json({ 
            message: 'Nie udało się wysłać wiadomości',
            error: errorData.error || 'Unknown error'
          });
        }

        res.status(201).json({ 
          success: true,
          message: 'Wiadomość została wysłana'
        });
      } catch (emailError) {
        console.error('Failed to send form via Formspree:', emailError);
        res.status(500).json({ message: 'Nie udało się wysłać wiadomości' });
      }
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
