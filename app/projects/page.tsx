"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiArrowLeft, FiCalendar, FiGithub, FiSearch } from "react-icons/fi";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

function parseDate(dateStr: string): number {
  return new Date(dateStr).getTime() || 0;
}

type Project = {
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  preview: string;
  date: string;
  url?: string;
  isGithub?: boolean;
};

const projects: Project[] = [
  {
    name: "Mahalaxmi Traders",
    description: "Client project for a trusted hardware and construction business",
    longDescription:
      "A full-featured business website built for Mahalaxmi Traders, a trusted hardware and construction materials supplier. The site showcases their product catalog, highlights their association with Kajaria — one of India's top tile brands — and provides customers with easy ways to get in touch.",
    icon: "/maha.png",
    preview: "/laxmi.png",
    date: "May 2026",
    url: "https://mahalaxmitraders.com/",
  },
  {
    name: "BloomHaven",
    description: "E-commerce platform for selling bouquets of flowers and plants",
    longDescription:
      "BloomHaven is a modern e-commerce platform dedicated to flowers and plants. Users can browse curated bouquets, filter by occasion, and place orders for delivery.",
    icon: "/store1.png",
    preview: "/haven2.png",
    date: "March 2026",
    url: "https://bloomhaven.vercel.app/",
  },
  {
    name: "Web Nepal",
    description: "Platform for learners to learn web development",
    longDescription:
      "Web Nepal is an educational platform designed for aspiring web developers in Nepal. It offers structured learning paths, coding exercises, and project-based lessons.",
    icon: "/web.png",
    preview: "/webne.png",
    date: "February 2026",
    url: "https://hackathon-webnepal.netlify.app/",
  },
  {
    name: "Saral-Sewa",
    description: "AI-powered healthcare management system for rural areas of Nepal",
    longDescription:
      "Saral-Sewa is an AI-powered healthcare management system built to serve rural communities in Nepal. It enables patients to book appointments, access health records, and receive AI-assisted health guidance.",
    icon: "/sewa.png",
    preview: "/sewa1.png",
    date: "February 2026",
    url: "https://saralseewa.vercel.app/",
  },
  {
    name: "Personal Blog Site",
    description: "A personal blog site to share thoughts and experiences on web development",
    longDescription:
      "A personal blogging platform where I share articles on web development, programming tips, and my journey as a developer. Built with a focus on readability and clean typography.",
    icon: "/bhai.jpg",
    preview: "/v.png",
    date: "January 2026",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    name: "Portfolio Website",
    description: "Showcasing my skills and projects",
    longDescription:
      "My personal portfolio website — the very site you're on now. Designed to reflect my personality and skills as a developer.",
    icon: "/nuux.jpg",
    preview: "/port.png",
    date: "January 2026",
    url: "https://nuxgajurel.vercel.app/",
  },
  {
    name: "Book Management System",
    description: "A simple book management system for tracking your reading list",
    longDescription:
      "A clean and functional book management system that lets you track your reading list, mark books as read or in-progress, and organize your library.",
    icon: "/book.jpg",
    preview: "/book.png",
    date: "December 2025",
    url: "https://github.com/NuxGajurel/BookStore.git",
    isGithub: true,
  },
];

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project]);

  return (
    <div className="animate-fadeIn">
      <button
        onClick={() => {
          onBack();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
      >
        <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {project.name}
      </h1>

      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl">
        {project.longDescription || project.description}
      </p>

      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 dark:text-gray-500 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
        <span className="inline-flex items-center gap-2">
          <FiCalendar className="w-4 h-4" />
          {project.date}
        </span>

        {project.url && !project.isGithub && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink className="w-4 h-4" />
            Live Demo
          </Link>
        )}

        {project.url && project.isGithub && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub className="w-4 h-4" />
            View on GitHub
          </Link>
        )}
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 bg-gray-50 dark:bg-gray-900/40 p-1.5 sm:p-2.5">
        <div className="relative w-full overflow-hidden rounded-xl bg-white dark:bg-gray-950">
          <Image
            src={project.preview}
            alt={`${project.name} screenshot`}
            width={1200}
            height={750}
            className="w-full h-auto object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const handleSelectProject = (project: Project) => {
    setSelected(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = projects
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "newest") return parseDate(b.date) - parseDate(a.date);
      if (sort === "oldest") return parseDate(a.date) - parseDate(b.date);
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <section className="min-h-screen">
      <div className="max-w-2xl w-full px-5 sm:px-9 py-12 sm:py-16">
        {selected ? (
          <ProjectDetail project={selected} onBack={handleBack} />
        ) : (
          <>
            {/* Page Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#a78bfa] dark:text-[#c4b5fd] mb-8 sm:mb-10">
              Projects
            </h1>

            {/* Search + Sort + Count */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition placeholder:text-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Sort + Count */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <select
                  className="px-4 py-3 text-sm border border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900 text-gray-700 dark:text-white rounded-full outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition appearance-none pr-8"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap font-medium tracking-wide">
                  {filtered.length} ITEM{filtered.length !== 1 ? "S" : ""}
                </span>
              </div>
            </div>

            {/* Project List */}
            {filtered.length > 0 ? (
              <div className="space-y-8 sm:space-y-10">
                {filtered.map((project) => (
                  <div
                    key={project.name}
                    onClick={() => handleSelectProject(project)}
                    className="flex items-start gap-5 sm:gap-6 group cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200/60 dark:border-gray-800 bg-gray-50 dark:bg-[#131b2e] p-0.5 transition-transform duration-200 group-hover:scale-105">
                      <Image
                        src={project.icon}
                        alt={project.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 pt-0.5">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:underline underline-offset-4 decoration-gray-400/60 dark:decoration-gray-600 transition-all truncate">
                        {project.name}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm py-12">
                No projects found.
              </p>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out both;
        }
      `}</style>
    </section>
  );
}
