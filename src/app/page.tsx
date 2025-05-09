'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Add type for iOS app
interface IOSApp {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  icon_url?: string;
  slug: string;
}

export default function Home() {
  const [featuredApps, setFeaturedApps] = useState<IOSApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedApps() {
      setLoading(true);
      const { data, error } = await supabase
        .from('ios_apps')
        .select('id, title, description, image_url, icon_url, slug')
        .eq('is_featured', true)
        .order('updated_at', { ascending: false })
        .limit(3);
      if (!error && data) {
        setFeaturedApps(data);
      }
      setLoading(false);
    }
    fetchFeaturedApps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome</h1>
          <p className="text-xl text-gray-600 mb-12">
            I&apos;m passionate about creating elegant solutions to complex problems.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-100 dark:bg-neutral-800 animate-pulse h-64 rounded-lg"></div>
            ))}
          </div>
        ) : featuredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredApps.map((app) => (
              <div key={app.id} className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{app.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{app.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-600 dark:text-neutral-400">
            No featured apps available.
          </div>
        )}
      </div>
    </div>
  );
}
