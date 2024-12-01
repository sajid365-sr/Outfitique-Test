import React, { useRef } from "react";

const CameraInput: React.FC<{
  onImageUpload: (image: HTMLImageElement) => void;
}> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => onImageUpload(image);
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="hidden-label">
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden-input"
        title="Upload an image file"
      />
    </div>
  );
};

export default CameraInput;
