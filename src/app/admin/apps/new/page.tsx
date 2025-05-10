'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';

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

export default function NewAppPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const router = useRouter();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AppFormData>();
  const currentStatus = watch('status');
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
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
      setIconPreview(null);
    }
  };
  
  const onSubmit = async (data: AppFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Process features and technologies arrays
      const featuresArray = data.features.split(',').map(feature => feature.trim()).filter(Boolean);
      const technologiesArray = data.technologies.split(',').map(tech => tech.trim()).filter(Boolean);
      
      // Generate a slug from the title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Handle image upload if present
      let image_url = null;
      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('app_screenshots')
          .upload(fileName, file);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('app_screenshots')
          .getPublicUrl(fileName);
          
        // Ensure the URL is properly formatted
        const publicUrl = new URL(publicUrlData.publicUrl);
        image_url = publicUrl.toString();

        // Log the URL for debugging
        console.log('Generated public URL:', image_url);
      }
      
      // Handle icon upload if present
      let icon_url = null;
      if (data.iconFile && data.iconFile.length > 0) {
        const file = data.iconFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-icon-${Date.now()}.${fileExt}`;
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
      
      // Create app object to save
      const newApp = {
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
        is_featured: false
      };
      
      // Save to Supabase
      const { error: saveError } = await supabase
        .from('ios_apps')
        .insert([newApp]);
      
      if (saveError) {
        throw saveError;
      }
      
      // Success - redirect to apps list
      router.push('/admin/apps');
      
    } catch (error: any) {
      console.error('Error creating app:', error);
      setError(error.message || 'Failed to create app');
      
      // If we uploaded an image but failed to save the app, clean up the image
      if (error.message && data.imageFile) {
        const fileName = error.message.match(/app_screenshots\/(.*?)$/)?.[1];
        if (fileName) {
          await supabase.storage
            .from('app_screenshots')
            .remove([fileName]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add New iOS App</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Fill out the form below to add a new iOS app to your portfolio
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
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
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
                  <img src={iconPreview} alt="Icon Preview" className="object-cover w-full h-full" />
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
            {isSubmitting ? 'Saving...' : 'Save App'}
          </button>
        </div>
      </form>
    </div>
  );
} 