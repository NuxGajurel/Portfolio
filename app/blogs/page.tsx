"use client";

import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useState } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function BlogsPage() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${instrumentSerif.className} antialiased tracking-tight min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20`}
    >
      {/* 404 Number */}
      <div className="relative mb-6 select-none">
        <span className="text-[10rem] sm:text-[14rem] font-normal leading-none text-gray-100 dark:text-gray-900 tracking-tighter pointer-events-none">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[14rem] font-normal leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 blur-[2px]">
          404
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-normal italic text-gray-900 dark:text-white mb-4 -mt-8 sm:-mt-12 relative z-10">
        Coming Soon{dots}
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-md font-sans antialiased tracking-normal mb-10">
        The blog is still being written. Great things take time — check back
        soon.
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10 w-full max-w-xs">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400 dark:text-gray-600 font-sans tracking-widest uppercase">
          meanwhile
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Navigation links */}
      <div className="flex flex-col sm:flex-row items-center gap-3 font-sans">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
        >
          ← Back to Home
        </Link>
        <Link
          href="/projects"
          className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:text-black dark:hover:text-white transition-all duration-200"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:text-black dark:hover:text-white transition-all duration-200"
        >
          About Me
        </Link>
      </div>
    </div>
  );
}
