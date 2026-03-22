"use client";

import { motion } from "framer-motion";

type SceneMode = "sales" | "logic" | "learning" | "developer" | "future";

interface ModeSwitcherProps {
  currentMode: SceneMode;
  setMode: (mode: SceneMode) => void;
}

const MODES: { id: SceneMode; label: string; icon: string; description: string }[] = [
  { id: "sales", label: "Furniture Era", icon: "🪑", description: "3000+ Customers · 6 Years" },
  { id: "logic", label: "Problem Solving", icon: "🧩", description: "Soft Skills · Communication" },
  { id: "learning", label: "Learning Phase", icon: "📚", description: "Java · DSA · Full Stack" },
  { id: "developer", label: "Digital Twin", icon: "💻", description: "SDE · IT Admin · Siemens" },
  { id: "future", label: "Beyond", icon: "🚀", description: "The Next Big Impact" },
];

export default function ModeSwitcher({ currentMode, setMode }: ModeSwitcherProps) {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex flex-wrap justify-center gap-4 shadow-2xl"
      >
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setMode(mode.id)}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border transition-all duration-300 min-w-[120px] ${
              currentMode === mode.id 
                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105" 
                : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <span className="text-xl">{mode.icon}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{mode.label}</span>
            <span className={`text-[9px] opacity-60 ${currentMode === mode.id ? "text-black" : "text-slate-500"}`}>
               {mode.description}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
