-- Create storage buckets
INSERT INTO storage.buckets (id, name) VALUES ('app_screenshots', 'App Screenshots') ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name) VALUES ('blog_images', 'Blog Images') ON CONFLICT DO NOTHING;

-- Set up public policies for app_screenshots bucket
CREATE POLICY "Public Access for App Screenshots"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'app_screenshots');

CREATE POLICY "Authenticated Users can upload App Screenshots"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'app_screenshots');

CREATE POLICY "Authenticated Users can update App Screenshots"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'app_screenshots');

CREATE POLICY "Authenticated Users can delete App Screenshots"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'app_screenshots');

-- Set up public policies for blog_images bucket
CREATE POLICY "Public Access for Blog Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

CREATE POLICY "Authenticated Users can upload Blog Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog_images');

CREATE POLICY "Authenticated Users can update Blog Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog_images');

CREATE POLICY "Authenticated Users can delete Blog Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog_images'); 