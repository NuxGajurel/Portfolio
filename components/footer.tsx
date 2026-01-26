"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FcAbout } from "react-icons/fc";
import { FiTool, FiFolder, FiCamera } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";


const footer = () => {
  const nav = [
  { name:"About", path: "/about" ,icons:<FcAbout/>},
    { name: "Uses", path: "/uses" ,icons:<FiTool/>},
    { name: "Projects", path: "/projects", icons:<FiFolder/> },
    { name: "Photos", path: "/photos" ,icons:<FiCamera/> },
   
  ];
  const [open, setOpen] = useState(false);
 const socialLinks = [
  {name: "GitHub", path:"https://github.com/NuxGajurel ", icons:<FaGithub/>},
   {name: "Instagram", path:"https://www.instagram.com/nuxgajurel/", icons:<FaInstagram/>},
   {name: "LInkedin", path:"https://www.linkedin.com/in/nux-gajurel-355962348/ ", icons:<FaLinkedin/>},
   {name:"Daily.dev", path:"https://app.daily.dev/nuxgajurel", icons:<SiDailydotdev/>},
  
 ];
  return (
    <div>
      <footer className="mx-auto max-w-6xl px-0 py-5 mt-10 lg:ml-6">
        <div className="flex justify-baseline lg:gap-15 gap-5">
          <div className="flex flex-col col-end-4 space-y-1">
            {nav.map((item) => (
              <div key={item.name}>
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                >
                 <p className="flex items-center gap-2 text-black">
  {item.icons}
  {item.name}
</p>

                </Link>
              </div>
            ))}
          </div>
          <div>
             <div className="flex flex-col col-end-4 space-y-1">
            {socialLinks.map((social) => (
              <div key={social.name}>
                <a
                  key={social.path}
                  href={social.path}
                  onClick={() => setOpen(false)}
                >
                    <p className="flex items-center gap-2 text-black">
  {social.icons}
  {social.name}
</p>
                </a>
          </div>
        ))}
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;
