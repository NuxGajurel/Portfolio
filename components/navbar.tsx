"use client";

import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

type NavItem = {
  name: string;
  path: string;
};

const navItems: NavItem[] = [
  { name: "About", path: "/about" },
  { name: "Uses", path: "/uses" },
  { name: "Projects", path: "/projects" },
  { name: "Photos", path: "/photos" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto max-w-6xl px-0 py-5 sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg text-blue-500 font-stretch-ultra-expanded ml-2"
        >
          Nuxcodes
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <i
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <RxCross2 size={20} /> : <CiMenuBurger size={20} />}
        </i>
      </div>
      <hr className="mt-4 m-0 p-0 text-gray-300"></hr>
      {/* Mobile Menu */}
      {open && (
        <nav className="mt-4 flex flex-col gap-4 md:hidden bg-white">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
