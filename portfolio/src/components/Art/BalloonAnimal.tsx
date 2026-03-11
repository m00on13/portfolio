import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BalloonAnimal: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const balloonMaterial = (
    <meshPhysicalMaterial 
      color="#ff00ff" 
      roughness={0.1} 
      metalness={0.1} 
      transmission={0.2}
      thickness={1}
      clearcoat={1}
      clearcoatRoughness={0.1}
    />
  );

  return (
    <group ref={groupRef} scale={0.6}>
      {/* Body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.5, 2, 8, 16]} />
        {balloonMaterial}
      </mesh>

      {/* Head */}
      <group position={[1.5, 1, 0]}>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
          {balloonMaterial}
        </mesh>
        {/* Ears */}
        <mesh position={[0.2, 0.6, 0.4]} rotation={[1, 0, 0]}>
          <capsuleGeometry args={[0.2, 1, 8, 16]} />
          {balloonMaterial}
        </mesh>
        <mesh position={[0.2, 0.6, -0.4]} rotation={[-1, 0, 0]}>
          <capsuleGeometry args={[0.2, 1, 8, 16]} />
          {balloonMaterial}
        </mesh>
        {/* Nose */}
        <mesh position={[0.6, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
          {balloonMaterial}
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-1, -1, 0.5]} rotation={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        {balloonMaterial}
      </mesh>
      <mesh position={[-1, -1, -0.5]} rotation={[-0.5, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        {balloonMaterial}
      </mesh>
      <mesh position={[1, -1, 0.5]} rotation={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        {balloonMaterial}
      </mesh>
      <mesh position={[1, -1, -0.5]} rotation={[-0.5, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        {balloonMaterial}
      </mesh>

      {/* Tail */}
      <mesh position={[-1.8, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
        {balloonMaterial}
      </mesh>
    </group>
  );
};

export default BalloonAnimal;
