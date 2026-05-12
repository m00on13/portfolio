import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { StoryViewer } from '../Projects/StoryViewer';
import { ProfileHeader, MobileProfileHeader } from './components/ProfileHeader';
import { SocialActions } from './components/SocialActions';
import { SocialTechStack } from './components/SocialTechStack';
import { SocialHighlights } from './components/SocialHighlights';
import { SocialTabs, type TabType } from './components/SocialTabs';
import { ProjectGrid } from './components/ProjectGrid';
import './SocialLayout.css';

/* ─── Main Component ─── */
export const SocialLayout = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const { highlights, projects, games, blogPosts } = usePortfolioData();

  const activeHLIndex = highlights.findIndex(h => h.id === activeHighlight);

  return (
    <section id="profile" className="social-layout" ref={sectionRef}>
      <div className="social-container" ref={cardRef}>
        <ProfileHeader />
        <SocialActions onOpenContact={onOpenContact} />
        <MobileProfileHeader onOpenContact={onOpenContact} />
        <SocialTechStack />

        <hr className="social-divider" />

        <SocialHighlights
          highlights={highlights}
          activeHighlight={activeHighlight}
          onHighlightClick={(id) => setActiveHighlight(id)}
        />

        <hr className="social-divider" />

        <SocialTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProjectGrid
          activeTab={activeTab}
          projects={projects}
          games={games}
          blogPosts={blogPosts}
        />
      </div>

      {/* ── Story Viewer Overlay ── */}
      <AnimatePresence mode="popLayout">
        {activeHighlight && (
          <StoryViewer
            categories={highlights}
            initialIndex={activeHLIndex}
            onClose={() => setActiveHighlight(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
