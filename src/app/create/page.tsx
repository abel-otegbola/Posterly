'use client'
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/dropdown";
import TextEditor from "@/components/text-editor/TextEditor";
import { StarFourIcon, NewspaperIcon, LightningIcon, HeartIcon, SparkleIcon, SpinnerIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function CreatePosterPage() {
    const [prompt, setPrompt] = useState("");
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [posterTexts, setPosterTexts] = useState<{
        headline: string;
        subheadline: string;
        bodyText: string;
        additionalInfo: string;
    } | null>(null);
    const [theme, setTheme] = useState("Modern");
    const [textStyle, setTextStyle] = useState("Professional");
    const [colorScheme, setColorScheme] = useState("Vibrant & Colorful");
    const [loading, setLoading] = useState(false);
    const [loadingTexts, setLoadingTexts] = useState(false);
    const [template, setTemplate] = useState("Mininmal Editorial");
    
    const buildEnhancedPrompt = () => {
        const themeDirection = theme === "Dark" 
            ? "Extremely dark, deep black or charcoal background dominating 80-90% of the canvas with minimal lighting. Very dark tones throughout."
            : theme === "Light" 
            ? "Pure white or very light cream background dominating 80-90% of the canvas. Bright, airy, minimal shadows. Very light tones throughout."
            : "Clean, plain, solid color background with smooth gradients.";
        
        if (template === "Mininmal Editorial") {
            return `Photorealistic, ultra minimalist ${theme} editorial background for: ${prompt}. ${themeDirection} 70% plain empty background, 30% realistic beautiful professional person perfectly matching ${prompt}, positioned at right or left edge or corner. Subject must blend seamlessly into plain background using soft natural fade, atmospheric depth, or gentle blur - no harsh edges. Plain background only - absolutely no decorative elements, patterns, textures, or objects. Maximum empty space. Professional photography style. Hyper-realistic, natural lighting, smooth color transitions. No text, no letters, no words, no typography, no numbers, no symbols, no logos, no signage, no watermarks, no graphic elements.`;
        } else if (template === "Bold Modern") {
            return `Photorealistic modern bold ${theme} background for: ${prompt}. ${themeDirection} 70% plain empty background, 30% realistic subject representing the theme. Subject compact, placed at edge or corner with vast plain empty space. Subject blends naturally into plain background with professional lighting. Plain solid background only - no decorative elements, patterns, or extra objects. Modern, clean, realistic photography. Dramatic realistic lighting, natural color blending. No text, no letters, no words, no typography, no numbers, no symbols, no logos, no signage, no watermarks, no graphic elements.`;
        } else if (template === "Soft Lifestyle") {
            return `Photorealistic soft lifestyle ${theme} background for: ${prompt}. ${themeDirection} 80% plain empty background, 20% realistic natural subject subtly representing theme. Subject very small, at bottom or far edge with massive plain empty space. Subject blends seamlessly into plain background using natural soft focus and depth of field - no harsh separation. Plain background only - no decorative elements, patterns, textures, or objects. Lifestyle photography, hyper-realistic. Natural soft daylight, smooth realistic blending. No text, no letters, no words, no typography, no numbers, no symbols, no logos, no signage, no watermarks, no graphic elements.`;
        } else if (template === "Conceptual/Abstract") {
            return `Photorealistic conceptual ${theme} background for: ${prompt}. ${themeDirection} 85% plain empty background, 15% realistic symbolic element barely visible. Minimal realistic subject heavily blended into vast plain empty space using natural atmospheric effects. Plain background only - no decorative elements, patterns, textures, or extra objects. Photographic, realistic, meditative. Natural experimental lighting, realistic soft blending. No text, no letters, no words, no typography, no numbers, no symbols, no logos, no signage, no watermarks, no graphic elements.`;
        } else {
            return prompt;
        }
    };
    
    const fetchImage = async () => {
        setLoading(true);
        
        const res = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                prompt: buildEnhancedPrompt(), 
                theme,
                colorScheme,
            }),
        });

        const data = await res.json();
        console.log(data);
        setBackgroundImage(data.image);
        setLoading(false);
    }

    const fetchTexts = async () => {
        setLoadingTexts(true);
        const res = await fetch("/api/generate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: buildEnhancedPrompt(), theme, colorScheme }),
        });

        const data = await res.json();
        if (data.success) {
            setPosterTexts(data.texts);
        }
        setLoadingTexts(false);
    }

    const generatePoster = async () => {
        await Promise.all([fetchImage(), fetchTexts()]);
    }

    const handleNewPoster = () => {
        setBackgroundImage(null);
        setPosterTexts(null);
    }

    const handleRegenerateBackground = async (customPrompt: string) => {
        const res = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: customPrompt || buildEnhancedPrompt() }),
        });

        const data = await res.json();
        if (data.image) {
            setBackgroundImage(data.image);
        }
    }

    return (
        <div className="min-h-screen flex flex-col gap-6 bg-gray-50">
            {backgroundImage ? 
                <TextEditor 
                    backgroundImage={backgroundImage}
                    initialTexts={posterTexts || undefined}
                    initialPrompt={buildEnhancedPrompt()}
                    onClose={handleNewPoster}
                    onRegenerateBackground={handleRegenerateBackground}
                />
            :
            <div className="flex p-4 items-center justify-center h-screen">

                <div className="flex flex-col">
                    <h1 className="bg-gradient-to-r from-black via-primary to-[#D9EF34] bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Hi there,</h1>
                    <h1 className="bg-gradient-to-r from-black via-primary to-[#D9EF34] bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Ready to create your poster?</h1>
                    <p className="my-4">Select one of the template below and add the poster text to start creating</p>

                    {/* poster templates */}
                    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 mb-4">
                        { 
                        [
                            { name: "Mininmal Editorial", icon: <NewspaperIcon />, description: "Best for: Brands, announcements, quotes, tech, exhibitions" },
                            { name: "Bold Modern", icon: <LightningIcon />, description: "Best for: Events, sales, promotions, music, nightlife" },
                            { name: "Soft Lifestyle", icon: <HeartIcon />, description: "Best for: Wellness, beauty, lifestyle, fashion, health" },
                            { name: "Conceptual/Abstract", icon: <SparkleIcon />, description: "Best for: Art, creativity, abstract concepts, ideas" },
                        ].map((element, index) => (
                            <button 
                                key={index} 
                                className={`md:max-w-[200px] sm:min-w-[180px] flex md:gap-[60px] gap-[30px] flex-col justify-between rounded-[12px] border border-gray-500/[0.2] p-4 cursor-pointer hover:shadow-lg bg-white duration-300 ${element.name === template ? "border-primary shadow-md text-primary" : ""}`}
                                onClick={() => setTemplate(element.name)}
                                title={element.description}
                            > 
                                <p className="text-[12px] text-start">{element.name}</p>
                                <p className="" >{element.icon}</p>
                            </button>
                        ))}
                    </div>

                    

                    <div className="flex flex-col gap-2 p-2 rounded-[12px] border border-gray-500/[0.2] w-full bg-white">
                        <textarea 
                            placeholder="Enter poster text" 
                            className="border-none h-[120px] outline-none p-2 rounded w-full"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                        <div className="flex flex-wrap gap-4 justify-between items-end">
                            {/* Customization Options */}
                            <div className="grid grid-cols-3 gap-2">
                                <Dropdown
                                    value={theme}
                                    onChange={(value) => setTheme(value)}
                                    options={[
                                        { id: 1, title: "Modern" },
                                        { id: 2, title: "Dark" },
                                        { id: 3, title: "Light" },
                                        { id: 4, title: "Halloween" },
                                        { id: 5, title: "Christmas" },
                                        { id: 6, title: "Holiday" },
                                        { id: 7, title: "Travel" },
                                        { id: 8, title: "Vintage" },
                                        { id: 9, title: "Minimalist" },
                                        { id: 10, title: "Corporate" }
                                    ]}
                                />

                                <Dropdown
                                    value={textStyle}
                                    onChange={(value) => setTextStyle(value)}
                                    options={[
                                        { id: 1, title: "Professional" },
                                        { id: 2, title: "Playful" },
                                        { id: 3, title: "Church/Religious" },
                                        { id: 4, title: "Casual" },
                                        { id: 5, title: "Formal" },
                                        { id: 6, title: "Bold & Energetic" },
                                        { id: 7, title: "Elegant" },
                                        { id: 8, title: "Friendly" }
                                    ]}
                                />

                                <Dropdown
                                    value={colorScheme}
                                    onChange={(value) => setColorScheme(value)}
                                    options={[
                                        { id: 1, title: "Vibrant & Colorful" },
                                        { id: 2, title: "Soft Pastel" },
                                        { id: 3, title: "Monochrome" },
                                        { id: 4, title: "Warm Tones" },
                                        { id: 5, title: "Cool Tones" },
                                        { id: 6, title: "Neon & Bright" },
                                        { id: 7, title: "Earthy & Natural" },
                                        { id: 8, title: "Luxury Gold/Silver" }
                                    ]}
                                />
                            </div>
                            
                            <div className="relative sm:w-auto w-full">
                                <div className="absolute dark:top-[5%] top-[5%] left-[1%] w-[98%] dark:h-[90%] h-[90%] z-[-1] btn-bg p-2 backdrop-blur-[15px] rounded-[12px] bg-opacity-80 ">
                                </div>
                                <Button className="sm:w-auto w-full z-[2]" onClick={generatePoster} disabled={loading || loadingTexts}>
                                    { (loading || loadingTexts) ? <SpinnerIcon className="animate-spin" /> : <><StarFourIcon /> Generate</> }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
)}