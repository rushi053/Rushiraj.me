'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { id: 'home', label: 'Home', shortcut: 'H', href: '/', icon: '🏠' },
  { id: 'products', label: 'Products', shortcut: 'P', href: '/products', icon: '📦' },
  { id: 'about', label: 'About', shortcut: 'A', href: '/about', icon: '👤' },
  { id: 'contact', label: 'Contact', shortcut: 'C', href: '/contact', icon: '✉️' },
  { id: 'blog', label: 'Blog', shortcut: 'B', href: '/blog', icon: '📝' },
  { id: 'divider-1', label: '', shortcut: '', href: '', icon: '' },
  { id: 'cashlens', label: 'CashLens', shortcut: '', href: 'https://cashlens.app', icon: '💰', external: true },
  { id: 'privacypage', label: 'PrivacyPage', shortcut: '', href: 'https://privacy.rushiraj.me', icon: '📜', external: true },
  { id: 'invoicezen', label: 'InvoiceZen', shortcut: '', href: 'https://invoice.rushiraj.me', icon: '🧾', external: true },
  { id: 'cloudo', label: 'Cloudo', shortcut: '', href: 'https://apps.apple.com/us/app/cloudo/id6742880068', icon: '☁️', external: true },
  { id: 'divider-2', label: '', shortcut: '', href: '', icon: '' },
  { id: 'x', label: 'Follow on X', shortcut: '', href: 'https://x.com/rushirajjj', icon: '𝕏', external: true },
  { id: 'github', label: 'GitHub', shortcut: '', href: 'https://github.com/rushi053', icon: '⌨️', external: true },
  { id: 'linkedin', label: 'LinkedIn', shortcut: '', href: 'https://linkedin.com/in/rushirajjadeja', icon: '💼', external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = commands.filter(
    (cmd) => cmd.label && cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigable = filtered.filter((cmd) => !cmd.id.startsWith('divider'));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const execute = useCallback(
    (cmd: (typeof commands)[0]) => {
      setOpen(false);
      if (cmd.external) {
        window.open(cmd.href, '_blank');
      } else {
        router.push(cmd.href);
      }
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (s + 1) % navigable.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (s - 1 + navigable.length) % navigable.length);
    } else if (e.key === 'Enter' && navigable[selected]) {
      execute(navigable[selected]);
    }
  };

  let navIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-[10000] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <svg
                className="w-5 h-5 text-[var(--text-tertiary)] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none text-sm"
              />
              <kbd className="hidden sm:inline-flex text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                ESC
              </kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-[var(--text-tertiary)] text-sm">
                  No results found.
                </div>
              )}
              {filtered.map((cmd) => {
                if (cmd.id.startsWith('divider')) {
                  return (
                    <div
                      key={cmd.id}
                      className="h-px bg-[var(--border)] my-2 mx-4"
                    />
                  );
                }
                navIdx++;
                const isSelected = navIdx === selected;
                const currentNavIdx = navIdx;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(currentNavIdx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span className="text-base w-6 text-center">{cmd.icon}</span>
                    <span className="flex-1 text-left font-medium">{cmd.label}</span>
                    {cmd.external && (
                      <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    )}
                    {cmd.shortcut && (
                      <kbd className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center gap-4 text-[10px] text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1"><kbd className="bg-[var(--bg-secondary)] px-1 py-0.5 rounded border border-[var(--border)]">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-[var(--bg-secondary)] px-1 py-0.5 rounded border border-[var(--border)]">↵</kbd> open</span>
              <span className="flex items-center gap-1"><kbd className="bg-[var(--bg-secondary)] px-1 py-0.5 rounded border border-[var(--border)]">esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
