import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Generate image using Cloudflare Workers AI
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: "text, words, letters, typography, writing, captions, labels, watermarks, ugly, low quality, blurry",
          num_steps: 20,
          guidance: 7.5,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudflare AI request failed: ${errorText}`);
    }

    // Cloudflare Workers AI returns binary image data
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Check if it's a rate limit or quota error
    if (errorMessage.includes("free monthly usage limit") || errorMessage.includes("quota")) {
      return NextResponse.json({ 
        error: "Monthly usage limit reached", 
        details: "The free tier limit for image generation has been reached. Please try again next month or upgrade to PRO for more usage.",
        isQuotaError: true
      }, { status: 429 });
    }
    
    return NextResponse.json({ 
      error: "Image generation failed", 
      details: errorMessage 
    }, { status: 500 });
  }
}
