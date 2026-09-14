"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

export interface RepoItem {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

type SortOption = "stars" | "forks" | "updated" | "name";

const SORT_LABELS: Record<SortOption, string> = {
  stars: "Most Stars",
  forks: "Most Forks",
  updated: "Recently Updated",
  name: "Alphabetical",
};

export default function AllProjectsTable() {
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("stars");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRepos(data.repos || []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch repos:", err);
        setError("Unable to load projects");
      })
      .finally(() => setLoading(false));
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sort logic
  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === "stars") {
      if (b.stargazerCount !== a.stargazerCount) {
        return b.stargazerCount - a.stargazerCount;
      }
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    }
    if (sortBy === "forks") {
      if (b.forkCount !== a.forkCount) {
        return b.forkCount - a.forkCount;
      }
      return b.stargazerCount - a.stargazerCount;
    }
    if (sortBy === "updated") {
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <section className="w-full space-y-3 pt-4">
      {/* Subtitle matching screenshot: "Views and reactions across all blog posts." */}
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        Stars and activity across all repositories.
      </p>

      {/* Sort controls bar */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Sorted by {SORT_LABELS[sortBy]}
        </span>

        {/* Sort button matching screenshot: [ ≡ Most Views ] */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700 transition shadow-sm"
          >
            {/* 3-bar sort icon matching screenshot */}
            <svg
              className="w-4 h-4 text-gray-600 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="11" y2="18" />
            </svg>
            <span>{SORT_LABELS[sortBy]}</span>
            <FiChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg py-1.5 z-20">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSortBy(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                    sortBy === option
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <span>{SORT_LABELS[option]}</span>
                  {sortBy === option && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Container - matching screenshot style */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400 pb-2.5 pt-1 border-b border-gray-200/80 dark:border-gray-800">
          <div className="col-span-1 text-left pl-1">#</div>
          <div className="col-span-7 sm:col-span-8 text-left">Project</div>
          <div className="col-span-2 sm:col-span-2 text-right">Stars</div>
          <div className="col-span-2 sm:col-span-1 text-right pr-1">Forks</div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 py-3.5 items-center animate-pulse"
              >
                <div className="col-span-1 text-gray-300 dark:text-gray-700 text-xs pl-1">
                  {i + 1}
                </div>
                <div className="col-span-7 sm:col-span-8">
                  <div className="w-44 h-4 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
                <div className="col-span-2 sm:col-span-2 text-right">
                  <div className="w-10 h-4 bg-gray-100 dark:bg-gray-800 rounded ml-auto" />
                </div>
                <div className="col-span-2 sm:col-span-1 text-right pr-1">
                  <div className="w-8 h-4 bg-gray-100 dark:bg-gray-800 rounded ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-8 text-center text-sm text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Table Rows */}
        {!loading && !error && sortedRepos.length > 0 && (
          <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {sortedRepos.map((repo, idx) => (
              <div
                key={repo.id || repo.name}
                className="grid grid-cols-12 py-3.5 items-center hover:bg-gray-50/60 dark:hover:bg-gray-900/40 transition-colors rounded-md -mx-1 px-1 group"
              >
                {/* # Rank Number */}
                <div className="col-span-1 text-left text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-normal pl-1">
                  {idx + 1}
                </div>

                {/* Project Name + Optional Language */}
                <div className="col-span-7 sm:col-span-8 text-left min-w-0 pr-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group/link max-w-full"
                  >
                    <span className="text-sm sm:text-base font-normal text-gray-900 dark:text-gray-100 group-hover/link:text-blue-500 dark:group-hover/link:text-blue-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    {repo.primaryLanguage && (
                      <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{
                            backgroundColor:
                              repo.primaryLanguage.color || "#888",
                          }}
                        />
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                    <FiExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
                  </a>
                </div>

                {/* Stars Count */}
                <div className="col-span-2 sm:col-span-2 text-right text-sm sm:text-base font-normal text-gray-700 dark:text-gray-300 tabular-nums">
                  {repo.stargazerCount.toLocaleString()}
                </div>

                {/* Forks Count */}
                <div className="col-span-2 sm:col-span-1 text-right text-sm sm:text-base font-normal text-gray-700 dark:text-gray-300 tabular-nums pr-1">
                  {repo.forkCount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sortedRepos.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            No projects found.
          </div>
        )}
      </div>
    </section>
  );
}
