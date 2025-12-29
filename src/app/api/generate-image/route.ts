import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

// Create client with custom fetch that has a longer timeout
const client = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN, {
  fetch: (url, init) => {
    return fetch(url, {
      ...init,
      signal: AbortSignal.timeout(60000), // 60 second timeout
    });
  },
});

export async function POST(req: Request) {
  try {
    const { prompt, theme, colorScheme } = await req.json();

    // Generate image using HuggingFace Inference Client
    const image = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: `Minimal atmospheric background inspired by the theme: ${prompt}. Soft, monochromatic architectural or scenic silhouette barely visible through fog and mist. High-key lighting, washed-out tones, smooth blur, dreamy cloudy atmosphere. Very subtle details only. No text, no writing, no typography, no numbers, no symbols, no logos.. Color scheme: ${colorScheme}. Style: ${theme}.`,
      parameters: {
        negative_prompt: "text, words, letters, typography, writing, alphabet, numbers, symbols, captions, titles, labels, signs, messages, quotes, phrases, fonts, watermarks, logos, written content, inscriptions, banners, posters with text, billboards"
      }
    });

    // Convert blob to base64
    const imageBlob = image as unknown as Blob;
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json({ 
      error: "Image generation failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
