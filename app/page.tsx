"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Playwrite_IE, Caveat_Brush } from "next/font/google";

const bokorFont = Playwrite_IE({
  subsets: ["latin"],
  weight: "300",
});

const caveatFont = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
});

const school = {
  name: "The Rising English Boarding School",
  logoUrl: "/school.png",
};

const Nux = {
  name: "Nux Gajurel",
  avatarUrl: "/nnnux.jpg",
  initials: "NG",
};

const photos = [
  { id: "left", url: "/school.jpg" },
  { id: "center", url: "/bhai.jpg" },
  { id: "right", url: "/mero.webp" },
];

function Avatar({ src, alt, fallback }: any) {
  return (
    <motion.div
      className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-36 lg:h-36 rounded-full overflow-hidden"
      animate={{
        y: [0, -10, 0, 10, 0],
        x: [0, 8, 0, -8, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-bold">
          {fallback}
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [active, setActive] = useState("center");

  return (
    <main className="min-h-screen px-4 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="lg:flex items-center gap-4">
          <Avatar src={Nux.avatarUrl} alt={Nux.name} fallback={Nux.initials} />

          <div className="flex-1 mt-6 lg:mt-0 lg:ml-6 ml-0">
            <h1
              className={`text-2xl sm:text-4xl lg:text-3xl font-bold mb-2 ${bokorFont.className}`}
            >
              Hi, I'm Nux Gajurel
            </h1>

            <p className="mb-1">Web developer & Student</p>

            <div>
           
              I'm passionate    <a
                href="https://github.com/NuxGajurel"
                className={`text-blue-600 underline ${caveatFont.className}`}
              >
                Aspiring full-stack developer
              </a>{" "}from Nepal Who Create Cool Projects and Learn New Things Everyday.
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-10">
          <h1 className="text-2xl mb-6">Education</h1>

          <div className="flex items-center gap-4">
            <div className="h-20 w-20 hover:scale-105 transition">
              <img src={school.logoUrl} alt="school" />
            </div>

            <div>
              <h1 className="hover:text-blue-500">{school.name}</h1>
              <p className="text-gray-400">2013-2026</p>
              <p>High School (10th Grade)</p>
            </div>

            <div className="ml-auto hidden md:block">
              <FaArrowUpRightFromSquare className="text-gray-700 hover:text-blue-500" />
            </div>
          </div>
        </div>
{/* photos */}
<div className="mt-6">
  <h1 className="text-2xl mt-7">Photos</h1>
</div>
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-[500px] sm:max-w-[600px] aspect-[3/2] flex items-center justify-center">
           
            <div
              onMouseEnter={() => setActive("left")}
              onClick={() => setActive("left")}
              className={`absolute left-2 sm:left-0 top-8 sm:top-10 p-2 bg-white rounded-xl shadow-xl cursor-pointer transition-all duration-500
              ${
                active === "left"
                  ? "z-30 scale-105"
                  : "z-10 grayscale brightness-75 contrast-75 opacity-60 blur-[1px]"
              }`}
            >
              <div className="relative w-[140px] h-[180px] sm:w-[220px] sm:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={photos[0].url}
                  alt=""
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
               <div className="flex items-center justify-center mt-3 text-gray-700 font-medium">
            <span className="mr-2">-</span>
            Last day of School
          </div>
            </div>

            {/* RIGHT */}
            <div
              onMouseEnter={() => setActive("right")}
              onClick={() => setActive("right")}
              className={`absolute right-2 sm:right-0 top-8 sm:top-10 p-2 bg-white rounded-xl shadow-xl cursor-pointer transition-all duration-500
              ${
                active === "right"
                  ? "z-30 scale-105"
                  : "z-10 grayscale brightness-75 contrast-75 opacity-60 blur-[1px]"
              }`}
            >
              <div className="relative w-[140px] h-[180px] sm:w-[220px] sm:h-[280px] rounded-lg overflow-hidden">
                <Image
                  src={photos[2].url}
                  alt=""
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
               <div className="flex items-center justify-center mt-3 text-gray-700 font-medium">
            <span className="mr-2">📍</span>
            Pokhara
          </div>
            </div>

            {/* CENTER */}
            <div
              onMouseEnter={() => setActive("center")}
              onClick={() => setActive("center")}
              className={`relative p-2 bg-white rounded-xl shadow-2xl cursor-pointer transition-all duration-500
              ${
                active === "center"
                  ? "z-30 scale-105"
                  : "z-10 grayscale brightness-75 contrast-75 opacity-60 blur-[1px]"
              }`}
            >
              <div className="relative w-[160px] h-[200px] sm:w-[260px] sm:h-[320px] rounded-lg overflow-hidden">
                <Image
                  src={photos[1].url}
                  alt=""
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
                <div className="flex items-center justify-center mt-3 text-gray-700 font-medium">
            <span className="mr-2">📍</span>
           Darjeeling 
          </div>
            </div>
          </div>
        </div>
           <div className="mt-5">
          <button
            className="cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg
border-[#e5e5e5]
border-b-4px hover:brightness-110 hover:-translate-y-1px hover:border-b-[6px]
active:border-b-2px active:brightness-90 active:translate-y-2px w-full mt-5"
          >
            See All
          </button>
        </div>
      </div>
    </main>
  );
}
