"use client";

import { useState, useEffect } from "react";
import { GlowingCircle } from "./GlowingCircle";

export function GlobalGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      <GlowingCircle
        mousePosition={mousePosition}
        size={300}
        offset={100}
        opacity={0.2}
        blur="blur-3xl"
      />
    </div>
  );
}
