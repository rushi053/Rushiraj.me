'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  value: string; // e.g. "500+", "4.8★", "3K+"
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const match = value.match(/^([\d.]+)/);
    if (!match) { setDisplay(value); return; }

    const target = parseFloat(match[1]);
    const suffix = value.slice(match[1].length);
    const isFloat = match[1].includes('.');
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay((isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{display}</span>;
}
