-- ============================================================
-- Portfolio Supabase Seed Data
-- Run this AFTER schema.sql in the Supabase SQL Editor
-- ============================================================
-- NOTE: Image URLs marked with [STORAGE_TODO] should be replaced
-- with Supabase Storage URLs after uploading the images.
-- For now, external URLs are kept as-is.
-- ============================================================


-- ─── HIGHLIGHT CATEGORIES ───────────────────────────────────

INSERT INTO highlight_categories (id, title, icon_name, cover_image_url, bg_color, icon_color, sort_order)
VALUES
  (
    'education',
    'education',
    'graduation-cap',
    '[STORAGE_TODO]/covers/education.jfif',   -- upload education.jfif → portfolio-images/covers/
    '#e8f5e9',
    '#2e7d32',
    1
  ),
  (
    'github',
    'github',
    'github',
    '[STORAGE_TODO]/covers/github.jfif',      -- upload github.jfif → portfolio-images/covers/
    '#f5f5f5',
    '#24292e',
    2
  ),
  (
    'playground',
    'playground',
    'palette',
    '[STORAGE_TODO]/covers/playground.jfif',   -- upload playground.jfif → portfolio-images/covers/
    '#fffde7',
    '#f57f17',
    3
  );


-- ─── STORIES ────────────────────────────────────────────────

-- Education stories
INSERT INTO stories (id, category_id, tag, name, pitch, stack, image_url, sort_order)
VALUES
  (
    'degree',
    'education',
    'B.Tech · 2022–2026',
    'Information Technology',
    'Charotar University of Science and Technology (CHARUSAT), Gujarat · CGPA 7.9',
    '{}',
    'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2000&auto=format&fit=crop',
    1
  ),
  (
    'research',
    'education',
    'Research · 2025',
    'SMARTCOM Conference',
    'Presented on Tesla''s Agile Methodology in the Automotive Industry at international conference in Pune.',
    '{}',
    'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2000&auto=format&fit=crop',
    2
  ),
  (
    'hackathons',
    'education',
    'Competitions',
    'Hackathon Finalist',
    'SIH 2024 Finalist · Top 75 Odoo × CHARUSAT · KDPIT Solution Challenge Finalist',
    '{}',
    'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2000&auto=format&fit=crop',
    3
  );

-- GitHub stories
INSERT INTO stories (id, category_id, tag, name, pitch, stack, image_url, github_url, sort_order)
VALUES
  (
    'isl',
    'github',
    'AI · Computer Vision',
    'Real-Time ISL Detection',
    'Web app that recognises Indian Sign Language gestures in real time via webcam with 92% accuracy.',
    '{"React", "Flask", "TensorFlow", "MediaPipe"}',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    'https://github.com/m00on13',
    1
  ),
  (
    'bg',
    'github',
    'AI · Production',
    'Brand Guardian',
    'Zero-touch client onboarding that provisions cloud folders, DB tables & live n8n workflows in under 60s.',
    '{"Python", "n8n", "Supabase", "RAG", "FastMCP"}',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    'https://github.com/m00on13',
    2
  ),
  (
    'rag-chat',
    'github',
    'AI · Deployed',
    'RAG Chatbot — WiT Summit',
    'RAG chatbot serving thousands of attendees across Europe for event queries and schedule navigation.',
    '{"n8n", "Gemini API", "Supabase", "Vector Store"}',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    'https://github.com/m00on13',
    3
  );

-- Playground stories
INSERT INTO stories (id, category_id, tag, name, pitch, stack, image_url, demo_url, sort_order)
VALUES
  (
    'portfolio',
    'playground',
    'Frontend · UX',
    'Immersive Portfolio',
    'A premium, highly interactive personal portfolio with GSAP animations and 3D effects.',
    '{"React", "GSAP", "Framer Motion"}',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop',
    'https://mansi-patel.com',
    1
  ),
  (
    'ecommerce',
    'playground',
    'UI/UX Design',
    'Modern E-commerce UI',
    'A sleek, conversion-optimized Figma concept for a boutique fashion brand.',
    '{"Figma", "Prototyping", "Design Systems"}',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop',
    NULL,
    2
  );


-- ─── PROJECTS (Grid) ────────────────────────────────────────

INSERT INTO projects (id, name, icon_name, cover_image_url, gallery_urls, bg_color, stack, status, github_url, sort_order)
VALUES
  ('brand-guardian',  'Brand Guardian',     'shield',              NULL, '{}', '#e8f5e9', '{"Python", "n8n", "RAG", "MCP"}',          'In Production', NULL,                          1),
  ('rag-chatbot',     'RAG Chatbot',        'message-square-text', NULL, '{}', '#f3e5f5', '{"n8n", "Gemini", "Supabase"}',            'Deployed',      NULL,                          2),
  ('movielens',       'MovieLens Analytics', 'bar-chart-3',         NULL, '{}', '#e3f2fd', '{"Python", "FastAPI", "GCP"}',             'In Production', NULL,                          3),
  ('presales',        'Deck Generator',     'file-text',           NULL, '{}', '#fff3e0', '{"Python", "Gemini", "GCP"}',              'Shipped',       NULL,                          4),
  ('revenue',         'Revenue Detector',   'zap',                 NULL, '{}', '#fffde7', '{"Gemini", "Apify", "Slack"}',             'Shipped',       NULL,                          5),
  ('cricket',         'Cricket Analytics',  'monitor',             NULL, '{}', '#e0f2f1', '{"React", "TypeScript", "YOLO"}',          'Shipped',       NULL,                          6),
  ('isl',             'ISL Detection',      'eye',                 NULL, '{}', '#fce4ec', '{"React", "TensorFlow", "MediaPipe"}',     'Shipped',       'https://github.com/m00on13',  7),
  ('excel',           'Excel Analytics',    'table',               NULL, '{}', '#ede7f6', '{"React", "Node.js", "MongoDB"}',          'Shipped',       'https://github.com/m00on13',  8),
  ('portfolio',       'This Portfolio',     'layout',              NULL, '{}', '#e1f5fe', '{"React", "GSAP", "Framer Motion"}',       'Live',          NULL,                          9),
  ('ecommerce',       'E-commerce UI',      'palette',             NULL, '{}', '#fbe9e7', '{"Figma", "Prototyping"}',                 'Concept',       NULL,                          10),
  ('voxel',           'Mini Voxel Engine',  'gamepad-2',           NULL, '{}', '#f3e5f5', '{"C++", "OpenGL", "GLSL"}',                'Experiment',    'https://github.com/m00on13',  11),
  ('college',         'College Module',     'book-open',           NULL, '{}', '#e8f5e9', '{"React", "MySQL"}',                       'Shipped',       NULL,                          12);


-- ─── GAMES ──────────────────────────────────────────────────
-- Add your games here as you build them. Example:

-- INSERT INTO games (id, name, description, icon_name, cover_image_url, gallery_urls, bg_color, stack, play_url, github_url, status, sort_order)
-- VALUES
--   (
--     'connect4',
--     'Connect 4',
--     'Classic Connect 4 with AI opponent and multiplayer mode.',
--     'gamepad-2',
--     NULL,
--     '{}',
--     '#e3f2fd',
--     '{"Next.js", "TypeScript", "React"}',
--     'https://connect4.mansi-patel.com',
--     'https://github.com/m00on13/connect4',
--     'Live',
--     1
--   );


-- ─── BLOG POSTS ─────────────────────────────────────────────
-- Add your blog posts here. Example:

-- INSERT INTO blog_posts (title, excerpt, cover_image_url, gallery_urls, blog_url, platform, tags, published_at, sort_order)
-- VALUES
--   (
--     'Building a RAG Chatbot for 10,000 Users',
--     'How I architected a production RAG chatbot that served thousands of attendees at the WiT Summit across Europe.',
--     '[STORAGE_TODO]/blogs/rag-chatbot-cover.jpg',
--     '{}',
--     'https://medium.com/@yourusername/building-a-rag-chatbot',
--     'medium',
--     '{"AI", "RAG", "n8n", "Supabase"}',
--     '2025-03-15',
--     1
--   );
