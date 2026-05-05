import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { StoryViewer } from './StoryViewer';
import type { StoryCategory } from './StoryViewer';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

// Placeholder unsplash images for stories
const IMAGE_AI = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop";
const IMAGE_WEB = "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop";
const IMAGE_GAME = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";

const CATEGORIES: StoryCategory[] = [
  {
    id: 'ai-fullstack',
    title: 'AI & Full-Stack',
    thumbnail: IMAGE_AI,
    stories: [
      {
        id: 'isl',
        tag: 'AI · Computer Vision',
        name: 'Real-Time ISL Detection',
        pitch: 'A web app that recognises Indian Sign Language gestures in real time via webcam.',
        outcome: '92% gesture recognition accuracy · trained on 10,000+ samples · WebRTC integration',
        stack: ['React', 'Flask', 'TensorFlow', 'MediaPipe'],
        github: 'https://github.com/mansi-patel',
        image: IMAGE_AI
      },
      {
        id: 'excel-analytics',
        tag: 'Full-Stack Data',
        name: 'Excel Analytics Platform',
        pitch: 'Upload Excel files, explore interactive 2D/3D charts, and manage team access.',
        outcome: 'JWT auth · Role-based access · 2D/3D dashboards with Chart.js & Three.js',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/mansi-patel',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'web-design',
    title: 'Web & Design',
    thumbnail: IMAGE_WEB,
    stories: [
      {
        id: 'portfolio',
        tag: 'Frontend · UX',
        name: 'Immersive Portfolio',
        pitch: 'A premium, highly interactive personal portfolio designed to stand out.',
        stack: ['React', 'GSAP', 'Framer Motion', 'Three.js'],
        demo: 'https://mansi-patel.com',
        github: 'https://github.com/mansi-patel/portfolio',
        image: IMAGE_WEB
      },
      {
        id: 'ecommerce',
        tag: 'UI/UX Design',
        name: 'Modern E-commerce UI',
        pitch: 'A sleek, conversion-optimized Figma concept for a boutique fashion brand.',
        stack: ['Figma', 'Prototyping', 'Design Systems'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'games',
    title: 'Games & Practice',
    thumbnail: IMAGE_GAME,
    stories: [
      {
        id: 'game-engine',
        tag: 'Game Dev',
        name: 'Mini Voxel Engine',
        pitch: 'An experimental 3D voxel renderer built from scratch to understand graphics pipelines.',
        stack: ['C++', 'OpenGL', 'GLSL'],
        github: 'https://github.com/mansi-patel',
        image: IMAGE_GAME
      },
      {
        id: 'coming-soon',
        tag: 'In Progress',
        name: 'Next Build',
        pitch: 'Always experimenting. Follow along on GitHub to see what comes next.',
        stack: [],
        github: 'https://github.com/mansi-patel',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
      }
    ]
  }
];

export const ProjectsSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const highlightsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 20, duration: 0.7,
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.from(headingRef.current, {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });
      highlightsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, scale: 0.8, y: 20, duration: 0.6, delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeCategoryIndex = CATEGORIES.findIndex(c => c.id === activeCategoryId);
  const activeCategory = CATEGORIES[activeCategoryIndex];

  const handleNextCategory = () => {
    if (activeCategoryIndex < CATEGORIES.length - 1) {
      setActiveCategoryId(CATEGORIES[activeCategoryIndex + 1].id);
    } else {
      setActiveCategoryId(null); // Close if last category
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-inner">
        <div className="section-label" ref={labelRef}>
          <span className="section-label-line" />
          <span className="section-label-text">// 03 — Projects</span>
        </div>

        <h2 className="section-heading" ref={headingRef}>
          My Highlights
        </h2>
        <p className="projects-subtitle">
          Tap a circle to view stories.
        </p>

        {/* Highlights Row */}
        <div className="highlights-row">
          {CATEGORIES.map((cat, i) => (
            <button 
              key={cat.id} 
              className="highlight-item"
              ref={el => { highlightsRef.current[i] = el; }}
              onClick={() => setActiveCategoryId(cat.id)}
              aria-label={`View ${cat.title} projects`}
            >
              <div className="highlight-ring">
                <div className="highlight-image-container">
                  <img src={cat.thumbnail} alt={cat.title} className="highlight-image" />
                </div>
              </div>
              <span className="highlight-title">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full Screen Story Viewer */}
      <AnimatePresence>
        {activeCategory && (
          <StoryViewer 
            stories={activeCategory.stories} 
            categoryTitle={activeCategory.title}
            onClose={() => setActiveCategoryId(null)}
            onNextCategory={handleNextCategory}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
