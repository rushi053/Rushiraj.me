'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInSection({ 
  children, 
  delay = 0, 
  className = '' 
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ visibility: 'visible' }}
    >
      {children}
    </motion.div>
  );
} 