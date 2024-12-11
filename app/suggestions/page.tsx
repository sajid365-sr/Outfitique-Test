"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("/api/suggestions"); // Adjust the API endpoint as needed
        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 sm:mt-32">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#4dd193]">
          Outfit Suggestions
        </h1>
        <p className="text-[#AEC3B0] max-w-2xl mx-auto text-lg">
          Here are some outfit suggestions based on your wardrobe.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-opacity-20 backdrop-blur-lg border border-[#4dd193] rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={suggestion.imgUrl}
              alt={suggestion.name}
              className="object-cover rounded-t-lg w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-[#4dd193] mb-1">
                {suggestion.name}
              </h3>
              <p className="text-sm text-[#AEC3B0]">{suggestion.category}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="text-center mt-8">
        <Button className="bg-[#4dd193] hover:bg-[#3ba875] text-black px-8 py-4 text-lg rounded-xl">
          Generate New Suggestions
        </Button>
      </div>
    </main>
  );
}
