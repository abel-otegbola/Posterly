import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(
      `You are a professional poster designer and copywriter. Generate compelling poster text content AND matching typography styles based on this prompt: "${prompt}".
      
      Return a JSON object with the following structure:
        {
          "headline": "A catchy, attention-grabbing headline (max 50 characters)",
          "subheadline": "A supporting tagline or subheadline (max 80 characters)",
          "bodyText": "Brief description or call-to-action (max 150 characters)",
          "additionalInfo": "Optional details like date, time, or location (max 100 characters)"
        }   
      Make it professional, engaging, and visually cohesive. Return ONLY the JSON object, no additional text or markdown.`
    );

    const response = await result.response;
    const textContent = response.text();
    
    console.log("Generated text:", textContent);
    
    // Clean up the response to ensure it's valid JSON
    let cleanedText = textContent.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    console.log("Cleaned text:", cleanedText);

    const posterText = JSON.parse(cleanedText);
    
    console.log("Parsed poster text:", posterText);

    return NextResponse.json({
      success: true,
      texts: posterText,
    });
  } catch (error) {
    console.error("Text generation error:", error);
    return NextResponse.json(
      {
        error: "Text generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
