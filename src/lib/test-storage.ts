import { supabase } from './supabase';

async function testStorage() {
  console.log('Testing Supabase Storage...');

  try {
    // Test listing the app_screenshots bucket
    const { data: bucketList, error: listError } = await supabase
      .storage
      .from('app_screenshots')
      .list();

    if (listError) {
      throw listError;
    }

    console.log('✅ Successfully accessed app_screenshots bucket');
    console.log('Files in bucket:', bucketList.length);
    console.log('\nFiles:');
    bucketList.forEach(file => {
      console.log(`- ${file.name}`);
      // Get and log the public URL for each file
      const { data: { publicUrl } } = supabase
        .storage
        .from('app_screenshots')
        .getPublicUrl(file.name);
      console.log(`  URL: ${publicUrl}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    console.log('\nTroubleshooting steps:');
    console.log('1. Make sure the app_screenshots bucket exists in your Supabase project');
    console.log('2. Verify the bucket is set to public');
    console.log('3. Check that you have the correct storage policies set up');
    console.log('4. Ensure your Supabase credentials are correct');
  }
}

// Run the test
testStorage(); 