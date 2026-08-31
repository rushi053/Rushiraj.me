import Link from 'next/link';

export default function BlogAuditCTA() {
  return (
    <div className="card card-glow p-6 md:p-8 border-l-2 border-l-[var(--accent)]">
      <p className="section-label mb-3">Working on something?</p>
      <h3 className="font-heading font-bold text-xl md:text-2xl text-[var(--text)] mb-3">
        Get a $500 AI App Audit
      </h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 max-w-lg">
        Built your app with Lovable, Bolt, v0, Cursor, or Replit? I&apos;ll go
        through it the way an attacker and a paying customer would — security,
        broken flows, payment integrity — and send you a prioritized report in
        3 business days. Nothing critical found? Half your money back.
      </p>
      <Link href="/services" className="btn btn-primary text-sm">
        See how it works
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
