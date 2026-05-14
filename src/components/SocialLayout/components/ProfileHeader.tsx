import { GitHub, Instagram } from '../../ui/Icons';
import { Mail } from 'lucide-react';
import { mansiProfileImg } from '../../../constants/data';

interface ProfileStats {
  projectCount?: number;
  blogCount?: number;
}

export const ProfileHeader = ({ projectCount = 12, blogCount = 0 }: ProfileStats) => {
  return (
    <div className="social-header">
      <div className="social-avatar-wrapper">
        <div className="social-avatar" id="social-avatar-main">
          <img src={mansiProfileImg} alt="Mansi Patel" />
        </div>
      </div>

      <div className="social-info">
        <div className="social-top-row">
          <h2 className="social-username">mansi.patel</h2>
        </div>

        <div className="social-stats-desktop">
          <div className="social-stat">
            <span className="social-stat-value">{projectCount}</span>
            <span className="social-stat-label">projects</span>
          </div>
          <div className="social-stat">
            <span className="social-stat-value">{blogCount || '—'}</span>
            <span className="social-stat-label">blogs</span>
          </div>
          <div className="social-stat">
            <span className="social-stat-value">8mo</span>
            <span className="social-stat-label">exp</span>
          </div>
        </div>

        <div className="social-bio-content">
          <div className="social-display-name">Mansi Patel</div>
          <div className="social-category">AI fullstack Developer</div>
          <p className="social-bio-text">
            building agentic systems, rag pipelines &amp; full stack applications
          </p>
          <div className="social-links">
            <a href="https://github.com/m00on13" target="_blank" rel="noopener noreferrer" className="social-link">
              <GitHub size={20} /> github.com/m00on13
            </a>
            <a href="https://instagram.com/_.mansipatell" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={20} /> @_.mansipatell
            </a>
            <a href="mailto:mansi.patel7279s@gmail.com" className="social-link">
              <Mail size={20} /> mansi.patel7279s@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileProfileHeader = ({ onOpenContact, projectCount = 12, blogCount = 0 }: { onOpenContact: () => void } & ProfileStats) => {
  return (
    <div className="social-mobile-header">
      <div className="social-mobile-top">
        <div className="social-avatar-mobile">
          <img src={mansiProfileImg} alt="Mansi Patel" />
        </div>
        <div className="social-mobile-stats">
          <div className="social-stat">
            <span className="social-stat-value">{projectCount}</span>
            <span className="social-stat-label">projects</span>
          </div>
          <div className="social-stat">
            <span className="social-stat-value">{blogCount || '—'}</span>
            <span className="social-stat-label">blogs</span>
          </div>
          <div className="social-stat">
            <span className="social-stat-value">8mo</span>
            <span className="social-stat-label">exp</span>
          </div>
        </div>
      </div>
      <div className="social-mobile-bio">
        <div className="social-display-name">Mansi Patel</div>
        <div className="social-category">AI fullstack Developer</div>
        <p className="social-bio-text">
          building agentic systems, rag pipelines &amp; full stack applications
        </p>
        <div className="social-links mobile">
          <a href="https://github.com/m00on13" target="_blank" rel="noopener noreferrer" className="social-link">
            <GitHub size={18} />
          </a>
          <a href="https://instagram.com/_.mansipatell" target="_blank" rel="noopener noreferrer" className="social-link">
            <Instagram size={18} />
          </a>
          <a href="mailto:mansi.patel7279s@gmail.com" className="social-link">
            <Mail size={18} />
          </a>
        </div>

        <div className="social-mobile-actions">
          <button onClick={onOpenContact} className="social-btn social-action-btn primary">Contact</button>
          <a href="/Mansi_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn social-action-btn secondary">Resume</a>
        </div>
      </div>
    </div>
  );
};
