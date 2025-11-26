"use client";

import { motion } from "framer-motion";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage?: string | null; // live demo URL (optional, from GitHub)
  pushed_at: string;
};

type Props = {
  repos: Repo[];
};

type ProjectExtras = {
  videoUrl?: string; // YouTube link
};

// 🔧 Put your YouTube links here, using the EXACT repo name as key
const PROJECT_CONFIG: Record<string, ProjectExtras> = {
  // "employee-leave-management-system": {
  //   videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  // },
};

export default function ProjectsClient({ repos }: Props) {
  return (
    <div className="space-y-8">
      {/* HEADER (no filter for now) */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold text-white">Projects</h2>
        <p className="text-xs text-slate-400">
          All repositories fetched from my GitHub profile. Filtering will be
          added later.
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map((repo, index) => {
          const extra = PROJECT_CONFIG[repo.name] || {};
          const hasVideo = !!extra.videoUrl;
          const hasDemo = !!(repo.homepage && repo.homepage !== "");

          return (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative rounded-2xl border border-white/10 
                         bg-white/5 backdrop-blur-lg p-5 
                         shadow-[0_0_40px_rgba(0,0,0,0.8)] 
                         hover:border-white/30 transition"
            >
              {/* Title */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">
                  {repo.name.replace(/-/g, " ")}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-600 text-slate-400">
                  {repo.language || "N/A"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 mb-3">
                {repo.description || "Project description coming soon."}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 text-xs">
                {/* GitHub */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-white hover:bg-white/5 transition"
                >
                  🔗 View on GitHub
                </a>

                {/* Video button */}
                {hasVideo ? (
                  <a
                    href={extra.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full border border-emerald-500 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition"
                  >
                    🎥 Watch Demo Video
                  </a>
                ) : (
                  <span className="px-3 py-1.5 rounded-full border border-yellow-600 text-yellow-400">
                    🎬 Video coming soon
                  </span>
                )}

                {/* Live demo button */}
                {hasDemo ? (
                  <a
                    href={repo.homepage as string}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full border border-sky-500 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 transition"
                  >
                    🚀 Live Demo
                  </a>
                ) : (
                  <span className="px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
                    🌐 Live demo coming soon
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="mt-3 text-[10px] text-slate-500">
                Last updated: {new Date(repo.pushed_at).toDateString()}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer text */}
      <div className="text-center text-[11px] text-slate-500 pt-6 border-t border-slate-800">
        © {new Date().getFullYear()} Madhusudhan J S ·{" "}
        <span className="tracking-widest text-slate-400">MAAI</span>
      </div>
    </div>
  );
}
