'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollRevealText from '@/components/ScrollRevealText';

const posts = [
  {
    slug: 'why-your-expense-tracker-is-spying-on-you',
    title: 'Why Your Expense Tracker Is Spying on You',
    excerpt: 'Most finance apps collect more data than they need. I built CashLens to prove you can track expenses without sacrificing privacy. Here\'s what the industry doesn\'t want you to know.',
    date: '2026-02-10',
    readTime: '6 min',
    tags: ['Privacy', 'CashLens', 'iOS'],
    emoji: '🕵️',
  },
  {
    slug: 'running-5-ai-agents-on-a-mac',
    title: 'I Run 5 AI Agents 24/7 on a Mac Mini. Here\'s How.',
    excerpt: 'My Mac Mini runs a team of AI agents that handle marketing, monitoring, code review, and customer support. No cloud servers, no $500/mo bills. Just a $599 computer and clever orchestration.',
    date: '2026-02-05',
    readTime: '8 min',
    tags: ['AI', 'Automation', 'Indie Dev'],
    emoji: '🤖',
  },
  {
    slug: 'solo-dev-4-products-zero-vc',
    title: 'Solo Dev, 4 Products, Zero VC: My Playbook',
    excerpt: 'I left a US tech job, moved back to India, and launched 4 products in under a year. No co-founders, no funding, no Jira. Here\'s exactly how I did it and what I\'d do differently.',
    date: '2026-01-28',
    readTime: '10 min',
    tags: ['Indie Dev', 'Building in Public', 'Strategy'],
    emoji: '🚀',
  },
  {
    slug: 'privacy-first-is-not-a-feature',
    title: 'Privacy-First Is Not a Feature. It\'s a Business Model.',
    excerpt: 'When your competitors monetize user data, choosing privacy isn\'t a constraint — it\'s a moat. Why I think the next wave of successful apps will be the ones that collect nothing.',
    date: '2026-01-20',
    readTime: '5 min',
    tags: ['Privacy', 'Business', 'Opinion'],
    emoji: '🔒',
  },
  {
    slug: 'from-california-to-ahmedabad',
    title: 'From California to Ahmedabad: Why I Moved Back',
    excerpt: 'MS in Computer Science from Cal State Fullerton, worked in Texas, had the American dream on paper. Then I came home. Not because I had to — because I wanted to build something mine.',
    date: '2026-01-15',
    readTime: '7 min',
    tags: ['Personal', 'Life', 'Career'],
    emoji: '✈️',
  },
  {
    slug: 'the-tools-that-actually-matter',
    title: 'The Tools That Actually Matter (And the Ones That Don\'t)',
    excerpt: 'After shipping 4 products, here\'s my honest take on dev tools. Spoiler: the best tool is the one you stop thinking about. Cursor, Vercel, Supabase, and the stuff I regret buying.',
    date: '2026-01-10',
    readTime: '6 min',
    tags: ['Dev Tools', 'Productivity', 'Honest Review'],
    emoji: '🛠️',
  },
];

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
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="card card-glow p-6 md:p-8 group cursor-pointer hover:border-[var(--accent)]/30 transition-colors"
              >
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
              </motion.article>
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
