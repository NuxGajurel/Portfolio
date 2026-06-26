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
    <div className={`${instrumentSerif.className} antialiased tracking-tight`}>
      <div className="">
        <div>
          <h1 className="text-4xl font-normal text-gray-900 dark:text-white tracking-tighter italic">About</h1>
          <p className="text-3xl mt-6 text-gray-800 dark:text-gray-200 leading-tight">
            Hi, I&apos;m Nawaraj Gajurel (aka Nux), a passionate aspiring Full-Stack
            Developer from Nepal. This is the space where I showcase my work and
            the things I love to create.
          </p>
        </div>
        <div className="flex items-center gap-6 mt-8">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {item.icons}
            </a>
          ))}
        </div>
      </div>

      {/* Polaroid Stack */}
      <PolaroidStack />



      {/* education */}
      <div className="mt-20">
        <h1 className="text-3xl font-normal text-gray-900 dark:text-white tracking-tighter italic border-b border-gray-100 dark:border-gray-800 pb-2 mb-10">Education</h1>
        <div className="mt-8">
          <div className="flex justify-baseline gap-6">
            <div className="rounded-xl h-16 w-16 hover:scale-105 transition-transform overflow-hidden border border-gray-100 dark:border-gray-800">
              <img src={school.logoUrl} alt="school" className="object-cover w-full h-full p-1" />
            </div>
            <div className="space-y-1">
              <h1 className="hover:text-blue-500 dark:hover:text-blue-400 text-2xl font-normal text-gray-900 dark:text-white leading-none">{school.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">2013-2026</p>
              <p className="text-xl text-gray-600 dark:text-gray-400 italic">Secondary Education (SEE batch 2082)</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Work */}
      <div className="mt-20">
        <h1 className="text-3xl font-normal text-gray-900 dark:text-white tracking-tighter italic border-b border-gray-100 dark:border-gray-800 pb-2 mb-10">
          Work
        </h1>
        
        <div className="space-y-8 font-sans antialiased tracking-normal">
          {/* Avyanta Tech */}
          <a
            href="https://avyantatech.com/np"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-5 sm:gap-6 group cursor-pointer py-2 animate-fade-in"
          >
            <div className="w-12 h-12 sm:w-14 h-14 relative rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 dark:border-gray-800/80 transition-transform duration-300 group-hover:scale-105 mt-1 bg-white dark:bg-black">
              <Image
                src="/avyanta.png"
                alt="Avyanta Tech Logo"
                fill
                className="object-cover p-1"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:underline">
                Full Stack Developer
              </h3>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Avyanta Tech
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Apr 2026 – Present • Haraicha, Koshi Province, Nepal
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["React", "Next.js", "Express", "Node.js"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] sm:text-xs bg-gray-50 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md border border-gray-100 dark:border-gray-800/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>

          {/* Freelance */}
          <div className="flex items-start gap-5 sm:gap-6 py-2">
            <div className="w-12 h-12 sm:w-14 h-14 relative rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 dark:border-gray-800/80 mt-1 bg-white dark:bg-black">
              <Image
                src="/work.webp"
                alt="Freelance Work Logo"
                fill
                className="object-cover p-1"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Freelancing Web Developer
              </h3>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Freelancer
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Jan 2026 – Present • Remote
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["Next.js", "Node.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] sm:text-xs bg-gray-50 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md border border-gray-100 dark:border-gray-800/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default page;





