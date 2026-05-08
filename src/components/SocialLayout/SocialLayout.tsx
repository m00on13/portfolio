import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HIGHLIGHTS } from '../../constants/data';
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

  const activeHLIndex = HIGHLIGHTS.findIndex(h => h.id === activeHighlight);

  return (
    <section id="profile" className="social-layout" ref={sectionRef}>
      <div className="social-container" ref={cardRef}>
        <ProfileHeader />
        <SocialActions onOpenContact={onOpenContact} />
        <MobileProfileHeader onOpenContact={onOpenContact} />
        <SocialTechStack />
        
        <hr className="social-divider" />
        
        <SocialHighlights 
          activeHighlight={activeHighlight} 
          onHighlightClick={(id) => setActiveHighlight(id)} 
        />
        
        <hr className="social-divider" />
        
        <SocialTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProjectGrid activeTab={activeTab} />
      </div>

      {/* ── Story Viewer Overlay ── */}
      <AnimatePresence mode="popLayout">
        {activeHighlight && (
          <StoryViewer
            categories={HIGHLIGHTS}
            initialIndex={activeHLIndex}
            onClose={() => setActiveHighlight(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
