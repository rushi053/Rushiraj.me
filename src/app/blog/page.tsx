'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollRevealText from '@/components/ScrollRevealText';
import { posts } from '@/lib/blog-posts';

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-150px', right: '-100px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label">Blog</p>
            <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
              Thoughts &<br />
              <span className="text-[var(--text-tertiary)]">hot takes.</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg">
              On privacy, building products solo, AI agents, and whatever else is on my mind.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      <section className="section">
        <div className="container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6 max-w-3xl"
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={fadeUp} transition={{ duration: 0.4 }}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="card card-glow p-6 md:p-8 group cursor-pointer hover:border-[var(--accent)]/30 transition-colors">
                    <div className="flex items-start gap-5">
                      <div className="text-3xl w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)] shrink-0">
                        {post.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 text-xs text-[var(--text-tertiary)]">
                          <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                          <span>·</span>
                          <span>{post.readTime} read</span>
                        </div>
                        <h2 className="text-xl font-heading font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs text-[var(--text-tertiary)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-3xl"
          >
            <p className="text-[var(--text-tertiary)] text-sm mb-2">More posts coming soon.</p>
            <p className="text-[var(--text-secondary)] text-sm">
              Follow <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover-line">@rushirajjj on X</a> for real-time updates.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
