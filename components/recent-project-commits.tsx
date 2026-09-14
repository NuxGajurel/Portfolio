"use client";

import React, { useEffect, useState } from "react";

interface ProjectCommit {
  id: string;
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranch: string;
  commit: {
    oid: string;
    shortOid: string;
    messageHeadline: string;
    message: string;
    committedDate: string;
    url: string;
    author?: {
      name: string;
      avatarUrl?: string;
    };
  } | null;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}

function formatExactDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function RecentProjectCommits() {
  const [projects, setProjects] = useState<ProjectCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = () => {
    setLoading(true);
    setError(null);
    fetch("/api/github/recent-commits")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProjects(data.projects || []);
        }
      })
      .catch((err) => {
        console.error("Failed to load recent commits:", err);
        setError("Unable to load recent commits");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    <section className="w-full space-y-4 pt-2">
      {/* Header - No icons */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight">
          Top Project Commits
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Latest git activity
        </span>
      </div>

      {/* Loading Skeleton - Unboxed */}
      {loading && (
        <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="py-4 first:pt-0 last:pb-0 flex items-start gap-3.5 sm:gap-4 animate-pulse"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center font-bold text-xs text-gray-400">
                {num}
              </div>
              <div className="flex-1 space-y-2">
                <div className="w-1/3 h-4 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="w-3/4 h-3 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="w-1/4 h-3 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchCommits}
            className="text-xs underline font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Vertical Column of 3 Projects - Clean & Unboxed */}
      {!loading && !error && projects.length > 0 && (
        <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
          {projects.map((item, idx) => {
            const commit = item.commit;
            const relativeTime = commit
              ? getRelativeTime(commit.committedDate)
              : "N/A";
            const exactTime = commit
              ? formatExactDate(commit.committedDate)
              : "";

            return (
              <div
                key={item.id || item.name}
                className="py-4 first:pt-0 last:pb-0 flex items-start gap-3.5 sm:gap-4"
              >
                {/* Numeric Indicator: 1, 2, 3 */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-bold font-mono text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>

                {/* Project Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Title and Time row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.name}
                      </a>

                      {item.primaryLanguage && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          • {item.primaryLanguage.name}
                        </span>
                      )}

                      <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                        ({item.defaultBranch})
                      </span>
                    </div>

                    {/* Commit When Time */}
                    {commit && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {relativeTime}
                        </span>
                        <span>•</span>
                        <span className="text-[11px]">{exactTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Commit Message */}
                  {commit && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug break-words">
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mr-1.5 uppercase font-semibold">
                        Commit:
                      </span>
                      {commit.messageHeadline}
                    </p>
                  )}

                  {/* Links and metadata */}
                  {commit && (
                    <div className="pt-0.5 flex items-center gap-3 text-xs">
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        #{commit.shortOid}
                      </a>
                      <span className="text-gray-300 dark:text-gray-700">•</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
                      >
                        View Repository →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          No recent commits found.
        </div>
      )}
    </section>
  );
}
