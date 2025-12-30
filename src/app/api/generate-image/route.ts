import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, theme, colorScheme, themeColor } = await req.json();

    // Generate prompt based on theme with theme color influence
    let fullPrompt: string;
    const colorHint = themeColor ? ` Subtle color accents inspired by ${themeColor}.` : "";
    
    if (theme?.toLowerCase() === 'light') {
      fullPrompt = `High-key minimalist single color editorial poster background inspired by the theme: ${prompt}.${colorHint}
Predominantly white background.
Large empty negative white space covering most of the canvas.
A small, quiet illustration or scenic silhouette near the bottom of the image, softly blended into the background, low contrast, slightly foggy and desaturated.
Peaceful, airy, and elegant composition.
No text, no writing, no typography, no numbers, no symbols, no logos, no watermarks.
${colorScheme}`;
    } else if (theme?.toLowerCase() === 'dark') {
      fullPrompt = `Dark minimalist single color editorial poster background inspired by the theme: ${prompt}.${colorHint}
Deep charcoal, black, or dark grey background with soft gradients and subtle fog or smoke texture.
Large empty negative space dominating the frame.
A small, muted illustration or scene near the bottom or corner, softly blended into the darkness, low contrast, atmospheric, and slightly blurred.
Cinematic, calm, and introspective mood.
No text, no words, no typography, no numbers, no symbols, no logos, no watermarks.
${colorScheme}`;
    } else {
      fullPrompt = `Minimalist single color editorial poster background inspired by the theme: ${prompt}.${colorHint}
Clean, spacious composition with large empty negative space dominating the design.
Plain background with very soft gradients or subtle fog, smoke, or blur texture.
A small, understated illustration or photographic element placed near the bottom or edge of the frame, occupying no more than 20–30% of the canvas.
The illustration should be softly faded, low contrast, partially blended into the background color, and slightly misty or desaturated.
Calm, poetic, and atmospheric mood.
No text, no letters, no words, no typography, no numbers, no symbols, no logos, no watermarks.
Designed strictly as a background for overlaying text later.`;
    }

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
          prompt: fullPrompt,
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
