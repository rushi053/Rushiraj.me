'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const auditIncludes = [
  'Full review of your codebase and live app',
  'Security check: auth, data exposure, API keys, permissions',
  'Payment and paywall integrity testing',
  'Broken or fragile user flows, documented',
  'A prioritized fix list you can act on — with me or anyone else',
];

const tiers = [
  {
    name: 'Starter MVP',
    price: '$2,500',
    description: 'Best for: Idea validation',
    popular: false,
    features: [
      'Landing page + 3-5 core pages',
      'Authentication (login/signup)',
      '1 main feature/flow',
      'Database + API setup',
      'Deployed to Vercel',
      '1 revision round',
    ],
  },
  {
    name: 'Pro MVP',
    price: '$4,000',
    description: 'Best for: Launch-ready product',
    popular: true,
    features: [
      'Everything in Starter',
      'Payments integration (Stripe/Razorpay)',
      'Admin dashboard',
      'Email notifications',
      'SEO + legal pages included',
      '2 revision rounds',
    ],
  },
  {
    name: 'Premium Build',
    price: '$7,500',
    description: 'Best for: Funded startups',
    popular: false,
    features: [
      'Everything in Pro',
      '3rd-party API integrations',
      'Advanced features',
      'Performance optimization',
      'Analytics setup',
      '30-day post-launch support',
    ],
  },
];

const steps = [
  { num: '01', title: 'Discovery Call', desc: '15 minutes. You tell me what you need. I tell you if I can build it. For audits, you can skip the call and book directly.' },
  { num: '02', title: 'Proposal & Payment', desc: 'Fixed-price quote within 24 hours. 50% upfront to start. The audit is always a flat $500.' },
  { num: '03', title: 'I Build', desc: 'You get daily updates. Audit reports land in 3 business days. Builds ship in 5-7.' },
  { num: '04', title: 'You Launch', desc: 'Deployed, tested, yours. Full code ownership. Zero lock-in.' },
];

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe', 'Vercel', 'Swift', 'SwiftUI', 'OpenAI'];

const faqs = [
  { q: 'What exactly do I get from the $500 audit?', a: 'A prioritized report in 3 business days: security holes, broken flows, payment and paywall integrity, and what to fix first — in plain language, not jargon. The report is yours; any competent developer can work from it.' },
  { q: 'What if the audit finds nothing critical?', a: 'Then you get good news and half your money back. If I find no critical security or payment issues, I refund $250 and you keep the full report.' },
  { q: 'What happens after the audit?', a: 'No obligation. Fix things yourself with the report, hand it to another developer, or hire me. If you hire me, the scope is the critical issues we identify together in the audit report, quoted at a fixed price, and your $500 audit fee is credited toward the work.' },
  { q: 'Which AI tools and stacks do you cover?', a: 'Apps built with Lovable, Bolt, v0, Cursor, Replit, and similar — which in practice means React, Next.js, Supabase, Firebase, Stripe, and Tailwind. If your stack is unusual, ask; I\'ll tell you honestly whether I\'m the right person.' },
  { q: 'What if I need changes after delivery?', a: 'Every build tier includes revision rounds. Additional work is quoted separately at fair rates.' },
  { q: 'Do I own the code?', a: '100%. Full source code, deployed to your accounts. No lock-in, no recurring fees.' },
  { q: 'Can you build mobile apps?', a: 'iOS apps in Swift/SwiftUI, yes. I have two apps on the App Store (CashLens, Cloudo).' },
  { q: 'Why so fast?', a: 'I\'ve shipped 6 products. I use AI-assisted development. I know what works and skip what doesn\'t.' },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="border-b border-[var(--border)]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left text-[var(--text)] font-heading font-semibold text-lg hover:text-[var(--accent)] transition-colors"
      >
        {q}
        <svg
          className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${open ? 'rotate-45' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-5 text-[var(--text-secondary)] leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-100px', right: '-200px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="section-label">Services</p>
              <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
                I build your MVP.<br />
                <span className="text-[var(--text-tertiary)]">And rescue the one AI built.</span>
              </h1>
              <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-8 max-w-xl">
                Full-stack development. Fixed prices. No surprises. Start with a
                $500 audit or a full build — either way, you know the cost upfront.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#audit"
                  className="btn btn-primary"
                >
                  Get a $500 Audit
                </a>
                <a
                  href="https://cal.com/rushiraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Book a Discovery Call
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-12" />
      <div className="accent-line" />

      {/* Social Proof Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 6, suffix: '', label: 'Products Shipped' },
              { value: 7, suffix: '', label: 'Days Average Delivery' },
              { value: 0, suffix: '', label: 'Employees Needed' },
              { value: 100, suffix: '%', label: 'Client Code Ownership' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="font-heading text-4xl md:text-5xl font-bold text-[var(--text)] mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[var(--text-tertiary)] text-sm font-medium tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* AI App Rescue — audit entry tier */}
      <section id="audit" className="section relative overflow-hidden scroll-mt-24">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-100px', left: '-200px' }} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">AI App Rescue</p>
              <h2 className="heading-display font-heading text-3xl md:text-5xl mb-6">
                Your AI-built app works&hellip;<br />
                <span className="text-[var(--text-tertiary)]">until it doesn&apos;t.</span>
              </h2>
              <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  You built something real with Lovable, Bolt, v0, Cursor, or Replit.
                  Then payments started failing, users hit errors you can&apos;t
                  reproduce, or you realized you have no idea if your data is secure.
                </p>
                <p>
                  I go through your app the way an attacker and a paying customer
                  would, and tell you exactly what&apos;s broken and what to fix
                  first. Then you decide: fix it yourself with the report, hand it
                  to another developer, or hire me to do the rescue.
                </p>
                <p className="text-[var(--text)] font-medium">
                  If I find no critical security or payment issues, half your money
                  comes back. Either way, you stop guessing.
                </p>
              </div>
            </div>

            {/* Audit offer card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl p-6 md:p-8 border border-[var(--accent)] bg-[var(--card)]"
              style={{ boxShadow: '0 0 40px -10px var(--glow)' }}
            >
              <span className="absolute -top-3 left-6 bg-[var(--accent)] text-white text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                Start Here
              </span>
              <p className="text-[var(--text-tertiary)] text-xs font-medium tracking-widest uppercase mb-2 mt-2">Code &amp; Security Audit</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-heading text-4xl font-bold text-[var(--text)]">$500</p>
                <p className="text-[var(--text-tertiary)] text-sm">fixed price</p>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mb-6">Prioritized report in 3 business days</p>
              <ul className="space-y-3 mb-6">
                {auditIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[var(--text-tertiary)] text-xs mb-6 leading-relaxed">
                Nothing critical found? $250 refunded, and you keep the full report.
                Hire me for the rescue and the $500 is credited toward the work.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact?subject=AI%20App%20Audit"
                  className="block text-center py-3 px-6 rounded-xl font-medium text-sm bg-[var(--accent)] text-white hover:opacity-90 transition-colors"
                >
                  Book a $500 Audit
                </Link>
                <a
                  href="https://cal.com/rushiraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 px-6 rounded-xl font-medium text-sm border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  Questions first? Book a call
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Case study */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-label">Case Study</p>
            <h2 className="heading-display font-heading text-3xl md:text-4xl mb-8">
              It happened to my own product.
            </h2>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                PrivacyPage is my legal document generator. For months, its paywall
                was silently broken — users could reach paid features without
                paying — and the AI generation behind the core product had quietly
                died. No errors, no alerts. The site looked fine. It just
                wasn&apos;t making money and wasn&apos;t delivering the product.
              </p>
              <p>
                When I finally sat down and audited it the way I audit client
                apps — tracing every step from landing page to payment to
                delivery — I found the full extent of the damage in hours, and
                rebuilt the entire money path in one day. Checkout, paywall
                enforcement, generation, delivery: all verified working end to end.
              </p>
              <p className="text-[var(--text)] font-medium">
                That&apos;s the uncomfortable truth about apps assembled fast, with
                or without AI: they can look perfectly healthy while the part that
                makes money is broken. A systematic audit finds it in days, not
                months. That&apos;s exactly what the $500 audit is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Pricing Tiers */}
      <section className="section relative overflow-hidden">
        <div className="gradient-orb gradient-orb-2" style={{ bottom: '-150px', left: '-150px' }} />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <p className="section-label">Pricing</p>
            <h2 className="heading-display font-heading text-3xl md:text-5xl mb-4">Simple, transparent pricing</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Building from scratch, or rebuilding after an audit — same fixed
              prices either way. Audit clients get the $500 fee credited toward
              any tier.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`relative rounded-2xl p-6 md:p-8 border transition-colors ${
                  tier.popular
                    ? 'border-[var(--accent)] bg-[var(--card)]'
                    : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]'
                }`}
                style={tier.popular ? { boxShadow: '0 0 40px -10px var(--glow)' } : {}}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-[var(--text-tertiary)] text-xs font-medium tracking-widest uppercase mb-2">{tier.name}</p>
                <p className="font-heading text-4xl font-bold text-[var(--text)] mb-1">{tier.price}</p>
                <p className="text-[var(--text-secondary)] text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://cal.com/rushiraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 px-6 rounded-xl font-medium text-sm transition-colors ${
                    tier.popular
                      ? 'bg-[var(--accent)] text-white hover:opacity-90'
                      : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[var(--text-tertiary)] text-sm mt-8 max-w-xl mx-auto">
            Rescue work after an audit is scoped to the critical issues we
            identify together in the audit report, quoted as a fixed price before
            any work starts.
          </p>
        </div>
      </section>

      <div className="accent-line" />

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Process</p>
              <h2 className="heading-display font-heading text-3xl md:text-4xl mb-4 lg:mb-0">How it<br />works</h2>
            </div>
            <div className="lg:col-span-3 space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="flex gap-6"
                >
                  <span className="font-heading text-3xl font-bold text-[var(--accent)] opacity-40">{step.num}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-[var(--text)] text-lg mb-1">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Stack</p>
              <h2 className="heading-display font-heading text-3xl md:text-4xl mb-4 lg:mb-0">What I<br />work with</h2>
            </div>
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="flex flex-wrap gap-3"
              >
                {techStack.map((tech) => (
                  <span key={tech} className="text-sm text-[var(--text-secondary)] px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="section-label">FAQ</p>
          <h2 className="heading-display font-heading text-3xl md:text-4xl mb-8">Common questions</h2>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Bottom CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="heading-display font-heading text-3xl md:text-5xl mb-4">Find out what&apos;s actually broken.</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-md mx-auto">
            $500, three business days, a prioritized report. Or book a free
            15-minute call — no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?subject=AI%20App%20Audit" className="btn btn-primary">
              Book a $500 Audit
            </Link>
            <a
              href="https://cal.com/rushiraj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
