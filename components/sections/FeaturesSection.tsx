"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Camera, Sparkles, Shirt, Clock } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Easy Scanning",
    description:
      "Quickly digitize your wardrobe with our smart scanning technology",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get personalized outfit recommendations based on your style",
  },
  {
    icon: Shirt,
    title: "Virtual Closet",
    description: "Organize and manage your clothing collection effortlessly",
  },
  {
    icon: Clock,
    title: "Time Saving",
    description: "Save time deciding what to wear with smart suggestions",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4dd193] via-purple-500 to-[#4dd193] bg-[length:200%_100%] animate-gradient text-transparent bg-clip-text">
            Revolutionize Your Daily Style
          </h2>
          <p className="text-[#e1fae3] max-w-2xl mx-auto">
            Experience the perfect blend of AI technology and fashion expertise
            to elevate your wardrobe management
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#345635]/10 backdrop-blur-md border border-[#345635]/20"
            >
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-[#4dd193] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#AEC3B0]">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
