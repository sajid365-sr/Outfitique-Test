"use client";

import { motion } from "framer-motion";

interface GlowingCircleProps {
  mousePosition: { x: number; y: number };
  size?: number;
  offset?: number;
  opacity?: number;
  blur?: string;
}

export function GlowingCircle({
  mousePosition,
  size = 200,
  offset = 400,
  opacity = 0.3,
  blur = "blur-2xl",
}: GlowingCircleProps) {
  return (
    <motion.div
      className={`absolute hidden md:block rounded-full bg-gradient-to-r from-purple-500 to-[#4dd193] ${blur}`}
      style={{
        width: size,
        height: size,
        opacity: opacity,
      }}
      animate={{
        x: mousePosition.x - offset,
        y: mousePosition.y - offset,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      }}
    />
  );
}
