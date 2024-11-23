"use client";

import { useState } from "react";
import Link from "next/link";
import { User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/MobileNav";

const navItems = [
  { name: "Overview", href: "/" },
  { name: "Wardrobe", href: "#" },
  { name: "Suggestions", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center w-full px-4 fixed top-5 left-0 right-0 z-50">
      <nav className="bg-[#6B8F71]/10 backdrop-blur-sm text-white border border-gray-400 rounded-full w-full max-w-7xl mx-4 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <div className="flex items-center">
                  <span className="text-3xl font-extrabold text-[#6B8F71] tracking-tight">
                    OG
                    <span className="text-white text-2xl font-light tracking-wider ml-1">
                      outfit genius
                    </span>
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === "#") e.preventDefault();
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#345635]/50 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-[#345635]/50"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Log In
                  </Button>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <Button
                    variant="ghost"
                    className="ml-4 text-white hover:bg-[#345635]/50"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                </a>
              </div>
            </div>

            <MobileNav
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              navItems={navItems}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
