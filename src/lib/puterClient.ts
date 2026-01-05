// Puter.js client-side image generation utility
import { GeneratedTexts } from "@/types/interfaces/editor";

// Puter SDK type definitions
interface PuterImageResponse {
  src: string;
}

interface PuterAI {
  txt2img(prompt: string, options: { model: string }): Promise<PuterImageResponse>;
  chat(prompt: string, options: { model: string }): Promise<string>;
}

interface PuterSDK {
  ai: PuterAI;
}

// Declare Puter on the window object for TypeScript
declare global {
  interface Window {
    puter?: PuterSDK;
  }
}

// Load Puter SDK dynamically
export const loadPuterSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.puter) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Puter SDK'));
    document.head.appendChild(script);
  });
};

// Generate image using Puter
export const generateImageWithPuter = async (
  prompt: string,
  model: 'gemini-2.5-flash-image-preview' | 'imagen-3' | 'dall-e-3' = 'gemini-2.5-flash-image-preview'
): Promise<string> => {
  try {
    // Ensure Puter is loaded
    await loadPuterSDK();

    if (!window.puter || !window.puter.ai) {
      throw new Error('Puter SDK not available');
    }

    // Generate image
    const img = await window.puter.ai.txt2img(prompt, { model });

    if (!img || !img.src) {
      throw new Error('No image generated');
    }

    return img.src; // Returns base64 data URL
  } catch (error) {
    console.error('Puter image generation error:', error);
    throw error;
  }
};

// Generate text with styles using Puter
export const generateTextWithPuter = async (
  prompt: string,
  model: string = 'gemini-2.5-flash'
): Promise<GeneratedTexts> => {
  try {
    await loadPuterSDK();

    if (!window.puter || !window.puter.ai) {
      throw new Error('Puter SDK not available');
    }

    const systemPrompt = `You are a professional poster designer and copywriter. Generate compelling poster text content AND matching typography styles based on this prompt: "${prompt}".
      
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
      
      Make it professional, engaging, and visually cohesive. Return ONLY the JSON object, no additional text or markdown.`;

    const result = await window.puter.ai.chat(systemPrompt, { model });
    
    // Parse and clean the response
    let cleanedText = result.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Puter text generation error:', error);
    throw error;
  }
};
