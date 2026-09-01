'use client';

import { useState } from 'react';

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, xf_review_notes: honeypot }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('success');
      setEmail('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
      setStatus('error');
    }
  };

  const form = status === 'success' ? (
    <p className="text-sm text-[var(--text)] font-medium flex items-center gap-2">
      <span className="text-[var(--accent)]">✓</span>
      You&apos;re in. New posts land in your inbox.
    </p>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/*
        Honeypot: off-screen, aria-hidden, unfocusable, autocomplete off,
        and named so browser autofill heuristics never fill it.
      */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor={`xf_review_notes_${compact ? 'c' : 'f'}`}>Leave this field empty</label>
        <input
          type="text"
          id={`xf_review_notes_${compact ? 'c' : 'f'}`}
          name="xf_review_notes"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <input
        type="email"
        required
        placeholder="your@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none transition-all duration-200"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary text-sm whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );

  if (compact) {
    return (
      <div className="max-w-md">
        <p className="text-sm font-heading font-semibold text-[var(--text)] mb-1">Newsletter</p>
        <p className="text-[var(--text-tertiary)] text-xs mb-3">
          Teardowns &amp; build-in-public, weekly-ish. No spam.
        </p>
        {form}
        {status === 'error' && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className="card card-glow p-6 md:p-8">
      <p className="section-label mb-3">Newsletter</p>
      <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-2">
        Get the next teardown in your inbox
      </h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 max-w-lg">
        Teardowns &amp; build-in-public, weekly-ish. No spam.
      </p>
      {form}
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
      )}
    </div>
  );
}
