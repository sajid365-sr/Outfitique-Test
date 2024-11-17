"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center text-white h-screen px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50 mix-blend-multiply"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your AI-Powered
            <span className="block text-[#E3EFD3]">Wardrobe Assistant</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#AEC3B0] max-w-2xl mx-auto">
            Transform your wardrobe experience with AI-powered outfit
            suggestions and smart organization
          </p>
          <Link href="/contact">
            <Button className="bg-[#6B8F71] hover:bg-[#345635] text-white px-8 py-6 rounded-lg text-lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
