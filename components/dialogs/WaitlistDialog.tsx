"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WaitlistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ isOpen, onOpenChange }: WaitlistDialogProps) {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const { toast } = useToast();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/waitlist", { email });
      setIsAlreadyRegistered(data.message === "Email already registered");
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : "Failed to join waitlist",
      });
    }
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#0D2B1D]/80 border-[#345635] text-white backdrop-blur-md overflow-hidden rounded-lg  w-[90%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-purple-500/30 to-[#4dd193]/30 blur-2xl"
          animate={{
            x: mousePosition.x - 400,
            y: mousePosition.y - 400,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.5,
          }}
        />
        <DialogHeader>
          <DialogTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center space-y-2"
            >
              {!isSubmitted ? (
                <>
                  <span className="block bg-gradient-to-r from-[#4dd193] to-purple-500 bg-clip-text text-transparent text-2xl lg:text-3xl">
                    Something Extraordinary
                  </span>
                  <span className="block text-lg font-normal text-[#AEC3B0]">
                    is in the making
                  </span>
                </>
              ) : (
                <>
                  <span className="block bg-gradient-to-r from-[#4dd193] to-purple-500 bg-clip-text text-transparent">
                    {isAlreadyRegistered
                      ? "Welcome Back! 👋"
                      : "Welcome Aboard! 🎉"}
                  </span>
                  <span className="block text-lg font-normal text-[#AEC3B0]">
                    {isAlreadyRegistered
                      ? "You're already part of our community"
                      : "You're now on the exclusive list"}
                  </span>
                </>
              )}
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 relative z-10">
          {!isSubmitted ? (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#AEC3B0] mb-6 text-center"
              >
                Be among the first to experience the future of wardrobe
                management. Join our exclusive waitlist today!
              </motion.p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1A3D2A]/50 border-[#345635] text-white placeholder:text-[#AEC3B0]/50 backdrop-blur-sm"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4dd193] to-purple-500 text-white hover:opacity-90 relative overflow-hidden group"
                >
                  <span className="relative z-10">Join Waitlist</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-[#4dd193] opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {isAlreadyRegistered ? (
                <>
                  <p className="text-[#AEC3B0] mb-4">
                    We already have your email in our waitlist. We'll be in
                    touch soon with updates about our launch!
                  </p>
                  <p className="text-[#4dd193]">
                    Stay tuned for exciting news!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#AEC3B0] mb-4">
                    Thank you for joining our waitlist! We'll keep you updated
                    on our launch and exciting developments.
                  </p>
                  <p className="text-[#4dd193]">
                    Get ready to revolutionize your wardrobe experience!
                  </p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
