"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

function SceneElements({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random floating code snippets
  const snippets = useMemo(() => {
    const texts = [
      "const api = new FastAPI()", 
      "SELECT * FROM Users", 
      "export default function App()", 
      "model.predict(data)",
      "<div>Hello World</div>",
      "import * as THREE from 'three';"
    ];
    return Array.from({ length: 20 }).map(() => ({
      text: texts[Math.floor(Math.random() * texts.length)],
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15 + 2,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.6
    }));
  }, []);

  useFrame((state: any) => {
    const scroll = scrollYProgress.get();
    
    // Zoom camera slightly based on scroll
    // Start at z=8, move to z=2
    state.camera.position.z = THREE.MathUtils.lerp(8, 2, scroll);
    // Pan camera down slightly
    state.camera.position.y = THREE.MathUtils.lerp(0, -3, scroll);
    
    // Subtle background float based on clock and mouse
    if (groupRef.current) {
      groupRef.current.rotation.x = state.pointer.y * 0.1;
      groupRef.current.rotation.y = state.pointer.x * 0.1 + state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Abstract Developer Avatar (Glowing Core) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -2]}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshPhysicalMaterial 
            color="#0a0a0a" 
            roughness={0.2} 
            metalness={0.9} 
            clearcoat={1} 
            flatShading
          />
        </mesh>
        
        {/* Glow around the avatar */}
        <pointLight color="#ffffff" intensity={2} distance={8} />

        {/* Floating Screens / UI Panels */}
        <mesh position={[-2.5, 1, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshPhysicalMaterial color="#171717" roughness={0.1} transmission={0.9} thickness={0.5} />
        </mesh>
        <mesh position={[2.5, -0.5, 1]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[1.5, 2, 0.05]} />
          <meshPhysicalMaterial color="#262626" roughness={0.3} transmission={0.8} />
        </mesh>
      </Float>

      {/* Floating Code Snippets */}
      {snippets.map((snip, i) => (
        <Float key={i} speed={1} floatIntensity={2} rotationIntensity={0}>
          <Text
            position={snip.position}
            fontSize={0.2 * snip.scale}
            color="rgba(255, 255, 255, 0.15)"
            anchorX="center"
            anchorY="middle"
          >
            {snip.text}
          </Text>
        </Float>
      ))}

      {/* Abstract sound-inspired pulses / particles */}
      <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.3} color="#ffffff" />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#52525b" />
    </group>
  );
}

export default function Developer3DScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none transition-opacity duration-1000">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <SceneElements scrollYProgress={scrollYProgress} />
      </Canvas>
      {/* Light Rays */}
      <div className="absolute top-[-10%] left-[20%] w-[30vw] h-[150vh] bg-gradient-to-b from-white/5 via-transparent to-transparent rotate-[30deg] blur-[60px]" />
      <div className="absolute top-[-20%] right-[10%] w-[20vw] h-[150vh] bg-gradient-to-b from-white/5 via-transparent to-transparent rotate-[-20deg] blur-[70px]" />
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat" 
        }} 
      />
    </div>
  );
}
