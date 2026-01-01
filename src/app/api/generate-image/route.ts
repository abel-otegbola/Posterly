import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Initialize Google Generative AI with Gemini
    // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    
    // Use Imagen 3 model for image generation
    // const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

    // const result = await model.generateContent({
    //   contents: [{
    //     role: "user",
    //     parts: [{ text: prompt }]
    //   }],
    //   generationConfig: {
    //     temperature: 0.4,
    //     topP: 0.95,
    //     topK: 40,
    //     maxOutputTokens: 8192,
    //   }
    // });

    // const response = result.response;
    // const imageData = response.candidates?.[0]?.content?.parts?.[0];

    // if (!imageData) {
    //   throw new Error("No image generated");
    // }

    // Convert the image data to base64
    // let base64Image: string;
    
    // if ('inlineData' in imageData && imageData.inlineData?.data) {
    //   base64Image = imageData.inlineData.data;
    // } else {
    //   throw new Error("Invalid image format received");
    // }

    // return NextResponse.json({
    //   image: `data:image/png;base64,${base64Image}`,
    // });

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
    
    return NextResponse.json({ 
      error: "Image generation failed", 
      details: errorMessage 
    }, { status: 500 });
  }
}
