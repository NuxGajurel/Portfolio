"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiHome, HiInformationCircle, HiChip, HiCollection, HiPhotograph, HiPhone } from "react-icons/hi";
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
  { name: "Photos", path: "/photos", icon: HiPhotograph },
  { name: "Contact", path: "/contact", icon: HiPhone },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Close menu on navigation
  useEffect(() => {
    setOpen(false);
    setMounted(true);
  }, [pathname]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          {/* Desktop Nav on Left */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                  pathname === item.path
                    ? "text-black dark:text-white underline underline-offset-4"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bulb Icon on Right (Desktop & Mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-gray-200 dark:border-gray-800"
            >
              {isDark ? (
                <IoSunny size={18} className="text-white" />
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-6 sm:px-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gray-50 dark:bg-gray-900 text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                      isActive 
                        ? "bg-white dark:bg-black shadow-sm border border-gray-100 dark:border-gray-800" 
                        : "bg-gray-100/50 dark:bg-gray-800/50"
                    }`}>
                      <item.icon size={20} className={isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"} />
                    </div>
                    <span className="text-lg font-medium">
                      {item.name}
                    </span>
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

