"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SongQuote = () => {
  return (
    <section className="relative my-8 sm:my-14 w-full max-w-2xl mx-auto px-2 sm:px-4">
      {/* Curved dashed arrow connecting lyrics to polaroid (desktop) */}
      <svg
        className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none text-slate-400 dark:text-slate-500 z-0"
        viewBox="0 0 600 280"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="dashed-arrowhead"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" />
          </marker>
        </defs>
        <path
          d="M 135 130 C 150 38, 285 30, 400 48"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeDasharray="5 5"
          strokeLinecap="round"
          markerEnd="url(#dashed-arrowhead)"
        />
      </svg>

      <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-8 sm:gap-4 min-h-[260px] sm:min-h-[290px]">
        {/* LEFT / BOTTOM: Wish You Were Here lyrics */}
        <div className="w-full sm:w-[58%] text-left pt-3 sm:pt-24">
          <p className="font-serif text-slate-800 dark:text-slate-200 text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] tracking-normal selection:bg-amber-200 dark:selection:bg-amber-900/50">
            How I wish, how I wish you were here
            <br />
            We&apos;re just two lost souls swimming in a fishbowl
            <br />
            Year after year
            <br />
            Running over the same old ground, what have we found?
            <br />
            The same old fears, wish you were here
          </p>
        </div>

        {/* RIGHT / TOP: Taped Polaroid Photo */}
        <div className="w-full sm:w-[38%] flex justify-center sm:justify-end sm:self-start sm:pt-1">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative w-[140px] sm:w-[155px] md:w-[165px] bg-white p-2 pb-5 sm:pb-6 rounded-sm shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-slate-200/90 select-none cursor-pointer rotate-[-4deg]"
          >
            {/* Top-Left Washi Tape (Soft Lavender/Periwinkle) */}
            <div
              className="absolute -top-2.5 -left-2.5 w-10 sm:w-11 h-4 sm:h-4.5 bg-[#a5b4fc]/85 backdrop-blur-[0.5px] -rotate-25 shadow-xs pointer-events-none z-10"
              style={{
                clipPath:
                  "polygon(0% 10%, 6% 0%, 94% 0%, 100% 12%, 96% 90%, 90% 100%, 8% 100%, 0% 88%)",
              }}
            />

            {/* Top-Right Washi Tape (Soft Pastel Yellow) */}
            <div
              className="absolute -top-2.5 -right-2.5 w-10 sm:w-11 h-4 sm:h-4.5 bg-[#fde047]/85 backdrop-blur-[0.5px] rotate-20 shadow-xs pointer-events-none z-10"
              style={{
                clipPath:
                  "polygon(3% 0%, 95% 4%, 100% 90%, 92% 100%, 6% 98%, 0% 88%, 4% 12%)",
              }}
            />

            {/* Polaroid Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 rounded-xs shadow-inner">
              <Image
                src="/wish-you-were-here.jpg"
                alt="Wish You Were Here — Pink Floyd"
                fill
                sizes="(max-width: 640px) 140px, 165px"
                className="object-cover"
                priority
              />
            </div>

            {/* Polaroid Handwritten Caption */}
            <div className="mt-1.5 text-center">
              <span className="font-handwriting text-xs sm:text-sm text-slate-700 tracking-wide">
                wish you were here
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
