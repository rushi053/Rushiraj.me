'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-10% 0px',
    amount: 0.1
  });

  // Set initial and animate states based on direction
  const directionOffsets = {
    up: { initial: { opacity: 0.3, y: 20 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0.3, y: -20 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0.3, x: 20 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0.3, x: -20 }, animate: { opacity: 1, x: 0 } },
  };

  const { initial, animate } = directionOffsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 