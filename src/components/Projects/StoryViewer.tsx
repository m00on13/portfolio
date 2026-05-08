import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

export interface HighlightCategory {
  id: string;
  title: string;
  Icon: React.ElementType;
  coverImage?: string;
  bgColor: string;
  iconColor: string;
  stories: ProjectStory[];
}

import './ProjectsSection.css';

interface StoryViewerProps {
  categories: HighlightCategory[];
  initialIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000;

export const StoryViewer: React.FC<StoryViewerProps> = ({ categories, initialIndex, onClose }) => {
  const [activeCatIndex, setActiveCatIndex] = useState(initialIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  
  const isPausedRef = useRef(false);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentProgressRef = useRef(0);

  const activeCategory = categories[activeCatIndex];
  const stories = activeCategory?.stories || [];

  // Reset story index when category changes
  useEffect(() => {
    setCurrentStoryIndex(0);
    currentProgressRef.current = 0;
  }, [activeCatIndex]);

  // Animation Loop
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
          if (progressRefs.current[currentStoryIndex]) {
            progressRefs.current[currentStoryIndex]!.style.width = '100%';
          }
          handleNext();
        } else {
          if (progressRefs.current[currentStoryIndex]) {
            progressRefs.current[currentStoryIndex]!.style.width = `${currentProgressRef.current}%`;
          }
          animationFrame = requestAnimationFrame(animate);
        }
      } else {
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
  }, [currentStoryIndex, activeCatIndex, stories.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStoryIndex, activeCatIndex]);

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      if (activeCatIndex < categories.length - 1) {
        setActiveCatIndex(prev => prev + 1);
      } else {
        onClose();
      }
    }
  };

  const handlePrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else {
      if (activeCatIndex > 0) {
        setActiveCatIndex(prev => prev - 1);
      }
    }
  };

  if (!activeCategory) return null;

  return createPortal(
    <div className="story-viewer-overlay">
      <motion.div 
        className="story-viewer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="story-carousel-container">
        {/* Navigation Arrows */}
        {activeCatIndex > 0 && (
          <button className="nav-arrow prev" onClick={() => { setActiveCatIndex(prev => prev - 1); }}>
            <ChevronLeft size={32} />
          </button>
        )}
        
        {activeCatIndex < categories.length - 1 && (
          <button className="nav-arrow next" onClick={() => { setActiveCatIndex(prev => prev + 1); }}>
            <ChevronRight size={32} />
          </button>
        )}

        <button className="story-close-fixed" onClick={onClose}>
          <X size={32} />
        </button>

        <div className="story-track-viewport">
          <motion.div 
            className="story-track"
            animate={{ x: `calc(50vw - ${activeCatIndex * 480 + 225}px)` }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {categories.map((cat, idx) => {
              const isActive = idx === activeCatIndex;
              return (
                <motion.div
                  key={cat.id}
                  className={`story-container ${isActive ? 'active' : 'neighbor'}`}
                  animate={{ 
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    if (!isActive) {
                      setActiveCatIndex(idx);
                    }
                  }}
                >
                  {isActive ? (
                    <>
                      {/* Progress Bars */}
                      <div className="story-progress-container">
                        {stories.map((_, sIdx) => (
                          <div key={sIdx} className="story-progress-bg">
                            <div 
                              className="story-progress-fill"
                              ref={el => { progressRefs.current[sIdx] = el; }}
                              style={{ width: sIdx < currentStoryIndex ? '100%' : '0%', transition: 'none' }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Header */}
                      <div className="story-header">
                        <div className="story-category-info">
                          <span className="story-category-title">{cat.title}</span>
                          <span className="story-date">2026</span>
                        </div>
                      </div>

                      {/* Tap Zones */}
                      <div className="story-tap-zones">
                        <div className="tap-zone left" onClick={handlePrev} />
                        <div className="tap-zone right" onClick={handleNext} />
                      </div>

                      {/* Background */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStoryIndex}
                          className="story-background"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img src={stories[currentStoryIndex]?.image} alt="" className="story-image" />
                          <div className="story-gradient-overlay" />
                        </motion.div>
                      </AnimatePresence>

                      {/* Content */}
                      <div className="story-content">
                        <motion.div 
                          key={`content-${currentStoryIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="story-text-wrapper"
                        >
                          <span className="story-tag">{stories[currentStoryIndex]?.tag}</span>
                          <h2 className="story-name">{stories[currentStoryIndex]?.name}</h2>
                          <p className="story-pitch">{stories[currentStoryIndex]?.pitch}</p>
                        </motion.div>
                        <div className="story-actions">
                          {(stories[currentStoryIndex]?.demo || stories[currentStoryIndex]?.github) && (
                            <a href={stories[currentStoryIndex].demo || stories[currentStoryIndex].github} target="_blank" rel="noopener noreferrer" className="story-action-btn">
                              {stories[currentStoryIndex].demo ? 'View Live Demo' : 'View on GitHub'}
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={cat.stories[0].image} alt="" className="story-image" />
                      <div className="story-overlay-dim" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>,
    document.body
  );
};
