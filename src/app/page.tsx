'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  technologies?: string[];
}

const products = [
  {
    name: 'CashLens',
    tagline: 'Privacy-first expense tracker for iOS',
    description: '100% local storage. No accounts. No cloud. Just your money, your data.',
    stats: '4.8★ · 227+ downloads',
    url: 'https://cashlens.app',
    appStore: 'https://apps.apple.com/us/app/cashlens-personal-finance/id6743153951',
    emoji: '💰',
    accent: '#22C55E',
  },
  {
    name: 'PrivacyPage',
    tagline: 'Legal docs generator for apps & websites',
    description: 'Privacy Policy, ToS, EULA, Cookie Policy, Disclaimer. Done in minutes.',
    stats: 'Used by indie devs worldwide',
    url: 'https://privacy.rushiraj.me',
    emoji: '📜',
    accent: '#3B82F6',
  },
  {
    name: 'InvoiceZen',
    tagline: 'Privacy-first invoice generator',
    description: 'Beautiful invoices with premium templates. No sign-up required.',
    stats: 'Free & open',
    url: 'https://invoice.rushiraj.me',
    emoji: '🧾',
    accent: '#A855F7',
  },
];

const interests = [
  { emoji: '🎮', label: 'Xbox', detail: 'Death Stranding, Cyberpunk, CoD', span: 'col-span-1' },
  { emoji: '₿', label: 'Bitcoin', detail: 'Not crypto. Bitcoin.', span: 'col-span-1' },
  { emoji: '🚀', label: 'Space', detail: 'SpaceX fan. Mars or bust.', span: 'col-span-1 md:col-span-2' },
  { emoji: '🎨', label: 'Design', detail: 'Typography & branding nerd', span: 'col-span-1 md:col-span-2' },
  { emoji: '🎵', label: 'Music', detail: 'Bollywood · Hip-hop · EDM', span: 'col-span-1' },
  { emoji: '🖨️', label: '3D Print', detail: 'Bambu Labs P1S owner', span: 'col-span-1' },
  { emoji: '☕', label: 'Coffee', detail: 'Chai mornings, coffee coding', span: 'col-span-1' },
  { emoji: '🦾', label: 'Longevity', detail: 'Living forever or dying trying', span: 'col-span-1' },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('ios_apps')
        .select('id, title, description, slug, technologies')
        .eq('is_featured', true)
        .order('updated_at', { ascending: false })
        .limit(3);
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="container min-h-[90vh] flex flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/20 mb-10">
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 bg-green-500 rounded-full" />
              <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </span>
            <span className="text-[var(--text-secondary)] text-xs font-medium tracking-wide">Building from Ahmedabad, India</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-display font-heading text-5xl md:text-7xl lg:text-[5.5rem] mb-8"
        >
          Solo dev.<br />
          3 products.<br />
          <span className="text-[var(--text-tertiary)]">0 VC money.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
        >
          I&apos;m Rushiraj — I build privacy-first software, run 5 AI agents on a Mac Mini, and believe your data should stay yours.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/products" className="btn btn-primary">
            See what I&apos;m building
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Follow the journey →
          </a>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { value: '3', label: 'Products live', icon: '🚀' },
              { value: '227+', label: 'App downloads', icon: '📲' },
              { value: '4.8★', label: 'App Store rating', icon: '⭐' },
              { value: '3K+', label: 'X followers', icon: '🐦' },
              { value: '5', label: 'AI agents running', icon: '🤖' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="card text-center py-8 group"
              >
                <div className="text-lg mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-heading font-bold mb-1 text-[var(--text)]">{stat.value}</div>
                <div className="text-[var(--text-tertiary)] text-xs font-medium tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Products */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="section-label">Products</p>
              <h2 className="heading-display font-heading text-4xl md:text-5xl">What I&apos;ve built</h2>
            </div>
          </div>

          <div className="grid gap-5">
            {products.map((product, i) => (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card group relative overflow-hidden flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${product.accent}08, transparent)` }} />
                <div className="relative text-4xl w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)]">{product.emoji}</div>
                <div className="relative flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-heading font-bold">{product.name}</h3>
                    <span className="text-[var(--text-tertiary)] text-xs border border-[var(--border)] px-2.5 py-0.5 rounded-full">{product.stats}</span>
                  </div>
                  <p className="text-[var(--text-tertiary)] text-sm mb-1">{product.tagline}</p>
                  <p className="text-[var(--text-secondary)] text-sm">{product.description}</p>
                </div>
                <div className="relative text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Supabase Featured Projects */}
      {!loading && projects.length > 0 && (
        <>
          <section className="section">
            <div className="container">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <p className="section-label">Featured</p>
                  <h2 className="heading-display font-heading text-4xl md:text-5xl">Selected Work</h2>
                </div>
                <Link href="/work" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm font-medium hover-line hidden md:block">
                  View all →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Link href={`/work/${project.slug}`}>
                      <div className="card group h-full">
                        <span className="text-[var(--accent)] text-sm font-mono font-medium mb-4 block">0{i + 1}</span>
                        <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                          {project.description}
                        </p>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] text-[var(--text-tertiary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <div className="container"><div className="divider" /></div>
        </>
      )}

      {/* About snippet */}
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label">About</p>
            <h2 className="heading-display font-heading text-4xl md:text-5xl mb-8">
              MS CS from California.<br />
              <span className="text-[var(--text-tertiary)]">Now building from India.</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
              Born in India, spent 7 years in the US (Texas → Cal State Fullerton for MS in Computer Science). Moved back to Ahmedabad and went full indie dev.
            </p>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              No VC pitches, no standups, no Jira tickets. Just me, 5 AI agents on a Mac Mini, and an unhealthy amount of chai. I build software that respects your privacy because that&apos;s how it should be.
            </p>
            <Link href="/about" className="btn btn-outline">The full story →</Link>
          </div>
          
          <div>
            <p className="section-label mb-6">Interests & vibes</p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className={`card py-5 px-5 ${item.span}`}
                >
                  <div className="text-xl mb-2">{item.emoji}</div>
                  <div className="text-sm font-heading font-semibold text-[var(--text)]">{item.label}</div>
                  <div className="text-[var(--text-tertiary)] text-xs mt-0.5">{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Now section */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="section-label">Now</p>
          <h2 className="heading-display font-heading text-4xl md:text-5xl mb-10">What I&apos;m up to</h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              '🔨 Shipping new features for CashLens on iOS',
              '🤖 Running 5 AI agents 24/7 on a Mac Mini (yes, really)',
              '📜 Growing PrivacyPage — making legal docs painless for devs',
              '🧾 Building out InvoiceZen templates',
              '🐦 Posting the journey on X @rushirajjj',
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="text-[var(--text-secondary)] text-lg border-l-2 border-[var(--accent)] pl-5 py-2 rounded-r-lg hover:bg-[var(--card)] transition-colors"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Tech Stack */}
      <section className="section">
        <div className="container text-center">
          <p className="section-label">Stack</p>
          <h2 className="heading-display font-heading text-3xl md:text-4xl mb-10">Tools I use daily</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              'Swift', 'SwiftUI', 'React', 'Next.js', 'TypeScript',
              'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase',
              'Vercel', 'Python', 'Git', 'Cursor', 'framer-motion', 'OpenClaw'
            ].map((tech) => (
              <span key={tech} className="text-sm text-[var(--text-secondary)] px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Footer */}
      <footer className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-heading font-bold mb-2">Rushiraj Jadeja</p>
              <p className="text-[var(--text-secondary)] text-sm">Solo dev · Ahmedabad, India</p>
              <p className="text-[var(--text-tertiary)] text-xs mt-1">Night owl. Chai mornings. Building things nobody asked for.</p>
            </div>
            <div className="flex flex-col gap-3 md:text-right">
              <div className="flex gap-6">
                <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm hover-line">𝕏 @rushirajjj</a>
                <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm hover-line">GitHub</a>
                <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm hover-line">LinkedIn</a>
              </div>
              <div className="flex gap-6">
                <a href="https://cashlens.app" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">CashLens</a>
                <a href="https://privacy.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">PrivacyPage</a>
                <a href="https://invoice.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">InvoiceZen</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--text-tertiary)] text-sm">
            © {new Date().getFullYear()} Rushiraj Jadeja · Built with Next.js, Tailwind, and too much coffee
          </div>
        </div>
      </footer>
    </div>
  );
}
