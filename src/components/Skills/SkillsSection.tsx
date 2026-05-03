import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    category: 'AI & Machine Learning',
    pills: ['RAG Pipelines', 'LangChain', 'Gemini API', 'MCP Systems', 'Vector Databases', 'Agentic Workflows', 'Prompt Engineering', 'TensorFlow', 'MediaPipe'],
  },
  {
    category: 'Full-Stack Development',
    pills: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Node.js', 'Streamlit', 'REST APIs', 'Python', 'JavaScript'],
  },
  {
    category: 'Automation & Data',
    pills: ['n8n', 'Playwright', 'Apify', 'Apache Airflow', 'VAPI', 'CRON Jobs', 'CI/CD Pipelines', 'Shell Scripting'],
  },
  {
    category: 'Cloud & Infrastructure',
    pills: ['GCP', 'Firebase', 'Supabase', 'MySQL', 'MongoDB', 'Google Drive API', 'Looker Studio'],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);

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
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-inner">
        <div className="section-label" ref={labelRef}>
          <span className="section-label-line" />
          <span className="section-label-text">// 04 — Stack</span>
        </div>

        <h2 className="section-heading" ref={headingRef}>
          Tools I think in.
        </h2>

        <div className="skills-rows">
          {SKILLS.map((group, i) => (
            <div
              className="skills-row"
              key={i}
              ref={el => { rowRefs.current[i] = el; }}
            >
              <span className="skills-category">{group.category}</span>
              <div className="skills-pills">
                {group.pills.map(pill => (
                  <span className="skills-pill" key={pill}>{pill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
