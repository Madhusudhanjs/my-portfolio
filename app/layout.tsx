import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madhusudhan JS | Portfolio",
  description: "Full Stack Developer Portfolio of Madhusudhan J S",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-950 text-slate-100"}>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-wide">
                MJ · Portfolio
              </Link>
              <div className="flex gap-4 text-sm">
                <Link href="/" className="hover:text-slate-300">
                  Home
                </Link>
                <Link href="/projects" className="hover:text-slate-300">
                  Projects
                </Link>
                <Link href="/learning" className="hover:text-slate-300">
                  Learning
                </Link>
                <Link href="/resume" className="hover:text-slate-300">
                  Resume
                </Link>
              </div>
            </nav>
          </header>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-800 text-xs text-slate-500">
            <div className="max-w-5xl mx-auto px-4 py-3">
              © {new Date().getFullYear()} Madhusudhan J S · Built with Next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
