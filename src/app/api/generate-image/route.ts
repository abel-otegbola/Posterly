import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Generate a fallback gradient SVG
const generateFallbackGradient = (): string => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  ];
  
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  const colors = gradient.match(/#[0-9a-f]{6}/gi) || ["#667eea", "#764ba2"];
  
  const svg = `<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#grad)" />
  </svg>`;
    
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

/**
 * Helper to attempt generation with a specific model
 */
async function attemptImageGen(modelName: string, prompt: string) {
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const parts = response.candidates?.[0]?.content?.parts;
  
  const imagePart = parts?.find((part) => 'inlineData' in part && part.inlineData);

  if (imagePart && 'inlineData' in imagePart && imagePart.inlineData) {
    return {
      dataUrl: `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`,
      modelUsed: modelName
    };
  }
  throw new Error(`Model ${modelName} returned no image data`);
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // --- STEP 1: Attempt Gemini 3 (Nano Banana Pro) ---
    try {
      console.log("Attempting Gemini 3 Pro...");
      const result = await attemptImageGen("gemini-3-pro-image-preview", prompt);
      return NextResponse.json({ success: true, imageUrl: result.dataUrl, model: result.modelUsed });
    } catch (error) {
      console.warn("Gemini 3 failed or quota exceeded. Falling back to Gemini 2.5...", error);
      
      // --- STEP 2: Fallback to Gemini 2.5 (Nano Banana) ---
      try {
        const result = await attemptImageGen("gemini-2.5-flash-image", prompt);
        return NextResponse.json({ success: true, imageUrl: result.dataUrl, model: result.modelUsed });
      } catch (error) {
        // --- STEP 3: Final Fallback to SVG ---
        console.error("All AI models failed. Using SVG gradient.", error);
        return NextResponse.json({
          success: true,
          imageUrl: generateFallbackGradient(),
          isFallback: true,
          model: "svg-gradient"
        });
      }
    }
  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}