"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const BackgroundEffects = dynamic(() => import("./components/BackgroundEffects"), { ssr: false });
const Hero3DCharacter = dynamic(() => import("./components/Hero3DCharacter"), { ssr: false });

type Theme = "dark" | "light";

/* ========= AUTO-UPDATING ABOUT ME CONTENT ========= */
const aboutTexts = [
  "I enjoy turning complex problems into clean, maintainable solutions. I'm building a strong base with Java and DSA while using React and Next.js to create full stack experiences.",
  "Currently, I am architecting advanced APIs and scalable backends at Marque Magic, leveraging FastAPI and SQLAlchemy to natively process vital workflows efficiently.",
  "At Siemens Gamesa, I manage enterprise IT infrastructure and resolve mission-critical hardware vulnerabilities, keeping systems perfectly stable globally across thousands of nodes.",
  "I constantly push boundaries. Balancing a full-time IT admin role with rapid software skill-building has trained me to stay strictly disciplined and hungry to improve every single day."
];

/* ========= TYPEWRITER TEXT ENGINE ========= */
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let timeoutId: any;

    const type = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(type, 30);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <p className="text-sm md:text-base leading-relaxed text-slate-400 w-full text-left">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[6px] h-[13px] md:h-[15px] bg-emerald-400 ml-1 translate-y-[2px]"
      />
    </p>
  );
}

/* =========================== HOME PAGE ============================ */
export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mode, setMode] = useState<"robot" | "human">("robot");
  const [textIndex, setTextIndex] = useState(0);

  const isDark = theme === "dark";

  const handlePhotoClick = () => setMode((prev) => (prev === "robot" ? "human" : "robot"));
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % aboutTexts.length);
    }, 30000); // Trigger index rotation precisely every 30 seconds globally
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`min-h-screen px-4 py-12 flex flex-col transition-colors duration-500 relative ${isDark ? "bg-transparent text-slate-100" : "bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb] text-slate-900"}`}>
      {isDark && <BackgroundEffects />}

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="w-full max-w-6xl mx-auto space-y-4 flex-1 relative z-10">
        <div className="flex justify-end mb-4">
          <button type="button" onClick={toggleTheme} className={`inline-flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full border backdrop-blur-sm transition ${isDark ? "border-slate-700 bg-black/40 text-slate-200 hover:bg-black/60" : "border-slate-300 bg-white/80 text-slate-700 hover:bg-white"}`}>
            <span>{isDark ? "🌞" : "🌙"}</span>
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>

        {/* HERO SECTION */}
        <section className="flex flex-col gap-8">

          {/* TOP ROW: Title on Left, Avatar strictly on Top Right */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-4 flex-1 w-full text-center md:text-left">

              <Link href="/work-journey" className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border transition backdrop-blur-md cursor-pointer text-xs md:text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 ${isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-300 bg-white/60 hover:bg-white"}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-emerald-400">Current Impact: Siemens Gamesa</span>
                <span className="opacity-50 hidden sm:inline">|</span>
                <span className="font-semibold text-zinc-100 hidden sm:inline">View Work ➔</span>
              </Link>

              <h1 className={`text-4xl md:text-6xl font-bold leading-tight tracking-tight ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                <span className="block">Madhusudhan J S</span>
                <span className="mt-4 block text-lg md:text-xl font-normal text-slate-400 tracking-normal">B.Tech CSE · Full Stack Developer in progress</span>
              </h1>

              {/* AUTO-UPDATING ABOUT ME (ALIGNED LEFT TO IMAGE) */}
              <div className="relative min-h-[140px] md:min-h-[110px] w-full bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm mt-6 text-left">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                  <span className="text-[10px] md:text-xs text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_Infinity]" /> LIVE ABOUT ME FEED ({textIndex + 1}/{aboutTexts.length})
                  </span>
                </div>
                <TypewriterText key={textIndex} text={aboutTexts[textIndex]} />
              </div>
            </motion.div>

            {/* AVATAR FLIP CARD (TOP RIGHT) */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="shrink-0 w-full max-w-xs md:max-w-none md:w-auto flex justify-center">
              <button type="button" onClick={handlePhotoClick} className={`relative rounded-3xl border p-4 md:p-5 w-fit outline-none focus:ring-2 focus:ring-zinc-300/60 shadow-[0_0_45px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-500 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/90"}`}>
                <div className="flex flex-row items-center justify-start gap-4">

                  {/* Seamless 3D Flip Card */}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0" style={{ perspective: "1000px" }}>
                    <motion.div 
                      animate={{ rotateY: mode === "robot" ? 0 : 180 }} 
                      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }} 
                      className="w-full h-full relative" 
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Robot Side */}
                      <div className="absolute inset-0 w-full h-full rounded-full border border-white/20 bg-zinc-950/80 shadow-[0_0_40px_rgba(255,255,255,0.03)] overflow-hidden pointer-events-none" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                        <Hero3DCharacter />
                      </div>
                      
                      {/* Human Side (Professional Profile) */}
                      <div className="absolute inset-0 w-full h-full rounded-full border-2 border-emerald-400/20 bg-zinc-900 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden pointer-events-none" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                        <motion.div 
                          animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }} 
                          transition={{ 
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="w-full h-full group"
                        >
                          <Image 
                            src="/profile.jpg" 
                            alt="Profile photo" 
                            width={300} 
                            height={300} 
                            className="object-cover w-full h-full scale-[1.05] transition-transform duration-700 group-hover:scale-115" 
                            priority
                          />
                        </motion.div>
                        {/* Professional light sweep effect */}
                        <motion.div 
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Side Text */}
                  <div className="flex flex-col text-left space-y-2 overflow-hidden">
                    <p className={`text-sm md:text-base font-bold ${isDark ? "text-zinc-50" : "text-slate-900"}`}>Full Stack Dev</p>
                    <div className="flex items-center gap-1.5">
                      <motion.span animate={{ x: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="text-lg leading-none">👈</motion.span>
                      <motion.div style={{ display: "inline-block", whiteSpace: "nowrap" }} initial={{ clipPath: "inset(0% 100% 0% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}>
                        <span className="text-[12px] md:text-sm font-medium text-slate-400 border-r-[1.5px] border-white/50 pr-1 inline-block tracking-wide">Tap to flip me</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* BOTTOM ROW: Connect & Quick Links */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="https://github.com/Madhusudhanjs" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition hover:-translate-y-1 ${isDark ? "border-slate-700 text-slate-200 hover:border-zinc-200 bg-white/5" : "border-slate-300 text-slate-700 hover:border-slate-500 bg-white"}`}><span>🐙</span> GitHub</a>
              <a href="https://www.linkedin.com/in/madhusudhan-j-s/" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition hover:-translate-y-1 ${isDark ? "border-slate-700 text-slate-200 hover:border-zinc-200 bg-white/5" : "border-slate-300 text-slate-700 hover:border-slate-500 bg-white"}`}><span>💼</span> LinkedIn</a>
              <a href="mailto:jsmadhusudhan@gmail.com" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition hover:-translate-y-1 ${isDark ? "border-slate-700 text-slate-200 hover:border-zinc-200 bg-white/5" : "border-slate-300 text-slate-700 hover:border-slate-500 bg-white"}`}><span>📧</span> jsmadhusudhan@gmail.com</a>
              <a href="tel:+919606751386" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition hover:-translate-y-1 ${isDark ? "border-slate-700 text-slate-200 hover:border-zinc-200 bg-white/5" : "border-slate-300 text-slate-700 hover:border-slate-500 bg-white"}`}><span>📱</span> 9606751386</a>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-6 border-t border-slate-500/20">
              <motion.a href="/work-journey" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`rounded-full px-8 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)] transition ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-slate-900 text-slate-50 hover:bg-slate-800"}`}>Work Journey</motion.a>
              <motion.a href="/resume" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border backdrop-blur-sm transition ${isDark ? "border-slate-600 hover:border-white bg-white/5" : "border-slate-300 hover:border-slate-500 bg-white/60 hover:bg-white"}`}><span>📄</span> Resume</motion.a>
              <motion.a href="/projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`rounded-full px-6 py-3 text-sm font-medium border backdrop-blur-sm transition ${isDark ? "border-slate-600 hover:border-white bg-white/5" : "border-slate-300 hover:border-slate-500 bg-white/60 hover:bg-white"}`}>View Projects</motion.a>
              <motion.a href="/learning" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border backdrop-blur-sm transition ${isDark ? "border-slate-600 hover:border-white bg-white/5" : "border-slate-300 hover:border-slate-500 bg-white/60 hover:bg-white"}`}><span>📚</span> Learning Path</motion.a>
            </div>
          </motion.div>
        </section>



        {/* BOTTOM REALISTIC SKILLS GRID */}
        <section className="pt-24 mt-4 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className={`relative overflow-hidden rounded-3xl p-8 border shadow-lg transition-all ${isDark ? "border-white/10 bg-zinc-900/40 backdrop-blur-md" : "border-slate-200 bg-white/80"}`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🧠</div>
              <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-emerald-500">Core Concepts</h3>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Object-Oriented Programming</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Data Structures & Algorithms</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> RESTful API Design</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Relational DB Modeling</li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={`relative overflow-hidden rounded-3xl p-8 border shadow-lg transition-all ${isDark ? "border-white/10 bg-zinc-900/40 backdrop-blur-md" : "border-slate-200 bg-white/80"}`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">⚡</div>
              <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-cyan-500">Technical Skills</h3>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> Java / Python / JavaScript</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> React & Next.js Ecosystem</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> FastAPI / Flask Backends</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> PostgreSQL & SQLAlchemy</li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={`relative overflow-hidden rounded-3xl p-8 border shadow-lg transition-all ${isDark ? "border-white/10 bg-zinc-900/40 backdrop-blur-md" : "border-slate-200 bg-white/80"}`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🎯</div>
              <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-purple-400">Hobbies & Honesties</h3>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> Consistent Daily Coding</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> Complex Problem Solving</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> Fitness & Discipline</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> Startup & Tech Media</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA: MY DIGITAL LIFE */}
        <div className="w-full pt-20 pb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500/10 to-transparent mb-20" />

          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`max-w-3xl mx-auto rounded-[2.5rem] p-10 md:p-16 border shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-8 ${isDark ? "border-white/5 bg-zinc-900/30 backdrop-blur-xl" : "border-slate-200 bg-white"}`}
            >
              <div className="space-y-4">
                <span className="text-[10px] text-blue-500 uppercase tracking-[0.4em] font-black block opacity-80">
                  The Journey
                </span>

                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                  My <span className="text-blue-500">Digital</span> World
                </h2>

                <div className="space-y-3 max-w-xl mx-auto">
                  <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed">
                    &quot;From serving 3000+ customers to building scalable systems. My journey is defined by human interaction and code.&quot;
                  </p>
                  <p className="text-slate-500 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                    Communication · Problem Solving · Engineering
                  </p>
                </div>
              </div>

              <Link
                href="/my-digital-life"
                className={`group relative flex items-center gap-4 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all shadow-xl hover:shadow-blue-500/20 ${isDark ? "bg-white text-black hover:bg-blue-600 hover:text-white" : "bg-black text-white hover:bg-blue-600"}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enter My Digital World
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                </span>
                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10" />
              </Link>

              {/* Parallax elements */}
              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [0.05, 0.08, 0.05] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
              />
            </motion.div>
          </motion.section>
        </div>

      </motion.div>

      <footer className={`text-xs mt-10 border-t z-10 relative pb-10 ${isDark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"}`}>
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Madhusudhan J S</span>
          <span className="tracking-[0.35em] uppercase text-slate-400">MAAI</span>
        </div>
      </footer>
    </main>
  );
}
