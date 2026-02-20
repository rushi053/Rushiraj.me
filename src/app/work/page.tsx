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
  is_featured: boolean;
}

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('ios_apps')
        .select('*')
        .order('updated_at', { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="grid-bg min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Work</h1>
          <p className="text-white/60 text-lg max-w-lg">
            A collection of projects I&apos;ve built with care and attention to detail.
          </p>
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card animate-pulse h-56" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/work/${project.slug}`}>
                    <div className="card group h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-white/20 text-sm font-mono">0{i + 1}</span>
                        {project.is_featured && (
                          <span className="text-xs text-white/40 px-2 py-1 border border-white/20">Featured</span>
                        )}
                      </div>
                      <h2 className="text-2xl font-serif mb-3 group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-white/50 mb-6">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies as string[]).slice(0, 4).map((tech, j) => (
                            <span key={j} className="text-xs text-white/30 px-2 py-1 border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <p className="text-white/50 mb-6">No projects yet.</p>
              <Link href="/contact" className="btn btn-outline">Get in touch</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
