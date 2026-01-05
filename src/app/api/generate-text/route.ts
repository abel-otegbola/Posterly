import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      `You are a professional poster designer and copywriter. Generate compelling poster text content AND matching typography styles based on this prompt: "${prompt}".
      
      Return a JSON object with the following structure:
      {
        "content": {
          "headline": "A catchy, attention-grabbing headline (max 50 characters)",
          "subheadline": "A supporting tagline or subheadline (max 80 characters)",
          "bodyText": "Brief description or call-to-action (max 150 characters)",
          "additionalInfo": "Optional details like date, time, or location (max 100 characters)"
        },
        "styles": {
          "headline": {
            "fontSize": 48,
            "color": "#000000",
            "fontFamily": "Arial, sans-serif",
            "fontWeight": "bold",
            "textTransform": "uppercase",
            "letterSpacing": "0.05em"
          },
          "subheadline": {
            "fontSize": 24,
            "color": "#333333",
            "fontFamily": "Arial, sans-serif",
            "fontWeight": "normal",
            "textTransform": "none",
            "letterSpacing": "0.02em"
          },
          "bodyText": {
            "fontSize": 18,
            "color": "#555555",
            "fontFamily": "Arial, sans-serif",
            "fontWeight": "normal",
            "textTransform": "none",
            "letterSpacing": "0em"
          },
          "additionalInfo": {
            "fontSize": 14,
            "color": "#777777",
            "fontFamily": "Arial, sans-serif",
            "fontWeight": "normal",
            "textTransform": "none",
            "letterSpacing": "0em"
          }
        }
      }
      
      Choose typography styles that match the theme and mood of the prompt. Consider:
      - Font sizes should create clear hierarchy (headline largest, additionalInfo smallest)
      - Colors should complement each other and match the prompt's theme
      - Font families: use "Georgia, serif" for elegant/formal, "Arial, sans-serif" for modern/clean, "Courier, monospace" for tech/minimal, "Impact, sans-serif" for bold/dramatic
      - Font weights: bold for emphasis, normal for readability
      - Text transform: uppercase for impact, capitalize for titles, none for natural reading
      - Letter spacing: wider (0.05-0.1em) for headlines, tighter for body text
      
      Make it professional, engaging, and visually cohesive. Return ONLY the JSON object, no additional text or markdown.`
    );

    const response = await result.response;
    const textContent = response.text();
    
    // Clean up the response to ensure it's valid JSON
    let cleanedText = textContent.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    const posterText = JSON.parse(cleanedText);

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
