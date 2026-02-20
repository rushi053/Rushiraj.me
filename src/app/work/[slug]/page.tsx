'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  app_store_link?: string;
}

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data } = await supabase
        .from('ios_apps')
        .select('*')
        .eq('slug', params.slug)
        .single();
      if (data) setProject(data);
      setLoading(false);
    }
    if (params.slug) fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl mb-4">Not found</h1>
        <Link href="/work" className="btn btn-outline">Back to Work</Link>
      </div>
    );
  }

  return (
    <div className="grid-bg min-h-screen">
      <section className="container pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/work" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </Link>
          
          <h1 className="font-serif text-5xl md:text-7xl mb-6">{project.title}</h1>
          <p className="text-white/60 text-xl max-w-2xl mb-8">{project.description}</p>
          
          {project.technologies && (
            <div className="flex flex-wrap gap-3 mb-8">
              {(project.technologies as string[]).map((tech, i) => (
                <span key={i} className="text-sm text-white/40 px-4 py-2 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          {project.app_store_link && (
            <a href={project.app_store_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
          )}
        </motion.div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container text-center">
          <h2 className="font-serif text-3xl mb-6">Interested?</h2>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>
    </div>
  );
}
