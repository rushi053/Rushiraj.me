'use client';

import { motion } from 'framer-motion';

const products = [
  {
    name: 'CashLens',
    tagline: 'Privacy-first expense tracker for iOS',
    description: 'Track your expenses without giving up your data. Everything stays on your device. No accounts, no cloud sync, no tracking. Just a clean, fast expense tracker that respects your privacy.',
    stats: [
      { label: 'Rating', value: '4.8★' },
      { label: 'Downloads', value: '227+' },
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
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="section-label">Products</p>
          <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
            3 products.<br />
            <span className="text-[var(--text-tertiary)]">0 compromises.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-lg">
            Everything I build is privacy-first. Your data stays yours. No exceptions.
          </p>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      {products.map((product, i) => (
        <div key={product.name}>
          <section className="section">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${product.accent}30, transparent)` }} />
                
                <div className="relative">
                  <div className="text-5xl mb-6 w-20 h-20 flex items-center justify-center rounded-3xl bg-[var(--bg-secondary)]">{product.emoji}</div>
                  <h2 className="heading-display font-heading text-4xl md:text-5xl mb-2">{product.name}</h2>
                  <p className="text-[var(--text-tertiary)] text-lg mb-6">{product.tagline}</p>
                  <p className="text-[var(--text-secondary)] text-lg max-w-2xl mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="card py-5 px-5 text-center">
                        <div className="text-xl font-heading font-bold mb-1">{stat.value}</div>
                        <div className="text-[var(--text-tertiary)] text-xs uppercase tracking-wider font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {product.tech.map((t) => (
                      <span key={t} className="text-xs text-[var(--text-tertiary)] border border-[var(--border)] px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Visit {product.name} ↗
                    </a>
                    {product.appStore && (
                      <a href={product.appStore} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        App Store ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          {i < products.length - 1 && <div className="container"><div className="divider" /></div>}
        </div>
      ))}
    </div>
  );
}
