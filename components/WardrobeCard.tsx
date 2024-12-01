"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Check, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AlertDialogComponent from "@/components/AlertDialogComponent";
import { useState } from "react";

interface WardrobeCardProps {
  item: any;
  onDelete: (id: string) => void;
  onEdit: (id: string, category: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const WardrobeCard: React.FC<WardrobeCardProps> = ({
  item,
  onDelete,
  onEdit,
  isSelected,
  onToggleSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Card className="bg-[#1a1a1a] border border-[#345635] overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <div
            className="absolute top-2 left-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect(item.id);
            }}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-[#4dd193] border-[#4dd193]"
                  : "border-white bg-transparent hover:border-[#4dd193]"
              }`}
            >
              {isSelected && <Check className="w-4 h-4 text-black" />}
            </div>
          </div>
          <Image
            src={item.file}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <AlertDialogComponent
              title="Edit Category"
              description="Choose a new category for this item"
              onConfirm={() => onEdit(item.id, selectedCategory)}
            >
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Edit2 className="w-5 h-5" />
              </Button>
            </AlertDialogComponent>
            <AlertDialogComponent
              title="Delete Item"
              description="Are you sure you want to delete this item? This action cannot be undone."
              onConfirm={() => onDelete(item.id)}
            >
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </AlertDialogComponent>
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
  );
};

export default WardrobeCard;
