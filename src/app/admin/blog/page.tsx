'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Blog post type definition
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
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

  async function handleDelete(post: BlogPost) {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) {
        throw error;
      }

      // If post has a featured image, delete it from storage
      if (post.featured_image) {
        const imagePath = post.featured_image.split('/').pop();
        if (imagePath) {
          const { error: storageError } = await supabase.storage
            .from('blog_images')
            .remove([imagePath]);

          if (storageError) {
            console.error('Error deleting image:', storageError);
          }
        }
      }

      // Refresh the posts list
      fetchPosts();
    } catch (err) {
      const error = err as SupabaseError;
      setError(error.message || 'Failed to delete blog post');
    }
  }

  // Filter posts based on search query and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && post.published) ||
                         (statusFilter === 'draft' && !post.published);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blog Posts</h2>
        <Link href="/admin/blog/new" className="btn btn-primary">
          Write New Post
        </Link>
      </div>
      
      <div className="bg-white dark:bg-neutral-800 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-neutral-100 dark:bg-neutral-800 animate-pulse h-24"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {filteredPosts.length > 0 ? (
            <div className="bg-white dark:bg-neutral-800 shadow-sm">
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredPosts.map((post) => (
                  <li key={post.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <span className={`text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full ${
                        post.published 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-1">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Updated {new Date(post.updated_at).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-sm text-neutral-900 dark:text-white hover:opacity-70"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post)}
                          className="text-sm text-red-600 dark:text-red-400 hover:opacity-70"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-800 p-8 text-center">
              <p className="text-neutral-500 dark:text-neutral-400">
                {searchQuery || statusFilter !== 'all' ? 
                  'No posts match your filters. Try adjusting your search.' : 
                  'No blog posts found. Create your first post by clicking "Write New Post".'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 