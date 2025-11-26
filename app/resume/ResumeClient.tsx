"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Wand2, Sparkles, FileDown } from "lucide-react";
import jsPDF from "jspdf";

export default function ResumeClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tailoredResume, setTailoredResume] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim()) return;

    setIsGenerating(true);
    setError(null);
    setTailoredResume("");

    try {
      const res = await fetch("/api/ai/tailor-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate summary.");
      }

      const data = await res.json();
      setTailoredResume(data.result || "");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Something went wrong. Please try again in a few seconds."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    try {
      setIsDownloadingPdf(true);

      const doc = new jsPDF();

      const title = jobTitle || "Target Role";
      const heading = `Tailored Resume Summary – ${title}`;

      const content =
        tailoredResume ||
        `Tailored summary for ${title}.\n\n(Generate a summary from the AI section first to get a better PDF.)`;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(heading, 10, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 32);

      doc.save("Madhusudhan_Tailored_Resume.pdf");
    } catch (err) {
      console.error(err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-black text-white py-16 px-4 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Top heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              My <span className="text-blue-500">Resume</span>
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl text-sm md:text-base">
              View or download my latest resume, and use the{" "}
              <span className="text-blue-400 font-medium">
                AI Resume Tailor
              </span>{" "}
              to generate a version aligned to any job description.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-white/5 px-4 py-2 text-xs md:text-sm text-gray-300"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>V1 · AI-tailor + PDF export</span>
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] gap-8 lg:gap-10">
          {/* Left: Resume card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative rounded-3xl border border-gray-900 bg-gradient-to-br from-gray-900 via-black to-black p-6 md:p-7 shadow-[0_0_60px_rgba(37,99,235,0.25)] overflow-hidden"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-24 -right-10 h-52 w-52 rounded-full bg-blue-500/30 blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  CORE DOCUMENT
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Resume – Madhusudhan J S
                </h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-800 bg-black/60">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              This PDF contains my education, skills, projects, and experience.
              Use the buttons below to view or download it.
            </p>

            {/* Preview placeholder */}
            <div className="mt-6 rounded-2xl border border-dashed border-gray-800 bg-black/40 p-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Preview</span>
                <span>PDF · 1–2 pages</span>
              </div>
              <div className="mt-3 h-40 md:h-52 rounded-xl bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center text-gray-600 text-[0.7rem] md:text-xs">
                PDF preview coming soon
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/resume/Madhusudhan_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <button className="rounded-2xl text-sm md:text-base inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 transition">
                  <FileText className="w-4 h-4 mr-2" />
                  View Resume
                </button>
              </a>

              <a href="/resume/Madhusudhan_Resume.pdf" download>
                <button className="rounded-2xl border border-gray-700 bg-black text-sm md:text-base inline-flex items-center px-4 py-2 hover:border-gray-400 transition">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </a>
            </div>

            {/* Quick overview / snapshot */}
            <div className="mt-7 grid gap-4 text-xs md:text-sm text-gray-300 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                  Snapshot
                </p>
                <ul className="space-y-1.5">
                  <li>🎓 B.Tech – Computer Science Engineering</li>
                  <li>💻 Java · DSA · Full Stack</li>
                  <li>📍 India</li>
                  <li>🚀 Target: 10+ LPA Product Role</li>
                </ul>
              </div>
              <div className="space-y-1.5">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                  Status
                </p>
                <div className="rounded-xl border border-gray-800 bg-black/40 p-3">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This page is powered by AI to tailor your resume to each JD,
                    and lets you export a PDF summary specific to that role.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: AI Tailor */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="rounded-3xl border border-gray-900 bg-gradient-to-br from-slate-950 via-black to-black p-6 md:p-7 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  AI RESUME TAILOR
                </p>
                <h2 className="mt-2 text-xl font-semibold flex items-center gap-2">
                  Job-specific customization
                  <Wand2 className="w-4 h-4 text-blue-400" />
                </h2>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-400">
              Paste any job description here. I’ll generate a{" "}
              <span className="text-blue-400">targeted summary</span> and
              talking points that align your resume to that role, then export it
              as a separate PDF.
            </p>

            {/* Form */}
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300">
                  Job Title (Optional)
                </label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Java Backend Developer, SDE-1, Full Stack Engineer"
                  className="w-full rounded-md border border-gray-800 bg-black/50 text-xs md:text-sm px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300">
                  Job Description / JD
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full min-h-[130px] rounded-md border border-gray-800 bg-black/50 text-xs md:text-sm px-3 py-2 outline-none resize-none focus:border-blue-500"
                />
                <p className="text-[0.7rem] text-gray-500">
                  Tip: Include responsibilities, required skills, and tech stack
                  for best tailoring.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={isGenerating || !jobDescription.trim()}
                  className="rounded-2xl text-xs md:text-sm inline-flex items-center px-4 py-2 bg-blue-600 disabled:bg-blue-900 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                  {isGenerating ? (
                    "Generating..."
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Tailored Summary
                    </>
                  )}
                </button>

                <p className="text-[0.65rem] text-gray-500">
                  Your JD is processed via API and used only to generate this
                  summary.
                </p>
              </div>
            </form>

            {/* Output + PDF export */}
            <div className="space-y-3">
              <div className="mt-3 rounded-2xl border border-gray-800 bg-black/40 p-4 text-xs md:text-sm text-gray-200 min-h-[120px] whitespace-pre-line">
                {error ? (
                  <span className="text-red-400">{error}</span>
                ) : tailoredResume ? (
                  tailoredResume
                ) : (
                  <span className="text-gray-500">
                    Your AI-tailored resume summary will appear here. Paste a JD
                    and click{" "}
                    <span className="text-blue-400 font-medium">
                      Generate Tailored Summary
                    </span>
                    .
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={!tailoredResume || isDownloadingPdf}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-800 px-4 py-2 text-xs md:text-sm text-gray-200 hover:border-blue-500 hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FileDown className="w-4 h-4" />
                {isDownloadingPdf
                  ? "Preparing PDF..."
                  : "Download AI Tailored PDF"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Skills & Experience section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Skills */}
          <div className="rounded-3xl border border-gray-900 bg-gradient-to-br from-gray-950 via-black to-black p-6 md:p-7 space-y-4">
            <h3 className="text-lg md:text-xl font-semibold">
              Skills & Tech Stack
            </h3>
            <p className="text-xs md:text-sm text-gray-400">
              Focused on building a strong base in problem-solving and clean,
              production-ready code.
            </p>

            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              {[
                "Java (Core & OOPs)",
                "Data Structures & Algorithms",
                "Problem Solving",
                "HTML & CSS",
                "JavaScript / TypeScript",
                "React / Next.js",
                "Git & GitHub",
                "REST APIs",
                "SQL Basics",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-gray-800 bg-black/40 px-3 py-1 text-gray-200 hover:border-blue-500 hover:text-blue-300 transition text-[0.7rem] md:text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience / Journey */}
          <div className="rounded-3xl border border-gray-900 bg-gradient-to-br from-gray-950 via-black to-black p-6 md:p-7 space-y-5">
            <h3 className="text-lg md:text-xl font-semibold">
              Experience & Learning Journey
            </h3>

            <div className="space-y-4 text-xs md:text-sm text-gray-300">
              <div className="flex gap-3">
                <div className="mt-1 h-8 w-[2px] bg-blue-600/70 rounded-full" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                    CURRENT FOCUS
                  </p>
                  <p className="mt-1 font-medium">
                    Java · DSA · Full Stack Projects
                  </p>
                  <p className="mt-1 text-gray-400">
                    Practicing DSA, building real-world clones and tools, and
                    strengthening backend logic using Java and modern web
                    frameworks.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 h-8 w-[2px] bg-blue-400/70 rounded-full" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                    PROJECT-BASED LEARNING
                  </p>
                  <p className="mt-1 font-medium">GitHub Driven Portfolio</p>
                  <p className="mt-1 text-gray-400">
                    Using GitHub as a source of truth for projects, commits, and
                    learning history – every feature is pushed as code, not just
                    theory.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 h-8 w-[2px] bg-blue-300/70 rounded-full" />
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-500">
                    GOAL
                  </p>
                  <p className="mt-1 font-medium">
                    Break into a 10+ LPA Product Role
                  </p>
                  <p className="mt-1 text-gray-400">
                    Building consistency, strong fundamentals, and an
                    interview-ready profile to crack SDE-1 / Java Developer
                    roles in product-based companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </section>
  );
}
