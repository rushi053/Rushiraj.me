'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const techStack = {
  'Mobile': ['Swift', 'SwiftUI'],
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'framer-motion'],
  'Backend': ['Node.js', 'PostgreSQL', 'Supabase', 'Python'],
  'Infra': ['Vercel', 'Git', 'Cursor', 'OpenClaw'],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero — asymmetric */}
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-100px', right: '-200px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="section-label">About</p>
              <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
                I&apos;m Rushiraj.<br />
                <span className="text-[var(--text-tertiary)]">I build things.</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Story — split layout with gradient sidebar */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="w-1 h-20 rounded-full bg-gradient-to-b from-[var(--accent)] to-purple-500 opacity-40" />
                <p className="text-[var(--text-tertiary)] text-xs font-medium tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">The Story</p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl"
              >
                <p>
                  Born in India. Went to California for my Master&apos;s in Computer Science at Cal State Fullerton. Worked in Texas after that. Then came back to Ahmedabad, and instead of joining a big tech company, I chose the dumbest possible path: building products solo.
                </p>
                <p className="text-[var(--text)] font-heading font-semibold text-xl">
                  Best decision I ever made.
                </p>
                <p>
                  I run 4 products — <a href="https://cashlens.app" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line">CashLens</a>, <a href="https://privacy.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line">PrivacyPage</a>, and <a href="https://invoice.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line">InvoiceZen</a>. Zero VC money. Zero employees. Just me and 5 AI agents running 24/7 on a Mac in my room. That&apos;s the whole company.
                </p>
                <p>
                  Everything I build is privacy-first. Not because it&apos;s trendy, but because I genuinely believe your data is yours. CashLens stores everything locally on your phone. No accounts, no cloud, no tracking. That&apos;s how software should work.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* AI Agents — with glow card */}
      <section className="section relative overflow-hidden">
        <div className="gradient-orb gradient-orb-2" style={{ bottom: '-150px', left: '-150px' }} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">The setup</p>
              <h2 className="heading-display font-heading text-3xl md:text-4xl mb-4 lg:mb-0">5 AI agents<br />on a Mac</h2>
            </div>
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed"
              >
                <p>
                  My Mac runs 24/7 with 5 AI agents handling different parts of my business — customer support, code review, content, monitoring, and deployment. It&apos;s like having a team without having a team.
                </p>
                <p>
                  I use <span className="text-[var(--text)] font-medium">OpenClaw</span> to orchestrate them. Each agent has its own personality, tools, and context. They read my files, check my repos, send me updates. It&apos;s the closest thing to having co-founders without giving up equity.
                </p>
                <p className="text-[var(--text-tertiary)] text-sm italic">
                  Yes, one of those agents probably helped build this website. Meta, I know.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Interests — bento-ish */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Beyond code</p>
              <h2 className="heading-display font-heading text-3xl md:text-4xl mb-4 lg:mb-0">Things I<br />care about</h2>
            </div>
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed"
              >
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Gaming</span> — Xbox is therapy. Death Stranding for the vibes, Cyberpunk 2077 for the world, CoD when I need to turn my brain off, Fortnite because... I have no excuse.
                </p>
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Bitcoin</span> — Not crypto. Bitcoin. There&apos;s a difference. Hard money for a soft world. I believe it&apos;s the most important monetary innovation of our lifetime.
                </p>
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Space</span> — SpaceX makes me irrationally optimistic about humanity. I want to go to Mars. Not ironically. Actually go.
                </p>
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Design</span> — Typography, branding, clean aesthetics. I&apos;ll spend 2 hours picking a font and 10 minutes writing the copy. Pro Display XDR owner because I have zero impulse control.
                </p>
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Music</span> — Bollywood, hip-hop, rap, EDM, game soundtracks. My Spotify Wrapped is a mess and I&apos;m proud of it.
                </p>
                <p>
                  <span className="text-[var(--text)] font-heading font-semibold">Longevity</span> — I want to live long enough to see Mars colonies, Bitcoin at $10M, and Half-Life 3. In that order.
                </p>
              </motion.div>
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
              <h2 className="heading-display font-heading text-3xl md:text-4xl">What I<br />build with</h2>
            </div>
            <div className="lg:col-span-3 space-y-8">
              {Object.entries(techStack).map(([category, techs]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[var(--text-tertiary)] text-xs font-medium tracking-widest uppercase mb-3">{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech) => (
                      <span key={tech} className="text-sm text-[var(--text-secondary)] px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* People I admire */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="section-label">Inspiration</p>
          <h2 className="heading-display font-heading text-3xl md:text-4xl mb-8">People I admire</h2>
          <div className="flex flex-wrap gap-3">
            {['Steve Jobs', 'Elon Musk', 'Messi', 'Dhoni', 'Taylor Swift', 'Bieber'].map((name) => (
              <span key={name} className="text-sm text-[var(--text-secondary)] px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Connect */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="heading-display font-heading text-3xl md:text-4xl mb-6">Let&apos;s connect</h2>
          <p className="text-[var(--text-secondary)] mb-8">Best way to reach me is DM on X. I read everything.</p>
          <div className="flex flex-wrap gap-6">
            <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line text-lg font-medium">𝕏 @rushirajjj</a>
            <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] hover-line text-lg">GitHub</a>
            <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] hover-line text-lg">LinkedIn</a>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      <section className="section">
        <div className="container text-center">
          <h2 className="heading-display font-heading text-3xl mb-6">Want to work together?</h2>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
