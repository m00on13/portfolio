import { GraduationCap, Palette, Shield, MessageSquareText, BarChart3, FileText, Zap, Monitor, Eye, Table, Layout, Gamepad2, BookOpen } from 'lucide-react';
import { GitHub } from '../components/ui/Icons'; // I will create this next
import type { HighlightCategory, GridProject } from '../types/portfolio';

// Assets
import mansiProfileImg from '../assets/profile.png';
import imgEduCover from '../assets/education.jfif';
import imgGithubCover from '../assets/github.jfif';
import imgPlaygroundCover from '../assets/playground.jfif';

export { mansiProfileImg };

export const TECH_STACK = [
  '#python', '#react', '#rag-pipelines', '#mcp', '#n8n', '#nextjs',
  '#figma', '#langchain', '#typescript', '#vertex-ai', '#postgresql',
  '#fastapi', '#supabase', '#gcp', '#tensorflow', '#mediapipe',
];

const IMG_WORK = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop';
const IMG_EDU = 'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2000&auto=format&fit=crop';
const IMG_AI = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop';
const IMG_CREATIVE = 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop';

export const HIGHLIGHTS: HighlightCategory[] = [
  {
    id: 'education', title: 'education', Icon: GraduationCap,
    coverImage: imgEduCover,
    bgColor: '#e8f5e9', iconColor: '#2e7d32',
    stories: [
      { id: 'degree', tag: 'B.Tech · 2022–2026', name: 'Information Technology', pitch: 'Charotar University of Science and Technology (CHARUSAT), Gujarat · CGPA 7.9', stack: [], image: IMG_EDU },
      { id: 'research', tag: 'Research · 2025', name: 'SMARTCOM Conference', pitch: 'Presented on Tesla\'s Agile Methodology in the Automotive Industry at international conference in Pune.', stack: [], image: IMG_EDU },
      { id: 'hackathons', tag: 'Competitions', name: 'Hackathon Finalist', pitch: 'SIH 2024 Finalist · Top 75 Odoo × CHARUSAT · KDPIT Solution Challenge Finalist', stack: [], image: IMG_EDU },
    ]
  },
  {
    id: 'github', title: 'github', Icon: GitHub,
    coverImage: imgGithubCover,
    bgColor: '#f5f5f5', iconColor: '#24292e',
    stories: [
      { id: 'isl', tag: 'AI · Computer Vision', name: 'Real-Time ISL Detection', pitch: 'Web app that recognises Indian Sign Language gestures in real time via webcam with 92% accuracy.', stack: ['React', 'Flask', 'TensorFlow', 'MediaPipe'], image: IMG_AI, github: 'https://github.com/m00on13' },
      { id: 'bg', tag: 'AI · Production', name: 'Brand Guardian', pitch: 'Zero-touch client onboarding that provisions cloud folders, DB tables & live n8n workflows in under 60s.', stack: ['Python', 'n8n', 'Supabase', 'RAG', 'FastMCP'], image: IMG_WORK, github: 'https://github.com/m00on13' },
      { id: 'rag-chat', tag: 'AI · Deployed', name: 'RAG Chatbot — WiT Summit', pitch: 'RAG chatbot serving thousands of attendees across Europe for event queries and schedule navigation.', stack: ['n8n', 'Gemini API', 'Supabase', 'Vector Store'], image: IMG_WORK, github: 'https://github.com/m00on13' },
    ]
  },
  {
    id: 'playground', title: 'playground', Icon: Palette,
    coverImage: imgPlaygroundCover,
    bgColor: '#fffde7', iconColor: '#f57f17',
    stories: [
      { id: 'portfolio', tag: 'Frontend · UX', name: 'Immersive Portfolio', pitch: 'A premium, highly interactive personal portfolio with GSAP animations and 3D effects.', stack: ['React', 'GSAP', 'Framer Motion'], image: IMG_CREATIVE, demo: 'https://mansi-patel.com' },
      { id: 'ecommerce', tag: 'UI/UX Design', name: 'Modern E-commerce UI', pitch: 'A sleek, conversion-optimized Figma concept for a boutique fashion brand.', stack: ['Figma', 'Prototyping', 'Design Systems'], image: IMG_CREATIVE },
    ]
  },
];

export const GRID_PROJECTS: GridProject[] = [
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
