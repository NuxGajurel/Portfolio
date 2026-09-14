"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Photos", path: "/photos" },
  { name: "Guestbook", path: "/guestbook" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMounted(true);
    setVisible(true);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show navbar
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md ${
        visible || open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 border-b border-gray-200/80 dark:border-gray-800/80">

          {/* ── Logo ── */}
          <Link
            href="/"
            className={`text-2xl font-bold text-gray-900 dark:text-white hover:opacity-70 transition-opacity ${caveat.className}`}
          >
            Nux Codes
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Contact Button + Mobile Hamburger ── */}
          <div className="flex items-center gap-2">
            {/* Contact Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              Contact
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 -mr-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden bg-[#fafafa]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-t border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {navLinks.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-sm font-semibold transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
