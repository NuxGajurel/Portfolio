"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiX } from "react-icons/hi";

interface JourneyItem {
  year: string;
  title: string;
  highlight: string;
  url?: string;
  description: string;
  image?: string;
}

const journeyItems: JourneyItem[] = [
  {
    year: "2025",
    title: "INSEF Regional Fair (Online)",
    highlight: "Bronze Prize Winner",
    url: "https://github.com/NuxGajurel/MEN2-Predictor",
    description: "For MEN2 Predictor, a medical ML research project achieving 97.20% accuracy with 100% sensitivity in rare disease prediction.",
    image: "/mero.webp",
  },
  {
    year: "2025",
    title: "Runner H AI Agent Prompting Challenge",
    highlight: "Won $500",
    url: "https://dev.to",
    description: "In the DEV.to AI Agent Prompting Challenge for innovative use of AI tools to build intelligent autonomous coding and productivity agents.",
    image: "/keyboard.jpg",
  },
  {
    year: "2025",
    title: "Invisible Wars - Xavier University",
    highlight: "Ranked Top 25",
    description: "Competed in the High School Cyber Defense Challenge and secured a rank in the top 25 teams nationally.",
    image: "/stand.webp",
  },
  {
    year: "2025",
    title: "HACKHAZARDS '25 Hackathon",
    highlight: "Certified Top 100",
    url: "https://devfolio.co",
    description: "Recognized in the top 100 projects for the Nirvana AI project on Devfolio, solving critical accessibility problems.",
    image: "/school.jpg",
  },
  {
    year: "2025",
    title: "Hit 35K+ Followers on DEV.to",
    highlight: "35,000+ Followers",
    url: "https://dev.to/nuxgajurel",
    description: "Built a tech blogging following, generating over 400,000+ views, sharing insights on web development, React, and AI tooling.",
    image: "/nnnux.jpg",
  },
  {
    year: "2024",
    title: "Full Stack Developer Intern",
    highlight: "Joined Avyanta Tech",
    url: "https://avyantatech.com/np",
    description: "Worked on building production web apps, writing scalable API integrations, and collaborating within a dev team.",
    image: "/avyanta.png",
  },
  {
    year: "2024",
    title: "Started Freelancing Web Development",
    highlight: "Freelance Developer",
    url: "https://mahalaxmitraders.com/",
    description: "Developed and launched highly optimized client websites, including Mahalaxmi Traders for hardware materials in Nepal.",
    image: "/maha.png",
  },
  {
    year: "2023",
    title: "Launched Web Nepal",
    highlight: "Platform Launch",
    url: "https://hackathon-webnepal.netlify.app/",
    description: "Co-founded a student learning platform aiming to democratize access to coding tutorials and resources for aspiring developers in Nepal.",
    image: "/web.png",
  },
];

export function Journey() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Close lightbox on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      <div className="relative border-l border-gray-200 dark:border-gray-800 ml-2 sm:ml-4 pl-6 sm:pl-8 space-y-12">
        {journeyItems.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-gray-200 dark:bg-gray-800 group-hover:bg-blue-500 group-hover:scale-125 dark:group-hover:bg-blue-400 group-hover:ring-4 group-hover:ring-blue-100 dark:group-hover:ring-blue-900/50 transition-all duration-300 shadow-sm" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Text Description */}
              <div className="flex-1 space-y-1">
                {/* Year */}
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.year}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Achievement Highlight */}
                <div className="inline-flex items-center gap-1.5 mt-0.5">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 group/link"
                    >
                      {item.highlight}
                      <FaArrowUpRightFromSquare className="w-3 h-3 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {item.highlight}
                    </span>
                  )}
                </div>

                {/* Description Text */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Responsive Image Card */}
              {item.image && (
                <div
                  onClick={() => setActiveImage(item.image || null)}
                  className="relative w-full sm:w-40 aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 flex-shrink-0 cursor-pointer shadow-sm group/img transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    sizes="(max-width: 640px) 100vw, 160px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 dark:group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-xs font-medium bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">
                      View
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Separator between items (except the last item) */}
            {index < journeyItems.length - 1 && (
              <div className="mt-10 border-t border-dashed border-gray-100 dark:border-gray-800/80" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Close image lightbox"
            >
              <HiX size={22} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[80vh] aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={activeImage}
                  alt="Milestone Setup Detail"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
