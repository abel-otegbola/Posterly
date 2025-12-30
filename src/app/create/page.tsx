'use client'
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/dropdown";
import TextEditor from "@/components/text-editor/TextEditor";
import { StarFourIcon, StorefrontIcon, ConfettiIcon, RocketLaunchIcon, HeartIcon, SpinnerIcon } from "@phosphor-icons/react";
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
    const [themeColor, setThemeColor] = useState<string | null>(null);
    
    // Generate theme color based on color scheme and theme
    const generateThemeColor = (): string => {
        const colorPalettes: Record<string, string[]> = {
            "Vibrant & Colorful": ["#000000", "#333333"],
            "Soft Pastel": ["#F5F5F5", "#E0E0E0"],
            "Monochrome": ["#000000", "#FFFFFF"],
            "Warm Tones": ["#666666", "#999999"],
            "Cool Tones": ["#808080", "#CCCCCC"],
            "Neon & Bright": ["#FFFFFF", "#000000"],
            "Earthy & Natural": ["#8B8B8B", "#A9A9A9"],
            "Luxury Gold/Silver": ["#D3D3D3", "#C0C0C0"]
        };

        const palette = colorPalettes[colorScheme] || colorPalettes["Vibrant & Colorful"];
        return palette[Math.floor(Math.random() * palette.length)];
    };
    
    const buildEnhancedPrompt = () => {
        return `${prompt}. Theme: ${theme}, Text style: ${textStyle}, Color scheme: ${colorScheme}`;
    };
    
    const fetchImage = async () => {
        setLoading(true);
        const generatedThemeColor = generateThemeColor();
        setThemeColor(generatedThemeColor);
        
        const res = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                prompt: buildEnhancedPrompt(), 
                theme,
                colorScheme,
                themeColor: generatedThemeColor 
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
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-50">
            {backgroundImage ? 
                <TextEditor 
                    backgroundImage={backgroundImage}
                    initialTexts={posterTexts || undefined}
                    initialPrompt={buildEnhancedPrompt()}
                    themeColor={themeColor || undefined}
                    onClose={handleNewPoster}
                    onRegenerateBackground={handleRegenerateBackground}
                />
            :

            <div className="flex flex-col">
                <h1 className="bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Hi there,</h1>
                <h1 className="bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Ready to create your poster?</h1>
                <p className="my-4">Use one of the most common prompts below or type your own to begin.</p>

                {/* previous prompts */}
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 mb-4">
                    { 
                    [
                        { text: "Promote our grand opening with exclusive discounts", icon: <StorefrontIcon /> },
                        { text: "Celebrate summer festival with vibrant colors", icon: <ConfettiIcon /> },
                        { text: "Announce our new product launch to customers", icon: <RocketLaunchIcon /> },
                        { text: "Support our charity event for a good cause", icon: <HeartIcon /> },
                    ].map((prompt, index) => (
                        <button 
                            key={index} 
                            className="md:max-w-[200px] flex md:gap-[60px] gap-[30px] flex-col justify-between rounded-[12px] border border-gray-500/[0.2] p-4 cursor-pointer hover:shadow-lg bg-white"
                            onClick={() => setPrompt(prompt.text)}
                        > 
                            <p className="text-[12px] text-start">{prompt.text}</p>
                            <p className="" >{prompt.icon}</p>
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
                    <div className="flex justify-between items-end">
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
                        <Button size="small" onClick={generatePoster} disabled={loading || loadingTexts}>
                            { (loading || loadingTexts) ? <SpinnerIcon className="animate-spin" /> : <><StarFourIcon /> Generate</> }
                        </Button>
                    </div>
                </div>
            </div>
            }
        </div>
)}