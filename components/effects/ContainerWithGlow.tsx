"use client";

import { useState, useEffect } from "react";
import { GlowingCircle } from "./GlowingCircle";

interface ContainerWithGlowProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  offset?: number;
  opacity?: number;
  blur?: string;
}

export function ContainerWithGlow({
  children,
  className = "",
  size = 500,
  offset = 250,
  opacity = 0.2,
  blur = "blur-3xl",
}: ContainerWithGlowProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <GlowingCircle
        mousePosition={mousePosition}
        size={size}
        offset={offset}
        opacity={opacity}
        blur={blur}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
