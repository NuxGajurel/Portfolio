"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const DATA = {
  name: "Nux Gajurel",
  initials: "NG",
  avatarUrl: "/main.jpg",
};
const school = {
  name: "The Rising English Boarding School",
  logoUrl: "/school.png",
};



function Avatar({ src, alt, fallback }: any) {
  return (
    <motion.div
      className="relative w-30 h-30 sm:w-22 sm:h-22 lg:w-36 lg:h-36 
             rounded-full overflow-hidden shrink-0"
      animate={{
        y: [0, -10, 0, 10, 0],
        x: [0, 8, 0, -8, 0],
      }}
      transition={{
        duration: 10, // slower
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
  return (
    <main className="min-h-screen px-0 sm:px-0 lg:px-6 lg:py-16 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              Hi, I'm Nux 👋
            </h1>

            <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-medium">
              I'm a 16-year-old{" "}
              <a
                href="https://github.com/NuxGajurel"
                className="text-blue-600 underline"
              >
                Aspiring full-stack developer
              </a>{" "}
              and a student. I love building cool stuff with code and learning
              about new technologies.
            </p>
          </div>

          <Avatar
            src={DATA.avatarUrl}
            alt={DATA.name}
            fallback={DATA.initials}
          />
        </div>
      </div>
      {/* Skills  */}

      {/* Education  */}
      <div>
        <h1 className="text-2xl sm:text-2xl mb-8 mt-9 ml-1">Education</h1>
        <div className="flex justify-baseline gap-0">
          <div className="rounded h-24 w-24 hover:scale-105 ">
            <img src={school.logoUrl} alt="ksks" className="object-cover" />
          </div>
          <div>
            <h1 className="hover:text-blue-500">{school.name}</h1>
            <p className="items-center text-gray-400">2013-2026</p>
            <p>High School (10th Grade)</p>
          </div>
          <div className="ml-60 hidden md:block">
            <a href="https://www.facebook.com/p/The-Rising-English-Secondary-Boarding-school-Biratchowk-100063526275005/">
              <FaArrowUpRightFromSquare className="text-gray-700 hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
      {/* Photos */}
   
     
    </main>
  );
}
