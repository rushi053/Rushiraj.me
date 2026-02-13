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

const setup = [
  { category: '💻 Apple Ecosystem', items: 'MacBook Pro 14" M3 Max (daily driver) · Mac Mini M2 (24/7 AI agent server) · iPad Pro 13" · iPad Mini · iPhone 15 Pro Max · Apple Watch Ultra · Vision Pro · AirPods Pro 2 · AirPods Max · Pro Display XDR' },
  { category: '🎮 Gaming & Fun', items: 'Xbox Series X · Steam Deck 512GB · Playdate · GoPro Hero Black 13 · Nike Adapt Auto Max' },
  { category: '🏠 Home & Audio', items: 'Sonos Arc Ultra · Sonos Era 300s · Raspberry Pi (Home Assistant) · Coldcard MK4 (Bitcoin)' },
  { category: '🛠️ Dev & Peripherals', items: 'Cursor · Xcode · Vercel · Supabase · Logitech MX Master 4 · Bambu Labs P1S (3D printer)' },
];

export default function SetupSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="section-label">Setup</p>
            <ScrollRevealText className="heading-display font-heading text-4xl md:text-5xl mb-4 lg:mb-0">What I use</ScrollRevealText>
            <p className="text-[var(--text-tertiary)] text-sm mt-3 hidden lg:block">Hardware, software, and the random stuff on my desk.</p>
          </div>
          <div className="lg:col-span-3">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-6"
            >
              {setup.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.35 }}
                  className="border-l-2 border-[var(--accent)] pl-5 py-2"
                >
                  <p className="text-[var(--text)] font-heading font-semibold text-sm mb-1">{s.category}</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{s.items}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
