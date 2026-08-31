import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(320),
  subject: z.string().trim().max(200).optional().default('Website contact'),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  // Honeypot. Real users never see or fill this field; the name is deliberately
  // meaningless so browser autofill heuristics never touch it.
  xf_review_notes: z.string().max(0).optional().or(z.literal('')),
});

// Per-IP rate limiting via an in-memory Map.
//
// Known limits on Vercel: each serverless instance has its own Map, so the cap
// is per-instance rather than truly global, and the Map resets on cold starts.
// That's acceptable here — the goal is to blunt naive spam loops on a
// low-traffic personal site, not to be a hard security boundary. If this ever
// needs to be strict, move it to Upstash/Redis or Vercel KV.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionLog.set(ip, recent);
  // Keep the Map from growing unbounded on long-lived instances.
  if (submissionLog.size > 5000) {
    for (const [key, times] of submissionLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionLog.delete(key);
      }
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // A filled honeypot means a bot; pretend success so it learns nothing.
  if (
    typeof body === 'object' &&
    body !== null &&
    Boolean((body as Record<string, unknown>).xf_review_notes)
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  // Belt and suspenders: keep the Supabase record even though email is the
  // primary delivery channel. The table has no subject column, so the subject
  // is prepended to the message body.
  let savedToDb = false;
  try {
    const { error } = await supabase.from('contact_messages').insert([
      { name, email, message: `[${subject}]\n\n${message}` },
    ]);
    savedToDb = !error;
    if (error) console.error('Contact form: Supabase insert failed:', error.message);
  } catch (err) {
    console.error('Contact form: Supabase insert threw:', err);
  }

  // Email via Resend REST API. Wrapped in try/catch so an email failure
  // degrades gracefully instead of 500ing when the Supabase record saved.
  let emailSent = false;
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL;
  if (apiKey && toAddress) {
    const fromAddress = process.env.CONTACT_FROM ?? 'rushiraj.me <onboarding@resend.dev>';
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toAddress],
          reply_to: email,
          subject: `[rushiraj.me] ${subject} — ${name}`,
          text: [
            'New inquiry from rushiraj.me',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            '',
            'Message:',
            message,
          ].join('\n'),
        }),
      });
      emailSent = response.ok;
      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        console.error('Contact form: Resend API error:', response.status, detail);
      }
    } catch (err) {
      console.error('Contact form: Resend request threw:', err);
    }
  } else {
    console.error('Contact form: RESEND_API_KEY or CONTACT_EMAIL is not configured; email skipped.');
  }

  if (!emailSent && !savedToDb) {
    // Generic message only — never leak configuration details to the client.
    return NextResponse.json(
      { error: 'Could not send your message. Please email me directly or reach out on X @rushirajjj.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, emailSent, savedToDb });
}
