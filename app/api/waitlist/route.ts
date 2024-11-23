import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = waitlistSchema.parse(body);

    // Check if email already exists
    const existingSubscriber = await prisma.waitlistSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 }
      );
    }

    // Create new waitlist subscriber
    const subscriber = await prisma.waitlistSubscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Successfully joined waitlist", subscriber },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
