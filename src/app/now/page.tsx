import { Metadata } from 'next';
import Link from 'next/link';

// ============================================================================
// EDIT THIS BLOCK TO UPDATE THE PAGE — everything below it is just rendering.
// ============================================================================
const NOW = {
  lastUpdated: '2026-09-01',
  focus: [
    {
      title: 'AI App Rescue audits',
      description:
        'Auditing apps built with Lovable, Bolt, v0, Cursor, and Replit before their owners charge real users. $500, 3 business days, half back if I find nothing critical.',
      link: { href: '/services', label: 'How the audit works' },
    },
    {
      title: 'PrivacyPage growth',
      description:
        'Pushing PrivacyPage from side project to real business: distribution through the MCP ecosystem, a rebuilt payment path, and agency-facing features.',
      link: { href: 'https://privacy.rushiraj.me', label: 'privacy.rushiraj.me' },
    },
  ],
  shipped: [
    {
      title: 'privacypage-mcp open-sourced',
      description:
        'The PrivacyPage MCP server is now on npm, the MCP Registry, Glama, and Smithery — generate privacy policies straight from your AI agent.',
    },
    {
      title: 'PrivacyPage money-path rebuild',
      description:
        'Rebuilt the entire purchase flow end to end: real webhooks, real entitlements, no client-side-only success handling.',
    },
    {
      title: 'New services tier',
      description:
        'Launched the $500 AI App Audit as the entry point to rescue sprints and fixed-price builds.',
    },
  ],
  next: [
    {
      title: 'CashLens Pro lifetime unlock',
      description:
        'A one-time purchase for the power users who keep asking — no subscription.',
    },
    {
      title: 'PrivacyPage agency tier',
      description:
        'Multi-client document management for the agencies already using PrivacyPage for their customers.',
    },
  ],
};
// ============================================================================

export const metadata: Metadata = {
  title: 'Now — What I\'m Doing These Days',
  description:
    'What Rushiraj Jadeja is focused on right now: AI App Rescue audits, PrivacyPage growth, and what\'s shipping next. A nownownow.com-style now page.',
  alternates: {
    canonical: '/now',
  },
  openGraph: {
    title: 'Now — What I\'m Doing These Days',
    description:
      'Current focus, what shipped recently, and what\'s next. Updated regularly.',
  },
};

function NowSection({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: { title: string; description: string; link?: { href: string; label: string } }[];
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-2xl">
          <p className="section-label mb-2">{label}</p>
          <h2 className="text-2xl font-heading font-bold text-[var(--text)] mb-6">{title}</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.title} className="card card-glow p-6">
                <h3 className="font-heading font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.description}
                </p>
                {item.link &&
                  (item.link.href.startsWith('/') ? (
                    <Link href={item.link.href} className="text-[var(--accent)] text-sm hover-line mt-3 inline-block">
                      {item.link.label} →
                    </Link>
                  ) : (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] text-sm hover-line mt-3 inline-block"
                    >
                      {item.link.label} →
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NowPage() {
  const updated = new Date(`${NOW.lastUpdated}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-150px', right: '-100px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-16">
          <p className="section-label">Now</p>
          <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
            What I&apos;m<br />
            <span className="text-[var(--text-tertiary)]">doing now.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-lg mb-4">
            Not a bio, not a portfolio — just what has my attention right now.
            Inspired by{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover-line"
            >
              nownownow.com
            </a>
            .
          </p>
          <p className="text-[var(--text-tertiary)] text-sm">
            Last updated: <time dateTime={NOW.lastUpdated}>{updated}</time> · Ahmedabad, India
          </p>
        </div>
      </section>

      <div className="accent-line" />

      <NowSection label="Current focus" title="Where the hours go" items={NOW.focus} />

      <div className="accent-line" />

      <NowSection label="Shipped recently" title="Out the door" items={NOW.shipped} />

      <div className="accent-line" />

      <NowSection label="What's next" title="On deck" items={NOW.next} />

      <div className="h-20" />
    </div>
  );
}
