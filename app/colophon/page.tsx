import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Colophon() {
  return (
    <main className={`min-h-[80vh] py-12 ${inter.className}`}>
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl md:text-4xl text-gray-900 dark:text-white font-semibold tracking-tight">
            About This Website
          </h1>
        </header>

        <div className="space-y-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed tracking-tight">
          <p>
            After completing my SEE in 2026, I finished the first version of this site. 
            This project represents my early growth, learning, and passion for web development.
          </p>
          
          <p>
            The design and inspiration for this website are influenced by{" "}
            <a 
              href="https://manishtamang.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-all font-medium"
            >
              Manish Tamang
            </a>
            , a talented developer from Itahari, Nepal.
          </p>
        </div>

        <footer className="pt-16">
          <p className="text-base md:text-lg text-gray-400 dark:text-gray-500">
            Built with Next.js, Tailwind CSS, and Framer Motion. Hosted on Vercel.
          </p>
        </footer>
      </div>
    </main>
  );
}
