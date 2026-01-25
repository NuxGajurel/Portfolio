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

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiVercel,
  SiTypescript,
  SiPostgresql,
  SiJavascript,
  SiExpress,
} from "react-icons/si";
import { div } from "framer-motion/client";

const TECH_STACK = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },

  {
    name: "Express.js",
    icon: SiExpress,
    color: "text-gray-800 dark:text-gray-200",
  },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Neon (PostgreSQL)", icon: SiPostgresql, color: "text-emerald-400" },

  // Tools
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
];

const photosOne =  {id : 1 , url:"/main.jpg"}
const photosTwo ={
  id:2,
  url:"/hamro.JPG"
}
const photosThree ={
  id:2,
  url:"/mero.jpg"
}
 


 
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

      <div>
        <section className="mt-16">
          <h2 className="text-2xl sm:text-2xl mb-8">Tech Stack</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {TECH_STACK.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center justify-center 
                         gap-1 rounded-xl p-1
                         transition-all duration-300 border border-gray-200 "
                >
                  <Icon
                    className={`text-3xl ${tech.color} 
                            group-hover:scale-110 transition`}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
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
      <div>
        <h1 className="text-2xl sm:text-2xl mb-8 mt-9 ml-1">Photos</h1>
     
        <div className="flex justify-baseline space-x-3 ml-3">
     <div>
       <img src={photosOne.url} alt="ehh" className="lg:h-65 lg:w-50"/>
     </div>
     <div>
      <img src={photosTwo.url} alt="" className="lg:h-65 lg:w-50"/>
     </div>
     <div>
      <img src={photosThree.url} alt="" className="lg:h-65 lg:w-50"/>
     </div>
  
        </div>
        
      </div>
    </main>
  );
}
