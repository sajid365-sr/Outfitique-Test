"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const productLinks = [
  { name: "Features", href: "#" },
  { name: "How it Works", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "FAQ", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Outfit Genius
            </h3>
            <p className="text-sm sm:text-base text-[#AEC3B0] mb-4">
              Your personal wardrobe assistant powered by AI
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#345635]/50 text-[#AEC3B0] hover:text-white"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-[#AEC3B0]">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-[#AEC3B0]">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-[#AEC3B0]">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-[#AEC3B0]">
            &copy; {new Date().getFullYear()} Outfit Genius. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
