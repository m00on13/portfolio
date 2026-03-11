import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import BalloonAnimal from './BalloonAnimal';

const ArtSection: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f8f8f8' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <BalloonAnimal />
          
          {/* Floating Doodles / Paint Splatters (Spheres as placeholders for splatters) */}
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <Sphere position={[-3, 2, -1]} args={[0.3, 32, 32]}>
              <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.5} />
            </Sphere>
          </Float>
          
          <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
            <Sphere position={[3, -1, -2]} args={[0.2, 32, 32]}>
              <meshStandardMaterial color="#7928ca" emissive="#7928ca" emissiveIntensity={0.5} />
            </Sphere>
          </Float>
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere position={[0, -2.5, 1]} args={[0.4, 32, 32]}>
              <meshStandardMaterial color="#ffbd00" emissive="#ffbd00" emissiveIntensity={0.5} />
            </Sphere>
          </Float>
        </Suspense>
        
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
        
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        right: '40px', 
        zIndex: 10,
        textAlign: 'right',
        color: '#1a1a1a',
        fontFamily: '"Outfit", sans-serif'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>DIGITAL ARTIST</h2>
        <p style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '1.2rem' }}>CREATIVE CODE & DESIGN</p>
      </div>
    </div>
  );
};

export default ArtSection;
