import JourneyCard from "./JourneyCard";
import { motion } from "framer-motion";

export default function JourneyTimeline() {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-20 pb-40">
      
      {/* Vertical Timeline Line */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="hidden md:block absolute left-1/2 top-4 bottom-0 w-px bg-gradient-to-b from-white/20 via-zinc-800 to-transparent transform -translate-x-1/2"
      />

      <div className="relative z-10">
        <JourneyCard
          index={0}
          role="IT Admin"
          company="Siemens Gamesa"
          duration="Mar 23, 2026 - Present"
          isCurrent
        >
          <li>Managing enterprise IT infrastructure, resolving complex hardware/software vulnerabilities across corporate networks.</li>
          <li>Streamlining operational flows using automated scripts to minimize system downtime.</li>
          <li>Providing mission-critical technical support for large-scale engineering systems.</li>
        </JourneyCard>

        <JourneyCard
          index={1}
          role="Software Developer Intern"
          company="Marque Magic"
          duration="Jan 2025 - Apr 2025"
        >
          <li>Built scalable RESTful APIs using <strong>FastAPI</strong> and <strong>Flask</strong>, improving backend processing limitations.</li>
          <li>Developed full stack responsive UI modules, integrating tightly with <strong>SQLAlchemy & PostgreSQL</strong> data structures.</li>
          <li>Engineered and integrated an <strong>ML-based ECG anomaly detection system</strong> directly into backend pipelines.</li>
          <li>Deployed web scraping data extraction pipelines for customized dynamic feeds.</li>
        </JourneyCard>

        <JourneyCard
          index={2}
          role="Java Full Stack Trainee"
          company="Tap Academy"
          duration="Oct 2024 - Present"
        >
          <li>Strengthened core backend foundations via comprehensive <strong>Core Java</strong>, OOP, Collections, and Exception Handling architectures.</li>
          <li>Structured and deployed advanced logical problem-solving environments via robust backend implementations.</li>
          <li>Built a real-world developer progress-tracking application from scratch.</li>
        </JourneyCard>

        <JourneyCard
          index={3}
          role="Chief Marketing Officer (CMO)"
          company="Even4U"
          duration="May 2025 - Jan 2026"
        >
          <li>Steered strategic vision aligning corporate business logic and software marketing methodologies.</li>
          <li>Executed dynamic campaigns utilizing data-driven insights to maximize platform engagement.</li>
          <li>Co-led high-level organizational pivoting towards advanced technical solutions.</li>
        </JourneyCard>
      </div>
    </div>
  );
}
