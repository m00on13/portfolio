import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  tag: string;
  name: string;
  pitch: string;
  outcome: string;
  stack: string[];
  github: string;
  demo?: string;
  placeholder?: boolean;
}

const PROJECTS: Project[] = [
  {
    tag: 'Full-Stack · AI · Computer Vision',
    name: 'Real-Time Indian Sign Language Detection',
    pitch: 'A full-stack web app that recognises ISL gestures in real time via webcam.',
    outcome: '92% gesture recognition accuracy · trained on 10,000+ samples · WebRTC integration',
    stack: ['React', 'Flask', 'TensorFlow', 'MediaPipe', 'WebRTC'],
    github: 'https://github.com/mansi-patel',
  },
  {
    tag: 'Full-Stack · Data Visualisation',
    name: 'Excel Analytics Platform',
    pitch: 'Upload Excel files, explore interactive 2D/3D charts, and manage team access — all in one place.',
    outcome: 'JWT auth · Role-based access · 2D/3D dashboards with Chart.js & Three.js · Admin panel',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Three.js'],
    github: 'https://github.com/mansi-patel',
  },
  {
    tag: 'Coming Soon',
    name: 'Next Build — In Progress',
    pitch: 'Something new is being built. Follow along on GitHub to see what comes next.',
    outcome: '',
    stack: [],
    github: 'https://github.com/mansi-patel',
    placeholder: true,
  },
];

export const ProjectsSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);

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
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.75, delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-inner">
        <div className="section-label" ref={labelRef}>
          <span className="section-label-line" />
          <span className="section-label-text">// 03 — Projects</span>
        </div>

        <h2 className="section-heading" ref={headingRef}>
          Things I've built.
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`project-card ${p.placeholder ? 'project-card--placeholder' : ''}`}
              ref={el => { cardsRef.current[i] = el; }}
            >
              <div className="project-card-top">
                <span className="project-tag">{p.tag}</span>
                <div className="project-card-links">
                  {!p.placeholder && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                       className="project-link" aria-label="GitHub repository">
                      <GitHubIcon />
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                       className="project-link project-link--demo" aria-label="Live demo">
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-name">{p.name}</h3>
              <p className="project-pitch">{p.pitch}</p>

              {p.outcome && (
                <p className="project-outcome">{p.outcome}</p>
              )}

              {p.stack.length > 0 && (
                <div className="project-stack">
                  {p.stack.map(tag => (
                    <span className="project-pill" key={tag}>{tag}</span>
                  ))}
                </div>
              )}

              {p.placeholder && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                   className="project-follow-link">
                  Follow on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
