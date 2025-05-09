'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  featured_image?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export default function TestDataFetchPage() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<IOSApp[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch iOS apps
        const { data: appsData, error: appsError } = await supabase
          .from('ios_apps')
          .select('*');
          
        if (appsError) {
          throw new Error(`Error fetching iOS apps: ${appsError.message}`);
        }
        
        setApps(appsData || []);
        
        // Fetch blog posts
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true);
          
        if (postsError) {
          throw new Error(`Error fetching blog posts: ${postsError.message}`);
        }
        
        setBlogPosts(postsData || []);
        
      } catch (err: Error | unknown) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Data Fetch Test</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-400 border-r-transparent"></div>
          <p className="mt-4">Loading data from Supabase...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* iOS Apps Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              iOS Apps ({apps.length})
            </h2>
            {apps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <div key={app.id} className="bg-white dark:bg-neutral-800 p-6">
                    <h3 className="text-lg font-medium mb-2">{app.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">{app.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.technologies.map((tech, index) => (
                        <span key={index} className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 text-sm rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-neutral-500">
                      Status: {app.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">No iOS apps found.</p>
            )}
          </section>

          {/* Blog Posts Section */}
          <section>
            <h2 className="text-2xl font-medium mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              Blog Posts ({blogPosts.length})
            </h2>
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-neutral-800 p-6">
                    <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 text-sm rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-neutral-500">
                      Published: {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">No blog posts found.</p>
            )}
          </section>
        </>
      )}
      
      <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <Link 
          href="/" 
          className="text-sm text-neutral-900 dark:text-white hover:opacity-70 inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
} 