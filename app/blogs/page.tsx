"use client";

import { useState } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { FiSearch, FiArrowUpRight, FiCalendar, FiClock } from "react-icons/fi";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

type Blog = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  url: string;
};

const blogs: Blog[] = [
  {
    title: "Getting Started with Next.js 15",
    description:
      "An in-depth look at what's new in Next.js 15 — from the improved App Router to Turbopack becoming stable. Perfect for developers looking to level up their stack.",
    date: "May 2026",
    readTime: "6 min read",
    tag: "Next.js",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    title: "Why I Switched from CSS Modules to Tailwind CSS",
    description:
      "My honest experience transitioning a production codebase from CSS Modules to Tailwind CSS — the wins, the friction points, and whether I'd do it again.",
    date: "April 2026",
    readTime: "5 min read",
    tag: "CSS",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    title: "Building Accessible UI Components from Scratch",
    description:
      "Accessibility is often an afterthought. In this post, I walk through building a fully accessible modal, dropdown, and tooltip using only HTML, CSS, and a sprinkle of JS.",
    date: "March 2026",
    readTime: "8 min read",
    tag: "Accessibility",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    title: "How I Built My Portfolio (and What I Learned)",
    description:
      "A behind-the-scenes look at the decisions, design iterations, and technical choices that went into building this portfolio — from concept to deployment.",
    date: "February 2026",
    readTime: "7 min read",
    tag: "Personal",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    title: "React Server Components: When to Use Them",
    description:
      "Server Components are powerful but misunderstood. I break down the mental model, real-world use cases, and gotchas I encountered while using them in production.",
    date: "January 2026",
    readTime: "9 min read",
    tag: "React",
    url: "https://nuxblogs.vercel.app/",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Next.js": "bg-black text-white dark:bg-white dark:text-black",
  CSS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Accessibility: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Personal: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
};

export default function BlogsPage() {
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${instrumentSerif.className} antialiased tracking-tight`}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-normal text-gray-900 dark:text-white tracking-tighter italic">
          Blog
        </h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Thoughts on web development, design, and the occasional rabbit hole.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-3 text-base border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition font-sans"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Blog List */}
      {filtered.length > 0 ? (
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((blog) => (
            <Link
              key={blog.title}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 py-8 hover:opacity-80 transition-opacity"
            >
              {/* Tag */}
              <span
                className={`inline-flex self-start text-xs font-medium px-2.5 py-1 rounded-full font-sans ${
                  TAG_COLORS[blog.tag] ??
                  "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {blog.tag}
              </span>

              {/* Title */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-normal text-gray-900 dark:text-white group-hover:underline underline-offset-4 leading-snug">
                  {blog.title}
                </h2>
                <FiArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </div>

              {/* Description */}
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {blog.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500 mt-1 font-sans">
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {blog.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-base text-center py-16 font-sans">
          No posts found.
        </p>
      )}
    </div>
  );
}
