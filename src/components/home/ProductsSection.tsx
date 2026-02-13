'use client';

import { motion } from 'framer-motion';
import MagneticCard from '@/components/MagneticCard';
import ScrollRevealText from '@/components/ScrollRevealText';

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
    name: 'DeadBy.ai',
    tagline: 'AI job replacement countdown timer',
    description: 'Enter your job title. Get a brutally honest countdown to when AI takes over. Dark humor included.',
    stats: 'Viral fun project',
    url: 'https://deadby.rushiraj.me',
    emoji: '💀',
    accent: '#FF4444',
  },
  {
    name: 'Cloudo',
    tagline: 'Simple, modern task management for iOS',
    description: 'Stay organized with a clean minimal interface. Task prioritization, reminders, widgets, and iCloud sync.',
    stats: 'Released on App Store',
    url: 'https://apps.apple.com/us/app/cloudo/id6742880068',
    emoji: '☁️',
    accent: '#06B6D4',
  },
];

export default function ProductsSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="gradient-orb gradient-orb-3" style={{ top: '50%', right: '-200px', transform: 'translateY(-50%)' }} />
      <div className="container relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="section-label">Products</p>
            <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl">What I&apos;ve built</ScrollRevealText>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <MagneticCard
              key={product.name}
              as="a"
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-glow group relative overflow-hidden flex flex-col"
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
  );
}
