"use client";

import React from "react";
import { Instrument_Serif } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import { PolaroidStack } from "@/components/polaroid-stack";

import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"]
});

const page = () => {
  const links = [
    {
      name: "GitHub",
      path: "https://github.com/NuxGajurel",
      icons: <FaGithub />,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/nuxgajurel/",
      icons: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/nux-gajurel-355962348/",
      icons: <FaLinkedin />,
    },
    {
      name: "Daily.dev",
      path: "https://app.daily.dev/nuxgajurel",
      icons: <SiDailydotdev />,
    },
  ];
  const Photo = {
    name: "Nux Gajurel",
    avatarUrl: "/end.jpg",
  };
  const school = {
    name: "The Rising English Boarding School",
    logoUrl: "/school.png",
  };
  const work = {
    name: "Freelancing Web Developer",
    logoUrl: "/work.webp",
  };

  return (
    <div className="font-sans antialiased">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          About
        </h1>
        <p className="text-base sm:text-lg mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          👋 Hey there! I&apos;m Nawaraj Gajurel (aka Nux), a passionate aspiring Full-Stack
          Developer from Nepal. This is the space where I showcase my work and
          the things I love to create.
        </p>
        <p className="text-base sm:text-lg mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          I focus on building clean, accessible, and high-performance software products that look great and are easy to maintain.
        </p>
      </div>
      <div className="flex items-center gap-5 mt-6">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {item.icons}
          </a>
        ))}
      </div>

      {/* Polaroid Stack */}
      <PolaroidStack />

      {/* About paragraphs */}
      <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>
          My primary focus is on creating responsive, clean, and scalable web applications using technologies like{" "}
          <strong className="text-gray-900 dark:text-white">React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, Node.js, Express.js, MySQL,</strong>{" "}
          and{" "}
          <strong className="text-gray-900 dark:text-white">Git</strong>. I enjoy designing intuitive user interfaces just as much as solving backend challenges, and I believe great software is built by combining functionality with an excellent user experience.
        </p>
        <p>
          I love taking on new challenges because every project teaches me something valuable. Whether it&apos;s developing AI-powered tools, building business management systems, creating beautiful portfolio websites, or contributing to team projects, I always strive to write clean, maintainable code and deliver meaningful solutions.
        </p>

        {/* Social links after paragraphs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{item.icons}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Work */}
      <div className="mt-16 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 sm:mb-8">
          Work
        </h2>
        <div className="space-y-5 font-sans antialiased">
          {[
            {
              name: "Avyanta Tech",
              role: "Full Stack Developer",
              period: "Apr 2026 - Present",
              logoUrl: "/avyanta.png",
              url: "https://avyantatech.com/np",
            },
            {
              name: "Freelancer",
              role: "Freelancing Web Developer",
              period: "Jan 2026 - Present",
              logoUrl: "/work.webp",
            },
          ].map((item, idx) => {
            const rowContent = (
              <div className="flex items-center justify-between gap-4 py-1 group cursor-pointer">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 relative rounded-full overflow-hidden border border-gray-200/80 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-black p-0.5 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={item.logoUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate group-hover:underline">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/60 rounded-full whitespace-nowrap flex-shrink-0">
                  {item.period}
                </span>
              </div>
            );

            return item.url ? (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                {rowContent}
              </a>
            ) : (
              <div key={idx}>{rowContent}</div>
            );
          })}
        </div>
      </div>

      {/* Education */}
      <div className="mt-16 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 sm:mb-8">
          Education
        </h2>
        <div className="space-y-5 font-sans antialiased">
          {[
            {
              name: "The Rising English Boarding School",
              degree: "Secondary Education (SEE Batch 2082)",
              period: "2013 - 2026",
              logoUrl: "/school.png",
            },

          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 relative rounded-full overflow-hidden border border-gray-200/80 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-black p-0.5">
                  <Image
                    src={item.logoUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {item.degree}
                  </p>
                </div>
              </div>

              <span className="px-3.5 py-1 text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/60 rounded-full whitespace-nowrap flex-shrink-0">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>





    </div>
  );
};

export default page;





