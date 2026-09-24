"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

import { projects } from "@/data/projects";
import { SongQuote } from "@/components/song-quote";

/* =========================================================
   FONT
========================================================= */

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/* =========================================================
   PROFILE
========================================================= */

const Nux = {
  name: "Nux Gajurel",
  avatarUrl: "/Nuxgajurel.jpg",
  initials: "NG",
};

/* =========================================================
   ANIMATED NAME
========================================================= */

const alternatingNames = ["Nawaraj", "Nux"];

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [nameIndex, setNameIndex] = useState(0);

  /* Featured projects on home page: Mahalaxmi, Web Nepal, and Saral-Sewa */
  const homeProjectSlugs = ["mahalaxmi-traders", "web-nepal", "saral-sewa"];
  const visibleProjects = homeProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  /* =======================================================
     NAME ANIMATION
  ======================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex(
        (prev) => (prev + 1) % alternatingNames.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="w-full pt-4 sm:pt-6 pb-12 sm:pb-16">
      <div className="w-full">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="flex flex-col-reverse sm:flex-row items-start gap-6 mb-8 sm:mb-10">

          {/* HERO CONTENT */}
          <div className="flex-1">

            <h1
              className={`
                ${instrumentSerif.className}
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-normal
                mb-3
                leading-tight
                text-gray-900
                dark:text-white
              `}
            >
              Hi, I&apos;m{" "}

              <span className="inline-block relative overflow-hidden align-bottom">

                <AnimatePresence mode="wait">
                  <motion.span
                    key={alternatingNames[nameIndex]}
                    initial={{
                      y: 26,
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      y: -26,
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    className="inline-block text-gray-900 dark:text-white"
                  >
                    {alternatingNames[nameIndex]}
                  </motion.span>
                </AnimatePresence>

              </span>{" "}

              Gajurel
            </h1>

            <p className="text-sm font-semibold mb-4 text-gray-500 dark:text-gray-400">
              Web developer &amp; Student
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              I&apos;m a passionate full-stack developer from Nepal,
              turning ideas into creative digital experiences. I love
              building cool projects, exploring new technologies,
              solving real-world problems, and pushing myself to learn
              something new every day.
            </p>

          </div>

          {/* AVATAR */}
          <div className="flex-shrink-0 w-32 sm:w-36 md:w-40 self-start">

            <motion.div
              className="
                relative
                w-32
                h-32
                sm:w-36
                sm:h-36
                md:w-40
                md:h-40
                rounded-full
                overflow-hidden
                shadow-sm
              "
              animate={{
                y: [0, -8, 0, 8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={Nux.avatarUrl}
                alt={Nux.name}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

          </div>

        </section>

        {/* =================================================
            TRUSTED BY
        ================================================= */}

        <section className="mt-4 sm:mt-6">

          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
            Trusted by
          </h2>

          {/* LOGOS */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-4">

            {[
              {
                src: "/avyanta.png",
                alt: "Avyanta Creative",
              },
              {
                src: "/logo-icon-light.png",
                alt: "Mindx Technology",
              },
              {
                src: "/maha.png",
                alt: "Mahalaxmi Traders",
              },
              {
                src: "/logo (2).jpg",
                alt: "Zakka Sendai",
              },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="
                  flex
                  items-center
                  justify-center
                  h-8
                  sm:h-10
                "
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={90}
                  height={40}
                  className="
                    object-contain
                    max-h-8
                    sm:max-h-10
                    w-auto
                  "
                />
              </div>
            ))}

          </div>

          {/* DIVIDER */}
          <div
            className="
              mt-10
              border-t
              border-dashed
              border-gray-200
              dark:border-gray-700/60
            "
          />

        </section>

        {/* =================================================
            FEATURED PROJECTS
        ================================================= */}

        <section className="mt-6 sm:mt-7">

          {/* -----------------------------------------------
              HEADING
          ----------------------------------------------- */}

          <div className="mb-4 sm:mb-6">

            <h2
              className={`
                ${instrumentSerif.className}
                text-3xl
                sm:text-4xl
                md:text-[30px]
                font-normal
                leading-tight
                text-gray-900
                dark:text-white
              `}
            >
              Featured Projects
            </h2>

            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              A few things I&apos;ve built recently.
            </p>

          </div>

          {/* -----------------------------------------------
              PROJECT LIST
          ----------------------------------------------- */}

          <div
            className="
              divide-y
              divide-dashed
              divide-gray-200
              dark:divide-gray-700/60
            "
          >

            {visibleProjects.map((project, index) => {

              /* Optional project properties */
              const projectDetails = project as typeof project & {
                image?: string;
                category?: string;
                url?: string;
              };


              const projectCategory =
                projectDetails.category ||
                "Web Development Project";

              const projectUrl =
                projectDetails.url || "";

              return (
                <Link
                  key={project.name}
                  href={`/projects/${project.slug}`}
                  className="
                    group
                    block
                    py-4
                    sm:py-5
                    first:pt-0
                    last:pb-0
                  "
                >

                  {/* =====================================
                      PROJECT ROW
                  ===================================== */}

                  <div className="w-full">


                      {/* PROJECT NAME */}
                      <h3
                        className={`
                          ${instrumentSerif.className}
                          text-base
                          sm:text-[18px]
                          md:text-[20px]
                          font-normal
                          leading-tight
                          text-gray-900
                          dark:text-white
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        `}
                      >
                        {project.name}
                      </h3>

                      {/* CATEGORY */}
                      <p
                        className="
                          mt-1.5
                          text-xs
                          sm:text-sm
                          font-medium
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {projectCategory}
                      </p>

                      {/* DESCRIPTION */}
                      <p
                        className="
                          mt-1.5
                          max-w-2xl
                          text-xs
                          sm:text-sm
                          leading-relaxed
                          text-gray-500
                          dark:text-gray-400
                          line-clamp-2
                        "
                      >
                        {project.description}
                      </p>

                      {/* WEBSITE */}
                      <div className="mt-3 flex items-center gap-2">

                        {/* PROJECT ICON */}
                        <div
                          className="
                            relative
                            w-5
                            h-5
                            rounded-full
                            overflow-hidden
                            flex-shrink-0
                            border
                            border-gray-200
                            dark:border-gray-700
                            bg-gray-50
                            dark:bg-gray-800
                          "
                        >
                          <Image
                            src={project.icon}
                            alt=""
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </div>

                        {/* WEBSITE */}
                        <span
                          className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            group-hover:text-gray-900
                            dark:group-hover:text-gray-200
                            transition-colors
                            truncate
                          "
                        >
                          {projectUrl
                            ? projectUrl
                              .replace(/^https?:\/\//, "")
                              .replace(/\/$/, "")
                            : "View project"}
                        </span>

                        {/* ARROW */}
                        <span
                          className="
                            text-sm
                            text-gray-400
                            dark:text-gray-500
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          ↗
                        </span>

                      </div>

                    </div>

                </Link>
              );
            })}

          </div>

          {/* -----------------------------------------------
              VIEW ALL
          ----------------------------------------------- */}
          <div
            className="
              mt-10
              border-t
              border-dashed
              border-gray-200
              dark:border-gray-700/60
            "
          />

          <div className="mt-7 flex justify-end">

            <Link
              href="/projects"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                text-sm
                text-gray-500
                dark:text-gray-400
                hover:text-gray-900
                dark:hover:text-white
                transition-colors
              "
            >

              <span
                className="
                  underline
                  underline-offset-4
                  decoration-gray-300
                  dark:decoration-gray-600
                  group-hover:decoration-gray-900
                  dark:group-hover:decoration-white
                "
              >
                View all
              </span>

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </Link>

          </div>

        </section>

        {/* =================================================
            SONG & MEMORY NOTE
        ================================================= */}

        <SongQuote />


        {/* Draggable Pink Floyd CD Disc — can be carried and moved anywhere */}
        <div className="flex justify-end mt-4 mb-2">
          <motion.div
            drag
            dragConstraints={false}
            dragElastic={0}
            dragMomentum={true}
            whileDrag={{ scale: 1.18, zIndex: 99999, cursor: "grabbing" }}
            whileHover={{ scale: 1.08, cursor: "grab" }}
            className="relative z-20 cursor-grab active:cursor-grabbing select-none shrink-0"
            title="Carry and move me anywhere!"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
              className="relative w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-shadow"
            >
              <Image
                src="/pink-floyd-cd.png"
                alt="Pink Floyd CD Disc (Draggable)"
                fill
                sizes="(max-width: 640px) 65px, 80px"
                className="object-contain pointer-events-none select-none"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>

  );
}