"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat } from "next/font/google";
import { IoCloseOutline } from "react-icons/io5";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const polaroidPhotos = [
  {
    src: "/hamro.JPG",
    caption: "",
    alt: "bali!!",
    tilt: "-rotate-[2.5deg] sm:-rotate-[5deg]",
    translateY: "sm:translate-y-1",
    zIndex: 10,
  },
  {
    src: "/school.jpg",
    caption: "",
    alt: "bookies",
    tilt: "rotate-[2.5deg] sm:rotate-[2.5deg]",
    translateY: "sm:-translate-y-1.5",
    zIndex: 20,
  },
  {
    src: "/3.jpg",
    caption: "",
    alt: "beach :3",
    tilt: "-rotate-[2deg] sm:-rotate-[1.5deg]",
    translateY: "sm:translate-y-0.5",
    zIndex: 15,
  },
  {
    src: "/bhai.jpg",
    caption: "",
    alt: "gang",
    tilt: "rotate-[2deg] sm:rotate-[4deg]",
    translateY: "sm:-translate-y-1",
    zIndex: 10,
  },
];

export const PolaroidSpread = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof polaroidPhotos)[0] | null>(null);

  return (
    <div className="relative my-8 sm:my-12">
      <div className="relative py-2 sm:py-6 overflow-visible">
        <div className="grid grid-cols-2 gap-3 sm:gap-0 max-w-[320px] sm:max-w-none mx-auto sm:flex sm:items-center sm:justify-center sm:-space-x-5 md:-space-x-6 px-1 sm:px-3 py-2 sm:py-3">
          {polaroidPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => setSelectedPhoto(photo)}
              style={{ zIndex: photo.zIndex }}
              className={`group relative justify-self-center w-full max-w-[150px] sm:max-w-none sm:w-44 md:w-48 sm:flex-shrink-0 bg-white p-2 sm:p-2.5 pb-4 sm:pb-6 rounded-[2px] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.18),0_4px_8px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)] cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:!z-30 hover:shadow-2xl ${photo.tilt} ${photo.translateY}`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[1px] bg-neutral-100 border border-black/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 176px, 192px"
                />
              </div>

              {photo.caption ? (
                <div className="pt-2 sm:pt-2.5 flex items-center justify-center">
                  <span
                    className={`${caveat.className} text-base sm:text-lg md:text-xl text-zinc-800 font-semibold tracking-wide select-none text-center transform -rotate-1`}
                  >
                    {photo.caption}
                  </span>
                </div>
              ) : (
                <div className="h-2 sm:h-3" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[60]"
              aria-label="Close photo"
            >
              <IoCloseOutline size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white p-4 sm:p-5 pb-8 sm:pb-10 rounded-sm shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-square max-h-[65vh] rounded-[2px] overflow-hidden bg-neutral-100">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className={`${caveat.className} text-2xl sm:text-3xl text-zinc-800 font-semibold mt-4 tracking-wide text-center`}>
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
