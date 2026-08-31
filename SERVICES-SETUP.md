# Services Page & Contact Form Setup

The `/services` page sells a $500 AI App Audit (entry tier) plus the existing
fixed-price MVP build tiers. The contact form (`/api/contact`) delivers leads by
email through [Resend](https://resend.com) and also keeps writing a copy to the
Supabase `contact_messages` table as a backup.

## Environment variables

Add these in the Vercel project settings (Settings → Environment Variables) and
in `.env.local` for local development:

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes | `re_...` | Resend API key (create at resend.com/api-keys) |
| `CONTACT_EMAIL` | Yes | `hello@rushiraj.me` | Where form submissions are delivered |
| `CONTACT_FROM` | No | `Rushiraj <hello@rushiraj.me>` | Sender address. Defaults to `rushiraj.me <onboarding@resend.dev>`, which works without domain verification. Set this after verifying rushiraj.me in Resend for better deliverability. |

The existing `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` vars
are still used for the Supabase backup write.

Redeploy after adding the variables.

## Behavior notes

- If the Resend email fails but the Supabase write succeeded, the form still
  reports success to the user (the lead is not lost); the failure is logged.
  If both channels fail, the user gets a generic error.
- With the default `onboarding@resend.dev` sender, Resend only delivers to the
  email address of the Resend account owner. Verify the `rushiraj.me` domain in
  Resend and set `CONTACT_FROM` to send from the site's own domain.
- The form has a hidden honeypot field (`xf_review_notes`); submissions that
  fill it are silently dropped.
- Submissions are rate-limited to 5 per IP per 10 minutes. The limiter is
  in-memory, so on Vercel it is per-instance and resets on cold starts — good
  enough to blunt naive spam, not a hard guarantee.
- Services CTAs link to `/contact?subject=AI%20App%20Audit` so audit leads
  arrive with a distinguishing subject line.
