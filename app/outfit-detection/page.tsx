"use client";
import React, { useState } from "react";
import CameraInput from "@/components/outfitDetection/CameraInput";
import OutfitDetector from "@/components/outfitDetection/OutfitDetector";

interface CameraInputProps {
  onImageUpload: (img: HTMLImageElement) => void;
}

const OutfitDetectionPage: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return (
    <div className="mt-56 mx-auto">
      <h1>Outfit Detection</h1>
      {!image && <CameraInput onImageUpload={(img) => setImage(img)} />}
      {image && <OutfitDetector image={image} />}
    </div>
  );
};

export default OutfitDetectionPage;
