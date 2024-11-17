"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#345635]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-[#AEC3B0] mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their daily outfit
            selection with Outfit Genius
          </p>
          <Button className="bg-white text-[#0D2B1D] hover:bg-[#E3EFD3] px-8 py-6 rounded-lg text-lg">
            Start Free Trial
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
