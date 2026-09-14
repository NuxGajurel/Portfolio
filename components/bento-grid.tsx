"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const photoList = [
  { src: "/nuux.jpg", alt: "Mini Nux", label: "Mini Nux" },
  { src: "/spiderman.png", alt: "Spider-Man Collage", label: "Spider-Man" },
  { src: "/nux.png", alt: "Nux Portrait", label: "Nux Gajurel" },
  { src: "/end.jpg", alt: "Late Night Code", label: "Late Night" },
  { src: "/4.jpg", alt: "Farewell Memory", label: "Memories" },
];

export default function BentoGrid() {
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleCyclePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    setPhotoIndex((prev) => (prev + 1) % photoList.length);
  };

  return (
    <section
      aria-label="Portfolio overview grid"
      className="w-full my-4 sm:my-6 select-none font-sans"
    >
      {/* 
        Mobile (< md): 2 columns
          Row 1: Card 1 (About - White), Card 2 (Role - Lavender)
          Row 2: Card 3 (Photo - Spans 2 columns)
          Row 3: Card 4 (Welcome - Forest Green), Card 5 (Music - White)
        Desktop (>= md): 3 columns, 2 rows
          Col 1: Card 1 (top), Card 4 (bottom)
          Col 2: Card 2 (top), Card 5 (bottom)
          Col 3: Card 3 (Photo, spans both rows vertically)
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5 md:gap-4 md:auto-rows-[172px]">
        
        {/* ================= CARD 1: ABOUT (CLEAN WHITE) ================= */}
        <Link
          href="/about"
          className="group rounded-3xl bg-white dark:bg-zinc-900/90 border border-gray-200/80 dark:border-zinc-800/90 p-4 sm:p-5 flex flex-col justify-between h-[165px] md:h-auto shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 col-span-1 md:col-start-1 md:row-start-1"
        >
          <div>
            <p className="text-xs sm:text-[13px] md:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed font-normal">
              The short version: React, TypeScript, and a growing interest in agentic tooling. The long version lives on the about page.
            </p>
          </div>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-950 dark:text-white underline underline-offset-4 decoration-2 decoration-gray-950/80 dark:decoration-white/80 group-hover:decoration-gray-950 dark:group-hover:decoration-white transition-colors">
              About me <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* ================= CARD 2: CURRENT ROLE (PASTEL LAVENDER) ================= */}
        <div className="group rounded-3xl bg-[#efe9fe] dark:bg-[#2c1a45] border border-[#ded4fe] dark:border-purple-900/40 p-4 sm:p-5 flex flex-col justify-between h-[165px] md:h-auto shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 col-span-1 md:col-start-2 md:row-start-1">
          <div>
            <p className="text-[16px] sm:text-[18px] md:text-[19px] font-extrabold text-gray-950 dark:text-white leading-tight tracking-tight">
              Full Stack Developer &amp;<br />Student
            </p>
          </div>

          <div className="mt-auto pt-2">
            <p className="text-xs sm:text-[13px] text-gray-600 dark:text-purple-200/80 leading-relaxed font-normal">
              Shipping client work by day, studying systems by night.
            </p>
          </div>
        </div>

        {/* ================= CARD 3: PHOTO CARD (PORTRAIT ON DESKTOP, WIDE ON MOBILE) ================= */}
        <div
          onClick={handleCyclePhoto}
          title="Click to swap photo"
          className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group col-span-2 md:col-start-3 md:row-start-1 md:row-span-2 h-[210px] sm:h-[235px] md:h-full bg-zinc-900"
        >
          <Image
            src={photoList[photoIndex].src}
            alt={photoList[photoIndex].alt}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 33vw"
          />

          {/* Smooth Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

          {/* Bottom Left Label: "Mini Nux" */}
          <div className="absolute bottom-3.5 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm shadow-md select-none">
            {photoList[photoIndex].label}
          </div>

          {/* Bottom Right: Swap Indicator */}
          <div className="absolute bottom-3.5 right-4 flex items-center gap-1.5 text-[10px] sm:text-xs text-white/90 bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-colors shadow-md select-none">
            <span>Swap</span>
            <span className="font-mono text-white/70">{photoIndex + 1}/{photoList.length}</span>
          </div>
        </div>

        {/* ================= CARD 4: WELCOME (DEEP FOREST GREEN) ================= */}
        <Link
          href="/about"
          className="group rounded-3xl bg-gradient-to-br from-[#45682c] to-[#3a5824] dark:from-[#293d18] dark:to-[#1c2c10] border border-[#4c7430] dark:border-[#2f491c] p-4 sm:p-5 flex flex-col justify-between h-[165px] md:h-auto text-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 col-span-1 md:col-start-1 md:row-start-2"
        >
          <div>
            <p className="text-[18px] sm:text-[20px] md:text-[21px] font-extrabold text-white leading-tight tracking-tight">
              Welcome to my corner of<br />the internet :)
            </p>
          </div>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white underline underline-offset-4 decoration-2 decoration-white/80 group-hover:decoration-white transition-colors">
              My journey <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* ================= CARD 5: RECENT FAVORITE (CLEAN WHITE) ================= */}
        <div
          className="group rounded-3xl bg-white dark:bg-zinc-900/90 border border-gray-200/80 dark:border-zinc-800/90 p-4 sm:p-5 flex flex-col justify-between h-[165px] md:h-auto shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden col-span-1 md:col-start-2 md:row-start-2"
        >
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-gray-400 dark:text-zinc-400 uppercase font-sans">
              RECENT FAVORITE
            </span>

            <div className="flex items-center justify-between gap-3 mt-2">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] sm:text-[17px] font-extrabold text-gray-950 dark:text-white truncate tracking-tight">
                  Hunger Strike
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mt-0.5 font-normal">
                  Temple of the Dog
                </p>
              </div>

              {/* Minimalist Vinyl Record */}
              <div className="w-10 h-10 rounded-full bg-[#141414] border border-zinc-800 shadow-sm shrink-0 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-950 dark:text-white">
              On repeat ✦
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
