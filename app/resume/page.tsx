// app/resume/page.tsx
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume | MAAI",
  description:
    "View and download my resume, and use AI to tailor it to specific job descriptions.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
