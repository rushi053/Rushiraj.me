'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  technologies?: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('ios_apps')
        .select('id, title, description, slug, technologies')
        .eq('is_featured', true)
        .order('updated_at', { ascending: false })
        .limit(3);
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="grid-bg">
      {/* Hero */}
      <section className="container min-h-[85vh] flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          Developer & Creator
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
        >
          Crafting digital
          <br />
          <span className="text-white/40">experiences</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-xl mb-10"
        >
          I&apos;m Rushiraj, a frontend developer and iOS engineer based in India. 
          I build thoughtful products that respect users.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/work" className="btn btn-primary">
            View Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Get in Touch
          </Link>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* Work */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Featured</p>
              <h2 className="font-serif text-4xl md:text-5xl">Selected Work</h2>
            </div>
            <Link href="/work" className="text-white/50 hover:text-white text-sm hover-line hidden md:block">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse h-48" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/work/${project.slug}`}>
                    <div className="card group h-full">
                      <span className="text-white/20 text-sm font-mono mb-4 block">0{i + 1}</span>
                      <h3 className="text-xl font-serif mb-3 group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-white/50">Projects coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* About */}
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-3">About</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">A bit about me</h2>
            <p className="text-white/60 mb-6">
              I believe in creating software that respects users—their time, 
              privacy, and intelligence. Every project is an opportunity to 
              solve real problems elegantly.
            </p>
            <Link href="/about" className="btn btn-outline">Learn more</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5+', label: 'Years' },
              { value: '2', label: 'Apps' },
              { value: '∞', label: 'Code' },
              { value: '100%', label: 'Passion' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center py-8">
                <div className="text-3xl font-serif mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-8">
            Have a project?
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-10">
            I&apos;m always interested in new opportunities. Let&apos;s create something great.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start a conversation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl mb-1">Rushiraj</p>
            <p className="text-white/40 text-sm">Developer & Creator</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/rushi053" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm">GitHub</a>
            <a href="https://twitter.com/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm">Twitter</a>
            <a href="https://linkedin.com/in/rushirajjadeja" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm">LinkedIn</a>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t border-white/5 text-center text-white/30 text-sm">
          © {new Date().getFullYear()} Rushiraj
        </div>
      </footer>
    </div>
  );
}
