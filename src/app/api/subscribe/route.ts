import { NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().trim().email('A valid email is required').max(320),
  // Honeypot. Real users never see or fill this field; the name is deliberately
  // meaningless so browser autofill heuristics never touch it.
  xf_review_notes: z.string().max(0).optional().or(z.literal('')),
});

// Per-IP rate limiting via an in-memory Map. Same trade-offs as /api/contact:
// per-instance on Vercel and reset on cold starts — good enough to blunt naive
// spam loops on a low-traffic personal site, not a hard security boundary.
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
      { error: 'Too many attempts. Please try again in a few minutes.' },
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

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'A valid email is required.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error(
      'Subscribe: RESEND_API_KEY or RESEND_AUDIENCE_ID is not configured; signups are disabled.'
    );
    return NextResponse.json(
      { error: 'Signups are temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    // Resend renamed Audiences to Segments in 2026, but this legacy endpoint
    // remains supported and keys off the audience/segment ID directly.
    const response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: parsed.data.email,
          unsubscribed: false,
        }),
      }
    );

    // 409 means the contact already exists — treat as success so the endpoint
    // can't be used to probe which emails are subscribed.
    if (!response.ok && response.status !== 409) {
      const detail = await response.text().catch(() => '');
      console.error('Subscribe: Resend API error:', response.status, detail);
      return NextResponse.json(
        { error: 'Could not subscribe right now. Please try again later.' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('Subscribe: Resend request threw:', err);
    return NextResponse.json(
      { error: 'Could not subscribe right now. Please try again later.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
