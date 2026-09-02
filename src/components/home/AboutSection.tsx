'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollRevealText from '@/components/ScrollRevealText';

const interests = [
  { emoji: '🎮', label: 'Xbox', detail: 'Death Stranding, Cyberpunk, CoD' },
  { emoji: '₿', label: 'Bitcoin', detail: 'Not crypto. Bitcoin.' },
  { emoji: '🚀', label: 'Space', detail: 'SpaceX fan. Mars or bust.' },
  { emoji: '🎨', label: 'Design', detail: 'Typography & branding nerd' },
  { emoji: '🎵', label: 'Music', detail: 'Spotify Wrapped is a crime scene' },
  { emoji: '🖨️', label: '3D Print', detail: 'Bambu Labs P1S owner' },
  { emoji: '☕', label: 'Coffee', detail: 'Chai mornings, coffee coding' },
  { emoji: '🦾', label: 'Longevity', detail: 'Living forever or dying trying' },
];

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

export default function AboutSection() {
  return (
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
              No VC pitches, no standups, no Jira tickets. Just me and too much chai. I build software that respects your privacy because that&apos;s how it should be.
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
  );
}
