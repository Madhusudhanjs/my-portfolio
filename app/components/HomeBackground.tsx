"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Points, PointMaterial, Grid } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// 1. Particle Layer: Subtle drift, glowing dots
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        // distribute them in a wider background space
      pos[i] = (Math.random() - 0.5) * 20; 
    }
    return pos;
  }, []);

  useFrame((state: any) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03 + (state.pointer.y * 0.05);
    ref.current.rotation.y = state.clock.elapsedTime * 0.02 + (state.pointer.x * 0.05);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a855f7" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

// 2. Holographic Floor Grid
function HologramGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state: any) => {
    if (!gridRef.current) return;
    // Animate grid slowly moving towards camera for continuous depth effect
    gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 1;
    
    // Parallax tilt based on mouse
    gridRef.current.rotation.x = (state.pointer.y * 0.05);
    gridRef.current.rotation.y = (state.pointer.x * 0.05);
  });

  return (
    <group ref={gridRef}>
      <Grid 
        position={[0, -2.5, 0]} 
        args={[30, 30]} 
        cellSize={0.5} 
        cellThickness={1} 
        cellColor="#2563eb" 
        sectionSize={2.5} 
        sectionThickness={1.5} 
        sectionColor="#7e22ce" 
        fadeDistance={15} 
        fadeStrength={1} 
      />
    </group>
  );
}

// 3. 3D Floating Orbs Layer: Glassmorphism / Distorted Spheres
function AnimatedOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state: any) => {
    if (!groupRef.current) return;
    
    // Smooth mouse parallax effect
    const targetX = (state.pointer.x * 1.5);
    const targetY = (state.pointer.y * 1.5);
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;

    if (orb1Ref.current) {
        orb1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4 + 1.2;
        orb1Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
    if (orb2Ref.current) {
        orb2Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.5 - 1.5;
        orb2Ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (orb3Ref.current) {
        orb3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.6;
        orb3Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orb 1: Purple Distorted */}
      <Sphere ref={orb1Ref} args={[1.2, 64, 64]} position={[-3.5, 1.2, -4]}>
        <MeshDistortMaterial
          color="#7e22ce"
          attach="material"
          distort={0.4}
          speed={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Orb 2: Deep Blue Distorted */}
      <Sphere ref={orb2Ref} args={[1.5, 64, 64]} position={[3.5, -1.5, -5]}>
        <MeshDistortMaterial
          color="#1d4ed8"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Orb 3: Cyan Distorted (background accent) */}
      <Sphere ref={orb3Ref} args={[0.8, 64, 64]} position={[1, 2, -8]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.3}
          speed={1}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#a855f7" />
    </group>
  );
}

export default function HomeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#02010A] pointer-events-none">
      
      {/* 1. Moving Gradient Blobs */}
      <motion.div
        animate={{ x: ["0%", "5%", "-5%", "0%"], y: ["0%", "-5%", "5%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/15 blur-[120px]"
      />
      <motion.div
        animate={{ x: ["0%", "-5%", "5%", "0%"], y: ["0%", "5%", "-5%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[0%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-purple-600/15 blur-[150px]"
      />
      <motion.div
        animate={{ x: ["0%", "8%", "-8%", "0%"], y: ["0%", "-8%", "8%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/10 blur-[100px]"
      />

      {/* 2. Light Rays / Glow Beams */}
      <div className="absolute top-[-10%] left-[15%] w-[20vw] h-[150vh] bg-gradient-to-b from-blue-400/10 via-transparent to-transparent rotate-[25deg] blur-[40px] transform-gpu" />
      <div className="absolute top-[-20%] right-[15%] w-[15vw] h-[150vh] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent rotate-[-15deg] blur-[50px] transform-gpu" />

      {/* 3. React Three Fiber Canvas (Orbs, Particles, Grid) */}
      <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen pointer-events-none transition-all duration-1000">
        <Canvas 
            camera={{ position: [0, 0, 6], fov: 50 }} 
            dpr={[1, 2]} 
            eventSource={typeof document !== "undefined" ? document.body : undefined} 
            eventPrefix="client"
        >
          <HologramGrid />
          <ParticleField />
          <AnimatedOrbs />
        </Canvas>
      </div>

      {/* 4. Soft Shadow & Noise Texture Overlay for Premium Vibe */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Noise Texture SVG Data URI */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} 
      />
    </div>
  );
}
