'use client';

import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/bike.glb';
const TARGET_H = 3.4;

function GLTFRig() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);

  const { scale, yOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const s = TARGET_H / Math.max(size.x, size.y, size.z);
    const halfH = (size.y * s) / 2;

    return { scale: s, yOffset: halfH - center.y * s };
  }, [scene]);

  return <primitive object={scene} ref={groupRef} scale={scale} position={[0, yOffset, 0]} />;
}

/* --- Placeholder Fallback (scooter stylizada) --- */
function PlaceholderBike() {
  const body = { color: '#151d18', metalness: 0.85, roughness: 0.3 };
  const tyre = { color: '#0c0f0d', metalness: 0.2, roughness: 0.9 };
  const neon = { color: '#2ce66f', emissive: '#2ce66f', emissiveIntensity: 2.2, toneMapped: false };

  return (
    <group>
      {/* Rodas --- */}
      {[-1.2, 1.2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.55, 0.16, 20, 48]} />
            <meshStandardMaterial {...tyre} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial {...neon} />
          </mesh>
        </group>
      ))}

      {/* Chassis principal --- */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.3, 0.6]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Underglow verde néon --- */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.38]} />
        <meshStandardMaterial {...neon} />
      </mesh>

      {/* Assento --- */}
      <mesh position={[-0.5, 0.8, 0]}>
        <boxGeometry args={[1.1, 0.2, 0.5]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Direção e guiador --- */}
      <mesh position={[1.15, 0.9, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshStandardMaterial {...body} />
      </mesh>
      <mesh position={[1.45, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.85, 16]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* Farol --- */}
      <mesh position={[1.5, 1.2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...neon} />
      </mesh>
    </group>
  );
}

/* Error boundary para captura de falha GLB */
class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/* --- Canvas Principal (React Three Fiber) --- */
export default function BikeModel3D() {
  return (
    <Canvas
      camera={{ position: [3.8, 1.4, 5.2], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Iluminação cinemática --- */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-4, 3, -4]} color="#2ce66f" intensity={55} />
      <pointLight position={[3, -1, 3]} color="#4a7c5f" intensity={8} />

      <Suspense fallback={null}>
        <ModelBoundary fallback={<PlaceholderBike />}>
          <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.4}>
            <GLTFRig />
          </Float>
        </ModelBoundary>
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.55}
          scale={10}
          blur={2.5}
          far={3}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.65}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  );
}
