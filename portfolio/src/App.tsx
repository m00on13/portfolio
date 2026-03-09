import React, { useState, useRef } from 'react';
import './index.css';
import TechSection from './components/Tech/TechSection';
import ArtSection from './components/Art/ArtSection';

const App: React.FC = () => {
  const [splitPosition, setSplitPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = ((clientX - rect.left) / rect.width) * 100;
      setSplitPosition(Math.max(10, Math.min(90, x)));
    }
  };

  return (
    <div 
      className="portfolio-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <div 
        className="split-section tech-section" 
        style={{ width: `${splitPosition}%` }}
      >
        <TechSection />
      </div>

      <div 
        className="split-section art-section" 
        style={{ width: `${100 - splitPosition}%` }}
      >
        <ArtSection />
      </div>

      <div className="handle" style={{ left: `${splitPosition}%` }} />

      <div className="name-overlay">
        <h1 className="name-text">
          Mansi<br />Patel
        </h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8 }}>
          AI Explorer / Digital Artist
        </p>
      </div>
    </div>
  );
};

export default App;
