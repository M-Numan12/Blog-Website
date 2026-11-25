import { z } from 'zod';
import ContactMessage from '../models/ContactMessage.js';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required').max(160),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  website: z.string().optional(), // Honeypot spam field
});

export async function submitContactMessage(req, res, next) {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid form input' });
    }

    // Silently accept if honeypot is triggered to deter bots
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return res.status(200).json({ message: 'Thank you for contacting CelebScope.' });
    }

    await ContactMessage.create({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    return res.status(201).json({
      message: 'Thank you. Your message has been received by the CelebScope editorial desk.',
    });
  } catch (error) {
    next(error);
  }
}
