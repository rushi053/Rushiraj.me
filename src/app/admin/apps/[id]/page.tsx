'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { SupabaseError } from '@/types/supabase';

interface PageProps {
  params: {
    id: string;
  };
}

interface IOSApp {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  icon_url?: string;
  slug: string;
  is_featured: boolean;
}

export default function EditAppPage({ params }: PageProps) {
  const router = useRouter();
  const [app, setApp] = useState<IOSApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    is_featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchApp() {
      try {
        const { data, error } = await supabase
          .from('ios_apps')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        if (data) {
          setApp(data);
          setFormData({
            title: data.title,
            description: data.description,
            slug: data.slug,
            is_featured: data.is_featured,
          });
        }
      } catch (err) {
        const error = err as SupabaseError;
        setError(error.message || 'Failed to fetch app');
      } finally {
        setLoading(false);
      }
    }

    fetchApp();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = app?.image_url;
      let iconUrl = app?.icon_url;

      // Upload new image if selected
      if (imageFile) {
        const imagePath = `app-${params.id}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('app_screenshots')
          .upload(imagePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('app_screenshots')
          .getPublicUrl(imagePath);

        imageUrl = publicUrl;
      }

      // Upload new icon if selected
      if (iconFile) {
        const iconPath = `app-icon-${params.id}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('app_icons')
          .upload(iconPath, iconFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('app_icons')
          .getPublicUrl(iconPath);

        iconUrl = publicUrl;
      }

      // Update app data
      const { error: updateError } = await supabase
        .from('ios_apps')
        .update({
          title: formData.title,
          description: formData.description,
          slug: formData.slug,
          is_featured: formData.is_featured,
          image_url: imageUrl,
          icon_url: iconUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      router.push('/admin/apps');
    } catch (err) {
      const error = err as SupabaseError;
      setError(error.message || 'Failed to update app');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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

  if (!app) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Not Found</h2>
          <p>The app you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Edit iOS App</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Screenshot
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
          {app.image_url && (
            <div className="mt-2">
              <img
                src={app.image_url}
                alt="Current screenshot"
                className="h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            App Icon
          </label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            onChange={(e) => setIconFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
          {app.icon_url && (
            <div className="mt-2">
              <img
                src={app.icon_url}
                alt="Current icon"
                className="h-16 w-16 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_featured"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 dark:border-neutral-700 rounded"
          />
          <label
            htmlFor="is_featured"
            className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"
          >
            Feature this app on the homepage
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/apps')}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 