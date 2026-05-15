import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { mansiProfileImg } from '../../../constants/data';
import type { GridProject, GridGame, BlogPost } from '../../../types/portfolio';
import type { TabType } from './SocialTabs';
import './PostModal.css';

const isVideo = (url?: string | null) => url ? /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) : false;

export interface PostModalProps {
  post: GridProject | GridGame | BlogPost | null;
  tabType: TabType | null;
  onClose: () => void;
}

export const PostModal = ({ post, tabType, onClose }: PostModalProps) => {
  if (!post || !tabType) return null;

  // We need to extract the relevant fields based on the tabType
  let image = null;
  let title = '';
  let description = '';
  let stack: string[] = [];
  let primaryLink: { url: string; label: string; icon?: 'external' | 'github' } | null = null;
  let secondaryLink: { url: string; label: string; icon?: 'external' | 'github' } | null = null;
  let FallbackIcon = null;
  let bgColor = '#111';

  if (tabType === 'projects') {
    const p = post as GridProject;
    image = p.coverImage;
    title = p.name;
    stack = p.stack;
    FallbackIcon = p.Icon;
    bgColor = p.bgColor;
    if (p.demo) primaryLink = { url: p.demo, label: 'View Live Demo', icon: 'external' };
    if (p.github) {
      if (!primaryLink) primaryLink = { url: p.github, label: 'View Source on GitHub', icon: 'github' };
      else secondaryLink = { url: p.github, label: 'View Source', icon: 'github' };
    }
  } else if (tabType === 'games') {
    const g = post as GridGame;
    image = g.coverImage;
    title = g.name;
    description = g.description || '';
    stack = g.stack;
    FallbackIcon = g.Icon;
    bgColor = g.bgColor;
    if (g.playUrl) primaryLink = { url: g.playUrl, label: 'Play Game', icon: 'external' };
    if (g.github) secondaryLink = { url: g.github, label: 'View Source', icon: 'github' };
  } else if (tabType === 'blogs') {
    const b = post as BlogPost;
    image = b.coverImageUrl;
    title = b.title;
    description = b.excerpt;
    stack = b.tags || [];
    primaryLink = { url: b.blogUrl, label: 'Read Full Article', icon: 'external' };
  }

  return (
    <AnimatePresence>
      {post && (
        <div className="post-modal-overlay">
          <motion.div
            className="post-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="post-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="post-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="post-modal-media" style={!image ? { backgroundColor: bgColor } : {}}>
              {image ? (
                isVideo(image) ? (
                  <video src={image} autoPlay loop muted playsInline className="post-modal-image" />
                ) : (
                  <img src={image} alt={title} className="post-modal-image" />
                )
              ) : FallbackIcon ? (
                <div className="post-modal-placeholder">
                  <FallbackIcon size={120} strokeWidth={1} style={{ color: 'rgba(0,0,0,0.2)' }} />
                </div>
              ) : null}
            </div>

            <div className="post-modal-details">
              
              {/* Header */}
              <div className="post-modal-sidebar-header">
                <div className="post-modal-user-info">
                  <img src={mansiProfileImg} alt="Avatar" className="post-modal-avatar" />
                  <span className="post-modal-username">mansi.patel</span>
                </div>
              </div>

              {/* Scrollable Caption */}
              <div className="post-modal-caption-area">
                <div className="post-modal-caption-content">
                  <img src={mansiProfileImg} alt="Avatar" className="post-modal-avatar" />
                  <div className="post-modal-caption-text">
                    <div style={{ marginBottom: '8px' }}>
                      <span className="post-modal-username">mansi.patel</span>
                    </div>
                    <div className="post-modal-structured-caption">
                      <strong className="post-modal-caption-title">{title}</strong>
                      {description && <p className="post-modal-caption-desc">{description}</p>}
                      {stack && stack.length > 0 && (
                        <div className="post-modal-hashtags-wrapper" style={{ marginTop: '12px' }}>
                          <div style={{ color: '#a8a8a8', lineHeight: '1.4', marginBottom: '8px' }}>
                            .<br/>.<br/>.<br/>.<br/>.
                          </div>
                          <div className="post-modal-hashtags">
                            {stack.map((s, idx) => (
                              <span key={idx} className="post-hashtag">#{s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="post-modal-sidebar-footer">
                
                {/* Insights / Boost Post mapped to Links */}
                {(primaryLink || secondaryLink) && (
                  <div className="post-modal-insights-row" style={{ justifyContent: secondaryLink ? 'space-between' : 'flex-end' }}>
                    {secondaryLink && (
                      <a href={secondaryLink.url} target="_blank" rel="noopener noreferrer" className="insta-insight-link">
                        {secondaryLink.label}
                      </a>
                    )}
                    {primaryLink && (
                      <a href={primaryLink.url} target="_blank" rel="noopener noreferrer" className="insta-boost-btn">
                        {primaryLink.label}
                      </a>
                    )}
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
