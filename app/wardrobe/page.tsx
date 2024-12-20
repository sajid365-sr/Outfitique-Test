"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Shirt, Watch, Trash2, Edit2, Plus, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import axios from "axios";

const categories = [
  {
    name: "Tops",
    icon: Shirt,
    items: [],
  },
  {
    name: "Bottoms",
    icon: Shirt,
    items: [],
  },
  {
    name: "Outerwear",
    icon: Shirt,
    items: [],
  },
  {
    name: "Dresses",
    icon: Shirt,
    items: [],
  },
  {
    name: "Accessories",
    icon: Watch,
    items: [],
  },
  {
    name: "Footwear",
    icon: Shirt,
    items: [],
  },
];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadCategory, setUploadCategory] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkEditCategory, setBulkEditCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null); // New ref for camera input

  useEffect(() => {
    // Fetch items from the database when the component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/get-items");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  /* ====================================================================== */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /* ====================================================================== */
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  /* ====================================================================== */
  const processFiles = async (files: File[]) => {
    if (!uploadCategory) {
      alert("Please select a category first");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Only .jpg, .jpeg and .png files are allowed");
      return;
    }

    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadProgress(progress);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    setUploadProgress(0);

    try {
      const newItems: {
        id: string;
        name: string;
        category: string;
        imgUrl: string;
        tags: string[];
      }[] = [];

      for (const file of validFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64File = reader.result as string;

          // Send the file to the API route
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: base64File }),
          });

          const uploadResponse = await response.json();
          if (response.ok) {
            const newItem = {
              id: Math.random().toString(36),
              name: file.name.split(".")[0],
              category: uploadCategory,
              imgUrl: uploadResponse.url, // Use the URL returned from the API
              tags: [],
            };

            // Save to database
            await axios.post("/api/save-item", newItem);
            newItems.push(newItem);
            // Fetch updated items from the database after successful upload
            const updatedResponse = await axios.get("/api/get-items");
            setItems(updatedResponse.data);
          } else {
            console.error("Upload failed:", uploadResponse.error);
          }
        };
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  /* ====================================================================== */
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) await processFiles(files);
  };

  /* ====================================================================== */
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) await processFiles(files);
  };

  /* ====================================================================== */
  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click(); // Trigger the camera input
    }
  };

  /* ====================================================================== */
  const handleDelete = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  /* ====================================================================== */
  const handleBulkDelete = () => {
    setItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  /* ====================================================================== */
  const handleBulkEdit = () => {
    if (!bulkEditCategory) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        selectedItems.includes(item.id)
          ? { ...item, category: bulkEditCategory }
          : item
      )
    );
    setSelectedItems([]);
    setBulkEditCategory("");
  };

  /* ====================================================================== */
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  /* ====================================================================== */
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop the event from bubbling up
    setSelectedCategory(category);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 sm:mt-32">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4dd193] via-purple-500 to-[#4dd193] bg-[length:200%_100%] animate-gradient text-transparent bg-clip-text">
          My Wardrobe
        </h1>
        <p className="text-[#AEC3B0] max-w-2xl mx-auto text-lg">
          Upload and organize your clothing items to create personalized outfit
          suggestions
        </p>
      </section>

      <section className="mb-12 bg-[#1a1a1a] rounded-xl p-6">
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
          </div>
        </div>

        <div
          className={`border-dashed border-2 ${
            isDragging ? "border-[#4dd193]" : "border-[#345635]"
          } p-8 rounded-lg text-center transition-all duration-200 hover:border-[#4dd193]`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileInput}
            multiple
            aria-label="File upload input"
          />
          <input
            ref={cameraInputRef}
            id="camera-upload"
            type="file"
            accept="image/*;capture=camera"
            className="hidden"
            onChange={handleFileInput}
            multiple
            aria-label="Camera upload input"
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <Shirt className="w-12 h-12 text-[#4dd193]" />
            <div>
              <p className="text-[#AEC3B0] text-lg mb-2">
                Drag and drop your clothing images here
              </p>
              <p className="text-[#AEC3B0] text-sm">Supports: JPG, JPEG, PNG</p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#4dd193] hover:bg-[#3ba875] text-black mt-4"
                disabled={!uploadCategory}
              >
                Browse Files
              </Button>
              <Button
                onClick={handleCameraCapture}
                className="bg-[#4dd193] hover:bg-[#3ba875] text-black mt-4"
                disabled={!uploadCategory}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-6 w-full max-w-md mx-auto">
              <div className="w-full bg-[#345635]/20 rounded-full h-2">
                <div
                  className="bg-[#4dd193] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-[#AEC3B0] mt-2 text-sm">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#4dd193] mb-4 sm:mb-0">
            Your Wardrobe
          </h2>
          <input
            type="text"
            placeholder="Search items..."
            className="w-full sm:w-64 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#345635] text-white focus:outline-none focus:border-[#4dd193]"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["All", ...categories.map((cat) => cat.name)].map((category) => (
            <Button
              key={category}
              onClick={(e) => handleCategoryClick(category, e)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-[#4dd193] hover:bg-[#3ba875] text-black"
                  : "border-[#4dd193] text-[#4dd193] hover:bg-[#4dd193]/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div className="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#345635] flex items-center justify-between">
            <span className="text-[#AEC3B0]">
              {selectedItems.length} items selected
            </span>
            <div className="flex gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#4dd193] text-[#4dd193]"
                  >
                    Edit Category
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#1a1a1a] border border-[#345635]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Edit Categories
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#AEC3B0]">
                      Choose a new category for selected items
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Select onValueChange={setBulkEditCategory}>
                    <SelectTrigger className="bg-[#1a1a1a] border-[#345635] text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#345635]">
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.name}
                          value={cat.name}
                          className="text-white hover:bg-[#345635]/20"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent text-white border-[#345635] hover:bg-[#345635]/20">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleBulkEdit}
                      className="bg-[#4dd193] hover:bg-[#3ba875] text-black"
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500"
                  >
                    Delete Selected
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#1a1a1a] border border-[#345635]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Delete Items
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#AEC3B0]">
                      Are you sure you want to delete {selectedItems.length}{" "}
                      items? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent text-white border-[#345635] hover:bg-[#345635]/20">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-[#4dd193] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-[#4dd193] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#AEC3B0]">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* <div className="text-center">
        <Link href="/suggestions">
          <Button
            className="bg-[#4dd193] hover:bg-[#3ba875] text-black px-8 py-6 text-lg rounded-xl"
            disabled={items.length === 0}
          >
            Generate Outfit Suggestions
          </Button>
        </Link>
      </div> */}
    </main>
  );
}
