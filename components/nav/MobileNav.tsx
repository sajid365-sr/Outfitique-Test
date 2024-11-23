"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: Array<{ name: string; href: string }>;
}

export function MobileNav({ isOpen, setIsOpen, navItems }: MobileNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <>
      <div className="-mr-2 flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-[#345635]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D2B1D]/50 focus:ring-white transition-colors duration-200"
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

      <motion.div
        ref={menuRef}
        className="md:hidden absolute top-20 left-0 right-0 mx-4"
        id="mobile-menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0 },
          closed: { opacity: 0, y: -20 },
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="bg-[#1A2E1F]/95 backdrop-blur-lg rounded-2xl shadow-xl border border-[#345635]/30 overflow-hidden">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href === "#") e.preventDefault();
                  setIsOpen(false);
                }}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-100 hover:bg-[#345635]/50 transition-all duration-200 hover:translate-x-1"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-4 border-t border-[#345635]/30">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="w-full block"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-[#345635]/50 rounded-xl py-6"
                >
                  <User className="h-5 w-5 mr-3" />
                  Log In
                </Button>
              </a>
              <a
                href="#"
                className="w-full block"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <Button className="w-full bg-[#6B8F71] hover:bg-[#345635] rounded-xl py-6 transition-all duration-200">
                  <UserPlus className="h-5 w-5 mr-3" />
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
