'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Types
type IOSApp = {
  id: string;
  title: string;
  description: string;
  status: 'Released' | 'In development' | 'Planning';
  features: string[];
  technologies: string[];
  image_url?: string;
  app_store_link?: string;
  expected_release?: string;
  is_featured: boolean;
  slug: string;
};

type SupabaseError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

export default function IOSAppsPage() {
  const [apps, setApps] = useState<IOSApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ios_apps')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setApps(data || []);
      } catch (err) {
        const error = err as SupabaseError;
        console.error('Error fetching apps:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  if (loading) {
    return (
      <div className="py-16 md:py-24">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-400 border-r-transparent"></div>
          <p className="mt-4">Loading apps...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 md:py-24">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">iOS Apps</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl leading-relaxed">
            As an iOS developer, I&apos;m passionate about creating intuitive, beautiful apps that solve real problems. 
            Here you&apos;ll find my current app projects, from those in development to those available on the App Store.
          </p>
        </motion.div>
        
        {apps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">No iOS apps found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {apps.map((app, index) => (
              <motion.div 
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6 md:p-8 gap-8"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-6 md:mb-0">
                  <div className="bg-sand-50 dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center" style={{ width: 200, height: 400 }}>
                    {app.image_url ? (
                      <Image
                        src={app.image_url}
                        alt={app.title}
                        width={200}
                        height={400}
                        className="object-cover"
                        style={{ maxWidth: 200, maxHeight: 400 }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-neutral-400">
                        App Screenshot
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 w-full md:w-auto">
                  <div className="mb-2 flex items-center gap-3">
                    <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-sm border border-neutral-200 dark:border-neutral-700 ${
                      app.status === 'Released' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      app.status === 'In development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">{app.title}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {app.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="text-xs uppercase tracking-wider mb-2 text-neutral-500 dark:text-neutral-400 font-semibold">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      {app.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-800 dark:text-neutral-200">
                          <span className="mr-2 text-lg text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xs uppercase tracking-wider mb-2 text-neutral-500 dark:text-neutral-400 font-semibold">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {app.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {app.status === 'Released' ? (
                    <a 
                      href={app.app_store_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-2"
                    >
                      View on App Store
                    </a>
                  ) : (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                      Expected release: {app.expected_release}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      
      <section className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">My iOS Development Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-cream-100 dark:bg-neutral-800 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-sm uppercase tracking-wider mb-4">User Experience First</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                I focus on creating intuitive interfaces that feel natural to use and bring joy to the user. Every interaction is thoughtfully designed.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cream-100 dark:bg-neutral-800 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-sm uppercase tracking-wider mb-4">Clean, Maintainable Code</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                I write modular, well-documented code that&apos;s easy to maintain and extend. This allows for faster iterations and better long-term stability.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cream-100 dark:bg-neutral-800 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-sm uppercase tracking-wider mb-4">Continuous Learning</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                I stay up-to-date with the latest iOS technologies and best practices, constantly exploring new ways to improve my apps and development process.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
        <div className="bg-cream-50 dark:bg-neutral-800 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Have an iOS app idea?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            I&apos;m always interested in new challenges and collaboration opportunities. If you have an app idea or need iOS development expertise, let&apos;s discuss how we can bring your vision to life.
          </p>
          <Link 
            href="/contact"
            className="btn btn-primary"
          >
            Let&apos;s Discuss Your Project
          </Link>
        </div>
      </section>
    </>
  );
} 