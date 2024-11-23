"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Shirt, Watch, Trash2, Edit2, Plus, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

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
      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Add to items state with metadata
      const newItems = validFiles.map((file) => ({
        id: Math.random().toString(36),
        name: file.name.split(".")[0],
        category: uploadCategory,
        file: file,
        tags: [],
        attributes: {
          season: [],
          occasion: [],
          color: "",
        },
      }));

      setItems((prev) => [...prev, ...newItems]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) await processFiles(files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) await processFiles(files);
  };

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

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          await processFiles([file]);
        }

        // Stop camera stream
        stream.getTracks().forEach((track) => track.stop());
      }, "image/jpeg");
    } catch (error) {
      console.error("Camera capture failed:", error);
      alert(
        "Failed to access camera. Please make sure you have granted camera permissions."
      );
    }
  };

  const handleDelete = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleBulkDelete = () => {
    setItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

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

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

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
            <Button
              className="bg-[#4dd193] hover:bg-[#3ba875] text-black"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={!uploadCategory}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
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
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png,image/*;capture=camera"
            className="hidden"
            onChange={handleFileInput}
            multiple
            aria-label="File upload input"
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
                onClick={() => document.getElementById("file-upload")?.click()}
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
              onClick={() => setSelectedCategory(category)}
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
              <Card className="bg-[#1a1a1a] border border-[#345635] overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <div
                      className="absolute top-2 left-2 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemSelection(item.id);
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer
                        ${
                          selectedItems.includes(item.id)
                            ? "bg-[#4dd193] border-[#4dd193]"
                            : "border-white bg-transparent hover:border-[#4dd193]"
                        }`}
                      >
                        {selectedItems.includes(item.id) && (
                          <Check className="w-4 h-4 text-black" />
                        )}
                      </div>
                    </div>
                    <Image
                      src={URL.createObjectURL(item.file)}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                          >
                            <Edit2 className="w-5 h-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1a1a1a] border border-[#345635]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Edit Category
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#AEC3B0]">
                              Choose a new category for this item
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <Select
                            onValueChange={(value) => {
                              setItems(
                                items.map((i) =>
                                  i.id === item.id
                                    ? { ...i, category: value }
                                    : i
                                )
                              );
                            }}
                          >
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
                            <AlertDialogAction className="bg-[#4dd193] hover:bg-[#3ba875] text-black">
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1a1a1a] border border-[#345635]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Delete Item
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#AEC3B0]">
                              Are you sure you want to delete this item? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent text-white border-[#345635] hover:bg-[#345635]/20">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-[#4dd193] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#AEC3B0]">{item.category}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Link href="/suggestions">
          <Button
            className="bg-[#4dd193] hover:bg-[#3ba875] text-black px-8 py-6 text-lg rounded-xl"
            disabled={items.length === 0}
          >
            Generate Outfit Suggestions
          </Button>
        </Link>
      </section>
    </main>
  );
}
