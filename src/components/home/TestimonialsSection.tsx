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

const testimonials = [
  {
    quote: "I have never really gotten into budgeting and tracking what I spend, but the design and cleanliness of this app finally inspired me to try. The biggest plus is that all of this is local and there's no ads/no IAP to 'unlock' various features.",
    author: 'Bluestar2016',
    stars: '⭐⭐⭐⭐⭐',
  },
  {
    quote: "Saw the dev's reddit post and installed it. What an app! Very easy and does the job well. No ads, very convenient.",
    author: 'kundithan.',
    stars: '⭐⭐⭐⭐⭐',
  },
  {
    quote: "The simple UI makes it very easy to track all expenses and the quick updates to the app make me sure that some great features would be coming soon!",
    author: 'G_Aryan',
    stars: '⭐⭐⭐⭐⭐',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="section-label">What people say</p>
          <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl">Real reviews from the App Store</ScrollRevealText>
          <p className="text-[var(--text-tertiary)] text-sm mt-3">Don&apos;t take my word for it — <a href="https://apps.apple.com/us/app/cashlens-personal-finance/id6743153951" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line">verify these on the App Store yourself</a>.</p>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="card card-glow p-6 flex flex-col"
            >
              <div className="text-sm mb-3">{t.stars}</div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-[var(--text-tertiary)] text-xs">— {t.author} on App Store</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
