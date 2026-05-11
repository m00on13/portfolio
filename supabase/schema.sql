-- ============================================================
-- Portfolio Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ─── 1. HIGHLIGHT CATEGORIES ────────────────────────────────
-- Maps to the Instagram-style story highlight circles
-- (education, github, playground, etc.)

CREATE TABLE IF NOT EXISTS highlight_categories (
  id          text PRIMARY KEY,            -- e.g. 'education', 'github'
  title       text NOT NULL,               -- display title
  icon_name   text NOT NULL,               -- lucide icon name, e.g. 'graduation-cap'
  cover_image_url text,                    -- Supabase Storage URL for the circle thumbnail
  bg_color    text NOT NULL DEFAULT '#f5f5f5',
  icon_color  text NOT NULL DEFAULT '#333333',
  sort_order  int  NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE highlight_categories IS 'Story highlight categories shown as circles below the profile header';


-- ─── 2. STORIES ─────────────────────────────────────────────
-- Individual story slides within each highlight category

CREATE TABLE IF NOT EXISTS stories (
  id           text PRIMARY KEY,           -- e.g. 'degree', 'isl'
  category_id  text NOT NULL REFERENCES highlight_categories(id) ON DELETE CASCADE,
  tag          text NOT NULL,              -- e.g. 'AI · Computer Vision'
  name         text NOT NULL,              -- story title
  pitch        text NOT NULL,              -- description
  outcome      text,                       -- optional result/metric
  stack        text[] NOT NULL DEFAULT '{}', -- tech stack tags
  image_url    text NOT NULL,              -- background image (Storage URL or external)
  github_url   text,                       -- optional
  demo_url     text,                       -- optional
  sort_order   int  NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE stories IS 'Individual story slides within highlight categories';

-- Index for fast lookup by category
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category_id, sort_order);


-- ─── 3. PROJECTS ────────────────────────────────────────────
-- Grid projects shown in the "projects" tab

CREATE TABLE IF NOT EXISTS projects (
  id          text PRIMARY KEY,            -- e.g. 'brand-guardian'
  name        text NOT NULL,               -- display name
  icon_name   text NOT NULL,               -- lucide icon name, e.g. 'shield'
  bg_color    text NOT NULL DEFAULT '#f5f5f5',
  stack       text[] NOT NULL DEFAULT '{}',
  status      text NOT NULL DEFAULT 'Shipped', -- 'Live', 'Shipped', 'In Production', etc.
  github_url  text,
  demo_url    text,
  sort_order  int  NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE projects IS 'Project cards shown in the projects grid tab';


-- ─── 4. GAMES ───────────────────────────────────────────────
-- Games / interactive demos shown in the "games" tab

CREATE TABLE IF NOT EXISTS games (
  id            text PRIMARY KEY,          -- e.g. 'connect4'
  name          text NOT NULL,             -- display name
  description   text,                      -- short description
  icon_name     text NOT NULL DEFAULT 'gamepad-2', -- lucide icon name
  cover_image_url text,                    -- thumbnail / preview image
  bg_color      text NOT NULL DEFAULT '#f3e5f5',
  stack         text[] NOT NULL DEFAULT '{}',
  play_url      text,                      -- link to the playable game
  github_url    text,
  status        text NOT NULL DEFAULT 'Live', -- 'Live', 'Coming Soon', etc.
  sort_order    int  NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE games IS 'Interactive games and demos shown in the games tab';


-- ─── 5. BLOG POSTS ──────────────────────────────────────────
-- Blog post cards shown in the "blogs" tab
-- Supports multiple platforms (Medium accounts, dev.to, etc.)

CREATE TABLE IF NOT EXISTS blog_posts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  excerpt         text NOT NULL,           -- short summary for the card
  cover_image_url text,                    -- card thumbnail
  blog_url        text NOT NULL,           -- link to the full article (Medium, dev.to, etc.)
  platform        text NOT NULL DEFAULT 'medium', -- 'medium', 'devto', 'hashnode', etc.
  tags            text[] NOT NULL DEFAULT '{}',
  published_at    date NOT NULL DEFAULT CURRENT_DATE,
  sort_order      int  NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE blog_posts IS 'Blog post cards linking to external platforms like Medium';

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_blog_posts_order ON blog_posts(sort_order, published_at DESC);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public read-only access via the anon key.
-- Writes are only possible via Supabase Dashboard or service_role key.
-- ============================================================

ALTER TABLE highlight_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories              ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects             ENABLE ROW LEVEL SECURITY;
ALTER TABLE games                ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts           ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies
CREATE POLICY "Allow public read access"
  ON highlight_categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access"
  ON stories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access"
  ON blog_posts FOR SELECT
  USING (true);


-- ============================================================
-- STORAGE BUCKET
-- Run this separately if the SQL editor doesn't support
-- storage API calls — you can also create the bucket via
-- Dashboard → Storage → New Bucket
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all files in the bucket
CREATE POLICY "Public read access for portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');
