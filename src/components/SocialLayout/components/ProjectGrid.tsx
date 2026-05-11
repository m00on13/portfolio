import { GRID_PROJECTS } from '../../../constants/data';
import { useTheme } from '../../../context/ThemeContext';
import { GitHub } from '../../ui/Icons';
import { Gamepad2, BookOpen } from 'lucide-react';
import type { TabType } from './SocialTabs';

interface ProjectGridProps {
  activeTab: TabType;
}

export const ProjectGrid = ({ activeTab }: ProjectGridProps) => {
  const { theme } = useTheme();

  if (activeTab === 'projects') {
    return (
      <div className="social-grid">
        {GRID_PROJECTS.map(proj => (
          <div 
            key={proj.id} 
            className="social-grid-card" 
            style={{ 
              background: theme === 'dark' ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ${proj.bgColor}` : proj.bgColor,
              filter: theme === 'dark' ? 'brightness(0.9) saturate(0.8)' : 'none'
            }}
          >
            <proj.Icon size={64} className="grid-card-icon" strokeWidth={1.2} />
            <div className="grid-card-overlay">
              <span className="grid-card-name">{proj.name}</span>
              <div className="grid-card-stack">
                {proj.stack.slice(0, 3).map(s => (
                  <span key={s} className="grid-card-pill">{s}</span>
                ))}
              </div>
              <span className="grid-card-status">{proj.status}</span>
            </div>
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="grid-card-link" onClick={e => e.stopPropagation()}>
                <GitHub size={24} />
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'games') {
    return (
      <div className="social-empty-tab">
        <Gamepad2 size={48} className="social-empty-icon" />
        <span className="social-empty-text">games coming soon</span>
      </div>
    );
  }

  if (activeTab === 'blogs') {
    return (
      <div className="social-empty-tab">
        <BookOpen size={48} className="social-empty-icon" />
        <span className="social-empty-text">blog posts coming soon</span>
      </div>
    );
  }

  return null;
};
