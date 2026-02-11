'use client';

import { motion } from 'framer-motion';
import MagneticCard from '@/components/MagneticCard';
import ScrollRevealText from '@/components/ScrollRevealText';

const products = [
  {
    name: 'CashLens',
    tagline: 'Privacy-first expense tracker for iOS',
    description: 'Track your expenses without giving up your data. Everything stays on your device. No accounts, no cloud sync, no tracking. Just a clean, fast expense tracker that respects your privacy.',
    stats: [
      { label: 'Rating', value: '4.8★' },
      { label: 'Downloads', value: '2.5K+' },
      { label: 'Data stored', value: 'Locally' },
      { label: 'Accounts needed', value: '0' },
    ],
    url: 'https://cashlens.app',
    appStore: 'https://apps.apple.com/us/app/cashlens-personal-finance/id6743153951',
    tech: ['Swift', 'SwiftUI', 'Core Data'],
    emoji: '💰',
    accent: '#22C55E',
  },
  {
    name: 'PrivacyPage',
    tagline: 'Legal docs generator for apps & websites',
    description: 'Generate Privacy Policies, Terms of Service, EULA, Cookie Policies, and Disclaimers in minutes. Built for indie devs who\'d rather ship features than read legalese.',
    stats: [
      { label: 'Doc types', value: '5' },
      { label: 'Time to generate', value: '~2 min' },
      { label: 'Price', value: 'Free tier' },
      { label: 'Users', value: 'Growing' },
    ],
    url: 'https://privacy.rushiraj.me',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    emoji: '📜',
    accent: '#3B82F6',
  },
  {
    name: 'InvoiceZen',
    tagline: 'Privacy-first invoice generator',
    description: 'Create beautiful, professional invoices with premium templates. No sign-up required. Your business data stays in your browser. Download as PDF and go.',
    stats: [
      { label: 'Templates', value: 'Premium' },
      { label: 'Sign-up', value: 'None' },
      { label: 'Export', value: 'PDF' },
      { label: 'Price', value: 'Free' },
    ],
    url: 'https://invoice.rushiraj.me',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    emoji: '🧾',
    accent: '#A855F7',
  },
  {
    name: 'Cloudo',
    tagline: 'Simple, modern task management for iOS',
    description: 'Stay organized with a clean minimal interface. Task prioritization, reminders, widgets, and iCloud sync. Built for people who want to get things done without the bloat.',
    stats: [
      { label: 'Platform', value: 'iOS' },
      { label: 'Sync', value: 'iCloud' },
      { label: 'Widgets', value: 'Yes' },
      { label: 'Price', value: 'Free' },
    ],
    url: 'https://apps.apple.com/us/app/cloudo/id6742880068',
    tech: ['Swift', 'SwiftUI', 'CloudKit'],
    emoji: '☁️',
    accent: '#06B6D4',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-150px', right: '-100px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label">Products</p>
            <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
              4 products.<br />
              <span className="text-[var(--text-tertiary)]">0 compromises.</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg">
              Everything I build is privacy-first. Your data stays yours. No exceptions.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      {products.map((product, i) => (
        <div key={product.name}>
          <section className="section relative overflow-hidden">
            <div className="gradient-orb gradient-orb-3" style={{
              width: '400px', height: '400px',
              [i % 2 === 0 ? 'right' : 'left']: '-100px',
              top: '50%', transform: 'translateY(-50%)',
              background: `radial-gradient(circle, ${product.accent}40, transparent 70%)`,
            }} />
            
            <div className="container relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className={`grid lg:grid-cols-5 gap-12 items-start ${i % 2 === 1 ? 'direction-rtl' : ''}`}>
                  <div className={`lg:col-span-3 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="text-5xl mb-6 w-20 h-20 flex items-center justify-center rounded-3xl bg-[var(--bg-secondary)]">{product.emoji}</div>
                    <h2 className="heading-display font-heading text-4xl md:text-5xl mb-2">{product.name}</h2>
                    <p className="text-lg font-medium mb-4" style={{ color: product.accent }}>{product.tagline}</p>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mb-8 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {product.tech.map((t) => (
                        <span key={t} className="text-xs text-[var(--text-tertiary)] border border-[var(--border)] px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: product.accent }}>
                        Visit {product.name} ↗
                      </a>
                      {product.appStore && (
                        <a href={product.appStore} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                          App Store ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="grid grid-cols-2 gap-3">
                      {product.stats.map((stat) => (
                        <MagneticCard key={stat.label} className="card card-glow py-5 px-5 text-center">
                          <div className="text-xl font-heading font-bold mb-1">{stat.value}</div>
                          <div className="text-[var(--text-tertiary)] text-xs uppercase tracking-wider font-medium">{stat.label}</div>
                        </MagneticCard>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          {i < products.length - 1 && <div className="accent-line" />}
        </div>
      ))}

      <div className="h-20" />
    </div>
  );
}
