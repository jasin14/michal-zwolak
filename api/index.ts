import type { VercelRequest, VercelResponse } from '@vercel/node';
import { api } from '../shared/routes';
import { z } from 'zod';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgoowajo';
const DAILY_LIMIT = 10;

// Simple in-memory rate limiter (resets on cold start in serverless)
// For production, consider using Upstash Redis for persistent rate limiting
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle contact form submission
  if (req.url?.startsWith('/api/contact/submit') && req.method === 'POST') {
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
        const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: input.name,
            email: input.email || 'Nie podano',
            phone: input.phone || 'Nie podano',
            message: input.message,
          }),
        });

        if (!formspreeResponse.ok) {
          const errorData = await formspreeResponse.json().catch(() => ({}));
          console.error('Formspree error:', errorData);
          return res.status(500).json({ 
            message: 'Nie udało się wysłać wiadomości',
            error: errorData.error || 'Unknown error'
          });
        }

        return res.status(201).json({ 
          success: true,
          message: 'Wiadomość została wysłana'
        });
      } catch (emailError) {
        console.error('Failed to send form via Formspree:', emailError);
        return res.status(500).json({ 
          message: 'Nie udało się wysłać wiadomości',
          error: emailError instanceof Error ? emailError.message : 'Unknown error'
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error('Error in contact form submission:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Default 404 response
  res.status(404).json({ message: 'Not Found' });
}
