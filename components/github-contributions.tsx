"use client";

import React, { useEffect, useState, useRef } from "react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

interface ContributionData {
  totalContributions: number;
  days: ContributionDay[];
}

interface Tooltip {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  count: number;
}

// GitHub-style soft pastel green palette matching screenshot
const LEVEL_COLORS: Record<ContributionLevel, string> = {
  NONE: "bg-gray-100 dark:bg-gray-800/70",
  FIRST_QUARTILE: "bg-[#9be9a8] dark:bg-emerald-900/80",
  SECOND_QUARTILE: "bg-[#40c463] dark:bg-emerald-600",
  THIRD_QUARTILE: "bg-[#30a14e] dark:bg-emerald-500",
  FOURTH_QUARTILE: "bg-[#216e39] dark:bg-emerald-400",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildGrid(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days.length) return [];

  const firstDay = new Date(days[0].date + "T00:00:00");
  const startPad = firstDay.getDay(); // 0=Sun … 6=Sat

  const padded: (ContributionDay | null)[] = [
    ...Array(startPad).fill(null),
    ...days,
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  const last = weeks[weeks.length - 1];
  while (last.length < 7) last.push(null);

  return weeks;
}

export default function GitHubContributions() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    count: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError("Failed to load contributions"))
      .finally(() => setLoading(false));
  }, []);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: ContributionDay
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      visible: true,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 8,
      date: formatDate(day.date),
      count: day.contributionCount,
    });
  };

  const handleMouseLeave = () =>
    setTooltip((t) => ({ ...t, visible: false }));

  const weeks = data ? buildGrid(data.days) : [];

  return (
    <section className="w-full space-y-4 pt-2">
      {/* Title & Subtitle matching the screenshot */}
      <div>
        <h2
          className={`${instrumentSerif.className} text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight`}
        >
          Contribution Graph
        </h2>
        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          A quick view of my activity and open-source contribution streak on{" "}
          <a
            href="https://github.com/NuxGajurel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="w-full overflow-x-auto py-2">
          <div className="flex gap-[3px] min-w-max">
            {Array.from({ length: 53 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    key={di}
                    className="w-[11px] h-[11px] rounded-[3px] bg-gray-100 dark:bg-gray-800 animate-pulse"
                    style={{ animationDelay: `${(wi * 7 + di) * 4}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-sm text-red-500 py-2">
          Unable to load contribution graph.
        </div>
      )}

      {/* Graph */}
      {!loading && !error && data && weeks.length > 0 && (
        <div ref={containerRef} className="relative w-full overflow-x-auto py-2">
          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                <span className="font-bold">
                  {tooltip.count === 0
                    ? "No contributions"
                    : `${tooltip.count} contribution${tooltip.count !== 1 ? "s" : ""}`}
                </span>
                <span className="text-gray-300 dark:text-gray-600">
                  {" "}
                  on {tooltip.date}
                </span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-100" />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-[3px] min-w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  if (!day) {
                    return (
                      <div
                        key={di}
                        className="w-[11px] h-[11px] rounded-[3px]"
                      />
                    );
                  }
                  const bg = LEVEL_COLORS[day.contributionLevel];
                  return (
                    <div
                      key={di}
                      className={`w-[11px] h-[11px] rounded-[3px] cursor-pointer transition-transform duration-100 hover:scale-125 ${bg}`}
                      onMouseEnter={(e) => handleMouseEnter(e, day)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
