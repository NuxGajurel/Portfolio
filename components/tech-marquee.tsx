"use client";

import React from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
} from "react-icons/si";

type Technology = {
  name: string;
  icon: React.ElementType;
  colorClass: string;
};

const row1: Technology[] = [
  { name: "HTML", icon: SiHtml5, colorClass: "text-[#E34F26]" },
  { name: "CSS", icon: SiCss3, colorClass: "text-[#1572B6]" },
  { name: "JS", icon: SiJavascript, colorClass: "text-[#F7DF1E]" },
  { name: "Tailwind", icon: SiTailwindcss, colorClass: "text-[#06B6D4]" },
  { name: "React", icon: SiReact, colorClass: "text-[#61DAFB]" },
];

const row2: Technology[] = [
  { name: "Next.js", icon: SiNextdotjs, colorClass: "text-black dark:text-white" },
  { name: "TS", icon: SiTypescript, colorClass: "text-[#3178C6]" },
  { name: "Node.js", icon: SiNodedotjs, colorClass: "text-[#339933]" },
  { name: "Express", icon: SiExpress, colorClass: "text-[#000000] dark:text-white" },
  { name: "MySQL", icon: SiMysql, colorClass: "text-[#4479A1]" },
];

export function TechMarquee() {
  // Triple the items to make sure it scrolls infinitely without empty gaps
  const row1Repeated = [...row1, ...row1, ...row1, ...row1, ...row1];
  const row2Repeated = [...row2, ...row2, ...row2, ...row2, ...row2];

  const renderCard = (tech: Technology, index: number) => {
    const Icon = tech.icon;
    return (
      <div
        key={`${tech.name}-${index}`}
        className="flex flex-row items-center justify-center gap-1.5 sm:gap-2 w-22 h-8 sm:w-26 sm:h-10 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-lg sm:rounded-xl shadow-sm hover:scale-105 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-300 cursor-pointer flex-shrink-0 px-2"
      >
        <Icon className={`text-sm sm:text-base ${tech.colorClass} transition-transform duration-300`} />
        <span className="text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
          {tech.name}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full py-6 my-4 overflow-hidden select-none">
      {/* Left/Right Subtle Gradient Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent dark:from-[#0a0a0a] pointer-events-none z-10 opacity-70" />
      <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent dark:from-[#0a0a0a] pointer-events-none z-10 opacity-70" />

      {/* Row 1 - Left Scrolling */}
      <div className="flex overflow-hidden w-full mb-3 sm:mb-4">
        <div className="flex gap-3 sm:gap-4 animate-marquee-left pr-3 sm:pr-4">
          {row1Repeated.map((tech, idx) => renderCard(tech, idx))}
        </div>
      </div>

      {/* Row 2 - Right Scrolling */}
      <div className="flex overflow-hidden w-full">
        <div className="flex gap-3 sm:gap-4 animate-marquee-right pr-3 sm:pr-4">
          {row2Repeated.map((tech, idx) => renderCard(tech, idx))}
        </div>
      </div>
    </div>
  );
}
