"use client";
import React from "react";
import Link from "next/link";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import {
  FiUser,
  FiBook,
  FiMail,
  FiFolder,
  FiCamera,
  FiBarChart2,
  FiStar,
} from "react-icons/fi";

const Footer = () => {
  // MOBILE DATA
  const navigate = [
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "Uses", path: "/uses" },
  ];

  const explore = [
    { name: "Contact", path: "/contact" },
    { name: "Colophon", path: "/colophon" },
    { name: "Features", path: "/features" },
    { name: "Manifest", path: "/manifest" },
  ];

  const socials = [
    { icon: <FaGithub />, path: "https://github.com/NuxGajurel" },
    {
      icon: <FaLinkedin />,
      path: "https://www.linkedin.com/in/nux-gajurel-355962348/",
    },
    { icon: <FaInstagram />, path: "https://www.instagram.com/nuxgajurel/" },
    { icon: <SiDailydotdev />, path: "https://app.daily.dev/nuxgajurel" },
  ];

  // DESKTOP GRID
  const desktopLinks = [
    { name: "About", path: "/about", icon: <FiUser /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiBarChart2 /> },
    { name: "Colophon", path: "/colophon", icon: <FiBook /> },
    { name: "Manifest", path: "/manifest", icon: <FiStar /> },

    { name: "Guestbook", path: "/guestbook", icon: <FiBook /> },
    { name: "Contact", path: "/contact", icon: <FiMail /> },
    { name: "Blogs", path: "/blog", icon: <FiBook /> },
    { name: "Uses", path: "/uses", icon: <FiBarChart2 /> },

    { name: "Projects", path: "/projects", icon: <FiFolder /> },
    { name: "Photos", path: "/photos", icon: <FiCamera /> },
    { name: "Feedback", path: "/feedback", icon: <FiUser /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },

    { name: "Instagram", path: "https://instagram.com", icon: <FaInstagram /> },
    {
      name: "Daily.dev",
      path: "https://app.daily.dev",
      icon: <SiDailydotdev />,
    },
    { name: "GitHub", path: "https://github.com", icon: <FaGithub /> },
    { name: "LinkedIn", path: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  return (
    <footer className="w-full px-5 py-12 text-gray-700">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="md:hidden space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">NAVIGATE</h3>
              <ul className="space-y-3">
                {navigate.map((item) => (
                  <li key={item.name} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <Link href={item.path}>
                      <span className="border-b border-dashed">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span className="border-b border-dashed">Now</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">EXPLORE</h3>
              <ul className="space-y-3">
                {explore.map((item) => (
                  <li key={item.name} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <Link href={item.path}>
                      <span className="border-b border-dashed">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="border-b border-dashed"
                  >
                    Scroll to Top
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Nux Gajurel</h2>
            <p className="text-sm text-gray-600">
              Passionate and creative Full-stack Developer from Nepal
            </p>

            <div className="flex gap-5 text-xl">
              {socials.map((s, i) => (
                <a key={i} href={s.path} target="_blank">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block space-y-10">
          <div className="grid grid-cols-4 gap-x-10 gap-y-6 text-sm">
            {desktopLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                target={item.path.startsWith("http") ? "_blank" : "_self"}
                className="flex items-center gap-3 hover:text-black transition"
              >
                <span className="text-lg text-gray-500">{item.icon}</span>
                <span className="border-b border-dashed">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
          <span>© {new Date().getFullYear()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
