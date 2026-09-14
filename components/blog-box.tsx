"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const BlogBox = () => {
  return (
    <section className="w-full max-w-2xl mx-auto my-6 select-none font-sans">
      <Link href="/blogs" className="block group cursor-pointer">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Main Card with Blue Border */}
          <div className="w-full bg-white dark:bg-zinc-950 border-2 border-[#0088e8] shadow-sm relative z-10">
            {/* Top Header Bar */}
            <div className="p-3.5 sm:p-5 flex items-start sm:items-center gap-3.5 sm:gap-4 bg-white dark:bg-zinc-950">
              {/* Spider-Man Thumbnail (cropped to face/collage) */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative shrink-0 rounded-[2px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src="/spiderman.png"
                  alt="My journey from frontend developer to full-stack"
                  fill
                  sizes="(max-width: 640px) 44px, 56px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Title */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] sm:text-[21px] md:text-[22px] font-normal leading-[1.3] text-black dark:text-white tracking-normal lowercase">
                  my journey from frontend developer to full
                  <br className="hidden sm:inline" />
                  -stack
                </h3>
              </div>
            </div>

            {/* Sharp Horizontal Black Divider */}
            <div className="w-full h-[1.5px] bg-black dark:bg-zinc-700" />

            {/* Main Canvas Area */}
            <div className="w-full h-[240px] sm:h-[320px] md:h-[360px] bg-white dark:bg-zinc-950 flex flex-col justify-end p-4 sm:p-6">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-xs sm:text-sm font-mono text-gray-400 dark:text-zinc-500">
                <span>click to read article</span>
                <span>/blogs &rarr;</span>
              </div>
            </div>
          </div>

          {/* Underlay Pastel Blue Block */}
          <div className="w-full h-12 sm:h-16 md:h-20 bg-[#b8cbf5] dark:bg-[#223354] transition-colors" />
        </motion.div>
      </Link>
    </section>
  );
};

export default BlogBox;
