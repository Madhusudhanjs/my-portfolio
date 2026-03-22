"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Sparkles, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

function PremiumOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state: any) => {
    if (!orbRef.current) return;
    
    // Breathing pulse effect (scale)
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    orbRef.current.scale.set(scale, scale, scale);

    // Mouse parallax
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.3;
    orbRef.current.position.x += (targetX - orbRef.current.position.x) * 0.05;
    orbRef.current.position.y += (targetY - orbRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
        <Sphere ref={orbRef} args={[1.3, 64, 64]}>
          <MeshDistortMaterial
            color="#0a0a0a" // deep matte black
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.4}
            metalness={0.8}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </Sphere>
        {/* Subtle white inner glow that tracks the orb */}
        <pointLight ref={glowRef} color="#ffffff" intensity={2} distance={4} />
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
