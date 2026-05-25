"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instrument_Serif } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedin, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import { PolaroidStack } from "@/components/polaroid-stack";

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"]
});

const page = () => {
  const [isBusRunning, setIsBusRunning] = useState(false);


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
            Hi, I'm Nawaraj Gajurel (aka Nux), a passionate aspiring Full-Stack
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
              <p className="text-xl text-gray-600 dark:text-gray-400 italic">High School (SEE batch 2082)</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mt-20">
        <h1 className="text-3xl font-normal text-gray-900 dark:text-white tracking-tighter italic border-b border-gray-100 dark:border-gray-800 pb-2 mb-10">Work</h1>
        <div className="space-y-12">
          {/* New Entry */}
          <div className="flex justify-baseline gap-6">
            <a 
              href="https://avyantatech.com/np" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-xl h-16 w-16 hover:scale-105 transition-transform overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <img src="/avyanta.png" alt="Avyanta Tech" className="object-cover w-full h-full p-1" />
            </a>
            <div className="space-y-1">
              <h1 className="hover:text-blue-500 dark:hover:text-blue-400 text-2xl font-normal text-gray-900 dark:text-white leading-none">Full stack developer intern</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">Present</p>
            </div>
          </div>

          {/* Existing Entry */}
          <div className="flex justify-baseline gap-6">
            <div className="rounded-xl h-16 w-16 hover:scale-105 transition-transform overflow-hidden border border-gray-100 dark:border-gray-800">
              <img src={work.logoUrl} alt="work" className="object-cover w-full h-full p-1" />
            </div>
            <div className="space-y-1">
              <h1 className="hover:text-blue-500 dark:hover:text-blue-400 text-2xl font-normal text-gray-900 dark:text-white leading-none">{work.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">Present</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Animation Section */}
      <div className="mt-24 overflow-hidden relative flex flex-col bg-gray-50 dark:bg-gray-900/40 p-10 rounded-[3rem]">
        <div className="relative h-80 w-full">
          {/* Animated Lyrics */}
          <div className="absolute top-0 left-0 w-full flex flex-col items-center pointer-events-none z-10">
            <AnimatePresence>
              {isBusRunning && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 2 } },
                  }}
                  className="text-center"
                >
                  {[
                    "And if a double-decker bus crashes into us",
                    "To die by your side",
                    "Is such a heavenly way to die",
                    "And if a ten ton truck kills the both of us",
                    "To die by your side",
                    "Well, the pleasure, the privilege is mine",
                  ].map((line, index) => (
                    <motion.p
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                      }}
                      transition={{ duration: 1.5 }}
                      className="text-gray-400 dark:text-gray-500 text-lg md:text-xl mb-1 italic font-light"
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ x: "0%" }}
            animate={isBusRunning ? { x: ["-100%", "200%"] } : {}}
            transition={{
              duration: 12,
              ease: "linear",
              repeat: isBusRunning ? Infinity : 0,
            }}
            className="absolute bottom-0 z-20"
          >
            <div className="relative w-[500px] h-[250px] opacity-90">
              <Image
                src="/Double_decker_buses-removebg-preview.png"
                alt="Double Decker Bus"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Audio Player */}
          <div className="absolute opacity-0 pointer-events-none">
            {isBusRunning && (
              <iframe
                src="https://www.youtube.com/embed/siO6dk_LiaE?autoplay=1&mute=0&enablejsapi=1"
                allow="autoplay; encrypted-media"
              ></iframe>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center w-full">
          <p className="text-sm text-gray-400 tracking-[0.2em] uppercase font-light">Mood: Retro Editorial</p>
          <button
            onClick={() => setIsBusRunning(!isBusRunning)}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-all duration-300 font-normal shadow-2xl active:scale-95 flex items-center gap-3 text-sm"
          >
            {isBusRunning ? (
              <>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                Stop vibe
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Play vibe
              </>
            )}
          </button>
        </div>
      </div>


    </div>
  );
};

export default page;





