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
    const { prompt } = await req.json();

    // Parse prompt to determine visual style
    const lowerPrompt = prompt.toLowerCase();
    
    // Determine if it needs people, products, or abstract
    let visualStyle = "";
    
    if (lowerPrompt.includes("person") || lowerPrompt.includes("people") || 
        lowerPrompt.includes("portrait") || lowerPrompt.includes("professional headshot") ||
        lowerPrompt.includes("conference") || lowerPrompt.includes("speaker")) {
      visualStyle = "Professional portrait photography, single person or small group, natural pose, eye contact, warm expression, studio lighting, blurred background";
    } else if (lowerPrompt.includes("product") || lowerPrompt.includes("launch") || 
               lowerPrompt.includes("sale") || lowerPrompt.includes("discount")) {
      visualStyle = "Product photography setup, clean commercial aesthetic, attractive product display, professional lighting, minimal props, eye-catching arrangement";
    } else if (lowerPrompt.includes("event") || lowerPrompt.includes("festival") || 
               lowerPrompt.includes("party") || lowerPrompt.includes("celebration")) {
      visualStyle = "Vibrant event scene, dynamic atmosphere, energetic mood, colorful lighting, celebratory elements, engaging composition";
    } else if (lowerPrompt.includes("travel") || lowerPrompt.includes("destination") || 
               lowerPrompt.includes("tour") || lowerPrompt.includes("vacation")) {
      visualStyle = "Beautiful landscape or cityscape, scenic view, stunning destination, natural beauty, travel photography aesthetic";
    } else if (lowerPrompt.includes("food") || lowerPrompt.includes("restaurant") || 
               lowerPrompt.includes("dining") || lowerPrompt.includes("cuisine")) {
      visualStyle = "Appetizing food photography, delicious presentation, professional styling, warm colors, inviting atmosphere";
    } else if (lowerPrompt.includes("church") || lowerPrompt.includes("religious") || 
               lowerPrompt.includes("spiritual") || lowerPrompt.includes("worship")) {
      visualStyle = "Serene spiritual atmosphere, peaceful setting, soft natural lighting, calm and reverent mood, inspiring background";
    } else if (lowerPrompt.includes("corporate") || lowerPrompt.includes("business") || 
               lowerPrompt.includes("professional")) {
      visualStyle = "Modern corporate environment, professional business setting, clean lines, sophisticated aesthetic, contemporary office";
    } else {
      visualStyle = "Modern lifestyle photography, contemporary aesthetic, natural setting, professional composition, engaging visual elements";
    }

    // Generate image using HuggingFace Inference Client
    const image = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: `${visualStyle}. High-quality commercial photography style based on: ${prompt}. Clean, professional composition. Vibrant and eye-catching. NO text, letters, words, numbers, typography, captions, labels, or written content visible anywhere in the image.`,
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
