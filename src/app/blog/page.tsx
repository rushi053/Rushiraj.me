'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Types
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

type SupabaseError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          const error = error as SupabaseError;
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        const error = err as SupabaseError;
        setError(error.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 md:py-20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-400 border-r-transparent"></div>
          <p className="mt-4">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 md:py-20">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl">
          Thoughts, ideas, and insights on web development, iOS engineering, and everything in between.
        </p>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm">
                {post.featured_image && (
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:opacity-70">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-sm text-neutral-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Want to stay updated with my latest posts? Follow me on social media or subscribe to my newsletter.
          </p>
          <Link 
            href="/contact"
            className="btn btn-primary"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
      
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-8">Topics I Write About</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Web Development</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              React, Next.js, CSS, JavaScript, and modern web technologies.
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">iOS Development</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Swift, SwiftUI, UIKit, and iOS app design patterns.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">UI/UX Design</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Design principles, user experience, and accessibility.
            </p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Career & Productivity</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Developer tools, workflows, and professional growth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 