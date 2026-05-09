# 🎨 Immersive Social Portfolio

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62e)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A premium, highly interactive personal portfolio inspired by modern social media interfaces. This project features high-fidelity 3D animations, a custom "Instagram-style" story highlight system, and a sleek monochromatic design language.

🔗 **Live Demo:** [mansi-patel.com](https://mansi-patel.com)

---

## ✨ Key Features

- **3D Hero Transformation**: A seamless, scroll-triggered 3D flip animation that transforms the main landing card into a circular profile avatar using GSAP and Framer Motion.
- **Instagram-Style Highlights**: A custom story viewer with:
  - 3D cube-flip transitions between stories.
  - Horizontal neighbor previews for an immersive feel.
  - Progress bars and auto-advance functionality.
  - Interactive touch and keyboard navigation.
- **Dynamic Project Grid**: A clean, bento-style grid displaying key projects with category-specific iconography and status indicators.
- **Premium Aesthetics**: A minimalist, monochromatic design system with subtle micro-animations and a custom splash cursor effect.
- **Responsive & Performant**: Fully optimized for mobile and desktop, built with performance in mind using Vite and modern React patterns.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### Animation & UI
- **Animations**: [GSAP](https://greensock.com/gsap/) (3D transforms), [Framer Motion](https://www.framer.com/motion/) (Gestures & Layout)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Custom tokens & Design System)

### Infrastructure
- **Deployment**: [Firebase Hosting](https://firebase.google.com/)
- **Tools**: ESLint, Prettier

---

## 📂 Project Structure

```bash
src/
├── assets/             # Static images and media
├── components/         # Modular UI components
│   ├── SocialLayout/   # Main interactive hub & Stories
│   ├── Contact/        # Modal-based contact section
│   ├── Navbar/         # Navigation components
│   └── ui/             # Reusable UI primitives
├── constants/          # Data definitions (Projects, Highlights)
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
└── App.tsx             # Root application entry
```

---

## 🚀 Getting Started

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

Developed with ❤️ by [Mansi Patel](https://github.com/m00on13)
