"use client";

import { useScroll, motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import JourneyTimeline from "./JourneyTimeline";

// Lazy load 3D scene to keep performance high
const Developer3DScene = dynamic(() => import("./Developer3DScene"), { ssr: false });
const Hero3DCharacter = dynamic(() => import("../components/Hero3DCharacter"), { ssr: false });

export default function WorkJourneyPage() {
  const { scrollYProgress } = useScroll();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-200 selection:bg-white/20">
      
      {/* 3D Background tied to scroll */}
      <Developer3DScene scrollYProgress={scrollYProgress} />

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full pt-32 md:pt-48">
        
        {/* HERO */}
        <div className="max-w-5xl mx-auto px-4 mb-32 grid md:grid-cols-[1.5fr,1fr] gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              My Work Journey
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto md:mx-0">
              From continuous learning to architecting real-world systems. An interactive timeline of the impact I&apos;ve made.
            </p>
          </motion.div>

          {/* Avatar indicating Working Status */}
          <div className="flex flex-col items-center md:items-end justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-48 h-48 rounded-full border border-white/20 bg-zinc-950/80 shadow-[0_0_40px_rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden cursor-pointer transition-colors"
              onClick={() => setIsClicked(true)}
            >
              <Hero3DCharacter />
            </motion.div>
            
            {/* Typing Effect when clicked */}
            <div className="h-8 mt-6 flex justify-center md:justify-end w-full">
              {isClicked ? (
                <motion.div
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="inline-block"
                >
                  <p className="text-[12px] text-zinc-300 font-mono border-r-[2px] border-white pr-2 whitespace-nowrap tracking-wider">
                    Initializing working module... 🚀
                  </p>
                </motion.div>
              ) : (
                <p className="text-[11px] text-zinc-600 font-mono animate-pulse uppercase tracking-widest mt-2">
                  Click orb to initialize
                </p>
              )}
            </div>
          </div>

        </div>

        {/* TIMELINE */}
        <JourneyTimeline />
      </div>
    </main>
  );
}
