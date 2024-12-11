import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // Adjust the import based on your project structure

export async function GET() {
  try {
    const items = await prisma.item.findMany(); // Fetch all items from the database

    // Prepare data for the AI model
    const inputData = items.map((item) => ({
      imageUrl: item.imgUrl,
      category: item.category,
    }));

    // Integrate with AI model
    try {
      const response = await fetch("https://ai-model-api-url.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: inputData }),
      });

      if (!response.ok) throw new Error("AI model request failed");

      const suggestions = await response.json();
      return NextResponse.json(suggestions, { status: 200 });
    } catch (error) {
      console.error("Error integrating with AI model:", error);
      return NextResponse.json({ error: "Error" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
