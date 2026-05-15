import type { ElementType } from 'react';

// ─── UI types (used by components) ───────────────────────────────────────────

export interface ProjectStory {
  id: string;
  tag: string;
  name: string;
  pitch: string;
  outcome?: string;
  stack: string[];
  github?: string;
  demo?: string;
  image: string;
}

export interface HighlightCategory {
  id: string;
  title: string;
  Icon: ElementType;
  coverImage?: string;
  bgColor: string;
  iconColor: string;
  stories: ProjectStory[];
}

export interface GridProject {
  id: string;
  name: string;
  Icon: ElementType;
  coverImage?: string;
  gallery?: string[];
  bgColor: string;
  stack: string[];
  status: string;
  github?: string;
  demo?: string;
}

export interface GridGame {
  id: string;
  name: string;
  description?: string;
  Icon: ElementType;
  coverImage?: string;
  gallery?: string[];
  bgColor: string;
  stack: string[];
  playUrl?: string;
  github?: string;
  status: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  gallery?: string[];
  blogUrl: string;
  platform: string;
  tags: string[];
  publishedAt: string;
}

// ─── Raw Supabase DB row types ────────────────────────────────────────────────

export interface DbHighlightCategory {
  id: string;
  title: string;
  icon_name: string;
  cover_image_url: string | null;
  bg_color: string;
  icon_color: string;
  sort_order: number;
}

export interface DbStory {
  id: string;
  category_id: string;
  tag: string;
  name: string;
  pitch: string;
  outcome: string | null;
  stack: string[];
  image_url: string;
  github_url: string | null;
  demo_url: string | null;
  sort_order: number;
}

export interface DbProject {
  id: string;
  name: string;
  icon_name: string;
  cover_image_url: string | null;
  gallery_urls: string[];
  bg_color: string;
  stack: string[];
  status: string;
  github_url: string | null;
  demo_url: string | null;
  sort_order: number;
}

export interface DbGame {
  id: string;
  name: string;
  description: string | null;
  icon_name: string;
  cover_image_url: string | null;
  gallery_urls: string[];
  bg_color: string;
  stack: string[];
  play_url: string | null;
  github_url: string | null;
  status: string;
  sort_order: number;
}

export interface DbBlogPost {
  id: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  gallery_urls: string[];
  blog_url: string;
  platform: string;
  tags: string[];
  published_at: string;
  sort_order: number;
}
