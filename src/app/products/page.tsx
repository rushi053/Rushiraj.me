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
    gradient: 'from-green-500/20 via-green-500/5 to-transparent',
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
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
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
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
  },
];

export default function ProductsPage() {
  return (
    <div className="grid-bg min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Products</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            3 products.<br />
            <span className="text-white/30">0 compromises.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg">
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
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className={`absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl opacity-50`} />
                
                <div className="relative">
                  <div className="text-5xl mb-6">{product.emoji}</div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-2">{product.name}</h2>
                  <p className="text-white/40 text-lg mb-6">{product.tagline}</p>
                  <p className="text-white/60 text-lg max-w-2xl mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="card py-4 px-5 text-center">
                        <div className="text-xl font-serif mb-1">{stat.value}</div>
                        <div className="text-white/40 text-xs uppercase tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {product.tech.map((t) => (
                      <span key={t} className="text-xs text-white/40 border border-white/10 px-3 py-1 rounded-full">{t}</span>
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
