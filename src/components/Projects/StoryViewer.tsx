import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectsSection.css'; // Will reuse/add styles here

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

export interface StoryCategory {
  id: string;
  title: string;
  thumbnail: string;
  stories: ProjectStory[];
}

interface StoryViewerProps {
  stories: ProjectStory[];
  categoryTitle: string;
  onClose: () => void;
  onNextCategory?: () => void; // Optional: jump to next highlight if we want
}

const STORY_DURATION = 5000; // 5 seconds per story

export const StoryViewer: React.FC<StoryViewerProps> = ({ stories, categoryTitle, onClose, onNextCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentProgressRef = useRef(0);
  
  const currentStory = stories[currentIndex];

  // Safety check to prevent crashes if stories or currentStory are missing
  if (!stories || stories.length === 0 || !currentStory) return null;

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    let pausedTime = 0;
    currentProgressRef.current = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      if (!isPausedRef.current) {
        const elapsed = timestamp - startTime - pausedTime;
        currentProgressRef.current = (elapsed / STORY_DURATION) * 100;
        
        if (currentProgressRef.current >= 100) {
          if (progressRefs.current[currentIndex]) {
            progressRefs.current[currentIndex]!.style.width = '100%';
          }
          handleNext();
        } else {
          if (progressRefs.current[currentIndex]) {
            progressRefs.current[currentIndex]!.style.width = `${currentProgressRef.current}%`;
          }
          animationFrame = requestAnimationFrame(animate);
        }
      } else {
        // When paused, we don't accumulate elapsed time towards progress, 
        // but we need to track how long we were paused to adjust startTime
        pausedTime += (timestamp - (startTime + pausedTime + (currentProgressRef.current / 100) * STORY_DURATION));
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (stories.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, stories.length]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Reached the end of this category
      if (onNextCategory) {
        onNextCategory();
      } else {
        onClose();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Already at first story, just reset progress locally (the effect re-runs on index change, but since index is same, it won't. So we must trigger a re-render or reset)
      // Actually we could just reset currentIndex to 0 to trigger nothing, so let's force re-render or just reset startTime.
      // But IG stories just stay on first. Let's just do nothing.
    }
  };

  if (!stories || stories.length === 0) return null;

  return createPortal(
    <div className="story-viewer-overlay">
      {/* Background Blur Overlay */}
      <motion.div 
        className="story-viewer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div 
        className="story-container"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
      >
        {/* Progress Bars */}
        <div className="story-progress-container">
          {stories.map((_, idx) => (
            <div key={idx} className="story-progress-bg">
              <div 
                className="story-progress-fill"
                ref={el => { progressRefs.current[idx] = el; }}
                style={{
                  width: idx < currentIndex ? '100%' : '0%',
                  transition: 'none' // Remove transition since rAF updates smoothly
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Header (Category + Close) */}
        <div className="story-header">
          <div className="story-category-info">
            <span className="story-category-title">{categoryTitle}</span>
            <span className="story-date">2026</span>
          </div>
          <button className="story-close-btn" onClick={onClose} aria-label="Close stories">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tap Zones for Navigation & Pause */}
        <div className="story-tap-zones">
          <div 
            className="tap-zone left" 
            onClick={handlePrev}
            onMouseDown={() => { isPausedRef.current = true; }}
            onMouseUp={() => { isPausedRef.current = false; }}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { isPausedRef.current = false; }}
          />
          <div 
            className="tap-zone right" 
            onClick={handleNext}
            onMouseDown={() => { isPausedRef.current = true; }}
            onMouseUp={() => { isPausedRef.current = false; }}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { isPausedRef.current = false; }}
          />
        </div>

        {/* Story Content Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="story-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={currentStory.image} alt={currentStory.name} className="story-image" />
            <div className="story-gradient-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* Story Content Details */}
        <div className="story-content">
          <motion.div 
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="story-text-wrapper"
          >
            <span className="story-tag">{currentStory.tag}</span>
            <h2 className="story-name">{currentStory.name}</h2>
            <p className="story-pitch">{currentStory.pitch}</p>
            
            {currentStory.stack && currentStory.stack.length > 0 && (
              <div className="story-stack">
                {currentStory.stack.map(s => (
                  <span key={s} className="story-pill">{s}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Swipe Up / Actions */}
          <div className="story-actions">
            {(currentStory.demo || currentStory.github) ? (
              <a 
                href={currentStory.demo || currentStory.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="story-action-btn"
              >
                {currentStory.demo ? 'View Live Demo' : 'View on GitHub'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ) : (
               <div className="story-action-btn placeholder">Coming Soon</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
