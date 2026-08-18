"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMaximize2, FiX } from "react-icons/fi";
import { projects } from "@/data/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = projects.find((p) => p.slug === slug);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The project you are looking for does not exist.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 lg:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        {/* Project Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-6">
            {project.fullDescription || project.description}
          </p>

          {/* Meta Info: Date + Live Demo */}
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span>{project.date}</span>
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Subtle Divider */}
        <hr className="border-gray-200 dark:border-gray-800 my-8" />

        {/* Browser Mockup / Preview Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-lg overflow-hidden transition-all">
          {/* Browser Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/80 dark:bg-gray-900/80">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>

            {/* URL bar */}
            <div className="max-w-xs sm:max-w-md w-full mx-4 px-3 py-1 text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800/60 rounded-md border border-gray-200/60 dark:border-gray-700/60 truncate text-center select-none">
              {project.url ? project.url.replace(/^https?:\/\//, "") : project.name.toLowerCase()}
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Click to view full screen"
            >
              <FiMaximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Image Container */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative cursor-pointer group bg-gray-50 dark:bg-gray-950 overflow-hidden"
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={project.preview}
                alt={`${project.name} preview`}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
              <div className="px-4 py-2 rounded-full bg-black/75 text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <FiMaximize2 className="w-4 h-4" />
                <span>Click to expand full image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 cursor-zoom-out"
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-lg"
              title="Close (Esc)"
            >
              <FiX className="w-6 h-6" />
            </motion.button>

            {/* Modal Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10 cursor-default"
            >
              <div className="relative w-full h-[70vh] sm:h-[80vh]">
                <Image
                  src={project.preview}
                  alt={`${project.name} full view`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
