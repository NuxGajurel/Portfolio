"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiSearch, FiArrowLeft, FiCalendar, FiGithub } from "react-icons/fi";

type Project = {
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  preview: string;
  date: string;
  url?: string;
  isGithub?: boolean;
  tags?: { label: string; type: "live" | "github" | "default" }[];
};

const projects: Project[] = [
  {
    name: "Mahalaxmi Traders",
    description:
      "Client project for a trusted hardware and construction materials business, proudly associated with Kajaria, one of India's leading tile brands.",
    longDescription:
      "A full-featured business website built for Mahalaxmi Traders, a trusted hardware and construction materials supplier. The site showcases their product catalog, highlights their association with Kajaria — one of India's top tile brands — and provides customers with easy ways to get in touch. Designed for a professional look that builds trust with both retail and wholesale buyers.",
    icon: "/maha.png",
    preview: "/laxmi.png",
    date: "May 2026",
    url: "https://mahalaxmitraders.com/",
    tags: [],
  },
  {
    name: "BloomHaven",
    description: "E-commerce platform for selling bouquets of flowers and plants",
    longDescription:
      "BloomHaven is a modern e-commerce platform dedicated to flowers and plants. Users can browse curated bouquets, filter by occasion, and place orders for delivery. The platform features a clean product listing, cart management, and a smooth checkout experience — built to make gifting flowers effortless and delightful.",
    icon: "/store1.png",
    preview: "/haven2.png",
    date: "March 2026",
    url: "https://bloomhaven.vercel.app/",
    tags: [],
  },
  {
    name: "Web Nepal",
    description: "Platform for learners to learn web development",
    longDescription:
      "Web Nepal is an educational platform designed for aspiring web developers in Nepal. It offers structured learning paths, coding exercises, and project-based lessons to help beginners go from zero to job-ready. Built during a hackathon, the platform emphasizes accessibility and local-language content.",
    icon: "/web.png",
    preview: "/webne.png",
    date: "February 2026",
    url: "https://hackathon-webnepal.netlify.app/",
    tags: [],
  },
  {
    name: "Saral-Sewa",
    description: "AI-powered healthcare management system for rural areas of Nepal",
    longDescription:
      "Saral-Sewa is an AI-powered healthcare management system built to serve rural communities in Nepal. It enables patients to book appointments, access health records, and receive AI-assisted health guidance — all in a simple interface designed for low-tech environments. The goal is to bridge the healthcare gap between urban and rural Nepal.",
    icon: "/sewa.png",
    preview: "/sewa1.png",
    date: "February 2026",
    url: "https://saralseewa.vercel.app/",
    tags: [],
  },
  {
    name: "Personal Blog Site",
    description:
      "A personal blog site to share thoughts and experiences on web development",
    longDescription:
      "A personal blogging platform where I share articles on web development, programming tips, and my journey as a developer. Built with a focus on readability and clean typography, the site supports markdown content, tagging, and a minimal reading experience that keeps the focus on the writing.",
    icon: "/bhai.jpg",
    preview: "/v.png",
    date: "January 2026",
    url: "https://nuxblogs.vercel.app/",
    tags: [],
  },
  {
    name: "Portfolio Website",
    description: "Showcasing my skills and projects",
    longDescription:
      "My personal portfolio website — the very site you're on now. Designed to reflect my personality and skills as a developer, it features a project showcase, blog section, about page, and a contact form. Built with Next.js, Tailwind CSS, and smooth animations for a modern, premium feel.",
    icon: "/nuux.jpg",
    preview: "/port.png",
    date: "January 2026",
    url: "https://nuxgajurel.vercel.app/",
    tags: [],
  },
  {
    name: "Book Management System",
    description:
      "A simple book management system for tracking your reading list",
    longDescription:
      "A clean and functional book management system that lets you track your reading list, mark books as read or in-progress, and organize your library. Built as a practical project to demonstrate CRUD operations, state management, and a user-friendly interface for everyday use.",
    icon: "/book.jpg",
    preview: "/book.png",
    date: "December 2025",
    url: "https://github.com/NuxGajurel/BookStore.git",
    isGithub: true,
    tags: [{ label: "GitHub", type: "github" }],
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

function parseDate(dateStr: string): number {
  return new Date(dateStr).getTime() || 0;
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Preview Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.preview}
          alt={`${project.name} preview`}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Icon + Name + Date */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 relative rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
            <Image
              src={project.icon}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate group-hover:underline underline-offset-2">
              {project.name}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">{project.date}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>
      </div>
    </div>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
      >
        <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </button>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {project.name}
      </h1>

      {/* Long description */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl">
        {project.longDescription || project.description}
      </p>

      {/* Meta row: date + live demo */}
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

      {/* Preview screenshot */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg">
        <Image
          src={project.preview}
          alt={`${project.name} screenshot`}
          width={1200}
          height={750}
          className="w-full h-auto object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState<Project | null>(null);

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
    <section className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-5 sm:px-9 py-12 sm:py-16">
        {selected ? (
          <ProjectDetail project={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Right side: sort + count */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <select
                  className="px-3 py-3 text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap font-medium">
                  {filtered.length} ITEM{filtered.length !== 1 ? "S" : ""}
                </span>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    onClick={() => setSelected(project)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-12">
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
