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
    color: 'from-green-500/10 to-transparent',
  },
  {
    name: 'PrivacyPage',
    tagline: 'Legal docs generator for apps & websites',
    description: 'Privacy Policy, ToS, EULA, Cookie Policy, Disclaimer. Done in minutes.',
    stats: 'Used by indie devs worldwide',
    url: 'https://privacy.rushiraj.me',
    emoji: '📜',
    color: 'from-blue-500/10 to-transparent',
  },
  {
    name: 'InvoiceZen',
    tagline: 'Privacy-first invoice generator',
    description: 'Beautiful invoices with premium templates. No sign-up required.',
    stats: 'Free & open',
    url: 'https://invoice.rushiraj.me',
    emoji: '🧾',
    color: 'from-purple-500/10 to-transparent',
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
    <div className="grid-bg">
      {/* Hero */}
      <section className="container min-h-[90vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/50 text-xs tracking-wide">Building from Ahmedabad, India</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] mb-8 tracking-tight"
        >
          Solo dev.<br />
          3 products.<br />
          <span className="text-white/30">0 VC money.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-white/50 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
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

      {/* Stats — real numbers */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { value: '3', label: 'Products live' },
              { value: '227+', label: 'App downloads' },
              { value: '4.8★', label: 'App Store rating' },
              { value: '3K+', label: 'X followers' },
              { value: '5', label: 'AI agents running' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card text-center py-8"
              >
                <div className="text-2xl md:text-3xl font-serif mb-1">{stat.value}</div>
                <div className="text-white/40 text-xs tracking-wide uppercase">{stat.label}</div>
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
              <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Products</p>
              <h2 className="font-serif text-4xl md:text-5xl">What I&apos;ve built</h2>
            </div>
          </div>

          <div className="grid gap-6">
            {products.map((product, i) => (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group relative overflow-hidden flex flex-col md:flex-row md:items-center gap-6 hover:border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative text-4xl">{product.emoji}</div>
                <div className="relative flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-serif">{product.name}</h3>
                    <span className="text-white/20 text-xs border border-white/10 px-2 py-0.5 rounded-full">{product.stats}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-1">{product.tagline}</p>
                  <p className="text-white/60 text-sm">{product.description}</p>
                </div>
                <div className="relative text-white/20 group-hover:text-white/50 transition-colors">
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
                  <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Featured</p>
                  <h2 className="font-serif text-4xl md:text-5xl">Selected Work</h2>
                </div>
                <Link href="/work" className="text-white/50 hover:text-white text-sm hover-line hidden md:block">
                  View all →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/work/${project.slug}`}>
                      <div className="card group h-full">
                        <span className="text-white/20 text-sm font-mono mb-4 block">0{i + 1}</span>
                        <h3 className="text-xl font-serif mb-3 group-hover:text-white/80 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2">
                          {project.description}
                        </p>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
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
            <p className="text-white/40 text-sm tracking-widest uppercase mb-3">About</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">
              MS CS from California.<br />
              <span className="text-white/30">Now building from India.</span>
            </h2>
            <p className="text-white/60 mb-4">
              Born in India, spent 7 years in the US (Texas → Cal State Fullerton for MS in Computer Science). Moved back to Ahmedabad and went full indie dev.
            </p>
            <p className="text-white/60 mb-6">
              No VC pitches, no standups, no Jira tickets. Just me, 5 AI agents on a Mac Mini, and an unhealthy amount of chai. I build software that respects your privacy because that&apos;s how it should be.
            </p>
            <Link href="/about" className="btn btn-outline">The full story →</Link>
          </div>
          
          <div>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Interests & vibes</p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card py-4 px-5"
                >
                  <div className="text-lg mb-1">{item.emoji}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-white/30 text-xs">{item.detail}</div>
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
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Now</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">What I&apos;m up to</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-white/60 text-lg border-l-2 border-white/10 pl-5 py-1"
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
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Stack</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Tools I use daily</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              'Swift', 'SwiftUI', 'React', 'Next.js', 'TypeScript',
              'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase',
              'Vercel', 'Python', 'Git', 'Cursor', 'framer-motion', 'OpenClaw'
            ].map((tech) => (
              <span key={tech} className="text-sm text-white/50 px-4 py-2 border border-white/10 hover:border-white/30 transition-colors">
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
              <p className="font-serif text-2xl mb-2">Rushiraj Jadeja</p>
              <p className="text-white/40 text-sm">Solo dev · Ahmedabad, India</p>
              <p className="text-white/30 text-xs mt-1">Night owl. Chai mornings. Building things nobody asked for.</p>
            </div>
            <div className="flex flex-col gap-3 text-right">
              <div className="flex gap-6">
                <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm hover-line">𝕏 @rushirajjj</a>
                <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm hover-line">GitHub</a>
                <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm hover-line">LinkedIn</a>
              </div>
              <div className="flex gap-6">
                <a href="https://cashlens.app" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-xs hover-line">CashLens</a>
                <a href="https://privacy.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-xs hover-line">PrivacyPage</a>
                <a href="https://invoice.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-xs hover-line">InvoiceZen</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-sm">
            © {new Date().getFullYear()} Rushiraj Jadeja · Built with Next.js, Tailwind, and too much coffee
          </div>
        </div>
      </footer>
    </div>
  );
}
