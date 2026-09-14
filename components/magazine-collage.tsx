"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Word + image mixed magazine collage layout
// Faithfully inspired by: "Your space isn't boring, it is unfinished."
export default function MagazineCollage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  });

  return (
    <section
      ref={ref}
      aria-label="Editorial space showcase"
      className="w-full my-8 sm:my-10 select-none"
    >
      {/* Editorial Card Canvas */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-4 sm:p-6 md:p-7 backdrop-blur-sm shadow-sm transition-colors duration-300">
        
        {/* Subtle Top Metadata Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-3 sm:mb-4 pb-2.5 border-b border-gray-100 dark:border-zinc-800/80">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Studio Manifesto
          </span>
          <span>Archive // 2026</span>
        </div>

        {/* 3-Row Magazine Grid */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          
          {/* ================= ROW 1 ================= */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3 items-stretch h-24 sm:h-28 md:h-32">
            {/* Text: Your space */}
            <motion.div
              {...fadeUp(0)}
              className="col-span-4 flex flex-col justify-center pr-1"
            >
              <p className="font-extrabold tracking-tight text-gray-900 dark:text-white leading-[0.88] text-2xl sm:text-3xl md:text-[34px]">
                Your<br />space
              </p>
            </motion.div>

            {/* Middle: Collaborative coding */}
            <motion.div
              {...fadeUp(0.08)}
              className="col-span-5 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/hamro.JPG"
                alt="Building together"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Right: Keyboard tactile detail */}
            <motion.div
              {...fadeUp(0.14)}
              className="col-span-3 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/keyboard.jpg"
                alt="Workspace tools"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3 items-stretch h-24 sm:h-28 md:h-32">
            {/* Left: UI / Creative project */}
            <motion.div
              {...fadeUp(0.1)}
              className="col-span-4 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/haven.png"
                alt="Digital craft"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Center: "isn't [pill] boring" */}
            <motion.div
              {...fadeUp(0.16)}
              className="col-span-5 flex flex-col justify-center pl-1 sm:pl-2"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-tight text-gray-900 dark:text-white leading-[0.88] text-2xl sm:text-3xl md:text-[34px]">
                  isn&apos;t
                </span>
                <span className="relative inline-block rounded-full overflow-hidden border border-black/10 dark:border-white/20 shrink-0 w-8 h-4 sm:w-11 sm:h-5 md:w-13 md:h-6 bg-gray-200 dark:bg-zinc-700 align-middle shadow-inner">
                  <Image
                    src="/mac.jpg"
                    alt="Pill preview"
                    fill
                    className="object-cover object-center"
                  />
                </span>
              </div>
              <p className="font-extrabold tracking-tight text-gray-900 dark:text-white leading-[0.88] text-2xl sm:text-3xl md:text-[34px]">
                boring
              </p>
            </motion.div>

            {/* Right: Portrait */}
            <motion.div
              {...fadeUp(0.22)}
              className="col-span-3 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/nux.png"
                alt="Portrait"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* ================= ROW 3 ================= */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3 items-stretch h-24 sm:h-28 md:h-32">
            {/* Left: Authentic memory */}
            <motion.div
              {...fadeUp(0.18)}
              className="col-span-4 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/school.jpg"
                alt="Roots and journey"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Middle: Polaroid textures */}
            <motion.div
              {...fadeUp(0.24)}
              className="col-span-4 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 group"
            >
              <Image
                src="/polaroids.png"
                alt="Moments"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Right: "it is unfinished." */}
            <motion.div
              {...fadeUp(0.28)}
              className="col-span-4 flex flex-col justify-center pl-1 sm:pl-2"
            >
              <p className="font-extrabold tracking-tight text-gray-900 dark:text-white leading-[0.88] text-xl sm:text-2xl md:text-[28px]">
                it is<br />unfinished.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}




