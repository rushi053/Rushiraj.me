'use client';

import ScrollRevealText from '@/components/ScrollRevealText';

const techs = [
  'Swift', 'SwiftUI', 'React', 'Next.js', 'TypeScript',
  'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase',
  'Vercel', 'Python', 'Git', 'Cursor', 'framer-motion', 'OpenClaw'
];

export default function TechStackSection() {
  return (
    <section className="section overflow-hidden">
      <div className="container text-center mb-10">
        <p className="section-label">Stack</p>
        <ScrollRevealText className="heading-display font-heading text-3xl md:text-4xl">Tools I use daily</ScrollRevealText>
      </div>
      <div className="relative overflow-hidden py-4">
        <div className="marquee-track">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-4 px-2">
              {techs.map((tech) => (
                <span key={`${setIdx}-${tech}`} className="text-sm text-[var(--text-secondary)] px-5 py-2.5 rounded-full border border-[var(--border)] whitespace-nowrap hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
