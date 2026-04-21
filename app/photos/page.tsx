"use client";
import React, { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/bhai.jpg", title: "", date: "" },
  { src: "/1.jpg", title: "Random Shot", date: "" },
  { src: "/6.jpg", title: "", date: "" },
  { src: "/7.jpg", title: "", date: "" },
  { src: "/2.jpg", title: "Last Day of School", date: "" },
  { src: "/3.jpg", title: "Hackathon", date: "026" },
  { src: "/4.jpg", title: "Last Day of SEE", date: "" },
  { src: "/5.jpg", title: "Pokhara", date: "" },
];

const Page = () => {
  const [selected, setSelected] = useState<typeof images[0] | null>(null);

  return (
    <div className="bg-white text-black min-h-screen px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-2">Photos</h1>
      <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
        A collection of random images from my gallery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[280px]">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelected(img)}
            className={`relative cursor-pointer overflow-hidden rounded-xl group
              ${i === 1 ? "sm:col-span-2 sm:row-span-2" : ""}
            `}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition">
              <h2 className="text-sm md:text-lg font-semibold">{img.title}</h2>
              <p className="text-[10px] md:text-xs text-gray-300">{img.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-black text-2xl md:text-3xl"
          >
            ✕
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[85vh] px-2">
            <Image
              src={selected.src}
              alt={selected.title}
              fill
              className="object-contain"
            />

            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-black">
              <h2 className="text-lg md:text-2xl font-bold">
                {selected.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                {selected.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
