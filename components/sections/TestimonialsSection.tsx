"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Fashion Blogger",
    content:
      "Outfit Genius has revolutionized my wardrobe! The AI suggestions are spot-on, and I've rediscovered so many forgotten pieces in my closet.",
    rating: 5,
  },
  {
    name: "Michael T.",
    role: "Business Professional",
    content:
      "As someone who struggles with fashion choices, this app has been a game-changer. I look more put-together than ever!",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "Student",
    content:
      "I love how easy it is to organize my clothes and get daily outfit ideas. It's like having a personal stylist in my pocket!",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D2B1D]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-[#AEC3B0] max-w-2xl mx-auto">
            Discover how Outfit Genius is transforming wardrobes and simplifying
            style decisions
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
            >
              <Card className="bg-white h-full flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#345635] mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-auto">
                    <p className="font-semibold text-[#0D2B1D]">
                      {testimonial.name}
                    </p>
                    <p className="text-[#6B8F71]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
