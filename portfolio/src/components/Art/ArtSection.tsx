import React from 'react';
import { motion } from 'framer-motion';

const ArtSection: React.FC = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative organic shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          borderRadius: ["20% 70% 50% 30%", "50% 20% 30% 70%", "20% 70% 50% 30%"]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'linear-gradient(45deg, #ff0080, #7928ca)',
          filter: 'blur(60px)',
          opacity: 0.3,
          zIndex: 0
        }}
      />
      
      <div style={{ zIndex: 1, textAlign: 'left', color: 'var(--color-art-text)' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>ART SIDE</h2>
        <p style={{ fontSize: '1.5rem', maxWidth: '300px', marginTop: '1rem' }}>
          Exploring the boundaries of digital creativity and emotion.
        </p>
      </div>
    </div>
  );
};

export default ArtSection;
