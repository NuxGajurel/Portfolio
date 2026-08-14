"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiHome, HiInformationCircle, HiCollection, HiPhone } from "react-icons/hi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: HiHome },
  { name: "About", path: "/about", icon: HiInformationCircle },
  { name: "Projects", path: "/projects", icon: HiCollection },
  { name: "Contact", path: "/contact", icon: HiPhone },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setOpen(false);
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button on Left */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 dark:text-white bg-gray-200/60 dark:bg-gray-800/60"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/30"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <IoSunny size={18} className="text-amber-400" />
              ) : (
                <IoMoon size={18} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#fafafa]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gray-200/70 dark:bg-gray-800/70 text-black dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/40 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

