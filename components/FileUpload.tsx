"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface FileUploadProps {
  categories: { name: string; icon: any }[];
  onFilesUploaded: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  categories,
  onFilesUploaded,
}) => {
  const [uploadCategory, setUploadCategory] = useState("");

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesUploaded(files);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h2 className="text-2xl font-semibold text-[#4dd193] mb-4 sm:mb-0">
        Upload Items
      </h2>
      <div className="flex gap-2">
        <Select value={uploadCategory} onValueChange={setUploadCategory}>
          <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#345635] text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#345635]">
            {categories.map((category) => (
              <SelectItem
                key={category.name}
                value={category.name}
                className="text-white hover:bg-[#345635]/50"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="bg-[#4dd193] hover:bg-[#3ba875] text-black"
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={!uploadCategory}
        >
          Add Item
        </Button>
      </div>
      <input
        id="file-upload"
        type="file"
        accept=".jpg,.jpeg,.png,image/*;capture=camera"
        className="hidden"
        onChange={handleFileInput}
        multiple
        aria-label="File upload input"
      />
    </div>
  );
};

export default FileUpload;
