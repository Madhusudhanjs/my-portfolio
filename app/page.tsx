"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Theme = "dark" | "light";


/* ========= FUTURISTIC HERO CARD (ABOUT SECTION RIGHT SIDE) ========= */

function FuturisticHeroCard({ theme }: { theme: Theme }) {
  const [powered, setPowered] = useState(false);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative rounded-3xl p-5 overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.12)] transition-colors duration-500 ${
        isDark
          ? "border border-white/12 bg-white/5"
          : "border border-slate-200 bg-white/90"
      }`}
    >
      {/* subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-5 [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3
            className={`text-sm font-semibold ${
              isDark ? "text-zinc-50" : "text-slate-900"
            }`}
          >
            Core Skills &amp; Power-Ups
          </h3>
         {/* <span
            className={`text-[10px] px-2 py-1 rounded-full border bg-black/5 ${
              isDark
                ? "border-slate-600 bg-black/40 text-slate-300"
                : "border-slate-300 text-slate-600"
            }`}
          >
            Click the hero
          </span>*/}
        </div>

        {/* HERO + ENERGY HAND */}
        <button
          type="button"
          onClick={() => setPowered((p) => !p)}
          className="relative flex items-center gap-4 py-3 outline-none"
        >
          {/* Hero silhouette */}
          <motion.div
            animate={
              powered
                ? { scale: 1.05, rotate: [-2, 2, -1, 1, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.4 }}
            className={`relative w-20 h-24 rounded-2xl flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-b from-zinc-200 to-zinc-500 shadow-[0_0_30px_rgba(250,250,250,0.25)]"
                : "bg-gradient-to-b from-slate-100 to-slate-300 shadow-[0_0_30px_rgba(148,163,184,0.45)]"
            }`}
          >
            {/* helmet & visor */}
            <div className="w-10 h-4 rounded-full bg-black/80 mt-[-14px]" />
            <div className="absolute top-5 w-10 h-2 rounded-full bg-cyan-300/80 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
            {/* torso */}
            <div className="absolute top-8 w-8 h-10 rounded-b-[18px] bg-zinc-900/90" />

            {/* glowing hand */}
            <motion.div
              animate={
                powered
                  ? { scale: [1, 1.15, 1], opacity: 1 }
                  : { scale: 0.9, opacity: 0.75 }
              }
              transition={{
                duration: 0.5,
                repeat: powered ? Infinity : 0,
                repeatDelay: 0.8,
              }}
              className="absolute -right-4 bottom-6 w-9 h-9 rounded-full border border-cyan-300/80 bg-cyan-400/30 shadow-[0_0_24px_rgba(34,211,238,0.9)]"
            >
              <div className="absolute inset-2 rounded-full border border-white/70" />
            </motion.div>
          </motion.div>

          {/* Hero text */}
          <div
            className={`flex-1 text-left space-y-1 text-xs ${
              isDark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            <p className="font-medium">
              {powered
                ? "Skill systems online — viewing full-stack capabilities."
                : "Tap the suit to power up skills view."}
            </p>
            <p className="text-[11px] text-slate-400">
              This is my developer mode: combining Java, DSA and modern web to
              build useful products.
            </p>
          </div>
        </button>

        {/* ENERGY SKILLS CARD */}
        <motion.div
          animate={powered ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 6 }}
          transition={{ duration: 0.35 }}
          className={`rounded-2xl px-4 py-3 text-xs space-y-2 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-colors duration-500 ${
            isDark
              ? "border border-cyan-400/40 bg-black/60 text-slate-100"
              : "border border-cyan-300/60 bg-cyan-50 text-slate-900"
          }`}
        >
          <p className="text-[11px] uppercase tracking-wide text-cyan-500">
            Active Tech Stack
          </p>
          <ul className="space-y-1 text-[11px]">
            <li>• Java (OOP, core, backend basics)</li>
            <li>• Data Structures &amp; Algorithms</li>
            <li>• React &amp; Next.js for full-stack apps</li>
            <li>• Git &amp; GitHub for clean workflow</li>
            <li>• MySQL fundamentals &amp; basic DB design</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================== HOME PAGE ============================ */

export default function Home() {
  const [showHi, setShowHi] = useState(false);
  const [mode, setMode] = useState<"robot" | "human">("robot");
  const [theme, setTheme] = useState<Theme>("dark");

  const isDark = theme === "dark";

  const handlePhotoClick = () => {
    setMode((prev) => (prev === "robot" ? "human" : "robot"));
    setShowHi((prev) => !prev);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <main
      className={`min-h-screen px-4 py-12 flex flex-col transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#02010A] via-[#050816] to-black text-slate-100"
          : "bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb] text-slate-900"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto space-y-16 flex-1">
        {/* TOP BAR: THEME TOGGLE */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full border backdrop-blur-sm transition ${
              isDark
                ? "border-slate-700 bg-black/40 text-slate-200 hover:bg-black/60"
                : "border-slate-300 bg-white/80 text-slate-700 hover:bg-white"
            }`}
          >
            <span>{isDark ? "🌞" : "🌙"}</span>
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>

        {/* HERO SECTION */}
        <section className="grid md:grid-cols-[2fr,1.4fr] gap-10 items-center">
          {/* LEFT - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-[11px] tracking-[0.35em] uppercase text-slate-500">
              Full Stack Developer · Java · JavaScript
            </p>

            <h1
              className={`text-4xl md:text-5xl font-semibold leading-tight ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              <span className="block">Madhusudhan J&nbsp;S</span>
              <span className="mt-3 block text-sm md:text-base font-normal text-slate-400">
                B.Tech CSE · Full Stack Developer in progress · Building real-world products
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 md:text-slate-400 leading-relaxed">
             I’m a Computer Science graduate focused on Java, DSA and modern full-stack development. 
             I enjoy building real, meaningful applications and improving a little every day through discipline,
              consistency and hands-on projects.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-6 py-2.5 text-sm font-medium shadow-[0_0_30px_rgba(148,163,184,0.35)] transition ${
                  isDark
                    ? "bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 text-black"
                    : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-50"
                }`}
              >
                View Projects
              </motion.a>

            <motion.a
                href="/learning"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-6 py-2.5 text-sm border backdrop-blur-sm transition ${
                  isDark
                    ? "border-slate-600/80 hover:border-zinc-300/90 hover:bg-white/5"
                    : "border-slate-300 hover:border-slate-500 bg-white/60 hover:bg-white"
                }`}
              >
                Learning Journey
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 text-xs text-slate-400">
              <span
                className={`px-3 py-1 rounded-full border backdrop-blur ${
                  isDark
                    ? "border-slate-700/80 bg-black/40"
                    : "border-slate-300 bg-white/70"
                }`}
              >
                🔁 Consistent daily improvement
              </span>
              <span
                className={`px-3 py-1 rounded-full border backdrop-blur ${
                  isDark
                    ? "border-slate-700/80 bg-black/40"
                    : "border-slate-300 bg-white/70"
                }`}
              >
                🧠 Problem-solving &amp; DSA focused
              </span>
            </div>
          </motion.div>

          {/* RIGHT - PHOTO CARD WITH ROBOT → YOU + HI CLOUD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center"
          >
            {/* Glow behind */}
            <div
              className={`absolute -inset-6 blur-2xl opacity-70 ${
                isDark
                  ? "bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.18),_transparent_60%)]"
                  : "bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.20),_transparent_60%)]"
              }`}
            />

            {/* Speech bubble / cloud */}
            <AnimatePresence>
              {showHi && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                >
                  <div className="relative max-w-xs rounded-2xl bg-white/95 text-slate-900 px-4 py-3 shadow-xl">
                    <p className="text-xs font-semibold">👋 Hi, I&apos;m Madhu</p>
                    <p className="text-[11px] mt-1">
                      Full Stack Developer in progress — I build, break and
                      learn something new every day.
                    </p>
                    <div className="absolute left-1/2 -bottom-2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white/95" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glass card with clickable avatar */}
            <button
              type="button"
              onClick={handlePhotoClick}
              className={`relative rounded-3xl border p-5 w-full max-w-xs space-y-4 outline-none focus:ring-2 focus:ring-zinc-300/60 shadow-[0_0_45px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-500 ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/90"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                {/* Avatar: robot ↔ human */}
                <AnimatePresence mode="wait">
                  {mode === "robot" ? (
                    <motion.div
                      key="robot"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, -4, 4, -3, 3, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35 }}
                      className="relative rounded-full border border-white/60 w-32 h-32 bg-black flex items-center justify-center text-5xl"
                    >
                      <span>🤖</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="human"
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 10 }}
                      transition={{ duration: 0.35 }}
                      className="relative rounded-full overflow-hidden border border-white/60 w-32 h-32 bg-black"
                    >
                      <Image
                        src="/profile.jpg"
                        alt="Profile photo"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center space-y-1">
                  <p
                    className={`text-sm font-medium ${
                      isDark ? "text-zinc-50" : "text-slate-900"
                    }`}
                  >
                    Full Stack Developer in Progress
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Tap the card — robot turns into me 👇
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-2" />

              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Current Focus
                  </p>
                  <p>Core Java, DSA, real projects</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Direction
                  </p>
                  <p>Product-based full stack roles</p>
                </div>
              </div>
            </button>
          </motion.div>
        </section>

        {/* CONNECT – JUST BELOW HERO */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`space-y-4 border-t pt-6 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <h2
            className={`text-sm font-semibold ${
              isDark ? "text-slate-200" : "text-slate-900"
            }`}
          >
            Connect with me
          </h2>

          {/* main links */}
          <div className="flex flex-wrap gap-3 text-xs">
            <a
              href="https://github.com/Madhusudhanjs"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                isDark
                  ? "border-slate-700 text-slate-200 hover:border-zinc-200 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:border-slate-500 hover:bg-white"
              }`}
            >
              <span>🐙</span>
              <span>GitHub</span>
            </a>

            <a
              href="#"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                isDark
                  ? "border-slate-700 text-slate-200 hover:border-zinc-200 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:border-slate-500 hover:bg-white"
              }`}
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </a>

            <a
              href="#"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                isDark
                  ? "border-slate-700 text-slate-200 hover:border-zinc-200 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:border-slate-500 hover:bg-white"
              }`}
            >
              <span>📄</span>
              <span>Naukri</span>
            </a>
            <a
                  href="/resume"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                    isDark
                      ? "border-slate-700 text-slate-200 hover:border-zinc-200 hover:bg-white/5"
                      : "border-slate-300 text-slate-700 hover:border-slate-500 hover:bg-white"
                  }`}
                >
                  <span>📄</span>
                  <span>Resume</span>
                </a>
          </div>
                

          {/* email + phone */}
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
              <a
                href="mailto:jsmadhusudhan@gmail.com"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition ${
                  isDark
                    ? "bg-white/5 border-slate-700 hover:bg-white/10"
                    : "bg-white border-slate-300 hover:border-slate-500 hover:bg-slate-50"
                }`}
              >
                <span>📧</span>
                <span>jsmadhusudhan@gmail.com</span>
              </a>

              <a
                href="tel:+919606751386"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition ${
                  isDark
                    ? "bg-white/5 border-slate-700 hover:bg-white/10"
                    : "bg-white border-slate-300 hover:border-slate-500 hover:bg-slate-50"
                }`}
              >
                <span>📱</span>
                <span>+91-9606751386</span>
              </a>
            </div>

        </motion.section>

        {/* ABOUT + CAR + FUTURISTIC HERO */}
        <section
          id="about"
          className="grid md:grid-cols-[1.6fr,1.4fr] gap-10 items-stretch"
        >
          {/* LEFT: ABOUT + CAR ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h2
              className={`text-lg font-semibold ${
                isDark ? "text-zinc-100" : "text-slate-900"
              }`}
            >
              About Me
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-slate-500 md:text-slate-400">
              I enjoy turning complex problems into clean, maintainable
              solutions. I&apos;m building a strong base with Java and DSA while
              using React and Next.js to create full stack experiences.
              Balancing a full-time job with skill-building has trained me to
              stay focused, disciplined and hungry to improve every single day.
            </p>

            {/* “Car” lane */}
            <div
              className={`mt-4 relative h-32 rounded-3xl overflow-hidden border bg-gradient-to-r ${
                isDark
                  ? "border-white/10 from-black via-slate-900 to-black"
                  : "border-slate-200 from-slate-900 via-slate-800 to-slate-900"
              }`}
            >
              {/* Road line */}
              <div className="absolute inset-x-6 bottom-6 h-[2px] bg-gradient-to-r from-transparent via-slate-500/70 to-transparent" />

              {/* Car – sleek black silhouette with lights */}
              <motion.div
                initial={{ x: -180, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-8 bottom-4 flex items-end gap-3"
              >
                {/* Body of car */}
                <div className="relative w-40 h-16 rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-800 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  {/* Cabin */}
                  <div className="absolute left-7 -top-5 w-20 h-7 rounded-2xl bg-gradient-to-br from-slate-300/70 to-slate-500/40" />
                  {/* Headlights */}
                  <div className="absolute -right-1 top-6 w-4 h-2 rounded-r-full bg-amber-300 shadow-[0_0_18px_rgba(253,224,71,0.8)]" />
                  {/* Wheels */}
                  <div className="absolute left-5 -bottom-3 w-6 h-6 rounded-full bg-black border border-zinc-500" />
                  <div className="absolute right-5 -bottom-3 w-6 h-6 rounded-full bg-black border border-zinc-500" />
                </div>

                <p className="text-[11px] text-slate-200">
                  Driving steadily towards{" "}
                  <span className="font-semibold text-zinc-50">
                    product-based full stack roles
                  </span>
                  .
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: FUTURISTIC HERO + SKILLS CARD */}
          <FuturisticHeroCard theme={theme} />
        </section>

        {/* HOBBIES & INTERESTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-2 rounded-2xl border p-4 shadow-[0_0_25px_rgba(0,0,0,0.08)] backdrop-blur-lg transition-colors duration-500 ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white/90"
          }`}
        >
          <h3
            className={`text-sm font-semibold mb-3 ${
              isDark ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Hobbies &amp; Interests
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-3 transition border ${
                isDark
                  ? "border-slate-700 bg-black/40 hover:border-white/30"
                  : "border-slate-200 bg-slate-50 hover:border-slate-400"
              }`}
            >
              🚀 Exploring new tech &amp; tools
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-3 transition border ${
                isDark
                  ? "border-slate-700 bg-black/40 hover:border-white/30"
                  : "border-slate-200 bg-slate-50 hover:border-slate-400"
              }`}
            >
              🧩 Solving coding &amp; logic problems
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-3 transition border ${
                isDark
                  ? "border-slate-700 bg-black/40 hover:border-white/30"
                  : "border-slate-200 bg-slate-50 hover:border-slate-400"
              }`}
            >
              🎥 Watching tech &amp; startup content
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-3 transition border ${
                isDark
                  ? "border-slate-700 bg-black/40 hover:border-white/30"
                  : "border-slate-200 bg-slate-50 hover:border-slate-400"
              }`}
            >
              🏋️ Fitness, discipline &amp; self-growth
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer
        className={`text-xs mt-10 border-t ${
          isDark
            ? "border-slate-800 text-slate-500"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Madhusudhan J S</span>
          <span className="tracking-[0.35em] uppercase text-slate-400">
            MAAI
          </span>
        </div>
      </footer>
    </main>
  );
}
