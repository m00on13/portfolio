import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { StoryViewer } from '../Projects/StoryViewer';
import type { ProjectStory } from '../Projects/StoryViewer';
import mansiProfileImg from '../../assets/mansi-id.png';
import {
  Briefcase, GraduationCap, Bot, Palette, FileCode2,
  Grid3X3, Play, BookOpen,
  Shield, MessageSquareText, BarChart3, FileText,
  Zap, Monitor, Eye, Table, Layout, Gamepad2,
  Mail,
} from 'lucide-react';
import './SocialLayout.css';

// Custom SVG components for brands missing in this lucide-react version
const GitHub = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

/* ─── Tech Stack ─── */
const TECH_STACK = [
  '#python', '#react', '#rag-pipelines', '#mcp', '#n8n', '#nextjs',
  '#figma', '#langchain', '#typescript', '#vertex-ai', '#postgresql',
  '#fastapi', '#supabase', '#gcp', '#tensorflow', '#mediapipe',
];

/* ─── Story Highlights Data ─── */
const IMG_WORK = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop';
const IMG_EDU = 'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2000&auto=format&fit=crop';
const IMG_AI = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop';
const IMG_CREATIVE = 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop';
const IMG_FREELANCE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';

interface HighlightCategory {
  id: string;
  title: string;
  Icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  stories: ProjectStory[];
}

const HIGHLIGHTS: HighlightCategory[] = [
  {
    id: 'internship', title: 'internship', Icon: Briefcase,
    bgColor: '#fff3e0', iconColor: '#e65100',
    stories: [
      { id: 'bg', tag: 'AI · Production', name: 'Brand Guardian', pitch: 'Zero-touch client onboarding that provisions cloud folders, DB tables & live n8n workflows in under 60s.', stack: ['Python', 'n8n', 'Supabase', 'RAG', 'FastMCP'], image: IMG_WORK, github: 'https://github.com/m00on13' },
      { id: 'rag-chat', tag: 'AI · Deployed', name: 'RAG Chatbot — WiT Summit', pitch: 'RAG chatbot serving thousands of attendees across Europe for event queries and schedule navigation.', stack: ['n8n', 'Gemini API', 'Supabase', 'Vector Store'], image: IMG_WORK, github: 'https://github.com/m00on13' },
      { id: 'movielens', tag: 'Data · Production', name: 'MovieLens Analytics', pitch: 'Full-stack data engineering across 5 platforms and 5 cities with Looker Studio dashboards.', stack: ['Python', 'FastAPI', 'Apify', 'GCP'], image: IMG_WORK },
    ]
  },
  {
    id: 'education', title: 'education', Icon: GraduationCap,
    bgColor: '#e8f5e9', iconColor: '#2e7d32',
    stories: [
      { id: 'degree', tag: 'B.Tech · 2022–2026', name: 'Information Technology', pitch: 'Charotar University of Science and Technology (CHARUSAT), Gujarat · CGPA 7.9', stack: [], image: IMG_EDU },
      { id: 'research', tag: 'Research · 2025', name: 'SMARTCOM Conference', pitch: 'Presented on Tesla\'s Agile Methodology in the Automotive Industry at international conference in Pune.', stack: [], image: IMG_EDU },
      { id: 'hackathons', tag: 'Competitions', name: 'Hackathon Finalist', pitch: 'SIH 2024 Finalist · Top 75 Odoo × CHARUSAT · KDPIT Solution Challenge Finalist', stack: [], image: IMG_EDU },
    ]
  },
  {
    id: 'ai-builds', title: 'ai builds', Icon: Bot,
    bgColor: '#f3e5f5', iconColor: '#7b1fa2',
    stories: [
      { id: 'isl', tag: 'AI · Computer Vision', name: 'Real-Time ISL Detection', pitch: 'Web app that recognises Indian Sign Language gestures in real time via webcam with 92% accuracy.', stack: ['React', 'Flask', 'TensorFlow', 'MediaPipe'], image: IMG_AI, github: 'https://github.com/m00on13' },
      { id: 'revenue', tag: 'AI · Hackathon', name: 'AI Revenue Signal Detector', pitch: 'Cross-sell/upsell intelligence tool ingesting SOWs, transcripts and LinkedIn signals.', stack: ['Gemini', 'Apify', 'Python', 'Slack API'], image: IMG_AI },
    ]
  },
  {
    id: 'creative', title: 'creative', Icon: Palette,
    bgColor: '#fffde7', iconColor: '#f57f17',
    stories: [
      { id: 'portfolio', tag: 'Frontend · UX', name: 'Immersive Portfolio', pitch: 'A premium, highly interactive personal portfolio with GSAP animations and 3D effects.', stack: ['React', 'GSAP', 'Framer Motion'], image: IMG_CREATIVE, demo: 'https://mansi-patel.com' },
      { id: 'ecommerce', tag: 'UI/UX Design', name: 'Modern E-commerce UI', pitch: 'A sleek, conversion-optimized Figma concept for a boutique fashion brand.', stack: ['Figma', 'Prototyping', 'Design Systems'], image: IMG_CREATIVE },
    ]
  },
  {
    id: 'freelance', title: 'freelance', Icon: FileCode2,
    bgColor: '#e3f2fd', iconColor: '#1565c0',
    stories: [
      { id: 'presales', tag: 'Automation', name: 'Pre-Sales Deck Generator', pitch: 'Automated PPT pipeline that compresses 5–6 stage research process into a single trigger.', stack: ['Python', 'Gemini', 'GCP'], image: IMG_FREELANCE },
      { id: 'college', tag: 'Full-Stack', name: 'College Management Module', pitch: 'React.js app with full CRUD and MySQL integration, used by 500+ users.', stack: ['React', 'Context API', 'MySQL'], image: IMG_FREELANCE },
    ]
  },
];

/* ─── Project Grid Data ─── */
interface GridProject {
  id: string;
  name: string;
  Icon: React.ElementType;
  bgColor: string;
  stack: string[];
  status: string;
  github?: string;
}

const GRID_PROJECTS: GridProject[] = [
  { id: 'brand-guardian', name: 'Brand Guardian', Icon: Shield, bgColor: '#e8f5e9', stack: ['Python', 'n8n', 'RAG', 'MCP'], status: 'In Production' },
  { id: 'rag-chatbot', name: 'RAG Chatbot', Icon: MessageSquareText, bgColor: '#f3e5f5', stack: ['n8n', 'Gemini', 'Supabase'], status: 'Deployed' },
  { id: 'movielens', name: 'MovieLens Analytics', Icon: BarChart3, bgColor: '#e3f2fd', stack: ['Python', 'FastAPI', 'GCP'], status: 'In Production' },
  { id: 'presales', name: 'Deck Generator', Icon: FileText, bgColor: '#fff3e0', stack: ['Python', 'Gemini', 'GCP'], status: 'Shipped' },
  { id: 'revenue', name: 'Revenue Detector', Icon: Zap, bgColor: '#fffde7', stack: ['Gemini', 'Apify', 'Slack'], status: 'Shipped' },
  { id: 'cricket', name: 'Cricket Analytics', Icon: Monitor, bgColor: '#e0f2f1', stack: ['React', 'TypeScript', 'YOLO'], status: 'Shipped' },
  { id: 'isl', name: 'ISL Detection', Icon: Eye, bgColor: '#fce4ec', stack: ['React', 'TensorFlow', 'MediaPipe'], status: 'Shipped', github: 'https://github.com/m00on13' },
  { id: 'excel', name: 'Excel Analytics', Icon: Table, bgColor: '#ede7f6', stack: ['React', 'Node.js', 'MongoDB'], status: 'Shipped', github: 'https://github.com/m00on13' },
  { id: 'portfolio', name: 'This Portfolio', Icon: Layout, bgColor: '#e1f5fe', stack: ['React', 'GSAP', 'Framer Motion'], status: 'Live' },
  { id: 'ecommerce', name: 'E-commerce UI', Icon: Palette, bgColor: '#fbe9e7', stack: ['Figma', 'Prototyping'], status: 'Concept' },
  { id: 'voxel', name: 'Mini Voxel Engine', Icon: Gamepad2, bgColor: '#f3e5f5', stack: ['C++', 'OpenGL', 'GLSL'], status: 'Experiment', github: 'https://github.com/m00on13' },
  { id: 'college', name: 'College Module', Icon: BookOpen, bgColor: '#e8f5e9', stack: ['React', 'MySQL'], status: 'Shipped' },
];

/* ─── Main Component ─── */
export const SocialLayout = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'reels' | 'blogs'>('projects');
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  useLayoutEffect(() => {
    // Reveal handled by HeroAboutSequence
  }, []);

  const activeHL = HIGHLIGHTS.find(h => h.id === activeHighlight);
  const activeHLIndex = HIGHLIGHTS.findIndex(h => h.id === activeHighlight);

  const handleNextHighlight = () => {
    if (activeHLIndex < HIGHLIGHTS.length - 1) {
      setActiveHighlight(HIGHLIGHTS[activeHLIndex + 1].id);
    } else {
      setActiveHighlight(null);
    }
  };

  return (
    <section id="profile" className="social-layout" ref={sectionRef}>
      <div className="social-container" ref={cardRef}>
        {/* ── Profile Header ── */}
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
                <span className="social-stat-value">12</span>
                <span className="social-stat-label">projects</span>
              </div>
              <div className="social-stat">
                <span className="social-stat-value">4</span>
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
                <a href="mailto:mansi.patel@example.com" className="social-link">
                  <Mail size={20} /> mansi.patel@example.com
                </a>
              </div>

              <div className="social-actions">
                <button onClick={onOpenContact} className="social-btn primary">Contact</button>
                <a href="/Mansi_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn secondary">Resume</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile-only Profile Header (Hidden on Desktop) ── */}
        <div className="social-mobile-header">
          <div className="social-mobile-top">
            <div className="social-avatar-mobile">
              <img src={mansiProfileImg} alt="Mansi Patel" />
            </div>
            <div className="social-mobile-stats">
              <div className="social-stat">
                <span className="social-stat-value">12</span>
                <span className="social-stat-label">projects</span>
              </div>
              <div className="social-stat">
                <span className="social-stat-value">4</span>
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
              <a href="mailto:mansi.patel@example.com" className="social-link">
                <Mail size={18} />
              </a>
            </div>

            <div className="social-actions">
              <button onClick={onOpenContact} className="social-btn primary">Contact</button>
              <a href="/Mansi_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn secondary">Resume</a>
            </div>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <span className="social-section-label">tech stack = hashtags</span>
        <div className="social-techstack">
          {TECH_STACK.map((tag, i) => (
            <span key={tag} className={`tech-hashtag color-${i % 10}`}>{tag}</span>
          ))}
        </div>

        <hr className="social-divider" />

        {/* ── Story Highlights ── */}
        <span className="social-section-label">story highlights = experience + education</span>
        <div className="social-highlights">
          {HIGHLIGHTS.map(hl => (
            <button
              key={hl.id}
              className="highlight-btn"
              onClick={() => setActiveHighlight(hl.id)}
              aria-label={`View ${hl.title} stories`}
            >
              <div className="highlight-icon-ring" style={{ borderColor: hl.iconColor + '40' }}>
                <div className="highlight-icon-inner" style={{ background: hl.bgColor }}>
                  <hl.Icon size={40} color={hl.iconColor} strokeWidth={1.8} />
                </div>
              </div>
              <span className="highlight-btn-label">{hl.title}</span>
            </button>
          ))}
        </div>

        <hr className="social-divider" />

        {/* ── Tab Bar ── */}
        <div className="social-tabs">
          <button className={`social-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Grid3X3 size={24} /> projects
          </button>
          <button className={`social-tab ${activeTab === 'reels' ? 'active' : ''}`} onClick={() => setActiveTab('reels')}>
            <Play size={24} /> reels / demos
          </button>
          <button className={`social-tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            <BookOpen size={24} /> blogs
          </button>
        </div>

        {/* ── Tab Content ── */}
        {activeTab === 'projects' && (
          <>
            <div className="social-grid-label">posts = projects (hover to preview)</div>
            <div className="social-grid">
              {GRID_PROJECTS.map(proj => (
                <div key={proj.id} className="social-grid-card" style={{ background: proj.bgColor }}>
                  <proj.Icon size={64} className="grid-card-icon" strokeWidth={1.2} />
                  <div className="grid-card-overlay">
                    <span className="grid-card-name">{proj.name}</span>
                    <div className="grid-card-stack">
                      {proj.stack.slice(0, 3).map(s => (
                        <span key={s} className="grid-card-pill">{s}</span>
                      ))}
                    </div>
                    <span className="grid-card-status">{proj.status}</span>
                  </div>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="grid-card-link" onClick={e => e.stopPropagation()}>
                      <GitHub size={24} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'reels' && (
          <div className="social-empty-tab">
            <Play size={48} className="social-empty-icon" />
            <span className="social-empty-text">reels & demos coming soon</span>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="social-empty-tab">
            <BookOpen size={48} className="social-empty-icon" />
            <span className="social-empty-text">blog posts coming soon</span>
          </div>
        )}
      </div>

      {/* ── Story Viewer Overlay ── */}
      <AnimatePresence>
        {activeHL && (
          <StoryViewer
            stories={activeHL.stories}
            categoryTitle={activeHL.title}
            onClose={() => setActiveHighlight(null)}
            onNextCategory={handleNextHighlight}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
