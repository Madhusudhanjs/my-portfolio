"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import ModeSwitcher from "./ModeSwitcher";

const AvatarScene = dynamic(() => import("./AvatarScene"), { ssr: false });

type SceneMode = "sales" | "logic" | "learning" | "developer" | "future";

const SCENE_DETAILS: Record<SceneMode, { title: string; subtitle: string; content: string }> = {
  sales: {
    title: "Furniture Industry Era",
    subtitle: "The Foundation of Communication",
    content: "For 6 years, I served 3000+ customers, learning the art of problem solving and patience. Every sale was a lesson in human psychology and trust."
  },
  logic: {
    title: "The Logic Shift",
    subtitle: "Bridging Worlds",
    content: "Transitioning to technology required more than code. It required the soft skills built in the field: empathy, clarity, and precise communication."
  },
  learning: {
    title: "The Deep Dive",
    subtitle: "From Zero to Architect",
    content: "Learning Java, DSA, and Full Stack development. Thousands of hours logged, building the technical discipline required for high-stakes engineering."
  },
  developer: {
    title: "Digital Integration",
    subtitle: "The Developer Mindset",
    content: "Currently an IT Admin at Siemens Gamesa and Developer at Marque Magic. Architecting systems that process real-world workflows with efficiency."
  },
  future: {
    title: "The Vision Beyond",
    subtitle: "Scaling Human Potential",
    content: "Walking towards a future where software isn't just a tool, but a way to scale human impact. The journey has just begun."
  }
};

export default function MyDigitalLifePage() {
  const [mode, setMode] = useState<SceneMode>("sales");

  return (
    <main className="h-screen w-full relative bg-zinc-950 overflow-hidden text-white font-sans">
      
      {/* 3D CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="h-full w-full flex items-center justify-center bg-black">
             <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="text-zinc-500 text-sm tracking-widest font-bold">INITIALIZING 3D ENVIRONMENT...</motion.div>
          </div>
        }>
          <Canvas shadows dpr={[1, 2]}>
            <AvatarScene mode={mode} />
          </Canvas>
        </Suspense>
      </div>

      {/* UI OVERLAY */}
      <div className="relative z-10 h-full w-full pointer-events-none flex flex-col justify-between p-8 md:p-12">
        
        {/* HEADER */}
        <header className="flex justify-between items-start">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-1 pointer-events-auto"
          >
            <Link href="/" className="text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-white transition flex items-center gap-2 mb-4 group">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
            </Link>
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">
               My <span className="text-blue-500">Digital</span> Life
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Interactive Career Storytelling
            </p>
          </motion.div>

          {/* TOP RIGHT STATUS */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-right pointer-events-auto"
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Current State</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">{SCENE_DETAILS[mode].title}</div>
          </motion.div>
        </header>

        {/* CENTER CONTENT */}
        <div className="max-w-xl self-start mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                 {SCENE_DETAILS[mode].subtitle}
              </h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium">
                 {SCENE_DETAILS[mode].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM UI (Mode Switcher is fixed at bottom-10) */}
        <div className="pointer-events-auto">
          <ModeSwitcher currentMode={mode} setMode={setMode} />
        </div>

        {/* FOOTER INFO */}
        <footer className="flex justify-between items-end text-[9px] text-slate-600 font-bold uppercase tracking-[0.15em] mt-auto">
           <div>© 2026 MADHUSUDHAN J S · DESIGNED BY ANTIGRAVITY</div>
           <div>COORD-SYS: THREEJS_R154 · RTF_V9</div>
        </footer>
      </div>

    </main>
  );
}
