// src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/plan-your-visit", label: "Plan Your Visit" },
    { href: "/about", label: "About" },
    { href: "/sermons", label: "Sermons" },
    { href: "/ministries", label: "Ministries" },
    { href: "/events", label: "Events" },
    { href: "/give", label: "Give", highlight: true },
    { href: "/live", label: "Live" },
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="flex flex-col">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-10 h-10">
              <Image
                src="https://cdn.doorstepfoodstuffs.com.ng/lightline%201.png"
                alt="Lightline Church Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#0B1D40] leading-tight">
                Lightline Church
              </span>
              <span className="text-xs text-[#F7B500] font-medium leading-tight">
                Following the Light. Changing the World.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {links.map(({ href, label, highlight }) => {
              const active = pathname === href;
              
              if (highlight) {
                return (
                  <motion.div
                    key={href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={href}
                      className="relative px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#F7B500] to-[#e6a500] rounded-full hover:from-[#e6a500] hover:to-[#d69900] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {label}
                      {active && (
                        <motion.span
                          layoutId="give-glow"
                          className="absolute inset-0 rounded-full bg-white/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active 
                      ? "text-[#0B1D40] font-semibold" 
                      : "text-gray-600 hover:text-[#0B1D40]"
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#F7B500] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <Link
                href="/contact"
                className="bg-[#0B1D40] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#0a1838] transition-colors duration-300 shadow-lg hover:shadow-xl border border-[#0B1D40]"
              >
                Get Connected
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-6 bg-[#0B1D40] transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#0B1D40] transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#0B1D40] transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {links.map(({ href, label, highlight }) => {
                  const active = pathname === href;
                  
                  if (highlight) {
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#F7B500] to-[#e6a500] rounded-lg hover:from-[#e6a500] hover:to-[#d69900] transition-all duration-300 mx-4 text-center shadow-lg"
                      >
                        {label}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                        active
                          ? "bg-[#F7B500]/10 text-[#0B1D40] border-l-4 border-[#F7B500]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#0B1D40]"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div className="pt-2 px-4">
                  <Link
                    href="/contact"
                    className="block w-full bg-[#0B1D40] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#0a1838] transition-colors duration-300"
                  >
                    Get Connected
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}