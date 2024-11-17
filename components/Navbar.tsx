"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Overview", href: "/" },
  { name: "Wardrobe", href: "/wardrobe" },
  { name: "Suggestions", href: "/suggestions" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const halfPageHeight = window.innerHeight / 2;
      setIsSticky(window.scrollY > halfPageHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-[#0D2B1D] text-white ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-[#6B8F71]">
                Outfit Genius
              </span>
            </Link>
          </div>

          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#345635] transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-[#345635]"
                >
                  <User className="h-5 w-5 mr-2" />
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="ml-4 bg-[#6B8F71] hover:bg-[#345635]">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#345635] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D2B1D] focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="md:hidden"
        id="mobile-menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#345635] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-[#345635]">
          <div className="flex items-center px-5">
            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#345635]"
              >
                <User className="h-5 w-5 mr-2" />
                Log In
              </Button>
            </Link>
          </div>
          <div className="mt-3 px-2">
            <Link href="/signup" className="w-full">
              <Button className="w-full bg-[#6B8F71] hover:bg-[#345635]">
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
