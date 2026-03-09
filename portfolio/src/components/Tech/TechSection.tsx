import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const TechScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color="#00f2ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </Sphere>
      </Float>
      <OrbitControls enableZoom={false} autoRotate />
    </>
  );
};

const TechSection: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <TechScene />
        </Suspense>
      </Canvas>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        left: '40px', 
        zIndex: 10,
        color: 'var(--color-tech-accent)',
        fontFamily: 'var(--font-mono)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>&lt;TECH_SIDE /&gt;</h2>
        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>AI FULL STACK ENGINEER</p>
      </div>
    </div>
  );
};

export default TechSection;
