import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { GitHub } from '../../ui/Icons';
import { Gamepad2, BookOpen, ExternalLink } from 'lucide-react';
import type { TabType } from './SocialTabs';
import type { GridProject, GridGame, BlogPost } from '../../../types/portfolio';
import { PostModal } from './PostModal';

interface ProjectGridProps {
  activeTab: TabType;
  projects: GridProject[];
  games: GridGame[];
  blogPosts: BlogPost[];
}

export const ProjectGrid = ({ activeTab, projects, games, blogPosts }: ProjectGridProps) => {
  const { theme } = useTheme();
  const [activePost, setActivePost] = useState<GridProject | GridGame | BlogPost | null>(null);

  const renderGridContent = () => {
    if (activeTab === 'projects') {
      return (
        <div className="social-grid">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="social-grid-card"
              onClick={() => setActivePost(proj)}
              style={{
                background: theme === 'dark'
                  ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ${proj.bgColor}`
                  : proj.bgColor,
                filter: theme === 'dark' ? 'brightness(0.9) saturate(0.8)' : 'none',
              }}
            >
              <proj.Icon size={64} className="grid-card-icon" strokeWidth={1.2} />
              <div className="grid-card-overlay">
                <span className="grid-card-name">{proj.name}</span>
                <div className="grid-card-hashtags">
                  {(proj.stack || []).slice(0, 3).map(s => (
                    <span key={s} className="grid-card-hashtag">#{s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}</span>
                  ))}
                </div>
                <span className="grid-card-status">{proj.status}</span>
              </div>
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="grid-card-link" onClick={e => e.stopPropagation()}>
                  <GitHub size={24} />
                </a>
              )}
              {!proj.github && proj.demo && (
                <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="grid-card-link" onClick={e => e.stopPropagation()}>
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'games') {
      if (games.length === 0) {
        return (
          <div className="social-empty-tab">
            <Gamepad2 size={48} className="social-empty-icon" />
            <span className="social-empty-text">games coming soon</span>
          </div>
        );
      }
      return (
        <div className="social-grid">
          {games.map(game => (
            <div
              key={game.id}
              className="social-grid-card"
              onClick={() => setActivePost(game)}
              style={{
                background: theme === 'dark'
                  ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ${game.bgColor}`
                  : game.bgColor,
                filter: theme === 'dark' ? 'brightness(0.9) saturate(0.8)' : 'none',
              }}
            >
              {game.coverImage
                ? <img src={game.coverImage} alt={game.name} className="grid-card-icon" style={{ objectFit: 'cover', width: 64, height: 64, borderRadius: 8 }} />
                : <game.Icon size={64} className="grid-card-icon" strokeWidth={1.2} />
              }
              <div className="grid-card-overlay">
                <span className="grid-card-name">{game.name}</span>
                <div className="grid-card-hashtags">
                  {(game.stack || []).slice(0, 3).map(s => (
                    <span key={s} className="grid-card-hashtag">#{s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}</span>
                  ))}
                </div>
                <span className="grid-card-status">{game.status}</span>
              </div>
              {game.playUrl && (
                <a href={game.playUrl} target="_blank" rel="noopener noreferrer" className="grid-card-link" onClick={e => e.stopPropagation()}>
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'blogs') {
      if (blogPosts.length === 0) {
        return (
          <div className="social-empty-tab">
            <BookOpen size={48} className="social-empty-icon" />
            <span className="social-empty-text">blog posts coming soon</span>
          </div>
        );
      }
      return (
        <div className="social-grid">
          {blogPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="social-grid-card"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), #f3f4f6'
                  : '#f3f4f6',
                filter: theme === 'dark' ? 'brightness(0.9) saturate(0.8)' : 'none',
              }}
            >
              {post.coverImageUrl
                ? <img src={post.coverImageUrl} alt={post.title} className="grid-card-icon" style={{ objectFit: 'cover', width: '100%', height: 80, borderRadius: 8 }} />
                : <BookOpen size={64} className="grid-card-icon" strokeWidth={1.2} />
              }
              <div className="grid-card-overlay">
                <span className="grid-card-name">{post.title}</span>
                <div className="grid-card-hashtags">
                  {(post.tags || []).slice(0, 3).map(t => (
                    <span key={t} className="grid-card-hashtag">#{t.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}</span>
                  ))}
                </div>
                <span className="grid-card-status">{post.platform}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderGridContent()}
      <PostModal post={activePost} tabType={activeTab} onClose={() => setActivePost(null)} />
    </>
  );
};
