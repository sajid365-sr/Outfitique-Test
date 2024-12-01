import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust the import based on your project structure

export async function POST(req: Request) {
  const itemData = await req.json();

  try {
    const newItem = await prisma.item.create({
      data: itemData,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error saving item:", error);
    return NextResponse.json({ error: "Failed to save item" }, { status: 500 });
  }
}
