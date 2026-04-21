import React from "react";
import { Dancing_Script } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import { Caveat_Brush } from "next/font/google";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});
const caveatFont = Caveat_Brush({ subsets: ["latin"], weight: "400" });

const page = () => {
  const links = [
    {
      name: "GitHub",
      path: "https://github.com/NuxGajurel",
      icons: <FaGithub />,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/nuxgajurel/",
      icons: <FaInstagram />,
    },
    {
      name: "LInkedin",
      path: "https://www.linkedin.com/in/nux-gajurel-355962348/ ,",
      icons: <FaLinkedin />,
    },
    {
      name: "Daily.dev",
      path: "https://app.daily.dev/nuxgajurel",
      icons: <SiDailydotdev />,
    },
  ];
  const Photo = {
    name: "Nux Gajurel",
    avatarUrl: "/end.jpg",
  };
  const school = {
    name: "The Rising English Boarding School",
    logoUrl: "/school.png",
  };
  const work = {
    name: "freelancer Web Developer",
    logoUrl: "/work.webp",
  };
  const mero ={
    name: "Mero Job",
    logoUrl: "/v.png",
  }
  return (
    <div>
      <div className="">
        <div>
          <h1 className="text-2xl">About </h1>
          <p className={`${dancingScript.className} text-2xl mt-3`}>
            Hi, I'm Nawaraj Gajurel (aka Nux), a passionate aspiring Full-Stack
            Developer from Nepal. This is the space where I showcase my work and
            the things I love to create.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-6">
          {links.map((item) => (
            <i
              key={item.name}
              className={`text-xl cursor-pointer hover:text-blue-500 hover:text-{item.name}`}
              aria-setsize={28}
            >
              {item.icons}
            </i>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="mt-10 w-full">
        <img
          src={Photo.avatarUrl}
          alt={Photo.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <p className="flex justify-end mt-3 text-gray-400 hover:text-black">
        {" "}
        - Last Day of SEE (4/9/2026 Thursday)
      </p>
      {/* education */}
      <div>
        <h1 className="text-2xl mt-7">Education </h1>
        <div className="mt-8">
          <div className="flex justify-baseline gap-0">
            <div className="rounded h-24 w-24 hover:scale-105 ">
              <img src={school.logoUrl} alt="ksks" className="object-cover" />
            </div>
            <div className="">
              <h1 className="hover:text-blue-500 lg:text-2xl">{school.name}</h1>
              <p className="items-center text-gray-400">2013-2026</p>
              <p>High School (SEE batch 2082  )</p>
            </div>
            <div className="hidden md:block">
              <a href="https://www.facebook.com/p/The-Rising-English-Secondary-Boarding-school-Biratchowk-100063526275005/"></a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <h1 className="text-2xl mt-7">Work</h1>
        <div className="mt-8">
          <div className="flex justify-baseline gap-0">
            <div className="rounded h-18 w-18 hover:scale-105 ml-4">
              <img src={work.logoUrl} alt="ksks" className="object-cover" />
            </div>
            <div className="ml-5">
              <h1 className="hover:text-blue-500 lg:text-2xl">{work.name}</h1>
              <p className="items-center text-gray-400">Present</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={mero.logoUrl} alt={mero.name} className=""/>
        
      </div>
      {/*  */}
      <div>
        <div>
          <h1 className={`text-4xl ${dancingScript.className} mt-11`}>Things I am Learing At 16</h1>
        </div>
        <div className="mt-7">
          <h1 className={`text-2xl ${caveatFont.className}`}>1. Learning  to play Instuments </h1>
      <h1 className={`text-2xl ${caveatFont.className}`}>2. Learn to Code  </h1>
        <h1 className={`text-2xl ${caveatFont.className}`}>3. Video Editing </h1>
          
        </div>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default page;
