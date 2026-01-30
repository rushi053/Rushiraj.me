'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';

type BlogFormData = {
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  tags: string;
  imageFile?: FileList;
};

export default function NewBlogPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<BlogFormData>({
    defaultValues: {
      published: false,
      tags: ''
    }
  });

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

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Process tags array
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      // Generate a slug from the title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Handle image upload if present
      let featured_image = null;
      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('blog_images')
          .upload(fileName, file);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded image
        const { data } = supabase.storage
          .from('blog_images')
          .getPublicUrl(fileName);
          
        // Ensure the URL is properly formatted
        const publicUrl = new URL(data.publicUrl);
        featured_image = publicUrl.toString();
      }
      
      // Create post object to save
      const newPost = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published,
        tags: tagsArray,
        featured_image,
        slug
      };
      
      // Save to Supabase
      const { error: saveError } = await supabase
        .from('blog_posts')
        .insert([newPost]);
      
      if (saveError) {
        throw saveError;
      }
      
      // Success - redirect to blog posts list
      router.push('/admin/blog');
      
    } catch (error: any) {
      console.error('Error creating post:', error);
      setError(error.message || 'Failed to create post');
      
      // If we uploaded an image but failed to save the post, clean up the image
      if (error.message && data.imageFile) {
        const fileName = error.message.match(/blog_images\/(.*?)$/)?.[1];
        if (fileName) {
          await supabase.storage
            .from('blog_images')
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
        <h2 className="text-2xl font-semibold">Write New Blog Post</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Fill out the form below to create a new blog post
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-neutral-800 p-6 shadow-sm">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="title">
                Post Title *
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('title', { required: 'Post title is required' })}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="excerpt">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('excerpt', { required: 'Excerpt is required' })}
              />
              {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="content">
                Content *
              </label>
              <textarea
                id="content"
                rows={10}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                {...register('content', { required: 'Content is required' })}
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <h3 className="text-lg font-medium mb-4">Tags</h3>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="tags">
              Tags
            </label>
            <textarea
              id="tags"
              rows={2}
              placeholder="Enter tags separated by commas (e.g., iOS, Swift, Development)"
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
              {...register('tags')}
            />
          </div>
        </div>
        
        {/* Featured Image */}
        <div>
          <h3 className="text-lg font-medium mb-4">Featured Image</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="imageFile">
                Upload Image
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
                Recommended size: 1200x630px
              </p>
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Preview:</p>
                <div className="relative w-full aspect-[16/9] overflow-hidden border border-neutral-300 dark:border-neutral-700">
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Publish Status */}
        <div>
          <h3 className="text-lg font-medium mb-4">Publish Status</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 rounded"
              {...register('published')}
            />
            <label htmlFor="published" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
              Publish immediately
            </label>
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
            onClick={() => router.push('/admin/blog')}
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
            {isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
} 