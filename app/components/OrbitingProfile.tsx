"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Text, Html, Float, Sphere, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

// The abstract AI Orb representing the developer
function PremiumOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state: RootState) => {
    if (!orbRef.current) return;
    const { clock } = state;
    const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
    orbRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
        <Sphere ref={orbRef} args={[1.3, 64, 64]}>
          <MeshDistortMaterial
            color="#0a0a0a"
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.4}
            metalness={0.8}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </Sphere>
        <pointLight ref={glowRef} color="#ffffff" intensity={2} distance={4} />
      </Float>
      <Sparkles count={30} scale={4} size={1.2} speed={0.3} opacity={0.4} color="#e5e5e5" />
    </group>
  );
}

const ORBITING_TEXTS = ["Working", "Learning", "Enjoying Tech"];

// 3D text rings orbiting the core
function OrbitingTexts({ isHuman }: { isHuman: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state: RootState) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  const radius = 2.4;
  
  const positions = useMemo(() => ORBITING_TEXTS.map((_, i) => {
    const angle = (i / ORBITING_TEXTS.length) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  }), [radius]);

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {ORBITING_TEXTS.map((text, i) => (
        <group key={i} position={positions[i]}>
          <Text 
            fontSize={0.35} 
            color={isHuman ? "#34d399" : "#ffffff"} 
            anchorX="center" 
            anchorY="middle" 
            outlineWidth={0.015} 
            outlineColor="#000000"
          >
            {text}
          </Text>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.35, 2.4, 64]} />
        <meshBasicMaterial color={isHuman ? "#34d399" : "#ffffff"} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Core that seamlessly flips between AI Face and Human Photo
function FlipCore({ isHuman }: { isHuman: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbContainerRef = useRef<THREE.Group>(null);
  const humanContainerRef = useRef<THREE.Group>(null);

  useFrame((_state: RootState, delta) => {
    if (!groupRef.current || !orbContainerRef.current || !humanContainerRef.current) return;
    
    // Smoothly rotate the entire core between 0 (AI) and PI (Human)
    const targetRotation = isHuman ? Math.PI : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, delta * 5);
    
    // Switch visibility halfway through the flip
    const currentRot = groupRef.current.rotation.y;
    const isFlippedPastHalf = currentRot > Math.PI / 2;
    
    orbContainerRef.current.visible = !isFlippedPastHalf;
    humanContainerRef.current.visible = isFlippedPastHalf;
  });

  return (
    <group ref={groupRef}>
      {/* FRONT SIDE: The AI Orb */}
      <group ref={orbContainerRef}>
        <PremiumOrb />
      </group>

      {/* BACK SIDE: The HTML Photo */}
      <group ref={humanContainerRef} rotation={[0, Math.PI, 0]}>
        <Html center transform zIndexRange={[100, 0]} className="pointer-events-none">
          <div className={`w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 bg-black transition-colors duration-500 shadow-2xl ${
            isHuman ? 'border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.3)]' : 'border-white/20'
          }`}>
            <Image src="/profile.jpg" alt="Profile" width={208} height={208} className="object-cover w-full h-full" draggable="false" />
          </div>
        </Html>
      </group>
    </group>
  );
}

import { motion } from "framer-motion";

// Main Component
export default function OrbitingProfile() {
  const [isHuman, setIsHuman] = useState(false);

  return (
    <div className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex flex-col items-center justify-center">
      
      {/* Animated Human Activity Badges on the FREE LEFT SPACE */}
      <div className="absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20 pointer-events-none">
         <motion.div 
           animate={{ y: [-6, 6, -6] }} 
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
           className="px-3 py-2 bg-zinc-900/80 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-2 whitespace-nowrap"
         >
            <span className="text-xl filter drop-shadow-md">👨‍💻</span> 
            <span className="text-xs font-semibold text-zinc-200">Writing Code</span>
         </motion.div>

         <motion.div 
           animate={{ y: [6, -6, 6] }} 
           transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} 
           className="px-3 py-2 bg-zinc-900/80 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-2 whitespace-nowrap"
         >
            <span className="text-xl filter drop-shadow-md">📚</span> 
            <span className="text-xs font-semibold text-zinc-200">Learning Java</span>
         </motion.div>

         <motion.div 
           animate={{ y: [-4, 4, -4] }} 
           transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} 
           className="px-3 py-2 bg-zinc-900/80 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-2 whitespace-nowrap"
         >
            <span className="text-xl filter drop-shadow-md">🚶‍♂️</span> 
            <span className="text-xs font-semibold text-zinc-200">Iterating Daily</span>
         </motion.div>
      </div>
      
      {/* Invisible button perfectly centered over the core to handle clicks efficiently */}
      <button 
        className="absolute z-10 w-44 h-44 md:w-52 md:h-52 rounded-full cursor-pointer outline-none focus:ring-4 focus:ring-emerald-400/50" 
        onClick={() => setIsHuman(!isHuman)}
        title="Tap to reveal identity"
        aria-label="Toggle avatar"
      />
      
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} className="pointer-events-none absolute inset-0">
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#d4d4d8" />
        
        <Float speed={1.5} floatIntensity={1} rotationIntensity={0.5}>
          <FlipCore isHuman={isHuman} />
          <OrbitingTexts isHuman={isHuman} />
        </Float>
      </Canvas>
      
      {/* Instruction text pinned below the canvas bounding box */}
      <div className="absolute bottom-4 md:-bottom-2 w-full text-center pointer-events-none">
        <p className={`text-[11px] font-mono tracking-widest ${isHuman ? "text-emerald-400" : "text-slate-400 animate-pulse"}`}>
           {isHuman ? "Human Identity Active" : "👈 Tap core to reveal dev"}
        </p>
      </div>
    </div>
  );
}
