"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  if (!mounted) {
    return null; // or a loading state
  }

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    initialX:
      Math.random() *
      (typeof window !== "undefined" ? window.innerWidth : 1000),
    initialY:
      Math.random() *
      (typeof window !== "undefined" ? window.innerHeight : 1000),
    destinationX:
      Math.random() *
      (typeof window !== "undefined" ? window.innerWidth : 1000),
    destinationY:
      Math.random() *
      (typeof window !== "undefined" ? window.innerHeight : 1000),
  }));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#4dd193_0%,_transparent_50%)]"
        />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              x: particle.initialX,
              y: particle.initialY,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: particle.destinationX,
              y: particle.destinationY,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-[#4dd193] via-purple-500 to-[#4dd193] bg-[length:200%_100%] animate-gradient text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
            Oops! Looks like you&apos;ve ventured into uncharted territory
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Don&apos;t worry, we&apos;ll get you back on track. Redirecting to
            home in a few seconds...
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#4dd193] to-purple-500 group">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Home Page
              </Button>
            </Link>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-gradient-to-r from-[#4dd193] to-purple-500 mt-8 rounded-full max-w-xs mx-auto"
          />
          <p className="text-sm text-gray-400 mt-2">
            Redirecting in 5 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
