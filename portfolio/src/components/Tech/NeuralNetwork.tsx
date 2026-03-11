import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, lines } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const numNodes = 40;
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }

    const lines: number[][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          lines.push([i, j]);
        }
      }
    }

    return { nodes, lines };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00f2ff" />
        </mesh>
      ))}
      <group>
        {lines.map(([i, j], idx) => {
          const points = [nodes[i], nodes[j]];
          return (
            <line key={idx}>
              <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
              <lineBasicMaterial attach="material" color="#00f2ff" transparent opacity={0.2} />
            </line>
          );
        })}
      </group>

      {/* Large Central Nodes representing Agents */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export default NeuralNetwork;
