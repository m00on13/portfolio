import { Grid3X3, Gamepad2, BookOpen } from 'lucide-react';

export type TabType = 'projects' | 'games' | 'blogs';

interface SocialTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const SocialTabs = ({ activeTab, setActiveTab }: SocialTabsProps) => {
  return (
    <div className="social-tabs">
      <button className={`social-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
        <Grid3X3 size={24} /> projects
      </button>
      <button className={`social-tab ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>
        <Gamepad2 size={24} /> games
      </button>
      <button className={`social-tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
        <BookOpen size={24} /> blogs
      </button>
    </div>
  );
};
