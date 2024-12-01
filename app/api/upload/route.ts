import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Named export for POST method
export async function POST(req: Request) {
  const { file } = await req.json(); // Assuming you're sending the file as base64

  try {
    const uploadResponse = await cloudinary.uploader.upload(file);
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
