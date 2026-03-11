import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';

const TechSection: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <NeuralNetwork />
          
          {/* Floating Code Blocks */}
          <Float speed={5} rotationIntensity={0.2} floatIntensity={1}>
            <Text
              position={[-4, 2, -2]}
              fontSize={0.4}
              color="#00f2ff"
              font="monospace"
              anchorX="center"
              anchorY="middle"
            >
              {"const ai = new Agent();\nai.think();"}
            </Text>
          </Float>
          
          <Float speed={4} rotationIntensity={0.1} floatIntensity={0.5}>
            <Text
              position={[4, -2, -1]}
              fontSize={0.3}
              color="#00f2ff"
              font="monospace"
              anchorX="center"
              anchorY="middle"
              fillOpacity={0.5}
            >
              {"for (let node of network) {\n  node.fire();\n}"}
            </Text>
          </Float>
        </Suspense>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        left: '40px', 
        zIndex: 10,
        color: '#00f2ff',
        fontFamily: 'var(--font-mono)'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>&lt;AI_ENGINEER /&gt;</h2>
        <p style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '1.2rem' }}>BUILDING INTELLIGENT SYSTEMS</p>
      </div>
    </div>
  );
};

export default TechSection;
