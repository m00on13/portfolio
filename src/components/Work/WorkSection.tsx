import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './WorkSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
interface Project {
  name: string;
  client: string;
  stack: string[];
  status: 'In Production' | 'Shipped' | 'Deployed';
  outcomes: string[];
}

interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  projects: Project[];
}

/* ─── Data ─── */
const EXPERIENCE: Job[] = [
  {
    role: 'AI & Full-Stack Developer Intern',
    company: 'Dataslush Pvt. Ltd.',
    period: 'Sep 2025 – Present',
    location: 'Ahmedabad, Gujarat',
    projects: [
      {
        name: 'Brand Guardian — Marketing OS',
        client: 'US-based Marketing Agency',
        stack: ['Python', 'n8n', 'Supabase', 'RAG', 'FastMCP', 'Google Drive API'],
        status: 'In Production',
        outcomes: [
          'Built zero-touch client onboarding that provisions cloud folders, DB tables & live n8n workflows in under 60 seconds — eliminating all manual setup.',
          'Architected a multi-tenant system with brand-specific RAG pipelines and MCP server integration, enabling isolated, scalable deployments across clients.',
        ],
      },
      {
        name: 'RAG Chatbot — Women in Tech Summit',
        client: 'International Tech Conference, Poland',
        stack: ['n8n', 'Gemini API', 'Supabase', 'Vector Store'],
        status: 'Deployed',
        outcomes: [
          'Architected and deployed a RAG chatbot serving thousands of attendees across Europe — handling event queries, speaker info, and schedule navigation in real time.',
          'Sole point of contact for requirement gathering and delivery — scoped, built, and shipped the system end-to-end independently.',
        ],
      },
      {
        name: 'MovieLens — Sentiment & Occupancy Analytics',
        client: 'Gujarati Film Marketing Company',
        stack: ['Python', 'FastAPI', 'Apify', 'GCP', 'Looker Studio'],
        status: 'In Production',
        outcomes: [
          'Spearheaded full-stack data engineering across 5 platforms and 5 cities — orchestrating scraping pipelines that pull social media, IMDb, and BookMyShow data at scale.',
          'Transformed raw multi-source data into 2 decision-ready Looker Studio dashboards actively used by studio stakeholders to track sentiment and occupancy trends.',
        ],
      },
      {
        name: 'Pre-Sales Deck Generator',
        client: 'Marketing Agency',
        stack: ['Python', 'Gemini', 'GCP'],
        status: 'Shipped',
        outcomes: [
          'Designed and shipped an automated PPT generation pipeline that compresses a 5–6 stage brand and competitor research process into a single trigger.',
          'Cut deck turnaround from hours to minutes — eliminating manual creation and freeing the sales team from repetitive research overhead entirely.',
        ],
      },
      {
        name: 'AI Revenue Signal Detector',
        client: 'Internal Hackathon — Tech Lead',
        stack: ['Gemini', 'Apify', 'Python', 'Slack API'],
        status: 'Shipped',
        outcomes: [
          'Conceived and led development of a cross-sell/upsell intelligence tool ingesting SOWs, call transcripts, and LinkedIn signals to surface revenue opportunities automatically.',
          'Extended post-hackathon with a SOW summarisation pipeline and automated budget-overspend alerts delivered via Slack bot.',
        ],
      },
      {
        name: 'Match Setup UI — Cricket Analytics Platform',
        client: 'Box Cricket Player Analytics',
        stack: ['React', 'TypeScript', 'OpenCV', 'YOLO'],
        status: 'Shipped',
        outcomes: [
          'Built the React + TypeScript match configuration interface — camera setup, real-time match controls, and player tracking — integrated into a computer-vision pipeline for ball detection and performance analytics.',
        ],
      },
    ],
  },
  {
    role: 'ReactJS Intern',
    company: 'Techify Solutions Pvt. Ltd.',
    period: 'May 2024 – Jun 2024',
    location: 'Ahmedabad, Gujarat',
    projects: [
      {
        name: 'College Management Module',
        client: 'Internal Product',
        stack: ['React', 'Context API', 'React Router', 'MySQL'],
        status: 'Shipped',
        outcomes: [
          'Developed and shipped a React.js app with Hooks, Context API and React Router, actively used by 500+ users; engineered a full-featured College Management module with end-to-end CRUD and MySQL integration.',
          'Designed and launched a contextual user guide system that reduced new-user onboarding time by 40%, directly lowering support overhead for the product team.',
        ],
      },
    ],
  },
];

/* ─── Sub-component: Project Card ─── */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [expanded, setExpanded] = useState(index === 0); // first card open by default
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`work-project-card ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
    >
      <button
        className="work-project-header"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <div className="work-project-header-left">
          <span className={`work-status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
            {project.status}
          </span>
          <span className="work-project-name">{project.name}</span>
        </div>
        <div className="work-project-header-right">
          <span className="work-project-client">{project.client}</span>
          <span className={`work-chevron ${expanded ? 'open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      <div className="work-project-body">
        <ul className="work-outcomes">
          {project.outcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <div className="work-stack-pills">
          {project.stack.map(tag => (
            <span className="work-stack-pill" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section label fade-up
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: labelRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // Heading fade-up
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // Stagger job blocks
      jobRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <div className="work-inner">
        {/* Section label */}
        <div className="work-label" ref={labelRef}>
          <span className="work-label-line" />
          <span className="work-label-text">// 02 — Experience</span>
        </div>

        <h2 className="work-heading" ref={headingRef}>
          Production work,<br />not just tutorials.
        </h2>

        <div className="work-jobs">
          {EXPERIENCE.map((job, ji) => (
            <div
              className="work-job"
              key={ji}
              ref={el => { jobRefs.current[ji] = el; }}
            >
              {/* Job header */}
              <div className="work-job-meta">
                <div className="work-job-meta-left">
                  <div className="work-timeline-dot" />
                  <div>
                    <p className="work-job-role">{job.role}</p>
                    <p className="work-job-company">{job.company}</p>
                  </div>
                </div>
                <div className="work-job-meta-right">
                  <span className="work-job-period">{job.period}</span>
                  <span className="work-job-location">{job.location}</span>
                </div>
              </div>

              {/* Project cards */}
              <div className="work-projects">
                {job.projects.map((proj, pi) => (
                  <ProjectCard key={pi} project={proj} index={pi} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
