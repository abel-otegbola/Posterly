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
      inputs: `Minimalist editorial poster background inspired by the theme: ${prompt}.
              Clean, spacious composition with large empty negative space dominating the design.
              Plain background with very soft gradients or subtle fog, smoke, or blur texture.
              A small, understated image or photographic element placed near the bottom or edge of the frame, occupying no more than 40–50% of the canvas.
              The image should be softly faded, low contrast, partially blended into the background color, and slightly misty or desaturated.
              Calm, poetic, and atmospheric mood.
              No text, no letters, no words, no typography, no numbers, no symbols, no logos, no watermarks.
              Designed strictly as a background for overlaying text later. ${colorScheme}. Style: ${theme}.`,
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
