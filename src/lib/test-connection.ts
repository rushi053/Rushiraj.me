import { supabase } from './supabase';

/**
 * Test the connection to Supabase
 * Run this with: `npx ts-node -r dotenv/config src/lib/test-connection.ts`
 */
async function testSupabaseConnection() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Check if we have the environment variables
    console.log('Environment variables:');
    console.log(`- SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set ✅' : 'Missing ❌'}`);
    console.log(`- SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set ✅' : 'Missing ❌'}`);
    
    // Test the connection by fetching the number of iOS apps
    const { data: iosApps, error: iosAppsError } = await supabase
      .from('ios_apps')
      .select('id')
      .limit(1);
    
    if (iosAppsError) {
      throw iosAppsError;
    }
    
    console.log('\nSuccessfully connected to Supabase! 🎉');
    console.log(`Retrieved sample iOS app: ${iosApps.length > 0 ? 'Yes ✅' : 'No records found'}`);
    
    // Test the connection to blog_posts table
    const { data: blogPosts, error: blogPostsError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
    
    if (blogPostsError) {
      throw blogPostsError;
    }
    
    console.log(`Retrieved sample blog post: ${blogPosts.length > 0 ? 'Yes ✅' : 'No records found'}`);
    
    // Test storage buckets
    try {
      const { error: appScreenshotsError } = await supabase
        .storage
        .from('app_screenshots')
        .list();
      
      if (appScreenshotsError) throw appScreenshotsError;
      console.log(`App screenshots bucket accessible: Yes ✅`);
    } catch (error) {
      console.error('Error accessing app_screenshots bucket:', error);
      console.log('App screenshots bucket accessible: No ❌');
    }
    
    try {
      const { error: blogImagesError } = await supabase
        .storage
        .from('blog_images')
        .list();
      
      if (blogImagesError) throw blogImagesError;
      console.log(`Blog images bucket accessible: Yes ✅`);
    } catch (error) {
      console.error('Error accessing blog_images bucket:', error);
      console.log('Blog images bucket accessible: No ❌');
    }
    
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error);
    console.log('\nPossible issues:');
    console.log('1. Check your .env.local file has the correct Supabase credentials');
    console.log('2. Ensure your Supabase project is running and accessible');
    console.log('3. Verify RLS policies are set up correctly');
    console.log('4. Make sure your IP address is not restricted in Supabase settings');
  }
}

// Run the test function
testSupabaseConnection(); 