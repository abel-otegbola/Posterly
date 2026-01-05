import { NextResponse } from "next/server";

// Note: This endpoint is now a proxy/placeholder
// Puter.js works client-side only, so image generation
// should be called directly from the browser
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Return instruction to use client-side generation
    return NextResponse.json({
      error: "Use client-side generation", 
      message: "Puter.js must be called from the browser. Use the client component instead.",
      prompt
    }, { status: 400 });
    
  } catch (error) {
    console.error("Image generation error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json({ 
      error: "Image generation failed", 
      details: errorMessage 
    }, { status: 500 });
  }
}
