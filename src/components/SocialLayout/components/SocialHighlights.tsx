import { motion, type Variants } from 'framer-motion';
import type { HighlightCategory } from '../../../types/portfolio';

const highlightContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
};

const highlightItemVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
  exit: { scale: 0.8, opacity: 0 },
};

interface SocialHighlightsProps {
  highlights: HighlightCategory[];
  activeHighlight: string | null;
  onHighlightClick: (id: string) => void;
}

export const SocialHighlights = ({ highlights, activeHighlight, onHighlightClick }: SocialHighlightsProps) => {
  return (
    <>
      <span className="social-section-label">highlights</span>
      <motion.div
        className="social-highlights"
        layout
        variants={highlightContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {highlights.map(hl => (
          <motion.button
            key={hl.id}
            variants={highlightItemVariants}
            layoutId={activeHighlight === hl.id ? 'highlight-active' : undefined}
            className={`highlight-btn ${activeHighlight === hl.id ? 'active' : ''}`}
            onClick={() => onHighlightClick(hl.id)}
            aria-label={`View ${hl.title} stories`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="highlight-icon-ring">
              <div className="highlight-icon-inner">
                {hl.coverImage ? (
                  <img src={hl.coverImage} alt={hl.title} className="highlight-cover-img" />
                ) : (
                  <hl.Icon size={32} strokeWidth={1.5} color="var(--text)" />
                )}
              </div>
            </div>
            <span className="social-btn-label">{hl.title}</span>
          </motion.button>
        ))}
      </motion.div>
    </>
  );
};
