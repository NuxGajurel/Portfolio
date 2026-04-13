"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  name: string;
  description: string;
  icon: string;
  url: string;
};

const projects: Project[] = [
  {
    name: "BloomHaven",
    description:
      "E-commerce platform for selling bouquets of flowers and plants",
    icon: "/store1.png",
    url: "https://bloomhaven.vercel.app/",
  },
  {
    name: "Web Nepal",
    description: "Platform for learners to learn web development",
    icon: "/web.png",
    url: "https://hackathon-webnepal.netlify.app/",
  },
  {
    name: "Saral-Sewa",
    description:
      "AI-powered healthcare management system for rural areas of Nepal",
    icon: "/sewa.png",
    url: "https://saralseewa.vercel.app/",
  },
  {
    name: "Personal Blog Site",
    description:
      "A personal blog site to share thoughts and experiences on web development",
    icon: "/bhai.jpg",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    name: "Portfolio Website",
    description: "Showcasing my skills and projects",
    icon: "/nuux.jpg",
    url: "https://github.com/NuxGajurel/Portfolio.git",
  },
  {
    name: "Book Management System",
    description:
      "A simple book management system for tracking your reading list",
    icon: "/book.jpg",
    url: "https://github.com/NuxGajurel/BookStore.git",
  },
];

export default function ProjectsSection() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("az");

  const filteredProjects = projects
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <section className="min-h-screen flex justify-center">
      <div className="max-w-2xl w-full px-5 sm:px-9 py-12 sm:py-16">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          Projects
        </h2>

       
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
          
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-3 text-sm sm:text-base border rounded-xl outline-none focus:ring-2 focus:ring-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

         
          <select
            className="w-40 sm:w-auto px-3 py-3 text-sm sm:text-base border rounded-xl bg-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        {/* Projects */}
        <div className="space-y-6 sm:space-y-8">
          {filteredProjects.map((project) => {
            const content = (
              <div className="flex items-start gap-5 sm:gap-8 group cursor-pointer py-3 sm:py-4">
                
                {/* Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <Image
                    src={project.icon}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>

            
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:underline">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            );

            return project.url ? (
              <Link
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            ) : (
              <div key={project.name}>{content}</div>
            );
          })}

          
          {filteredProjects.length === 0 && (
            <p className="text-gray-500 text-sm">No projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
}