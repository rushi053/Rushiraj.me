'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const socials = [
  { name: '𝕏 @rushirajjj', url: 'https://x.com/rushirajjj', icon: '𝕏' },
  { name: 'GitHub', url: 'https://github.com/rushi053', icon: '⌨️' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/rushirajjadeja', icon: '💼' },
];

const funFacts = [
  '📍 Ahmedabad, India',
  '🕐 IST (UTC+5:30)',
  '☕ Best reached after chai',
  '💬 DMs open on X',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
      
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden">
        <div className="gradient-orb gradient-orb-1" style={{ top: '-150px', right: '-100px' }} />
        <div className="dot-grid" />
        <div className="container relative z-10 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label">Contact</p>
            <h1 className="heading-display font-heading text-5xl md:text-7xl mb-6">
              Get in touch<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-lg">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="accent-line" />

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="card card-glow text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                      className="text-6xl mb-6"
                    >
                      ✅
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="heading-display font-heading text-3xl mb-4"
                    >
                      Message sent!
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[var(--text-secondary)] mb-8"
                    >
                      I&apos;ll get back to you as soon as possible. Usually within 24 hours.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => setStatus('idle')}
                      className="btn btn-outline"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {[
                      { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                      { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    ].map((field) => (
                      <div key={field.id} className="relative">
                        <label
                          htmlFor={field.id}
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            focused === field.id || formData[field.id as keyof typeof formData]
                              ? 'top-2 text-xs text-[var(--accent)] font-medium'
                              : 'top-4 text-sm text-[var(--text-tertiary)]'
                          }`}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          required
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 pt-6 pb-3 text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    ))}

                    <div className="relative">
                      <label
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focused === 'message' || formData.message
                            ? 'top-2 text-xs text-[var(--accent)] font-medium'
                            : 'top-4 text-sm text-[var(--text-tertiary)]'
                        }`}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 pt-6 pb-3 text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>
                    
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                    
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn btn-primary w-full justify-center group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'loading' ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="inline-block"
                        >
                          ⏳
                        </motion.span>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                {/* Social links */}
                <div>
                  <p className="section-label mb-4">Connect</p>
                  <div className="space-y-3">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card card-glow py-4 px-5 flex items-center gap-4 group"
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors font-medium">{s.name}</span>
                        <svg className="w-4 h-4 ml-auto text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Fun facts */}
                <div>
                  <p className="section-label mb-4">Quick info</p>
                  <div className="card card-glow p-5 space-y-3">
                    {funFacts.map((fact) => (
                      <div key={fact} className="text-[var(--text-secondary)] text-sm">{fact}</div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="card card-glow p-5 border-l-2 border-l-[var(--accent)]">
                  <p className="text-[var(--text-secondary)] text-sm italic leading-relaxed">
                    &ldquo;The best way to predict the future is to build it.&rdquo;
                  </p>
                  <p className="text-[var(--text-tertiary)] text-xs mt-2">— Alan Kay</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
