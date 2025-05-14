'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', params.slug)
          .eq('published', true)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('Post not found');
        }

        setPost(data);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="py-12 md:py-20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-400 border-r-transparent"></div>
          <p className="mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-12 md:py-20">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error || 'Post not found'}</p>
          <div className="mt-4">
            <Link href="/blog" className="text-red-600 dark:text-red-400 hover:opacity-70">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="py-12 md:py-20">
      {/* Header */}
      <header className="mb-12">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:opacity-70 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-neutral-600 dark:text-neutral-400 mb-8">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.updated_at !== post.created_at && (
              <span className="text-sm">
                (Updated {new Date(post.updated_at).toLocaleDateString()})
              </span>
            )}
          </div>

          {post.featured_image && (
            <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto prose dark:prose-invert prose-lg">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link 
              href="/blog"
              className="text-neutral-600 dark:text-neutral-400 hover:opacity-70"
            >
              ← Back to Blog
            </Link>
            
            <div className="flex gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-neutral-600 dark:text-neutral-400 hover:opacity-70"
              >
                ↑ Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
} 