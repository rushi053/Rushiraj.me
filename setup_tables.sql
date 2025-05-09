-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ios_apps table
CREATE TABLE ios_apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Released', 'In development', 'Planning')),
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  app_store_link TEXT,
  expected_release TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  featured_image TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for both tables
CREATE TRIGGER set_ios_apps_updated_at
BEFORE UPDATE ON ios_apps
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE ios_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins)
-- iOS Apps policies
CREATE POLICY "Allow all for authenticated users" ON ios_apps
FOR ALL 
TO authenticated
USING (TRUE);

CREATE POLICY "Allow select for anonymous users" ON ios_apps
FOR SELECT
TO anon
USING (TRUE);

-- Blog Posts policies
CREATE POLICY "Allow all for authenticated users" ON blog_posts
FOR ALL 
TO authenticated
USING (TRUE);

CREATE POLICY "Allow select for anonymous users" ON blog_posts
FOR SELECT
TO anon
USING (published = TRUE); 