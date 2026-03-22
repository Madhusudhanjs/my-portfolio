import { motion } from "framer-motion";
import { ReactNode } from "react";

interface JourneyCardProps {
  role: string;
  company: string;
  duration: string;
  index: number;
  isCurrent?: boolean;
  children: ReactNode;
}

export default function JourneyCard({ role, company, duration, index, isCurrent, children }: JourneyCardProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative w-full flex justify-between items-center mb-24 md:mb-32 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
      
      {/* Timeline Center Dot (hidden on mobile, visible on desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 z-20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        {isCurrent && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-white rounded-full blur-[2px]"
          />
        )}
      </div>

      {/* Spacer for the opposite side */}
      <div className="hidden md:block w-5/12" />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        className={`w-full md:w-5/12 relative p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all duration-300 ${
          isCurrent 
            ? "bg-zinc-900/40 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]" 
            : "bg-black/40 border border-zinc-800 shadow-xl"
        }`}
      >
        {isCurrent && (
          <div className="absolute -top-3 -right-3 px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Currently Working
          </div>
        )}
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{role}</h3>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm text-zinc-300 font-medium">{company}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest">{duration}</span>
        </div>

        <ul className="space-y-4 text-sm text-zinc-400 list-disc list-inside marker:text-zinc-600">
          {children}
        </ul>
      </motion.div>
    </div>
  );
}
