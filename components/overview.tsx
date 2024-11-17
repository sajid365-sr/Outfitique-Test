"use client";

import { HeroSection } from "./sections/HeroSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { CTASection } from "./sections/CTASection";

export function OverviewComponent() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
