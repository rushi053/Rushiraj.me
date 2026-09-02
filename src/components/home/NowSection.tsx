'use client';

import { motion } from 'framer-motion';
import ScrollRevealText from '@/components/ScrollRevealText';

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const items = [
  'Shipping CashLens on iOS',
  'Catching what AI-built apps get wrong — $500 audits',
  'Growing PrivacyPage',
  'Posting the journey on X @rushirajjj',
];

export default function NowSection() {
  return (
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
              {items.map((item, i) => (
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
  );
}
