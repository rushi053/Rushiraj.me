'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import MagneticCard from '@/components/MagneticCard';
import ScrollRevealText from '@/components/ScrollRevealText';
import AnimatedCounter from '@/components/AnimatedCounter';

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
    stats: '4.8★ · 2.5K+ downloads',
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
  {
    name: 'Cloudo',
    tagline: 'Simple, modern task management for iOS',
    description: 'Stay organized with a clean minimal interface. Task prioritization, reminders, widgets, and iCloud sync.',
    stats: 'Released on App Store',
    url: 'https://apps.apple.com/app/cloudo/id6744400890',
    emoji: '☁️',
    accent: '#06B6D4',
  },
];

const interests = [
  { emoji: '🎮', label: 'Xbox', detail: 'Death Stranding, Cyberpunk, CoD' },
  { emoji: '₿', label: 'Bitcoin', detail: 'Not crypto. Bitcoin.' },
  { emoji: '🚀', label: 'Space', detail: 'SpaceX fan. Mars or bust.' },
  { emoji: '🎨', label: 'Design', detail: 'Typography & branding nerd' },
  { emoji: '🎵', label: 'Music', detail: 'Bollywood · Hip-hop · EDM' },
  { emoji: '🖨️', label: '3D Print', detail: 'Bambu Labs P1S owner' },
  { emoji: '☕', label: 'Coffee', detail: 'Chai mornings, coffee coding' },
  { emoji: '🦾', label: 'Longevity', detail: 'Living forever or dying trying' },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function InterestCard({ item, index }: { item: typeof interests[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="card card-glow py-4 px-4 hover:border-[var(--accent)]/30 transition-colors"
    >
      <div className="text-xl mb-1.5">{item.emoji}</div>
      <div className="text-sm font-heading font-semibold text-[var(--text)]">{item.label}</div>
      <div className="text-[var(--text-tertiary)] text-xs mt-0.5">{item.detail}</div>
    </motion.div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Parallax refs
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallax = useTransform(heroProgress, [0, 1], [0, -80]);

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
    <div className="relative">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="gradient-orb gradient-orb-1"
          style={{ y: orbY, x: orbX }}
        />
        <motion.div
          className="gradient-orb gradient-orb-2"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        {/* Dot grid */}
        <div className="dot-grid" />

        <motion.div className="container relative z-10" style={{ y: heroParallax }}>
          <div className="max-w-4xl">
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
              4 products.<br />
              <span className="text-[var(--text-tertiary)]">0 VC money.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[var(--text-secondary)] text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
            >
              I&apos;m Rushiraj — I build privacy-first software, run 5 AI agents on a Mac, and believe your data should stay yours.
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
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="accent-line" />
      
      <section className="section relative overflow-hidden">
        <div className="container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { value: '4', label: 'Products live', icon: '🚀' },
              { value: '2.5K+', label: 'App downloads', icon: '📲' },
              { value: '4.8★', label: 'App Store rating', icon: '⭐' },
              { value: '3K+', label: 'X followers', icon: '🐦' },
              { value: '5', label: 'AI agents running', icon: '🤖' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="card card-glow text-center py-8 group"
              >
                <div className="text-lg mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-heading font-bold mb-1 text-[var(--text)]">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-[var(--text-tertiary)] text-xs font-medium tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Products */}
      <section className="section relative overflow-hidden">
        <div className="gradient-orb gradient-orb-3" style={{ top: '50%', right: '-200px', transform: 'translateY(-50%)' }} />
        <div className="container relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="section-label">Products</p>
              <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl">What I&apos;ve built</ScrollRevealText>
            </div>
          </div>

          <div className="horizontal-scroll md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:overflow-visible">
            {products.map((product, i) => (
              <MagneticCard
                key={product.name}
                as="a"
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-glow group relative overflow-hidden flex flex-col min-w-[280px] md:min-w-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex flex-col h-full"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${product.accent}15, transparent 60%)` }} />
                  <div className="relative text-4xl w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)] mb-5">{product.emoji}</div>
                  <div className="relative flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-heading font-bold">{product.name}</h3>
                    </div>
                    <p className="text-[var(--accent)] text-sm font-medium mb-2">{product.tagline}</p>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">{product.description}</p>
                    <span className="text-[var(--text-tertiary)] text-xs border border-[var(--border)] px-2.5 py-1 rounded-full">{product.stats}</span>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">View project</span>
                    <div className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </MagneticCard>
            ))}
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* About snippet — with parallax */}
      <section className="section relative overflow-hidden">
        <div className="dot-grid" style={{ opacity: 0.2 }} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <p className="section-label">About</p>
              <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl mb-8">
                MS CS from California. Now building from India.
              </ScrollRevealText>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[var(--text-secondary)] mb-4 leading-relaxed"
              >
                Born in India, went to California for my MS in Computer Science at Cal State Fullerton, worked in Texas, then moved back to Ahmedabad and went full indie dev.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-[var(--text-secondary)] mb-6 leading-relaxed"
              >
                No VC pitches, no standups, no Jira tickets. Just me, 5 AI agents on a Mac, and an unhealthy amount of chai. I build software that respects your privacy because that&apos;s how it should be.
              </motion.p>
              <Link href="/about" className="btn btn-outline">The full story →</Link>
            </div>
            
            <div className="lg:col-span-2">
              <p className="section-label mb-6">Interests & vibes</p>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((item, i) => (
                  <InterestCard key={item.label} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Now section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Now</p>
              <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl mb-4 lg:mb-0">What I&apos;m up to</ScrollRevealText>
            </div>
            <div className="lg:col-span-3">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-4"
              >
                {[
                  '🔨 Shipping new features for CashLens on iOS',
                  '☁️ Just launched Cloudo — task management for iOS',
                  '🤖 Running 5 AI agents 24/7 on a Mac (yes, really)',
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
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Testimonials */}
      <section className="section relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <p className="section-label">What people say</p>
            <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl">Real reviews, real users</ScrollRevealText>
          </div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                quote: "Finally an expense tracker that doesn't want my email, my location, and my firstborn. Clean UI, works offline, does exactly what it says.",
                author: 'App Store Review',
                product: 'CashLens',
                stars: '⭐⭐⭐⭐⭐',
              },
              {
                quote: "I needed a privacy policy for my app launch and didn't want to pay a lawyer $500. This generated a solid one in 2 minutes. Lifesaver for indie devs.",
                author: 'Indie Developer',
                product: 'PrivacyPage',
                stars: '⭐⭐⭐⭐⭐',
              },
              {
                quote: "Simple, beautiful, no BS. I just needed to send an invoice without creating yet another account somewhere. This nails it.",
                author: 'Freelancer',
                product: 'InvoiceZen',
                stars: '⭐⭐⭐⭐⭐',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="card card-glow p-6 flex flex-col"
              >
                <div className="text-sm mb-3">{t.stars}</div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[var(--text-tertiary)] text-xs">{t.author}</p>
                  <p className="text-[var(--accent)] text-xs font-medium">{t.product}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      {/* My Setup */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Setup</p>
              <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl mb-4 lg:mb-0">What I use</ScrollRevealText>
              <p className="text-[var(--text-tertiary)] text-sm mt-3 hidden lg:block">Hardware, software, and the random stuff on my desk.</p>
            </div>
            <div className="lg:col-span-3">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-6"
              >
                {[
                  { category: '💻 Machines', items: 'MacBook Pro M4 (daily driver) · Mac Mini M4 (24/7 server for AI agents) · Pro Display XDR (impulse buy, zero regrets)' },
                  { category: '🎮 Gaming', items: 'Xbox Series X · Death Stranding · Cyberpunk 2077 · CoD · Fortnite' },
                  { category: '🛠️ Dev Tools', items: 'Cursor (AI editor) · Xcode · VS Code · Vercel · Supabase · GitHub' },
                  { category: '🖨️ Other', items: 'Bambu Labs P1S (3D printer) · AirPods Pro · iPhone 16 Pro' },
                ].map((setup, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.35 }}
                    className="border-l-2 border-[var(--accent)] pl-5 py-2"
                  >
                    <p className="text-[var(--text)] font-heading font-semibold text-sm mb-1">{setup.category}</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{setup.items}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Tech Stack — marquee */}
      <section className="section overflow-hidden">
        <div className="container text-center mb-10">
          <p className="section-label">Stack</p>
          <ScrollRevealText className="heading-display font-heading text-3xl md:text-4xl">Tools I use daily</ScrollRevealText>
        </div>
        <div className="relative overflow-hidden py-4">
          <div className="marquee-track">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-4 px-2">
                {[
                  'Swift', 'SwiftUI', 'React', 'Next.js', 'TypeScript',
                  'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase',
                  'Vercel', 'Python', 'Git', 'Cursor', 'framer-motion', 'OpenClaw'
                ].map((tech) => (
                  <span key={`${setIdx}-${tech}`} className="text-sm text-[var(--text-secondary)] px-5 py-2.5 rounded-full border border-[var(--border)] whitespace-nowrap hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="accent-line" />

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
                <a href="https://apps.apple.com/app/cloudo/id6744400890" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">Cloudo</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--text-tertiary)] text-sm">
            © {new Date().getFullYear()} Rushiraj Jadeja · Built with Next.js, Tailwind, and too much coffee
          </div>
        </div>
      </footer>

      <div className="h-20" />
    </div>
  );
}
