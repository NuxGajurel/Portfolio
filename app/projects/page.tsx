"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { projects } from "@/data/projects";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

function parseDate(dateStr: string): number {
  return new Date(dateStr).getTime() || 0;
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

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
    <section className="min-h-screen py-8 sm:py-12">
      {/* Section Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          A collection of projects and open source applications I&apos;ve built.
        </p>
      </div>

      {/* Search + Sort + Count */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort + Count */}
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <select
            className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap font-medium tracking-wide uppercase">
            {filtered.length} PROJECT{filtered.length !== 1 ? "S" : ""}
          </span>
        </div>
      </div>

      {/* Project List matching Home Page */}
      {filtered.length > 0 ? (
        <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
          {filtered.map((project) => (
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
                  <h3 className="text-lg font-bold group-hover:underline underline-offset-4 transition-all truncate text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {project.description}
                </p>

                {/* Meta: date */}
                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{project.date}</span>
                </div>
              </div>

              {/* Right: Preview Image */}
              <div
                className="flex-shrink-0 w-28 sm:w-36 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                style={{ aspectRatio: "16/9" }}
              >
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
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm py-12 text-center">
          No projects found.
        </p>
      )}
    </section>
  );
}
