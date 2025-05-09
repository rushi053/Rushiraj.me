'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

type AppFormData = {
  title: string;
  description: string;
  status: 'Released' | 'In development' | 'Planning';
  features: string;
  technologies: string;
  appStoreLink?: string;
  expectedRelease?: string;
  imageFile?: FileList;
  iconFile?: FileList;
};

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
  icon_url?: string;
};

type SupabaseError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

export default function EditAppPage({ params }: { params: { id: string } }) {
  const [app, setApp] = useState<IOSApp | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AppFormData>();
  const currentStatus = watch('status');

  useEffect(() => {
    fetchApp();
  }, [params.id, fetchApp]);

  async function fetchApp() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ios_apps')
        .select('*')
        .eq('id', params.id)
        .single();
      if (error) throw error;
      if (data) {
        setApp(data);
        reset({
          title: data.title,
          description: data.description,
          status: data.status,
          features: data.features.join(', '),
          technologies: data.technologies.join(', '),
          appStoreLink: data.app_store_link || '',
          expectedRelease: data.expected_release || '',
        });
        if (data.image_url) setImagePreview(data.image_url);
        if (data.icon_url) setIconPreview(data.icon_url);
      }
    } catch (err) {
      const error = err as SupabaseError;
      setError(error.message || 'An error occurred while fetching the app');
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(app?.image_url || null);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setIconPreview(app?.icon_url || null);
    }
  };

  const onSubmit = async (data: AppFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const featuresArray = data.features.split(',').map(f => f.trim()).filter(Boolean);
      const technologiesArray = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      let image_url = app?.image_url || null;
      let icon_url = app?.icon_url || null;
      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        // Delete old image if exists
        if (app?.image_url) {
          const oldImagePath = app.image_url.split('/').pop();
          if (oldImagePath) {
            await supabase.storage.from('app_screenshots').remove([oldImagePath]);
          }
        }
        const { error: uploadError } = await supabase.storage
          .from('app_screenshots')
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('app_screenshots')
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }
      if (data.iconFile && data.iconFile.length > 0) {
        const file = data.iconFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-icon-${Date.now()}.${fileExt}`;
        // Delete old icon if exists
        if (app?.icon_url) {
          const oldIconPath = app.icon_url.split('/').pop();
          if (oldIconPath) {
            await supabase.storage.from('app-icons').remove([oldIconPath]);
          }
        }
        const { error: uploadError } = await supabase.storage
          .from('app-icons')
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: iconData } = supabase.storage
          .from('app-icons')
          .getPublicUrl(fileName);
        // Ensure the URL is properly formatted
        const publicUrl = new URL(iconData.publicUrl);
        icon_url = publicUrl.toString();
        // Log the URL for debugging
        console.log('Generated icon URL:', icon_url);
      }
      const updatedApp = {
        title: data.title,
        description: data.description,
        status: data.status,
        features: featuresArray,
        technologies: technologiesArray,
        app_store_link: data.status === 'Released' ? data.appStoreLink : null,
        expected_release: data.status !== 'Released' ? data.expectedRelease : null,
        image_url,
        icon_url,
        slug,
      };
      const { error: saveError } = await supabase
        .from('ios_apps')
        .update(updatedApp)
        .eq('id', params.id);
      if (saveError) throw saveError;
      router.push('/admin/apps');
    } catch (err) {
      const error = err as SupabaseError;
      setError(error.message || 'Failed to update app');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }
  if (!app) {
    return <div className="p-6">App not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Edit iOS App</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Update the app details below
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-neutral-800 p-6 shadow-sm">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="title">
                App Title *
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('title', { required: 'App title is required' })}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="status">
                Status *
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="Released">Released</option>
                <option value="In development">In Development</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
          </div>
        </div>
        {/* Features and Technologies */}
        <div>
          <h3 className="text-lg font-medium mb-4">Features & Technologies</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="features">
                Features *
              </label>
              <textarea
                id="features"
                rows={3}
                placeholder="Enter features separated by commas (e.g., Clean UI, Smart task prioritization, Habit tracking)"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('features', { required: 'Features are required' })}
              />
              {errors.features && <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="technologies">
                Technologies *
              </label>
              <textarea
                id="technologies"
                rows={2}
                placeholder="Enter technologies separated by commas (e.g., SwiftUI, CoreData, CloudKit)"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('technologies', { required: 'Technologies are required' })}
              />
              {errors.technologies && <p className="mt-1 text-sm text-red-600">{errors.technologies.message}</p>}
            </div>
          </div>
        </div>
        {/* App Status Details */}
        <div>
          <h3 className="text-lg font-medium mb-4">Status Details</h3>
          <div className="space-y-4">
            {currentStatus === 'Released' ? (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="appStoreLink">
                  App Store Link
                </label>
                <input
                  id="appStoreLink"
                  type="text"
                  placeholder="https://apps.apple.com/app/yourapp"
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                  {...register('appStoreLink')}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="expectedRelease">
                  Expected Release
                </label>
                <input
                  id="expectedRelease"
                  type="text"
                  placeholder="e.g., Q2 2023"
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                  {...register('expectedRelease')}
                />
              </div>
            )}
          </div>
        </div>
        {/* Image Upload */}
        <div>
          <h3 className="text-lg font-medium mb-4">App Screenshot</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="imageFile">
                Upload Screenshot
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('imageFile')}
                onChange={handleImageChange}
              />
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Recommended size: 1290x2796px (iPhone 14 Pro Max)
              </p>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Preview:</p>
                <div className="w-32 h-64 relative overflow-hidden border border-neutral-300 dark:border-neutral-700">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Icon Upload */}
        <div>
          <h3 className="text-lg font-medium mb-4">App Icon</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="iconFile">
                Upload App Icon
              </label>
              <input
                id="iconFile"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('iconFile')}
                onChange={handleIconChange}
              />
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Recommended size: 512x512px (PNG, square)
              </p>
            </div>
            {iconPreview && (
              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Preview:</p>
                <div className="w-20 h-20 relative overflow-hidden border border-neutral-300 dark:border-neutral-700 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Image
                    src={iconPreview}
                    alt="Icon Preview"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Error display */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3">
            {error}
          </div>
        )}
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => router.push('/admin/apps')}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 