import { useState, useEffect } from 'react';
import {
  GraduationCap, Palette, Shield, MessageSquareText, BarChart3,
  FileText, Zap, Monitor, Eye, Table, Layout, Gamepad2, BookOpen,
} from 'lucide-react';
import { GitHub } from '../components/ui/Icons';
import { supabase } from '../lib/supabase';
import {
  HIGHLIGHTS as FALLBACK_HIGHLIGHTS,
  GRID_PROJECTS as FALLBACK_PROJECTS,
} from '../constants/data';
import type {
  HighlightCategory, GridProject, GridGame, BlogPost,
  DbHighlightCategory, DbStory, DbProject, DbGame, DbBlogPost,
} from '../types/portfolio';

// ─── Icon map: DB icon_name string → Lucide component ─────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  'graduation-cap':     GraduationCap,
  'github':             GitHub,
  'palette':            Palette,
  'shield':             Shield,
  'message-square-text': MessageSquareText,
  'bar-chart-3':        BarChart3,
  'file-text':          FileText,
  'zap':                Zap,
  'monitor':            Monitor,
  'eye':                Eye,
  'table':              Table,
  'layout':             Layout,
  'gamepad-2':          Gamepad2,
  'book-open':          BookOpen,
};

const resolveIcon = (name: string): React.ElementType =>
  ICON_MAP[name] ?? Layout;

// ─── Row → UI mappers ─────────────────────────────────────────────────────────

function mapCategories(
  categories: DbHighlightCategory[],
  stories: DbStory[],
): HighlightCategory[] {
  return categories.map(cat => ({
    id: cat.id,
    title: cat.title,
    Icon: resolveIcon(cat.icon_name),
    coverImage: cat.cover_image_url ?? undefined,
    bgColor: cat.bg_color,
    iconColor: cat.icon_color,
    stories: stories
      .filter(s => s.category_id === cat.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(s => ({
        id: s.id,
        tag: s.tag,
        name: s.name,
        pitch: s.pitch,
        outcome: s.outcome ?? undefined,
        stack: s.stack,
        image: s.image_url,
        github: s.github_url ?? undefined,
        demo: s.demo_url ?? undefined,
      })),
  }));
}

function mapProjects(rows: DbProject[]): GridProject[] {
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    Icon: resolveIcon(r.icon_name),
    bgColor: r.bg_color,
    stack: r.stack,
    status: r.status,
    github: r.github_url ?? undefined,
    demo: r.demo_url ?? undefined,
  }));
}

function mapGames(rows: DbGame[]): GridGame[] {
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    description: r.description ?? undefined,
    Icon: resolveIcon(r.icon_name),
    coverImage: r.cover_image_url ?? undefined,
    bgColor: r.bg_color,
    stack: r.stack,
    playUrl: r.play_url ?? undefined,
    github: r.github_url ?? undefined,
    status: r.status,
  }));
}

function mapBlogPosts(rows: DbBlogPost[]): BlogPost[] {
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    excerpt: r.excerpt,
    coverImageUrl: r.cover_image_url ?? undefined,
    blogUrl: r.blog_url,
    platform: r.platform,
    tags: r.tags,
    publishedAt: r.published_at,
  }));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface PortfolioData {
  highlights: HighlightCategory[];
  projects: GridProject[];
  games: GridGame[];
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioData(): PortfolioData {
  const [highlights, setHighlights] = useState<HighlightCategory[]>(FALLBACK_HIGHLIGHTS);
  const [projects, setProjects] = useState<GridProject[]>(FALLBACK_PROJECTS);
  const [games, setGames] = useState<GridGame[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // No Supabase creds — stay on fallback data
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!url || !key || url === 'https://your-project-ref.supabase.co') {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      try {
        const [catRes, storiesRes, projRes, gamesRes, blogsRes] = await Promise.all([
          supabase
            .from('highlight_categories')
            .select('*')
            .order('sort_order'),
          supabase
            .from('stories')
            .select('*')
            .order('sort_order'),
          supabase
            .from('projects')
            .select('*')
            .order('sort_order'),
          supabase
            .from('games')
            .select('*')
            .order('sort_order'),
          supabase
            .from('blog_posts')
            .select('*')
            .order('sort_order')
            .order('published_at', { ascending: false }),
        ]);

        if (cancelled) return;

        // Only switch to live data if rows actually exist
        if (catRes.data && catRes.data.length > 0 && storiesRes.data) {
          setHighlights(
            mapCategories(
              catRes.data as DbHighlightCategory[],
              storiesRes.data as DbStory[],
            ),
          );
        }

        if (projRes.data && projRes.data.length > 0) {
          setProjects(mapProjects(projRes.data as DbProject[]));
        }

        if (gamesRes.data && gamesRes.data.length > 0) {
          setGames(mapGames(gamesRes.data as DbGame[]));
        }

        if (blogsRes.data && blogsRes.data.length > 0) {
          setBlogPosts(mapBlogPosts(blogsRes.data as DbBlogPost[]));
        }

        const firstError = [catRes, storiesRes, projRes, gamesRes, blogsRes]
          .find(r => r.error)?.error;
        if (firstError) setError(firstError.message);
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { highlights, projects, games, blogPosts, loading, error };
}
