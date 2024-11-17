"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useRef } from "react";

const steps = [
  {
    step: 1,
    title: "Scan Your Clothes",
    description:
      "Take photos of your clothing items to build your digital wardrobe",
    image:
      "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    step: 2,
    title: "Organize Your Wardrobe",
    description: "Categorize and tag your items for better organization",
    image:
      "https://images.unsplash.com/photo-1662986788594-01dcf0af44bd?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    step: 3,
    title: "Get AI Suggestions",
    description: "Receive personalized outfit suggestions based on your style",
    image:
      "https://plus.unsplash.com/premium_photo-1683120972279-87efe2ba252f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2B1D] mb-4">
            How It Works
          </h2>
          <p className="text-[#6B8F71] max-w-2xl mx-auto">
            Get started with Outfit Genius in three simple steps
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ step, title, description, image }) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 * step, duration: 0.5 }}
              className="relative"
            >
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-[#345635] text-white rounded-full flex items-center justify-center text-xl font-bold z-10">
                  {step}
                </span>
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <div className="relative h-[250px] overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={step === 1}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-8 bg-[#AEC3B0]">
                  <h3 className="text-xl font-semibold text-[#0D2B1D] mb-2">
                    {title}
                  </h3>
                  <p className="text-[#345635]">{description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
