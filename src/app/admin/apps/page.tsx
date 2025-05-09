'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// App type definition
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
  created_at: string;
  updated_at: string;
  slug: string;
  is_featured: boolean;
};

export default function AppsPage() {
  const [apps, setApps] = useState<IOSApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ios_apps')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      setApps(data || []);
    } catch (err: any) {
      console.error('Error fetching apps:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(app: IOSApp) {
    if (!confirm(`Are you sure you want to delete "${app.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('ios_apps')
        .delete()
        .eq('id', app.id);

      if (error) {
        throw error;
      }

      // If app has an image, delete it from storage
      if (app.image_url) {
        const imagePath = app.image_url.split('/').pop();
        if (imagePath) {
          const { error: storageError } = await supabase.storage
            .from('app_screenshots')
            .remove([imagePath]);

          if (storageError) {
            console.error('Error deleting image:', storageError);
          }
        }
      }

      // Refresh the apps list
      fetchApps();
    } catch (err: any) {
      console.error('Error deleting app:', err);
      alert('Failed to delete app: ' + err.message);
    }
  }

  // Filter apps based on search query and status
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-primary-off-white dark:bg-primary-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary-black dark:text-primary-off-white">iOS Apps</h2>
        <Link href="/admin/apps/new" className="btn btn-primary">
          Add New App
        </Link>
      </div>
      
      <div className="bg-primary-westar dark:bg-primary-dark-grey p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-primary-sand dark:border-primary-westar bg-primary-off-white dark:bg-primary-black text-primary-black dark:text-primary-off-white"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-primary-sand dark:border-primary-westar bg-primary-off-white dark:bg-primary-black text-primary-black dark:text-primary-off-white"
          >
            <option value="all">All Statuses</option>
            <option value="released">Released</option>
            <option value="in development">In Development</option>
            <option value="planning">Planning</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-primary-sand dark:bg-primary-dark-grey animate-pulse h-24"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {filteredApps.length > 0 ? (
            <div className="bg-primary-westar dark:bg-primary-dark-grey shadow-sm">
              <ul className="divide-y divide-primary-sand dark:divide-primary-westar">
                {filteredApps.map((app) => (
                  <li key={app.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-primary-black dark:text-primary-off-white">{app.title}</h3>
                      <span className={`text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full ${
                        app.status === 'Released' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        app.status === 'In development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-primary-dark-grey dark:text-primary-westar text-sm mb-3 line-clamp-1">
                      {app.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-primary-dark-grey dark:text-primary-sand">
                        Updated {new Date(app.updated_at).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/apps/${app.id}`}
                          className="text-sm text-primary-black dark:text-primary-off-white hover:opacity-70"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(app)}
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
            <div className="bg-primary-westar dark:bg-primary-dark-grey p-8 text-center">
              <p className="text-primary-dark-grey dark:text-primary-westar">
                {searchQuery || statusFilter !== 'all' ? 
                  'No apps match your filters. Try adjusting your search.' : 
                  'No apps found. Create your first iOS app by clicking "Add New App".'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 