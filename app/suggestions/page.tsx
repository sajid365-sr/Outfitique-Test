"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function SuggestionsPage() {
  const [outfits, setOutfits] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fetchOutfits = async () => {
    try {
      const response = await axios.get("/api/get-items");
      setOutfits(response.data);
    } catch (error) {
      console.error("Failed to fetch outfits:", error);
    }
  };

  const suggestOutfits = async (clothingItems: string[]) => {
    // Placeholder function: replace with actual logic to generate outfit suggestions
    return clothingItems.map((item, index) => ({
      title: `Outfit Suggestion ${index + 1}`,
      description: `This is a suggestion based on ${item}.`,
    }));
  };

  const generateOutfitSuggestions = async () => {
    const clothingItems = outfits.map((item) => item.category); // Assuming category holds the type of clothing
    const outfitSuggestions = await suggestOutfits(clothingItems);
    setSuggestions(outfitSuggestions);
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Outfit Suggestions</h1>
      <Button
        onClick={generateOutfitSuggestions}
        className="bg-[#4dd193] hover:bg-[#3ba875] text-black"
      >
        Generate AI Outfit
      </Button>

      <section className="mt-6">
        {suggestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-[#4dd193]">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-[#AEC3B0]">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No suggestions available. Please generate an outfit.</p>
        )}
      </section>
    </div>
  );
}
