'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { SupabaseError } from '@/types/supabase';

type DashboardStats = {
  totalApps: number;
  totalBlogPosts: number;
  recentlyUpdated: Array<{
    id: string;
    title: string;
    updated_at: string;
    type: 'app' | 'blog';
  }>;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApps: 0,
    totalBlogPosts: 0,
    recentlyUpdated: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        // Fetch total iOS apps
        const { count: appCount, error: appCountError } = await supabase
          .from('ios_apps')
          .select('id', { count: 'exact', head: true });
        if (appCountError) throw appCountError;

        // Fetch total blog posts
        const { count: blogCount, error: blogCountError } = await supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true });
        if (blogCountError) throw blogCountError;

        // Fetch 3 most recently updated apps
        const { data: recentApps, error: recentAppsError } = await supabase
          .from('ios_apps')
          .select('id, title, updated_at')
          .order('updated_at', { ascending: false })
          .limit(3);
        if (recentAppsError) throw recentAppsError;

        // Fetch 3 most recently updated blog posts
        const { data: recentBlogs, error: recentBlogsError } = await supabase
          .from('blog_posts')
          .select('id, title, updated_at')
          .order('updated_at', { ascending: false })
          .limit(3);
        if (recentBlogsError) throw recentBlogsError;

        // Merge and sort by updated_at, take top 3
        const merged = [
          ...recentApps.map((item) => ({ ...item, type: 'app' as const })),
          ...recentBlogs.map((item) => ({ ...item, type: 'blog' as const })),
        ];
        merged.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        const recentlyUpdated = merged.slice(0, 3);

        setStats({
          totalApps: appCount || 0,
          totalBlogPosts: blogCount || 0,
          recentlyUpdated,
        });
      } catch (err) {
        const error = err as SupabaseError;
        setError(error.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-100 dark:bg-neutral-800 animate-pulse h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">Total iOS Apps</h3>
              <p className="text-3xl font-semibold">{stats.totalApps}</p>
              <Link href="/admin/apps" className="mt-4 text-sm text-neutral-900 dark:text-white flex items-center hover:opacity-70">
                Manage Apps
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-neutral-800 p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">Total Blog Posts</h3>
              <p className="text-3xl font-semibold">{stats.totalBlogPosts}</p>
              <Link href="/admin/blog" className="mt-4 text-sm text-neutral-900 dark:text-white flex items-center hover:opacity-70">
                Manage Blog
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-neutral-800 p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">Quick Links</h3>
              <div className="space-y-2 mt-2">
                <Link href="/admin/apps/new" className="text-sm text-neutral-900 dark:text-white flex items-center hover:opacity-70">
                  Add New App
                </Link>
                <Link href="/admin/blog/new" className="text-sm text-neutral-900 dark:text-white flex items-center hover:opacity-70">
                  Write New Blog Post
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recently Updated</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-100 dark:bg-neutral-800 animate-pulse h-16"></div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 shadow-sm">
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {stats.recentlyUpdated.map((item) => (
                <li key={item.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Updated {new Date(item.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={item.type === 'app' ? `/admin/apps/${item.id}` : `/admin/blog/${item.id}`}
                    className="text-sm text-neutral-900 dark:text-white hover:opacity-70"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 