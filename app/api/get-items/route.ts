import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust the import based on your project structure

export async function GET() {
  try {
    const items = await prisma.item.findMany(); // Fetch all items from the database
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
