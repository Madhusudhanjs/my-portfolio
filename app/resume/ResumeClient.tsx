"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Wand2, Sparkles, FileDown, Download } from "lucide-react";
import jsPDF from "jspdf";

/** ✅ SINGLE SOURCE OF TRUTH */
const resumeUrl = "/resume/Madhusudhan_Resume_v2.pdf";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, jobDescription }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate summary.");
      }

      const data = await res.json();
      setTailoredResume(data.result || "");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
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

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(heading, 10, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const lines = doc.splitTextToSize(tailoredResume || "", 180);
      doc.text(lines, 10, 32);

      doc.save("Madhusudhan_Tailored_Resume.pdf");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-black text-white py-16 px-4 md:px-10 lg:px-20">
      <motion.div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              My <span className="text-blue-500">Resume</span>
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl">
              View my resume or generate an AI-tailored version for any job.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-white/5 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            AI Resume Tailor
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="rounded-3xl border border-gray-900 bg-gradient-to-br from-gray-900 to-black p-7 space-y-6">
            <h2 className="text-2xl font-semibold">Resume – Madhusudhan J S</h2>

            {/* PDF Preview */}
            <div className="rounded-xl border border-gray-800 overflow-hidden">
              <iframe
                src={resumeUrl}
                title="Resume Preview"
                className="w-full h-72"
              />
            </div>

            {/* ✅ FIXED BUTTONS */}
            <div className="flex gap-3 flex-wrap" suppressHydrationWarning>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-700 hover:border-gray-400"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>

          {/* RIGHT – AI Tailor */}
          <div className="rounded-3xl border border-gray-900 bg-black p-7 space-y-5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              AI Resume Tailor <Wand2 className="w-4 h-4 text-blue-400" />
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title (optional)"
                className="w-full px-3 py-2 bg-black border border-gray-800 rounded"
              />

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description"
                className="w-full min-h-[130px] px-3 py-2 bg-black border border-gray-800 rounded"
              />

              <button
                type="submit"
                disabled={isGenerating}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Generate
              </button>
            </form>

            <div className="rounded-xl border border-gray-800 p-4 min-h-[120px]">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : (
                tailoredResume || "AI output will appear here."
              )}
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={!tailoredResume}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded hover:border-blue-500"
            >
              <FileDown className="w-4 h-4" />
              Download AI PDF
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
