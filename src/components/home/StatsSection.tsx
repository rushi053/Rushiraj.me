'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stats = [
  { value: '6', label: 'Products live', icon: '🚀' },
  { value: '2.5K+', label: 'App downloads', icon: '📲' },
  { value: '4.8★', label: 'App Store rating', icon: '⭐' },
  { value: '3K+', label: 'X followers', icon: '🐦' },
  { value: '5', label: 'AI agents running', icon: '🤖' },
];

export default function StatsSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {stats.map((stat) => (
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
  );
}
