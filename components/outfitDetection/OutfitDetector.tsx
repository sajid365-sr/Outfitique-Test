import React, { useEffect, useState, useRef } from "react";
import { loadModel } from "@/utils/loadModel";
import "./OutfitDetector.css";

const OutfitDetector: React.FC<{ image: HTMLImageElement | null }> = ({
  image,
}) => {
  const [detections, setDetections] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const detectObjects = async () => {
      if (image) {
        const model = await loadModel();
        const predictions = await model.detect(image);

        setDetections(
          predictions.map((p) => ({ class: p.class, score: p.score }))
        );

        // Draw the image on the canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(image, 0, 0, image.width, image.height);
          }
        }
      }
    };

    detectObjects();
  }, [image]);

  return (
    <div className="mt-56">
      {image && (
        <canvas
          ref={canvasRef}
          id="detection-canvas"
          width={image.width}
          height={image.height}
          className="detection-canvas"
        />
      )}
      <ul>
        {detections?.map((detection, index) => (
          <li key={index}>
            Detected {detection.class} with {Math.round(detection.score * 100)}%
            confidence.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutfitDetector;
