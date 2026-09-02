'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function FooterSection() {
  return (
    <>
      <footer className="py-16">
        <div className="container">
          <div className="mb-12">
            <NewsletterSignup compact />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-heading font-bold mb-2">Rushiraj Jadeja</p>
              <p className="text-[var(--text-secondary)] text-sm">Solo dev. 0 VC.</p>
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
                <a href="https://apps.apple.com/us/app/cloudo/id6742880068" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">Cloudo</a>
                <a href="https://deadby.rushiraj.me" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] text-xs hover-line">DeadBy.ai</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--text-tertiary)] text-sm">
            © {new Date().getFullYear()} Rushiraj Jadeja · Built with Next.js, Tailwind, and too much coffee
            <span className="mx-2">·</span>
            <Link href="/now" className="hover:text-[var(--text-secondary)] hover-line">Now</Link>
            <span className="mx-2">·</span>
            <a href="/feed.xml" className="hover:text-[var(--text-secondary)] hover-line">RSS</a>
          </div>
        </div>
      </footer>

      <section className="pb-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[var(--text-tertiary)] text-xs"
          >
            <span className="flex items-center gap-2">
              <kbd className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border)] text-[10px]">⌘K</kbd>
              Search anywhere on this site
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              🎮 Gamers might want to try the Konami Code...
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Try switching tabs 👀</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
