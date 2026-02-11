'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const timeline = [
  { year: 'Born', text: 'Ahmedabad, Gujarat, India 🇮🇳' },
  { year: '2015', text: 'Moved to Texas, USA. Started the American chapter.' },
  { year: '2019', text: 'MS Computer Science at Cal State Fullerton (CSUF)' },
  { year: '2022', text: 'Moved back to India. Went full indie dev.' },
  { year: '2024', text: 'Launched CashLens, PrivacyPage, InvoiceZen. 3 products, 0 employees.' },
  { year: 'Now', text: 'Building from Ahmedabad. 5 AI agents. Mac Mini server. Living the dream.' },
];

const techStack = {
  'Mobile': ['Swift', 'SwiftUI'],
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'framer-motion'],
  'Backend': ['Node.js', 'PostgreSQL', 'Supabase', 'Python'],
  'Infra': ['Vercel', 'Git', 'Cursor', 'OpenClaw'],
};

export default function AboutPage() {
  return (
    <div className="grid-bg min-h-screen">
      {/* Hero */}
      <section className="container pt-16 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">About</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            I&apos;m Rushiraj.<br />
            <span className="text-white/30">I build things.</span>
          </h1>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Story */}
      <section className="section">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-white/70 text-lg leading-relaxed"
          >
            <p>
              Born in India. Spent 7 years in the US — Texas first, then California for my Master&apos;s in Computer Science at Cal State Fullerton. Came back to Ahmedabad, and instead of joining a big tech company, I chose the dumbest possible path: building products solo.
            </p>
            <p>
              Best decision I ever made.
            </p>
            <p>
              I run 3 products — <a href="https://cashlens.app" target="_blank" rel="noopener noreferrer" className="text-white hover-line">CashLens</a>, <a href="https://privacy.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-white hover-line">PrivacyPage</a>, and <a href="https://invoice.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-white hover-line">InvoiceZen</a>. Zero VC money. Zero employees. Just me and 5 AI agents running 24/7 on a Mac Mini in my room. That&apos;s the whole company.
            </p>
            <p>
              Everything I build is privacy-first. Not because it&apos;s trendy, but because I genuinely believe your data is yours. CashLens stores everything locally on your phone. No accounts, no cloud, no tracking. That&apos;s how software should work.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Timeline */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Timeline</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">The journey so far</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 py-5 border-b border-white/5"
              >
                <span className="text-white/30 font-mono text-sm w-16 shrink-0 pt-0.5">{item.year}</span>
                <span className="text-white/70">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* AI Agents */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">The setup</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">5 AI agents on a Mac Mini</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-white/70 text-lg leading-relaxed"
          >
            <p>
              My Mac Mini runs 24/7 with 5 AI agents handling different parts of my business — customer support, code review, content, monitoring, and deployment. It&apos;s like having a team without having a team.
            </p>
            <p>
              I use <span className="text-white">OpenClaw</span> to orchestrate them. Each agent has its own personality, tools, and context. They read my files, check my repos, send me updates. It&apos;s the closest thing to having co-founders without giving up equity.
            </p>
            <p className="text-white/40 text-sm italic">
              Yes, one of those agents probably helped build this website. Meta, I know.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Interests */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Beyond code</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Things I care about</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-white/70 text-lg leading-relaxed"
          >
            <p>
              <span className="text-white">Gaming</span> — Xbox is therapy. Death Stranding for the vibes, Cyberpunk 2077 for the world, CoD when I need to turn my brain off, Fortnite because... I have no excuse.
            </p>
            <p>
              <span className="text-white">Bitcoin</span> — Not crypto. Bitcoin. There&apos;s a difference. Hard money for a soft world. I believe it&apos;s the most important monetary innovation of our lifetime.
            </p>
            <p>
              <span className="text-white">Space</span> — SpaceX makes me irrationally optimistic about humanity. I want to go to Mars. Not ironically. Actually go.
            </p>
            <p>
              <span className="text-white">Design</span> — Typography, branding, clean aesthetics. I&apos;ll spend 2 hours picking a font and 10 minutes writing the copy. Pro Display XDR owner because I have zero impulse control.
            </p>
            <p>
              <span className="text-white">Music</span> — Bollywood, hip-hop, rap, EDM, game soundtracks. My Spotify Wrapped is a mess and I&apos;m proud of it.
            </p>
            <p>
              <span className="text-white">Longevity</span> — I want to live long enough to see Mars colonies, Bitcoin at $10M, and Half-Life 3. In that order.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Tech Stack */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Stack</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">What I build with</h2>
          <div className="space-y-8">
            {Object.entries(techStack).map(([category, techs]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-white/30 text-xs tracking-widest uppercase mb-3">{category}</p>
                <div className="flex flex-wrap gap-3">
                  {techs.map((tech) => (
                    <span key={tech} className="text-sm text-white/50 px-4 py-2 border border-white/10 hover:border-white/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* People I admire */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Inspiration</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">People I admire</h2>
          <div className="flex flex-wrap gap-3">
            {['Steve Jobs', 'Elon Musk', 'Messi', 'Dhoni', 'Taylor Swift', 'Bieber', 'Pieter Levels'].map((name) => (
              <span key={name} className="text-sm text-white/50 px-4 py-2 border border-white/10">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Connect */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Let&apos;s connect</h2>
          <p className="text-white/60 mb-8">Best way to reach me is DM on X. I read everything.</p>
          <div className="flex flex-wrap gap-6">
            <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-white hover-line text-lg">𝕏 @rushirajjj</a>
            <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover-line text-lg">GitHub</a>
            <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover-line text-lg">LinkedIn</a>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container text-center">
          <h2 className="font-serif text-3xl mb-6">Want to work together?</h2>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>
    </div>
  );
}
