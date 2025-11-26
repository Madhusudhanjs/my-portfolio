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
         

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

          
        </div>
      </body>
    </html>
  );
}
