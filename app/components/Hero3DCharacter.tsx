"use client";

import { useRef } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Sparkles, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

function PremiumOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state: RootState) => {
    if (!orbRef.current) return;
    
    const { clock, pointer } = state;
    // Breathing pulse effect (scale)
    const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
    orbRef.current.scale.set(scale, scale, scale);

    // Mouse parallax
    const targetX = pointer.x * 0.3;
    const targetY = pointer.y * 0.3;
    orbRef.current.position.x += (targetX - orbRef.current.position.x) * 0.05;
    orbRef.current.position.y += (targetY - orbRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <Float speed={3} rotationIntensity={1.5} floatIntensity={2.5}>
        <Sphere ref={orbRef} args={[1.3, 64, 64]}>
          <MeshDistortMaterial
            color="#050505"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={1}
            clearcoat={1}
          />
        </Sphere>
        {/* Tech Wireframe Overlay */}
        <Sphere args={[1.32, 32, 32]}>
          <meshPhongMaterial 
            color="#10b981" 
            wireframe 
            transparent 
            opacity={0.15} 
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Sphere>
        <pointLight ref={glowRef} color="#10b981" intensity={3} distance={5} />
      </Float>

      {/* Floating particles around character */}
      <Sparkles count={30} scale={4} size={1.2} speed={0.3} opacity={0.4} color="#e5e5e5" />
      
      {/* Soft shadow below character */}
      <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={6} blur={3} far={4} color="#000000" />
      
      {/* Subtle light reflections to create the matte+glossy contrast */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#d4d4d8" />
    </group>
  );
}

export default function Hero3DCharacter() {
  return (
    <div className="w-full h-full min-h-[160px] min-w-[160px] relative pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }} 
        dpr={[1, 2]}
        eventSource={typeof document !== "undefined" ? document.body : undefined} 
        eventPrefix="client"
      >
        <PremiumOrb />
      </Canvas>
    </div>
  );
}
