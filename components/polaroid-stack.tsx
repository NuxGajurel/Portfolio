"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

const cards = [
  {
    id: 0,
    src: "/IMG-20250131-WA0003.jpg",
    location: "",
    rotation: -12,
    xOffset: "-60%",
    zIndex: 1,
  },
  {
    id: 1,
    src: "/IMG_20250129_051755.jpg",
    location: "",
    rotation: -2,
    xOffset: "0%",
    zIndex: 2,
  },
  {
    id: 2,
    src: "/IMG_20250201_092147_064.webp",
    location: "",
    rotation: 10,
    xOffset: "60%",
    zIndex: 1,
  },
];

export const PolaroidStack = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center my-12">
      {cards.map((card, index) => {
        const isActive = activeCard === index;
        const isHoveredAny = activeCard !== null;
        
        return (
          <motion.div
            key={card.id}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
            initial={{ rotate: card.rotation, x: card.xOffset, scale: 1, zIndex: card.zIndex }}
            animate={{
              rotate: isActive ? 0 : isHoveredAny ? card.rotation * 1.2 : card.rotation,
              scale: isActive ? 1.05 : isHoveredAny ? 0.95 : 1,
              zIndex: isActive ? 10 : card.zIndex,
              y: isActive ? -15 : 0,
              x: card.xOffset,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className={`absolute w-[200px] sm:w-[240px] md:w-[280px] bg-[#1e293b] p-3 pb-12 sm:pb-16 rounded-xl shadow-2xl cursor-pointer border border-slate-700/50`}
            style={{
              filter: isHoveredAny && !isActive ? "grayscale(100%) brightness(50%)" : "grayscale(0%) brightness(100%)",
              transition: "filter 0.4s ease",
            }}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-800">
              <Image
                src={card.src}
                alt={card.location}
                fill
                className="object-cover"
              />
            </div>
            
            {card.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex items-center justify-center gap-2 text-white"
              >
                <FaMapMarkerAlt className="text-pink-500" />
                <span className="font-mono tracking-widest text-sm sm:text-base">
                  {card.location}
                </span>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
