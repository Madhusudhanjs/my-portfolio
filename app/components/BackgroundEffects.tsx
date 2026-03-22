"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron, Box, Torus } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function SubtleParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 35; 
    }
    return pos;
  }, []);

  useFrame((state: RootState) => {
    if (!ref.current) return;
    const { clock, pointer } = state;
    ref.current.rotation.x = clock.elapsedTime * 0.02 + (pointer.y * 0.02);
    ref.current.rotation.y = clock.elapsedTime * 0.015 + (pointer.x * 0.02);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.7} />
    </Points>
  );
}

// Added extra 3D background components requested by user (Now much more visible)
function FloatingGeometries() {
  return (
    <group>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8b5cf6" />
      
      {/* Floating 3D Primitives - Moved much closer to camera, made brightly wireframed */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2} position={[-6, 4, -4]}>
         <Icosahedron args={[1.5, 0]}>
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.2} wireframe opacity={0.4} transparent />
         </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[7, -2, -6]}>
         <Box args={[1.8, 1.8, 1.8]}>
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} wireframe opacity={0.3} transparent />
         </Box>
      </Float>
      
      <Float speed={0.8} rotationIntensity={1} floatIntensity={3} position={[-2, -7, -8]}>
         <Torus args={[3, 0.4, 16, 100]}>
            <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.2} wireframe opacity={0.25} transparent />
         </Torus>
      </Float>
    </group>
  );
}

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      
      {/* 1. Base Layer: Smooth Matte Gradient (Black -> Dark Gray) */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "0% 0%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-0 opacity-[0.85] blur-[150px]"
        style={{
          background: "radial-gradient(circle at center, rgba(38,38,38,0.3) 0%, rgba(23,23,23,0.6) 40%, #0a0a0a 80%)",
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* 2. Floating Blur Blobs */}
      <motion.div animate={{ x: ["0%", "3%", "-2%", "0%"], y: ["0%", "-2%", "3%", "0%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-neutral-700/10 blur-[150px]" />
      <motion.div animate={{ x: ["0%", "-3%", "4%", "0%"], y: ["0%", "4%", "-3%", "0%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[0%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-zinc-800/10 blur-[160px]" />
      <motion.div animate={{ x: ["0%", "4%", "-3%", "0%"], y: ["0%", "-5%", "4%", "0%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute top-[40%] right-[40%] w-[40vw] h-[40vw] rounded-full bg-stone-700/10 blur-[140px]" />

      {/* 3. Subtle R3F Particle & Primitive Layer */}
      <div className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none opacity-80">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
          <SubtleParticles />
          <FloatingGeometries />
        </Canvas>
      </div>

      {/* 4. Light Noise Texture */}
      <div className="absolute inset-0 bg-black/40" />
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} 
      />
    </div>
  );
}
