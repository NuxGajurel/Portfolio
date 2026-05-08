"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const images = [
  { src: "/bhai.jpg", title: "Moments", date: "2024" },
  { src: "/1.jpg", title: "Random Shot", date: "2023" },
  { src: "/6.jpg", title: "Street Life", date: "2024" },
  { src: "/7.jpg", title: "Nature", date: "2024" },
  { src: "/2.jpg", title: "Last Day of School", date: "2023" },
  { src: "/3.jpg", title: "Hackathon", date: "2026" },
  { src: "/4.jpg", title: "Last Day of SEE", date: "2023" },
  { src: "/5.jpg", title: "Pokhara", date: "2024" },
];

const Page = () => {
  const [selected, setSelected] = useState<(typeof images)[0] | null>(null);

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto">
        <header className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-gray-900 dark:text-white"
          >
            Photos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed"
          >
            A curated collection of moments, travels, and random captures from
            my lens.
          </motion.p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(img)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl group bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-none border border-transparent dark:hover:border-gray-700 transition-all duration-500
                ${
                  i === 0
                    ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                    : "aspect-square"
                }
                ${i === 5 ? "md:col-span-2" : ""}
              `}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <h2 className="text-white text-sm md:text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title || "Untitled"}
                </h2>
                <p className="text-gray-300 text-[10px] md:text-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {img.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-[60]"
            >
              <IoCloseOutline size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">
                  {selected.title || "Untitled"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selected.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;

