-- =================================================================
-- VAIBHAV KUMAR VERMA - FULL-STACK PORTFOLIO & ADMIN DATABASE SCHEMA
-- PostgreSQL / Supabase Migration
-- =================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'Vaibhav Kumar Verma',
  headline TEXT NOT NULL DEFAULT 'Building Digital Experiences. Exploring Intelligent Technology.',
  bio TEXT NOT NULL DEFAULT 'B.Tech CSE student at United University, Prayagraj. Software, AI, and Creative Studio builder.',
  avatar_url TEXT DEFAULT '',
  phone TEXT DEFAULT '+91 9151362992',
  email TEXT NOT NULL DEFAULT 'vermavaibhav710@gmail.com',
  location TEXT DEFAULT 'Prayagraj, Uttar Pradesh, India',
  education_degree TEXT DEFAULT 'B.Tech in Computer Science and Engineering',
  education_institution TEXT DEFAULT 'United University, Prayagraj',
  github_url TEXT DEFAULT 'https://github.com/thesecretone09',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/vaibhav-verma-953044344/',
  youtube_url TEXT DEFAULT 'https://www.youtube.com/@im_Vaibhav_Verma',
  studio_name TEXT DEFAULT 'TSO Groups',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('AI/ML', 'Web', 'Creative', 'Research', 'Mobile')),
  status TEXT NOT NULL CHECK (status IN ('done', 'proto', 'wip', 'idea')),
  description TEXT NOT NULL,
  next_step TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  embed_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL CHECK (category IN ('Programming', 'AI and machine learning', 'Web development', 'Tools and technologies', 'Creative skills')),
  name TEXT NOT NULL,
  proficiency TEXT DEFAULT 'Experienced',
  icon_path TEXT DEFAULT '',
  is_learning BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Services Table (TSO Groups)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT DEFAULT '',
  icon_name TEXT DEFAULT 'Palette',
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Media Gallery Table
CREATE TABLE IF NOT EXISTS public.media_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('image', 'video')),
  category TEXT NOT NULL DEFAULT 'Other',
  url TEXT NOT NULL,
  storage_path TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Experience & Journey Table
CREATE TABLE IF NOT EXISTS public.experience_journey (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period TEXT NOT NULL,
  status_type TEXT NOT NULL CHECK (status_type IN ('done', 'proto', 'wip', 'idea')),
  title TEXT NOT NULL,
  organization TEXT DEFAULT '',
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'completed', 'spam')),
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Site Settings & SEO
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Indexes for High Performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_media_category ON public.media_gallery(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.contact_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.contact_enquiries(created_at DESC);

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read, authenticated admin can update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin can update profile" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- Projects: Public can view, admin can insert/update/delete
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin can modify projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Skills: Public view, admin modify
CREATE POLICY "Skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin can modify skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- Services: Public view, admin modify
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin can modify services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- Media Gallery: Public view, admin modify
CREATE POLICY "Media gallery is viewable by everyone" ON public.media_gallery FOR SELECT USING (true);
CREATE POLICY "Admin can modify media gallery" ON public.media_gallery FOR ALL USING (auth.role() = 'authenticated');

-- Experience / Journey: Public view, admin modify
CREATE POLICY "Experience journey is viewable by everyone" ON public.experience_journey FOR SELECT USING (true);
CREATE POLICY "Admin can modify experience journey" ON public.experience_journey FOR ALL USING (auth.role() = 'authenticated');

-- Contact Enquiries: Anyone can insert (with rate limiting / validation), only admin can view & update
CREATE POLICY "Anyone can submit contact enquiries" ON public.contact_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admin can view enquiries" ON public.contact_enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admin can update enquiries" ON public.contact_enquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Only admin can delete enquiries" ON public.contact_enquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Site Settings: Public can read, admin can modify
CREATE POLICY "Settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can modify settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- =================================================================
-- STORAGE BUCKET CONFIGURATION FOR MEDIA
-- =================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access to Media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin Upload to Media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete from Media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
