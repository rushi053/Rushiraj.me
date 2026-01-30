'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="grid-bg min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">About</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Hello, I&apos;m Rushiraj</h1>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 text-white/70 text-lg leading-relaxed"
          >
            <p>
              I&apos;m a frontend developer and iOS engineer based in India. I specialize in 
              building clean, modern applications that people actually want to use.
            </p>
            <p>
              My approach to development is simple: respect the user. This means creating 
              software that&apos;s intuitive, fast, and privacy-conscious. I believe the best 
              products are those that solve real problems without unnecessary complexity.
            </p>
            <p>
              Currently, I&apos;m focused on building CashLens, a privacy-first expense tracker 
              that keeps all your data local. No accounts, no cloud sync, just a simple 
              tool that does its job well.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new music, reading about 
              design, or planning my next travel adventure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl mb-6">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'Swift', 'SwiftUI', 'React', 'Next.js', 'TypeScript',
                'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Git'
              ].map((skill) => (
                <span key={skill} className="text-sm text-white/50 px-4 py-2 border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl mb-6">Let&apos;s Connect</h2>
            <div className="flex flex-wrap gap-6">
              <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover-line">
                GitHub
              </a>
              <a href="https://twitter.com/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover-line">
                Twitter
              </a>
              <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover-line">
                LinkedIn
              </a>
            </div>
          </motion.div>
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
