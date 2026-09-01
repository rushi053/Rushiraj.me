'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPost, posts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import BlogAuditCTA from '@/components/BlogAuditCTA';
import NewsletterSignup from '@/components/NewsletterSignup';

function renderMarkdown(content: string) {
  // Simple markdown-ish renderer for our blog content
  const lines = content.trim().split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 my-6 ml-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--accent)] mt-1.5 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const inlineFormat = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text)] font-semibold">$1</strong>')
      // Single-asterisk italics; runs after bold so only lone asterisks remain
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover-line">$1</a>')
      .replace(/`(.*?)`/g, '<code class="text-sm bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text)]">$1</code>');
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      flushList();
      i++;
      continue;
    }

    // Tables
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      flushList();
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim());
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {headers.map((h, idx) => (
                  <th key={idx} className="text-left py-2 pr-4 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ridx) => (
                <tr key={ridx} className="border-b border-[var(--border)]/50">
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="py-2 pr-4 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: inlineFormat(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-heading font-bold text-[var(--text)] mt-12 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-lg font-heading font-semibold text-[var(--text)] mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // List items
    if (line.trimStart().startsWith('- ') || line.trimStart().match(/^\d+\./)) {
      const content = line.trimStart().replace(/^[-\d.]+\s*/, '');
      listItems.push(content);
      i++;
      continue;
    }

    // Paragraph
    flushList();
    let para = line;
    // Collect multi-line paragraph
    while (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('#') && !lines[i + 1].startsWith('- ') && !lines[i + 1].includes('|')) {
      i++;
      para += ' ' + lines[i];
    }
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="text-[var(--text-secondary)] leading-relaxed my-5"
        dangerouslySetInnerHTML={{ __html: inlineFormat(para.trim()) }}
      />
    );
    i++;
  }
  flushList();
  return elements;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-150px', right: '-100px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog" className="text-[var(--text-tertiary)] text-sm hover:text-[var(--accent)] transition-colors mb-6 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mt-6 mb-4 text-sm text-[var(--text-tertiary)]">
              <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
            <h1 className="heading-display font-heading text-4xl md:text-5xl lg:text-6xl mb-6 max-w-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-[var(--text-tertiary)] border border-[var(--border)] px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      <article className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl"
          >
            {renderMarkdown(post.content)}
          </motion.div>
        </div>
      </article>

      <div className="accent-line" />

      {/* Author */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <div className="card card-glow p-6 flex items-center gap-5">
              <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)]">👨‍💻</div>
              <div>
                <p className="font-heading font-bold text-[var(--text)]">Rushiraj Jadeja</p>
                <p className="text-[var(--text-secondary)] text-sm">Solo dev building privacy-first software from India.</p>
                <a href="https://x.com/rushirajjj" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] text-sm hover-line mt-1 inline-block">Follow @rushirajjj →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Newsletter + services funnel */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl space-y-6">
            <NewsletterSignup />
            <BlogAuditCTA />
          </div>
        </div>
      </section>

      <div className="accent-line" />

      {/* Prev/Next */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="card card-glow p-5 group hover:border-[var(--accent)]/30 transition-colors">
                <p className="text-[var(--text-tertiary)] text-xs mb-2">← Previous</p>
                <p className="text-sm font-heading font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">{prevPost.title}</p>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="card card-glow p-5 group hover:border-[var(--accent)]/30 transition-colors text-right">
                <p className="text-[var(--text-tertiary)] text-xs mb-2">Next →</p>
                <p className="text-sm font-heading font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">{nextPost.title}</p>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
