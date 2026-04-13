"use client";

import React from "react";
import Image from "next/image";

type CardProps = {
  src: string;
  alt: string;
  className?: string;
};

const Card = ({ src, alt, className }: CardProps) => {
  return (
    <div
      className={`absolute rounded-2xl shadow-xl bg-white p-2 transition-all duration-300 ${className}`}
    >
      <div className="relative w-[260px] h-[320px] overflow-hidden rounded-xl">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 bg-gray-50 overflow-hidden">
      
      {/* Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

      {/* Text */}
     

      {/* Cards */}
      <div className="relative w-[600px] h-[400px] flex items-center justify-center">
        
        {/* Left */}
        <Card
          src="/images/photo1.jpg"
          alt="left"
          className="-rotate-6 left-0 top-10 opacity-80"
        />

        {/* Right */}
        <Card
          src="/images/photo2.jpg"
          alt="right"
          className="rotate-6 right-0 top-10 opacity-80"
        />

        {/* Center */}
        <div className="relative z-20 bg-gray-100 p-4 rounded-2xl shadow-2xl">
          <div className="relative w-[280px] h-[340px] rounded-xl overflow-hidden">
            <Image
              src="/images/photo-main.jpg"
              alt="main"
              fill
              className="object-cover"
            />
          </div>

         
        </div>

      </div>
    </section>
  );
}