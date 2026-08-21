"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Playwrite_IE,
  Caveat_Brush,
  Instrument_Serif,
} from "next/font/google";
import { TechMarquee } from "@/components/tech-marquee";
import { projects } from "@/data/projects";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const bokorFont = Playwrite_IE({
  weight: "300",
});

const caveatFont = Caveat_Brush({
  weight: "400",
});

const school = {
  name: "The Rising English Boarding School",
  logoUrl: "/school.png",
};

const Nux = {
  name: "Nux Gajurel",
  avatarUrl: "/nnnux.jpg",
  initials: "NG",
};


const techStack = [
  {
    name: "TypeScript",
    description: "Typed JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    bg: "#3178C6",
  },
  {
    name: "JavaScript",
    description: "Web Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    bg: "#F7DF1E",
  },
  {
    name: "Next.js",
    description: "React Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    bg: "#888888",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    bg: "#06B6D4",
  },
  {
    name: "React",
    description: "UI Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    bg: "#61DAFB",
  },
  {
    name: "Node.js",
    description: "JS Runtime",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    bg: "#339933",
  },
  {
    name: "Git",
    description: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    bg: "#F05032",
  },
  {
    name: "MongoDB",
    description: "NoSQL Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    bg: "#47A248",
  },
];



const alternatingNames = ["Nux", "Nawaraj"];

export default function Home() {
  const [nameIndex, setNameIndex] = useState(0);
  const visibleProjects = projects.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % alternatingNames.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen px-4 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto">

        {/* ================= HERO HEADER ================= */}
        <div className="flex flex-col-reverse sm:flex-row items-start gap-6 mb-6 sm:mb-8">

          {/* Text Content (left on desktop, bottom on mobile) */}
          <div className="flex-1">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight text-gray-900 dark:text-white"
            >
              Hi, I&apos;m{" "}
              <span className="inline-block relative overflow-hidden text-[#8B5CF6] align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={alternatingNames[nameIndex]}
                    initial={{ y: 22, opacity: 0, filter: "blur(2px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -22, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {alternatingNames[nameIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              Gajurel
            </h1>

            <p className="text-sm font-semibold mb-4" style={{ color: "#374151" }}>
              Web developer &amp; Student
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#64748B" }}>
              I&apos;m a passionate full-stack developer from Nepal, turning ideas into creative digital experiences. I love building cool projects, exploring new technologies, solving real-world problems, and pushing myself to learn something new every day.
            </p>
          </div>

          {/* Avatar (right on desktop, top-left on mobile) */}
          <div className="flex-shrink-0 w-32 sm:w-40 md:w-44 self-start">
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden"
              animate={{ y: [0, -8, 0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={Nux.avatarUrl}
                alt={Nux.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

        </div>

        {/* ================= TECH STACK GRID ================= */}
        <section className="mt-4 sm:mt-6">
          <TechMarquee />
        </section>



        {/* ================= PROJECTS ================= */}
        <section className="mt-8 sm:mt-10">

          {/* Section Heading */}
          <div className="mb-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Projects
            </h2>

          </div>

          {/* Project List */}
          <div className="mt-8 divide-y divide-gray-100 dark:divide-gray-800/60">
            {visibleProjects.map((project) => (
              <Link
                key={project.name}
                href={`/projects/${project.slug}`}
                className="flex items-start justify-between gap-4 py-5 group"
              >
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 relative rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                      <Image
                        src={project.icon}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3
                      className="text-lg font-bold truncate text-gray-900 dark:text-white"
                    >
                      {project.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Meta: date */}
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{project.date}</span>
                  </div>
                </div>

                {/* Right: Preview Image */}
                <div className="flex-shrink-0 w-28 sm:w-36 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow duration-200" style={{ aspectRatio: '16/9' }}>
                  <Image
                    src={project.preview}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              See all <span>›</span>
            </Link>
          </div>

        </section>



        {/* ================= PHOTOS ================= */}
        <section className="mt-14 sm:mt-20">

          {/* Heading */}
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            Photos
          </h2>

          {/* 3-column photo grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">

            <div className="relative h-48 sm:h-auto sm:aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer">
              <Image
                src="/hamro.JPG"
                alt="Photo 1"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="relative h-48 sm:h-auto sm:aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer">
              <Image
                src="/3.jpg"
                alt="Photo 2"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="relative h-48 sm:h-auto sm:aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer">
              <Image
                src="/school.jpg"
                alt="Photo 3"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

          </div>

          {/* See all button */}
          <div className="mt-6 flex justify-end">
            <Link
              href="/photos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              See all <span>›</span>
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}
