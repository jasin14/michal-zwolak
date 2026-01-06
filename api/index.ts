import type { VercelRequest, VercelResponse } from '@vercel/node';
import { api } from '../shared/routes';
import { z } from 'zod';
import { Resend } from 'resend';

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

      // Send email notification using Resend
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return res.status(500).json({ message: 'Email service not configured' });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);
      
      try {
        await resend.emails.send({
          from: 'Formularz Kontaktowy <kontakt@michalzwolak.pl>',
          to: 'michalzwolak87@gmail.com',
          subject: `Nowa wiadomość od: ${input.name}`,
          text: `
Imię i Nazwisko: ${input.name}
Email: ${input.email || 'Nie podano'}
Telefon: ${input.phone || 'Nie podano'}

Wiadomość:
${input.message}
          `,
          html: `
<h2>Nowa wiadomość z formularza kontaktowego</h2>
<p><strong>Imię i Nazwisko:</strong> ${input.name}</p>
<p><strong>Email:</strong> ${input.email || 'Nie podano'}</p>
<p><strong>Telefon:</strong> ${input.phone || 'Nie podano'}</p>
<p><strong>Wiadomość:</strong></p>
<p>${input.message.replace(/\n/g, '<br>')}</p>
          `,
        });

        return res.status(201).json({ 
          success: true,
          message: 'Wiadomość została wysłana'
        });
      } catch (emailError) {
        console.error('Failed to send email via Resend:', emailError);
        return res.status(500).json({ message: 'Nie udało się wysłać wiadomości' });
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
