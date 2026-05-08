"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import { Caveat_Brush } from "next/font/google";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});
const caveatFont = Caveat_Brush({ subsets: ["latin"], weight: "400" });

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
      name: "LInkedin",
      path: "https://www.linkedin.com/in/nux-gajurel-355962348/ ,",
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
  const mero ={
    name: "Mero Job",
    logoUrl: "/v.png",
  }
  return (
    <div>
      <div className="">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About </h1>
          <p className={`${dancingScript.className} text-2xl mt-3 text-gray-800 dark:text-gray-200`}>
            Hi, I'm Nawaraj Gajurel (aka Nux), a passionate aspiring Full-Stack
            Developer from Nepal. This is the space where I showcase my work and
            the things I love to create.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-6">
          {links.map((item) => (
            <i
              key={item.name}
              className="text-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-setsize={28}
            >
              {item.icons}
            </i>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="mt-10 w-full">
        <img
          src={Photo.avatarUrl}
          alt={Photo.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <p className="flex justify-end mt-3 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">
        {" "}
        - Last Day of SEE (4/9/2026 Thursday)
      </p>
      {/* education */}
      <div>
        <h1 className="text-2xl mt-7 font-bold text-gray-900 dark:text-white">Education </h1>
        <div className="mt-8">
          <div className="flex justify-baseline gap-0">
            <div className="rounded h-24 w-24 hover:scale-105 ">
              <img src={school.logoUrl} alt="ksks" className="object-cover" />
            </div>
            <div className="">
              <h1 className="hover:text-blue-500 dark:hover:text-blue-400 lg:text-2xl font-medium text-gray-900 dark:text-white">{school.name}</h1>
              <p className="items-center text-gray-500 dark:text-gray-400">2013-2026</p>
              <p className="text-gray-600 dark:text-gray-400">High School (SEE batch 2082)</p>
            </div>
            <div className="hidden md:block">
              <a href="https://www.facebook.com/p/The-Rising-English-Secondary-Boarding-school-Biratchowk-100063526275005/"></a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <h1 className="text-2xl mt-7 font-bold text-gray-900 dark:text-white">Work</h1>
        <div className="mt-8">
          <div className="flex justify-baseline gap-0">
            <div className="rounded h-18 w-18 hover:scale-105 ml-4">
              <img src={work.logoUrl} alt="ksks" className="object-cover" />
            </div>
            <div className="ml-5">
              <h1 className="hover:text-blue-500 dark:hover:text-blue-400 lg:text-2xl font-medium text-gray-900 dark:text-white">{work.name}</h1>
              <p className="items-center text-gray-500 dark:text-gray-400">Present</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Animation Section */}
      <div className="mt-8 overflow-hidden relative flex flex-col">
        <div className="relative h-80 w-full">
          {/* Animated Lyrics */}
          <div className="absolute top-0 left-0 w-full flex flex-col items-center pointer-events-none">
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
                      className={`text-gray-400 dark:text-gray-500 text-xs md:text-sm mb-1 italic ${caveatFont.className}`}
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
            <div className="relative w-[500px] h-[250px] drop-shadow-2xl opacity-90">
              <Image
                src="/Double_decker_buses-removebg-preview.png"
                alt="Double Decker Bus"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Audio Player (Transparent instead of hidden for better autoplay compatibility) */}
          <div className="absolute opacity-0 pointer-events-none">
            {isBusRunning && (
              <iframe
                src="https://www.youtube.com/embed/siO6dk_LiaE?autoplay=1&mute=0&enablejsapi=1"
                allow="autoplay; encrypted-media"
              ></iframe>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end w-full">
          <button
            onClick={() => setIsBusRunning(!isBusRunning)}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium shadow active:scale-95 flex items-center gap-2 text-xs"
          >
            {isBusRunning ? (
              <>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Stop
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Start
              </>
            )}
          </button>
        </div>
      </div>
      {/* Things I am Learning section */}
      <div>
        <div>
          <h1 className={`text-4xl ${dancingScript.className} mt-11 text-gray-900 dark:text-white`}>Things I am Learing At 16</h1>
        </div>
        <div className="mt-7">
          <h1 className={`text-2xl ${caveatFont.className} text-gray-800 dark:text-gray-200`}>1. Learning  to play Instuments </h1>
          <h1 className={`text-2xl ${caveatFont.className} text-gray-800 dark:text-gray-200`}>2. Learn to Code  </h1>
          <h1 className={`text-2xl ${caveatFont.className} text-gray-800 dark:text-gray-200`}>3. Video Editing </h1>
        </div>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default page;
