"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WaitlistDialog } from "@/components/dialogs/WaitlistDialog";

export function CTASection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center bg-[#345635]/10 backdrop-blur-lg rounded-3xl p-12 border border-[#345635]/20 shadow-[0_0_15px_rgba(52,86,53,0.2)]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#4dd193] via-purple-500 to-[#4dd193] bg-[length:200%_100%] animate-gradient text-transparent bg-clip-text">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-[#AEC3B0] mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their daily outfit
            selection with Outfit Genius
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-white text-[#0D2B1D] hover:bg-[#E3EFD3] px-8 py-6 rounded-lg text-lg"
          >
            Start Free Trial
          </Button>
        </motion.div>
      </div>

      <WaitlistDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
