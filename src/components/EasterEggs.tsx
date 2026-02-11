'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEggs() {
  const [konamiTriggered, setKonamiTriggered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const bufferRef = useRef<string[]>([]);

  // Konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      bufferRef.current.push(e.key);
      if (bufferRef.current.length > KONAMI.length) {
        bufferRef.current.shift();
      }
      if (JSON.stringify(bufferRef.current) === JSON.stringify(KONAMI)) {
        setKonamiTriggered(true);
        setShowMessage(true);
        bufferRef.current = [];
        setTimeout(() => setShowMessage(false), 4000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Tab title change when leaving
  useEffect(() => {
    const originalTitle = document.title;
    const titles = [
      'Come back! 👀',
      'Miss you already...',
      '(⊙_⊙)？',
      'Hey, the code is here →',
    ];
    let timeout: ReturnType<typeof setTimeout>;

    const handleVisibility = () => {
      if (document.hidden) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        document.title = randomTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Konami code confetti / message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-2xl bg-[var(--card)] border border-[var(--accent)] shadow-2xl text-center"
          >
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-[var(--text)] font-heading font-bold text-lg">You found it!</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              A fellow gamer, I see. Respect. 🫡
            </p>
            <p className="text-[var(--text-tertiary)] text-xs mt-2">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating emoji rain when Konami triggered */}
      <AnimatePresence>
        {konamiTriggered && showMessage && (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: -50,
                }}
                animate={{
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  rotate: Math.random() * 720 - 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeIn',
                }}
                className="fixed z-[9998] text-2xl pointer-events-none"
              >
                {['🎮', '🕹️', '👾', '🏆', '⭐', '🚀', '💎', '🎯'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
