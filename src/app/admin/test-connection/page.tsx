'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { SupabaseError } from '@/types/supabase';

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [testResults, setTestResults] = useState<{ [key: string]: boolean | null }>({
    envVars: null,
    iosApps: null,
    blogPosts: null,
    appScreenshots: null,
    blogImages: null,
  });
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      setLoading(true);
      
      try {
        // Check environment variables
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        setTestResults(prev => ({ ...prev, envVars: hasUrl && hasKey }));
        
        if (!hasUrl || !hasKey) {
          throw new Error('Environment variables missing');
        }

        // Test iOS apps table
        try {
          const { error: iosAppsError } = await supabase
            .from('ios_apps')
            .select('id')
            .limit(1);
          
          if (iosAppsError) throw iosAppsError;
          setTestResults(prev => ({ ...prev, iosApps: true }));
        } catch (error) {
          console.error('iOS apps test failed:', error);
          setTestResults(prev => ({ ...prev, iosApps: false }));
          throw error;
        }
        
        // Test blog posts table
        try {
          const { error: blogPostsError } = await supabase
            .from('blog_posts')
            .select('id')
            .limit(1);
          
          if (blogPostsError) throw blogPostsError;
          setTestResults(prev => ({ ...prev, blogPosts: true }));
        } catch (error) {
          console.error('Blog posts test failed:', error);
          setTestResults(prev => ({ ...prev, blogPosts: false }));
          throw error;
        }
        
        // Test app screenshots bucket
        try {
          const { error: appScreenshotsError } = await supabase
            .storage
            .from('app_screenshots')
            .list();
          
          if (appScreenshotsError) throw appScreenshotsError;
          setTestResults(prev => ({ ...prev, appScreenshots: true }));
        } catch (error) {
          console.error('App screenshots bucket test failed:', error);
          setTestResults(prev => ({ ...prev, appScreenshots: false }));
          // Don't throw here to continue with other tests
        }
        
        // Test blog images bucket
        try {
          const { error: blogImagesError } = await supabase
            .storage
            .from('blog_images')
            .list();
          
          if (blogImagesError) throw blogImagesError;
          setTestResults(prev => ({ ...prev, blogImages: true }));
        } catch (error) {
          console.error('Blog images bucket test failed:', error);
          setTestResults(prev => ({ ...prev, blogImages: false }));
          // Don't throw here to continue with other tests
        }
        
        // If we made it here, the connection is successful
        setConnectionStatus('success');
        
      } catch (err) {
        const error = err as SupabaseError;
        console.error('Connection test failed:', error);
        setConnectionStatus('error');
        setErrorDetails(error.message || 'Failed to test connection');
      } finally {
        setLoading(false);
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Supabase Connection Test</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          This page tests your connection to Supabase and verifies your configuration.
        </p>
      </div>
      
      {loading ? (
        <div className="bg-white dark:bg-neutral-800 p-6 mb-6 animate-pulse">
          <p>Testing connection to Supabase...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 p-6 mb-6">
          <div className="mb-4 flex items-center">
            <span className="text-lg font-medium mr-3">Connection status:</span>
            {connectionStatus === 'success' ? (
              <span className="text-green-600 dark:text-green-400 font-medium">Connected ✅</span>
            ) : connectionStatus === 'error' ? (
              <span className="text-red-600 dark:text-red-400 font-medium">Failed ❌</span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pending...</span>
            )}
          </div>
          
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-medium">Test Results:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium mb-2">Environment Variables</h3>
                <StatusBadge status={testResults.envVars} />
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium mb-2">iOS Apps Table</h3>
                <StatusBadge status={testResults.iosApps} />
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium mb-2">Blog Posts Table</h3>
                <StatusBadge status={testResults.blogPosts} />
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium mb-2">App Screenshots Bucket</h3>
                <StatusBadge status={testResults.appScreenshots} />
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium mb-2">Blog Images Bucket</h3>
                <StatusBadge status={testResults.blogImages} />
              </div>
            </div>
          </div>
          
          {errorDetails && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-6">
              <h3 className="font-medium mb-2">Error Details:</h3>
              <p className="font-mono text-sm">{errorDetails}</p>
            </div>
          )}
          
          <div className="mt-6">
            <Link 
              href="/admin/dashboard" 
              className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      )}
      
      <div className="bg-cream-50 dark:bg-neutral-800 p-6">
        <h2 className="text-lg font-medium mb-4">Troubleshooting</h2>
        <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
          <li>• Make sure your <code className="font-mono bg-neutral-100 dark:bg-neutral-700 px-1">.env.local</code> file has the correct Supabase credentials</li>
          <li>• Verify that your Supabase project is up and running</li>
          <li>• Check that your tables have been created with the correct schema</li>
          <li>• Ensure RLS policies are correctly configured</li>
          <li>• Verify that your storage buckets are correctly set up</li>
        </ul>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: boolean | null }) {
  if (status === null) {
    return <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">Not tested</span>;
  }
  
  return status ? (
    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Success ✅</span>
  ) : (
    <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">Failed ❌</span>
  );
} 