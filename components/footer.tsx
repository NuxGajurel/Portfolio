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
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  // MOBILE DATA
  const navigate = [
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
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

    { name: "Projects", path: "/projects", icon: <FiFolder /> },
    { name: "Photos", path: "/photos", icon: <FiCamera /> },
    { name: "Feedback", path: "/feedback", icon: <FiUser /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },

    { name: "Instagram", path: "https://www.instagram.com/nuxgajurel/", icon: <FaInstagram /> },
    {
      name: "Daily.dev",
      path: "https://app.daily.dev/nuxgajurel",
      icon: <SiDailydotdev />,
    },
    { name: "GitHub", path: "https://github.com/NuxGajurel", icon: <FaGithub /> },
    { name: "LinkedIn", path: "https://www.linkedin.com/in/nux-gajurel-355962348/", icon: <FaLinkedin /> },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-10 text-gray-700 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/80">
      <div className="w-full space-y-10">
        <div className="md:hidden space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-3 text-gray-900 dark:text-white">NAVIGATE</h3>
              <ul className="space-y-2.5 text-sm">
                {navigate.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <Link href={item.path} className="hover:text-black dark:hover:text-white transition-colors">
                      <span className="border-b border-dashed border-gray-300 dark:border-gray-700">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-3 text-gray-900 dark:text-white">EXPLORE</h3>
              <ul className="space-y-2.5 text-sm">
                {explore.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <Link href={item.path} className="hover:text-black dark:hover:text-white transition-colors">
                      <span className="border-b border-dashed border-gray-300 dark:border-gray-700">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="border-b border-dashed border-gray-300 dark:border-gray-700 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Scroll to Top
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Nux Gajurel</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Passionate and creative Full-stack Developer from Nepal
            </p>

            <div className="flex gap-4 text-lg pt-1">
              {socials.map((s, i) => (
                <a key={i} href={s.path} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-x-6 gap-y-4 text-sm">
            {desktopLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                target={item.path.startsWith("http") ? "_blank" : "_self"}
                className="flex items-center gap-2.5 hover:text-black dark:hover:text-white transition group"
              >
                <span className="text-base text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors">{item.icon}</span>
                <span className="border-b border-dashed border-gray-300 dark:border-gray-700">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800/80 pt-4">
          <span>© {new Date().getFullYear()} Nux Gajurel</span>
          <span>{time}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


