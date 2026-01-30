'use client';

import { useState, useEffect } from 'react';
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

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlogFormData>();

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  async function fetchPost() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setPost(data);
        // Set form values
        reset({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          published: data.published,
          tags: data.tags.join(', '),
        });
        // Set image preview if exists
        if (data.featured_image) {
          setImagePreview(data.featured_image);
        }
      }
    } catch (err: any) {
      console.error('Error fetching post:', err);
      setError(err.message);
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
      setImagePreview(post?.featured_image || null);
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
      let featured_image = post?.featured_image || null;
      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        
        // Delete old image if exists
        if (post?.featured_image) {
          const oldImagePath = post.featured_image.split('/').pop();
          if (oldImagePath) {
            await supabase.storage
              .from('blog_images')
              .remove([oldImagePath]);
          }
        }
        
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
      const updatedPost = {
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
        .update(updatedPost)
        .eq('id', params.id);
      
      if (saveError) {
        throw saveError;
      }
      
      // Success - redirect to blog posts list
      router.push('/admin/blog');
      
    } catch (error: any) {
      console.error('Error updating post:', error);
      setError(error.message || 'Failed to update post');
      
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
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

  if (!post) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 p-6 rounded-none mb-8">
          <h2 className="text-lg font-medium mb-2">Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Edit Blog Post</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Update the post details below
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 