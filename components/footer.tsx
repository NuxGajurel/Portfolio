"use client";
import React from "react";
import Link from "next/link";

import { FiTool, FiFolder, FiCamera, FiUser } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";

const Footer = () => {
  const nav = [
    { name: "About", path: "/about", icons: <FiUser /> },
    { name: "Uses", path: "/uses", icons: <FiTool /> },
    { name: "Projects", path: "/projects", icons: <FiFolder /> },
    { name: "Photos", path: "/photos", icons: <FiCamera /> },
  ];

  const socialLinks = [
    { name: "GitHub", path: "https://github.com/NuxGajurel", icons: <FaGithub /> },
    { name: "Instagram", path: "https://www.instagram.com/nuxgajurel/", icons: <FaInstagram /> },
    { name: "LinkedIn", path: "https://www.linkedin.com/in/nux-gajurel-355962348/", icons: <FaLinkedin /> },
    { name: "Daily.dev", path: "https://app.daily.dev/nuxgajurel", icons: <SiDailydotdev /> },
  ];

  return (
    <footer className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="flex gap-10 lg:gap-16 items-start">
        
        {/* Navigation */}
        <div className="flex flex-col space-y-2">
          {nav.map((item) => (
            <Link key={item.name} href={item.path}>
              <p className="flex items-center gap-2 text-black hover:text-blue-500 cursor-pointer">
                {item.icons}
                {item.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex items-center gap-2 text-black hover:text-blue-500 cursor-pointer">
                {social.icons}
                {social.name}
              </p>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;