"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── Blog posts shown inside each polaroid card ── */
const blogCards = [
  {
    id: 0,
    rotation: -12,
    xOffset: "-60%",
    zIndex: 1,
    avatar: "/Nuxgajurel.jpg",
    title: "Agentic AI Workflows: The Future of Development Is Here",
    tags: ["#ai-coding", "#claude-code"],
    date: "Jul 25",
    readTime: "5m read",
    accentColor: "#00e5ff",
    headline: ["Agentic", "AI", "Workflows"],
    sub: "The Future of\nDevelopment\nIs Here.",
    flowSteps: ["GOAL", "PLAN", "USE TOOLS", "REASON", "REVIEW", "COMPLETE"],
  },
  {
    id: 1,
    rotation: -2,
    xOffset: "0%",
    zIndex: 2,
    avatar: "/Nuxgajurel.jpg",
    title: "My Journey From Frontend to Full-Stack Development",
    tags: ["#react", "#nextjs"],
    date: "Sep 08",
    readTime: "4m read",
    accentColor: "#a78bfa",
    headline: ["From", "Frontend", "to Full-Stack"],
    sub: "What I'm learning\nas I build\ncomplete apps.",
    flowSteps: ["HTML", "CSS", "JS", "REACT", "NODE", "DEPLOY"],
  },
  {
    id: 2,
    rotation: 10,
    xOffset: "60%",
    zIndex: 1,
    avatar: "/Nuxgajurel.jpg",
    title: "Building Beautiful UIs With Tailwind & Framer Motion",
    tags: ["#tailwind", "#animation"],
    date: "Aug 14",
    readTime: "3m read",
    accentColor: "#34d399",
    headline: ["Beautiful", "UI", "Design"],
    sub: "Motion &\nTailwind for\nstunning UI.",
    flowSteps: ["DESIGN", "TOKENS", "ANIMATE", "POLISH", "TEST", "SHIP"],
  },
];

export const PolaroidStack = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[330px] sm:h-[380px] flex items-center justify-center mt-1 mb-2">
      {blogCards.map((card, index) => {
        const isActive = activeCard === index;
        const isHoveredAny = activeCard !== null;

        return (
          <motion.div
            key={card.id}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
            initial={{ rotate: card.rotation, x: card.xOffset, scale: 1, zIndex: card.zIndex }}
            animate={{
              rotate: isActive ? 0 : isHoveredAny ? card.rotation * 1.2 : card.rotation,
              scale: isActive ? 1.05 : isHoveredAny ? 0.95 : 1,
              zIndex: isActive ? 10 : card.zIndex,
              y: isActive ? -15 : 0,
              x: card.xOffset,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="absolute w-[200px] sm:w-[240px] md:w-[280px] bg-[#d4cfc2] p-3 pb-12 sm:pb-16 rounded-xl shadow-2xl cursor-pointer border border-[#c2bbae]"
            style={{
              filter: isHoveredAny && !isActive ? "grayscale(100%) brightness(50%)" : "grayscale(0%) brightness(100%)",
              transition: "filter 0.4s ease",
            }}
          >
            {/* ── Blog content inside the polaroid frame ── */}
            <Link href="/blogs" className="block w-full h-full">
              <div className="w-full rounded-md overflow-hidden bg-[#111827]">

                {/* Top meta area */}
                <div className="px-3 pt-3 pb-2">
                  {/* Avatar + title */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border border-slate-600">
                      <Image
                        src={card.avatar}
                        alt="Author"
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-white font-bold text-[11px] leading-snug line-clamp-3">
                      {card.title}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1 mb-1.5">
                    <span className="text-yellow-400 text-[10px]">⚠</span>
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded-full border border-slate-600 text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date + read time */}
                  <p className="text-slate-500 text-[9px]">
                    {card.date} · {card.readTime}
                  </p>
                </div>

                {/* Thumbnail illustration */}
                <div className="relative w-full h-[90px] sm:h-[110px] bg-white flex items-center justify-center gap-2 px-3">
                  {/* Left headline */}
                  <div className="flex-1">
                    {card.headline.map((line, i) => (
                      <p
                        key={i}
                        className="font-black leading-none uppercase tracking-tight"
                        style={{
                          fontSize: i === 1 ? "18px" : "11px",
                          color: i === 1 ? card.accentColor : "#1e293b",
                        }}
                      >
                        {line}
                      </p>
                    ))}
                    <p className="text-gray-500 text-[8px] mt-1 leading-snug whitespace-pre-line">
                      {card.sub}
                    </p>
                  </div>

                  {/* Right flowchart */}
                  <div className="flex-shrink-0 bg-white rounded-md p-1.5 shadow-lg w-[72px]">
                    <p className="text-[6px] font-bold text-gray-600 mb-1 text-center uppercase leading-none">
                      Workflow
                    </p>
                    {card.flowSteps.map((step) => (
                      <div key={step} className="flex items-center gap-0.5 mb-0.5">
                        <div className="w-2 h-2 rounded-sm bg-gray-200 flex-shrink-0" />
                        <p className="text-[6px] text-gray-500 font-medium leading-none">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
