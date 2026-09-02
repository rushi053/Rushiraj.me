'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallax = useTransform(heroProgress, [0, 1], [0, -80]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="gradient-orb gradient-orb-1" style={{ y: orbY, x: orbX }} />
      <motion.div
        className="gradient-orb gradient-orb-2"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      />
      <div className="dot-grid" />

      <motion.div className="container relative z-10" style={{ y: heroParallax }}>
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/20 mb-10">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 bg-green-500 rounded-full" />
                <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
              </span>
              <span className="text-[var(--text-secondary)] text-xs font-medium tracking-wide">Taking $500 audits</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display font-heading text-5xl md:text-7xl lg:text-[5.5rem] mb-8"
          >
            Solo dev.<br />
            6 products.<br />
            <span className="text-[var(--text-tertiary)]">0 VC money.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[var(--text-secondary)] text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            I ship software that doesn&apos;t spy on you. Then I{' '}
            <Link href="/services" className="text-[var(--text)] underline underline-offset-4 decoration-[var(--accent)]/50 hover:decoration-[var(--accent)]">
              audit the AI-built ones
            </Link>{' '}
            for the stuff that looks finished and isn&apos;t.
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
        </div>
      </motion.div>
    </section>
  );
}
