-- Wahola Consult Supabase Schema

-- 1. Create the Leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- 'contact' or 'career'
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    position VARCHAR(255),
    portfolio VARCHAR(255),
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the Subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the Blog Posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    views INTEGER DEFAULT 0,
    reads INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create the Analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    route VARCHAR(255) NOT NULL UNIQUE,
    views INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) but allow anonymous access (since we are handling auth via Clerk on our Next.js backend API)
-- We will use the Next.js API routes as a secure proxy to Supabase, using the Service Role Key or Anon Key securely.
-- For maximum security, we can keep RLS disabled if ONLY the backend accesses it, OR enable it.
-- Let's enable RLS and create open policies since the Next.js backend will use the Anon Key (which respects RLS) or Service Role Key.
-- Actually, the user provided an Anon Key `sb_publishable_...`. If the frontend fetches directly, it needs policies.
-- But we are proxying via Next.js `/api/...` routes which are protected by Clerk.
-- So we can safely allow the API routes to read/write.

-- Create a storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true) ON CONFLICT DO NOTHING;

-- Allow public access to read images from the bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
-- Allow anonymous inserts to the bucket (since the admin dashboard uploads via API or directly)
CREATE POLICY "Allow Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
