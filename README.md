# Immersive Social Portfolio

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62e)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

A premium, highly interactive personal portfolio inspired by modern social media interfaces. This project features high-fidelity 3D animations, a custom story highlight system, and a sleek monochromatic design language.

**Live Demo:** [mansi-patel.com](https://mansi-patel.com)

---

## Key Features

- **3D Hero Transformation**: A seamless, scroll-triggered 3D flip animation that transforms the main landing card into a circular profile avatar using GSAP and Framer Motion.
- **Instagram-Style Highlights**: A custom story viewer with:
  - 3D cube-flip transitions between stories.
  - Horizontal neighbor previews for an immersive feel.
  - Progress bars and auto-advance functionality.
  - Interactive touch and keyboard navigation.
- **Dynamic Content Management**: Fully integrated with Supabase for real-time management of projects, stories, and media assets.
- **Premium Aesthetics**: A minimalist, monochromatic design system with subtle micro-animations and a custom splash cursor effect.
- **Responsive and Performant**: Optimized for mobile and desktop, built with modern React patterns and Vite for rapid loading.

---

## Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript

### Backend and Database
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Buckets for project assets and story media
- **Authentication**: Supabase Auth (for administrative access)

### Animation and UI
- **Animations**: GSAP (3D transforms), Framer Motion (Gestures and Layout)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with a custom design system

---

## Project Structure

```bash
src/
├── assets/             # Static images and media
├── components/         # Modular UI components
│   ├── SocialLayout/   # Main interactive hub and Stories
│   ├── Contact/        # Modal-based contact section
│   ├── Navbar/         # Navigation components
│   └── ui/             # Reusable UI primitives
├── constants/          # Data definitions
├── hooks/              # Custom React hooks
├── lib/                # Third-party integrations (Supabase client)
├── types/              # TypeScript interfaces
└── App.tsx             # Root application entry
```

---

## Project Roadmap

### Phase 1: Dynamic Integration (In Progress)
- Migrate hardcoded project data to Supabase.
- Implement real-time fetching for story highlights.
- Configure Supabase Storage for high-resolution asset delivery.

### Phase 2: Content Expansion
- Medium Blog Integration: Automated embedding of latest articles.
- Case Study Pages: Detailed views for featured projects.
- Interactive Skills Matrix: A visual representation of technical proficiency.

### Phase 3: Optimization
- SEO enhancements and Meta tag optimization.
- Performance auditing for 3D animation smoothness on low-end devices.
- Implementation of a global state management pattern for story progress.

---

## Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/m00on13/portfolio.git
   ```
2. Navigate to the directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```

### Production
Build the project for production:
```bash
npm run build
```

---

Developed by [Mansi Patel](https://github.com/m00on13)
