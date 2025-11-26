"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Sparkles } from "lucide-react";

/* ==================== TYPES ==================== */

type Category = "Java" | "DSA" | "FullStack" | "Other";

type LogEntry = {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // minutes
  category: Category;
  topic: string;
  note: string;
};

type Task = {
  id: number;
  text: string;
  dueDate: string; // YYYY-MM-DD
  done: boolean;
};

type ImageNote = {
  id: number;
  name: string;
  dataUrl: string;
  createdAt: string;
};

const LOGS_KEY = "maai-learning-logs-v3";
const TASKS_KEY = "maai-learning-tasks-v3";

/* ==================== CERTIFICATES ==================== */

const CERTIFICATES = [
  {
    id: 1,
    title: "Java Full Stack Program",
    provider: "LiveTech",
    year: "2025",
    tag: "Core + Real Projects",
    url: "#", // later: link to PDF / drive / image
  },
  {
    id: 2,
    title: "DSA Internship Certificate",
    provider: "College / Internship",
    year: "2024",
    tag: "Problem Solving",
    url: "#",
  },
  {
    id: 3,
    title: "Frontend (React + Next.js)",
    provider: "Self Project Track",
    year: "2025",
    tag: "Modern Web",
    url: "#",
  },
];

/* ==================== ACHIEVEMENTS ROTATOR ==================== */

function AchievementsRotator() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const current = CERTIFICATES[index];
  const total = CERTIFICATES.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <>
      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-black px-5 py-4 shadow-[0_0_45px_rgba(0,0,0,1)] w-full md:w-[280px]">
        {/* glow */}
        <div className="pointer-events-none absolute -top-10 -right-6 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-cyan-500/15 p-2">
              <Award className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Certifications
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-200 border border-white/10 hover:border-cyan-400 hover:text-cyan-200"
          >
            <Sparkles className="w-3 h-3" />
            View
          </button>
        </div>

        {/* main card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4 py-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-cyan-300 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {current.year}
            </p>
            <span className="text-[10px] rounded-full bg-cyan-500/15 border border-cyan-400/40 px-2 py-0.5 text-cyan-100">
              {current.tag}
            </span>
          </div>

          <p className="mt-2 text-xs font-semibold text-zinc-50 leading-snug">
            {current.title}
          </p>
          <p className="mt-1 text-[11px] text-slate-300">{current.provider}</p>
        </motion.div>

        {/* controls */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              className="h-6 w-6 rounded-full border border-white/15 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-200"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="h-6 w-6 rounded-full border border-white/15 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-200"
            >
              ›
            </button>
          </div>
          <div className="flex items-center gap-1">
            {CERTIFICATES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 w-4 rounded-full transition ${
                  i === index
                    ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                    : "bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <span>
            {index + 1}/{total}
          </span>
        </div>
      </div>

      {/* modal with big details */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-50 w-[92%] max-w-lg rounded-3xl border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-6 shadow-[0_0_80px_rgba(0,0,0,1.0)]"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-[11px] text-slate-400 hover:text-slate-100"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-2xl bg-cyan-500/15 border border-cyan-400/40 p-2.5">
                <Award className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300">
                  Achievement
                </p>
                <h3 className="text-lg font-semibold text-zinc-50">
                  {current.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {current.provider} · {current.year}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              You can later replace this text with more detail: duration,
              topics covered, and what you built. For now it cleanly highlights
              that you&apos;re investing in Java, DSA, and full stack learning.
            </p>

            {current.url !== "#" && (
              <a
                href={current.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] text-cyan-300 underline hover:text-cyan-200"
              >
                Open certificate file
              </a>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

/* ==================== MAIN LEARNING PAGE ==================== */

export default function LearningJourneyClient() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [images, setImages] = useState<ImageNote[]>([]);

  // inputs for new log
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("20:00");
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState<Category>("Java");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");

  // inputs for new task
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  // local summary + AI summary
  const [summary, setSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  /* ----- load from localStorage ----- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedLogs = window.localStorage.getItem(LOGS_KEY);
      const savedTasks = window.localStorage.getItem(TASKS_KEY);
      if (savedLogs) setLogs(JSON.parse(savedLogs));
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (err) {
      console.error("Error loading data", err);
    }
  }, []);

  /* ----- save to localStorage ----- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /* ----- add log ----- */
  const addLog = () => {
    if (!topic.trim() && !note.trim()) return;

    const entry: LogEntry = {
      id: Date.now(),
      date,
      time,
      duration: Math.max(15, duration || 0),
      category,
      topic: topic.trim() || "Untitled topic",
      note: note.trim() || "No notes.",
    };

    setLogs((prev) => [entry, ...prev]);
    setTopic("");
    setNote("");
  };

  /* ----- add task ----- */
  const addTask = () => {
    if (!taskText.trim()) return;
    const t: Task = {
      id: Date.now(),
      text: taskText.trim(),
      dueDate: taskDate,
      done: false,
    };
    setTasks((prev) => [t, ...prev]);
    setTaskText("");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  /* ----- image upload (local only) ----- */
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const note: ImageNote = {
          id: Date.now() + Math.random(),
          name: file.name,
          dataUrl: reader.result as string,
          createdAt: new Date().toLocaleString("en-IN"),
        };
        setImages((prev) => [note, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  /* ----- progress numbers ----- */
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const msDay = 24 * 60 * 60 * 1000;

  const dailyMinutes = logs
    .filter((l) => l.date === todayStr)
    .reduce((s, l) => s + l.duration, 0);

  const weeklyMinutes = logs
    .filter((l) => now.getTime() - new Date(l.date).getTime() < 7 * msDay)
    .reduce((s, l) => s + l.duration, 0);

  const monthlyMinutes = logs
    .filter((l) => now.getMonth() === new Date(l.date).getMonth())
    .reduce((s, l) => s + l.duration, 0);

  const GOAL = { daily: 150, weekly: 900, monthly: 3600 };

  const pct = (value: number, goal: number) =>
    Math.min(100, Math.round((value / goal) * 100));

  /* ----- simple local analysis ----- */
  const analyse = () => {
    if (logs.length === 0) {
      setSummary("No sessions logged yet. Add some learning logs first.");
      return;
    }

    const java = logs
      .filter((l) => l.category === "Java")
      .reduce((s, l) => s + l.duration, 0);
    const dsa = logs
      .filter((l) => l.category === "DSA")
      .reduce((s, l) => s + l.duration, 0);
    const fs = logs
      .filter((l) => l.category === "FullStack")
      .reduce((s, l) => s + l.duration, 0);

    const total = java + dsa + fs || 1;

    const javaPct = Math.round((java / total) * 100);
    const dsaPct = Math.round((dsa / total) * 100);
    const fsPct = Math.round((fs / total) * 100);

    let focus = "Balanced";
    if (javaPct > dsaPct && javaPct > fsPct) focus = "Java / Core";
    else if (dsaPct > javaPct && dsaPct > fsPct) focus = "DSA";
    else if (fsPct > javaPct && fsPct > dsaPct) focus = "Full-stack / Projects";

    const text =
      `Summary\n` +
      `• Sessions: ${logs.length}\n` +
      `• Today: ${Math.round(dailyMinutes / 60)}h\n` +
      `• Weekly: ${Math.round(weeklyMinutes / 60)}h\n` +
      `• Monthly: ${Math.round(monthlyMinutes / 60)}h\n\n` +
      `Focus\n` +
      `• Java/Core: ${javaPct}%\n` +
      `• DSA: ${dsaPct}%\n` +
      `• Projects: ${fsPct}%\n` +
      `• Main focus: ${focus}`;

    setSummary(text);
  };

  /* ----- AI mentor (OpenAI via /api/learning/analyze) ----- */
  const runAiAnalysis = async () => {
    if (logs.length === 0 && tasks.length === 0) {
      alert("Log at least one session or task first.");
      return;
    }

    try {
      setAiLoading(true);
      setAiError(null);
      setAiResult(null);

      const res = await fetch("/api/learning/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs, tasks }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiError(data.error || "AI analysis failed.");
        return;
      }

      setAiResult(data.text);
    } catch (err) {
      console.error(err);
      setAiError("Network or server error.");
    } finally {
      setAiLoading(false);
    }
  };

  /* ----- helpers ----- */
  const prettyDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  const logsByDate: Record<string, LogEntry[]> = {};
  logs.forEach((l) => {
    if (!logsByDate[l.date]) logsByDate[l.date] = [];
    logsByDate[l.date].push(l);
  });
  const sortedDates = Object.keys(logsByDate).sort((a, b) =>
    a < b ? 1 : -1
  );

  const completedTasks = tasks.filter((t) => t.done).length;

  /* ==================== UI ==================== */

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02010A] via-[#050816] to-black text-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* HEADER + CERTIFICATIONS */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Learning Journey
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-xl">
              Tracking my growth in{" "}
              <span className="text-cyan-300">Java, DSA and Full Stack</span>{" "}
              with real sessions, tasks and certificates – so it&apos;s clear
              I&apos;m serious about reaching a product SDE role.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-1.5 text-xs hover:border-white hover:bg-white/5 transition"
            >
              ← Back to Home
            </a>
          </div>

          <AchievementsRotator />
        </div>

        {/* PROGRESS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Daily", value: dailyMinutes, goal: GOAL.daily },
            { label: "Weekly", value: weeklyMinutes, goal: GOAL.weekly },
            { label: "Monthly", value: monthlyMinutes, goal: GOAL.monthly },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.04 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center shadow-[0_0_25px_rgba(0,0,0,0.8)]"
            >
              <p className="text-sm uppercase tracking-wider text-slate-300 mb-2">
                {item.label}
              </p>
              <div className="relative h-3 bg-black/60 rounded-full overflow-hidden mb-2">
                <div
                  style={{ width: `${pct(item.value, item.goal)}%` }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500"
                />
              </div>
              <p className="text-xs text-slate-400">
                {Math.round(item.value / 60)}h logged ·{" "}
                {pct(item.value, item.goal)}% of goal
              </p>
            </motion.div>
          ))}
        </section>

        {/* LOG SESSION */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Log today&apos;s session</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="grid md:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg bg-black/40 border border-slate-700 px-2 py-2 outline-none focus:border-zinc-200"
                />
              </div>
              <div className="space-y-1">
                <label>Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg bg-black/40 border border-slate-700 px-2 py-2 outline-none focus:border-zinc-200"
                />
              </div>
              <div className="space-y-1">
                <label>Duration (mins)</label>
                <input
                  type="number"
                  min={15}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full rounded-lg bg-black/40 border border-slate-700 px-2 py-2 outline-none focus:border-zinc-200"
                />
              </div>
              <div className="space-y-1">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-lg bg-black/40 border border-slate-700 px-2 py-2 outline-none focus:border-zinc-200"
                >
                  <option value="Java">Java / Core</option>
                  <option value="DSA">DSA</option>
                  <option value="FullStack">Full-stack / Projects</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic (e.g. Arrays, OOP, React hooks...)"
              className="w-full rounded-lg bg-black/40 border border-slate-700 px-3 py-2 text-xs outline-none focus:border-zinc-200"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What exactly did you practice?"
              className="w-full rounded-lg bg-black/40 border border-slate-700 px-3 py-2 text-xs outline-none focus:border-zinc-200 min-h-[70px]"
            />
            <button
              type="button"
              onClick={addLog}
              className="px-4 py-2 text-xs rounded-full bg-zinc-100 text-black font-medium hover:bg-white shadow-[0_0_20px_rgba(250,250,250,0.15)]"
            >
              Save session
            </button>
          </div>
        </section>

        {/* LOCAL ANALYSIS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Progress insight</h2>
            <button
              type="button"
              onClick={analyse}
              className="text-xs px-4 py-1.5 rounded-full border border-sky-500 bg-sky-500/10 hover:bg-sky-500/20"
            >
              Analyse my progress
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 text-xs min-h-[80px] whitespace-pre-wrap shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {summary || (
              <p className="text-slate-400">
                Click &quot;Analyse my progress&quot; to get a summary based on
                your logs. This is local logic (no external AI).
              </p>
            )}
          </div>
        </section>

        {/* AI MENTOR */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">AI Mentor</h2>
            <button
              onClick={runAiAnalysis}
              disabled={aiLoading}
              className="text-xs px-4 py-1.5 rounded-full border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-40"
            >
              {aiLoading ? "Analyzing..." : "Ask AI to Analyse"}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 text-xs min-h-[80px] whitespace-pre-wrap shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {aiError && (
              <p className="text-red-400 mb-2 text-[11px]">{aiError}</p>
            )}

            {aiResult ? (
              aiResult
            ) : (
              <p className="text-slate-400">
                After you log some sessions and tasks, click{" "}
                <span className="text-emerald-300 font-semibold">
                  &quot;Ask AI to Analyse&quot;
                </span>{" "}
                to get a 3-day plan and feedback generated by AI.
              </p>
            )}
          </div>
        </section>

        {/* TASKS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Tasks &amp; TODO</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="grid md:grid-cols-[2fr,1fr,auto] gap-2 text-xs">
              <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Next task (e.g. 5 DSA problems)"
                className="rounded-lg bg-black/40 border border-slate-700 px-3 py-2 outline-none focus:border-zinc-200"
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="rounded-lg bg-black/40 border border-slate-700 px-2 py-2 outline-none focus:border-zinc-200"
              />
              <button
                type="button"
                onClick={addTask}
                className="px-4 py-2 rounded-lg bg-zinc-100 text-black font-medium hover:bg-white"
              >
                Add
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-[11px] text-slate-400">
                No tasks yet. Add your next actions.
              </p>
            ) : (
              <ul className="space-y-2 text-xs">
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between rounded-lg bg-black/40 border border-slate-800 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleTask(t.id)}
                        className="h-3 w-3 accent-zinc-100"
                      />
                      <div>
                        <p
                          className={
                            t.done
                              ? "line-through text-slate-500"
                              : "text-slate-200"
                          }
                        >
                          {t.text}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Due: {prettyDate(t.dueDate)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {t.done ? "Completed" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <p className="text-[11px] text-slate-500">
              Completed tasks: {completedTasks} / {tasks.length}
            </p>
          </div>
        </section>

        {/* IMAGES */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Snapshots / Image Notes</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <p className="text-[11px] text-slate-400">
              Drop screenshots of code, bugs, whiteboard, etc. Stored in your
              browser only (no upload).
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="text-[11px] text-slate-300"
            />

            {images.length > 0 && (
              <div className="grid md:grid-cols-3 gap-3 mt-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="rounded-xl overflow-hidden border border-slate-800 bg-black/60"
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="px-2 py-2">
                      <p className="text-[11px] text-slate-200 truncate">
                        {img.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {img.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 text-xs text-slate-500 mt-10">
          <div className="flex justify-between items-center py-4">
            <span>© {new Date().getFullYear()} Madhusudhan J S</span>
            <span className="tracking-[0.35em] uppercase text-slate-400">
              MAAI
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
