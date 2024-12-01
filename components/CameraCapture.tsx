"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);

      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onCapture(file);
        }
        stream.getTracks().forEach((track) => track.stop());
      }, "image/jpeg");
    } catch (error) {
      console.error("Camera capture failed:", error);
      alert(
        "Failed to access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  return (
    <Button
      onClick={handleCameraCapture}
      className="bg-[#4dd193] hover:bg-[#3ba875] text-black mt-4"
    >
      Take Photo
    </Button>
  );
};

export default CameraCapture;
