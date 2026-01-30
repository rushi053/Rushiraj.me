'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    <div className="grid-bg min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Get in touch</h1>
          <p className="text-white/60 text-lg max-w-lg">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="card text-center py-12">
                <h2 className="font-serif text-2xl mb-4">Thank you!</h2>
                <p className="text-white/60 mb-6">I&apos;ll get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/60 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-white/60 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full justify-center"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-white/40 text-sm mb-4">Or reach me directly</p>
            <a href="mailto:hello@rushiraj.me" className="text-xl font-serif hover:text-white/70 transition-colors">
              hello@rushiraj.me
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
