import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './EducationSection.css';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  { label: 'Research',     text: 'Presented at SMARTCOM 2025 International Conference, Pune — Tesla\'s Agile Methodology in the Automotive Industry' },
  { label: 'Hackathons',   text: 'SIH 2024 Finalist · Top 75 — Odoo × CHARUSAT · KDPIT Solution Challenge Finalist' },
  { label: 'Leadership',   text: 'Head, Women Development Cell (IT Dept) · Graphic Designer — CP Squad & KDPIT Media Crew' },
  { label: 'Certifications', text: 'NPTEL: DSA, DBMS, Modern C++ · Infosys Springboard: HTML, CSS, JS, Agile Scrum' },
];

export const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const achRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      [labelRef, headingRef, cardRef, achRef].forEach((ref, i) => {
        gsap.from(ref.current, {
          opacity: 0, y: 30, duration: 0.75, delay: i * 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-inner">
        <div className="section-label" ref={labelRef}>
          <span className="section-label-line" />
          <span className="section-label-text">// 05 — Education</span>
        </div>

        <h2 className="section-heading" ref={headingRef}>
          Where it started.
        </h2>

        {/* Degree card */}
        <div className="edu-card" ref={cardRef}>
          <div className="edu-card-left">
            <p className="edu-degree">B.Tech, Information Technology</p>
            <p className="edu-school">Charotar University of Science and Technology (CHARUSAT)</p>
            <p className="edu-meta">Gujarat, India · CGPA 7.9</p>
          </div>
          <div className="edu-card-right">
            <span className="edu-years">2022 – 2026</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="edu-achievements" ref={achRef}>
          {ACHIEVEMENTS.map(({ label, text }) => (
            <div className="edu-achievement-row" key={label}>
              <span className="edu-ach-label">{label}</span>
              <span className="edu-ach-text">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
