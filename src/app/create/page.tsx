'use client'
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/dropdown";
import TextEditor from "@/components/text-editor/TextEditor";
import { StarFourIcon, HeartIcon, SparkleIcon, SpinnerIcon, ConfettiIcon, MapPinIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { GeneratedTexts } from "@/types/interfaces/editor";
import Input from "@/components/input/input";

export default function CreatePosterPage() {
    const [prompt, setPrompt] = useState("");
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [posterTexts, setPosterTexts] = useState<GeneratedTexts | null>(null);
    const [brandName, setBrandName] = useState("");
    const [brandLogo, setBrandLogo] = useState("");
    const [colorScheme, setColorScheme] = useState("Vibrant & Colorful");
    const [loading, setLoading] = useState(false);
    const [template, setTemplate] = useState("Mininmal Editorial");
    
    const buildEnhancedPrompt = () => {
        const NO_TEXT = "No text, no letters, no words, no typography, no numbers, no symbols, no logos, no signage, no watermarks, no graphic elements.";
        const QUALITY = "Photorealistic, ultra-high resolution, commercial photography style, cinematic lighting, 8k, sharp focus.";
        
        const colorMap: Record<string, string> = {
            "Light": "High-key lighting, bright airy white and cream tones, minimal shadows.",
            "Dark": "Low-key lighting, moody deep charcoal and black tones, dramatic shadows.",
            "Neutral": "Muted earth tones, beige and soft grey palette, balanced natural light.",
            "Warm Tones": "Golden hour glow, amber and terracotta hues, sun-drenched.",
            "Cool Tones": "Crisp blue and teal palette, clean winter light, refreshing.",
            "Neon & Bright": "Vibrant saturated colors, high-energy pop aesthetic, glowing accents.",
            "Earthy & Natural": "Organic greens and browns, forest light, soft natural textures.",
            "Luxury Gold/Silver": "Opulent metallic accents, reflective surfaces, premium polished finish."
        };

        const templateMap: Record<string, string> = {
            "Minimal Editorial": `Editorial composition for ${prompt}. 80% plain empty negative space, subject elegantly placed at the far edge, soft natural fade.`,
            "Bold Modern": `Modern bold composition for ${prompt}. Strong focal point, clean lines, vast solid background for copy space.`,
            "Soft Lifestyle": `Lifestyle photography for ${prompt}. Natural setting, soft focus, shallow depth of field, minimalist background.`,
            "Conceptual/Abstract": `Abstract conceptual art for ${prompt}. Symbolic elements, atmospheric depth, meditative and artistic.`,
            "Celebration": `Festive elegant background for ${prompt}. Clean celebratory aesthetic, sophisticated sparkles, wide open space.`,
            "Event": `Dynamic event backdrop for ${prompt}. Professional lighting, clean surfaces, massive room for text overlay.`,
            "Wellness": `Serene wellness aesthetic for ${prompt}. Spa-like tranquility, soft daylight, clean minimalist surfaces.`
        };

        const style = templateMap[template] || templateMap["Minimal Editorial"];
        const colors = colorMap[colorScheme] || colorMap["Neutral"];

        return `${style} ${colors} ${QUALITY} ${NO_TEXT}`.trim();
    };

    // --- API Interactions ---
    const fetchImage = async (customPrompt?: string) => {
        const res = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: customPrompt || buildEnhancedPrompt() }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.imageUrl;
    };

    const fetchTexts = async () => {
        const res = await fetch("/api/generate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: buildEnhancedPrompt(), brandName }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.texts;
    };

    const generatePoster = async () => {
        setLoading(true);
        try {
            const [imageUrl, texts] = await Promise.all([fetchImage(), fetchTexts()]);
            setBackgroundImage(imageUrl);
            setPosterTexts(texts);
        } catch (error) {
            console.error('Generation failed:', error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateBackground = async (customPrompt: string) => {
        setLoading(true);
        try {
            const imageUrl = await fetchImage(customPrompt);
            setBackgroundImage(imageUrl);
        } catch (error) {
            console.log('Background regeneration failed.', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-6 bg-gray-50">
            {backgroundImage ? 
                <TextEditor 
                    backgroundImage={backgroundImage}
                    initialTexts={posterTexts || undefined}
                    initialPrompt={buildEnhancedPrompt()}
                    onClose={() => setBackgroundImage(null)}
                    onRegenerateBackground={handleRegenerateBackground}
                />
            :
            <div className="flex p-4 items-center justify-center h-screen md:max-w-3xl mx-auto w-full">

                <div className="flex flex-col w-full">
                    <h1 className="bg-gradient-to-r from-black via-primary to-[#D9EF34] bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Hi there,</h1>
                    <h1 className="bg-gradient-to-r from-black via-primary to-[#D9EF34] bg-clip-text text-transparent 2xl:text-[32px] md:text-[28px] text-[20px] font-bold leading-[28px]">Ready to create your poster?</h1>
                    <p className="my-4">Select one of the template below and add the poster text to start creating</p>

                    <div className={`grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 mb-4`}>
                        { 
                        [
                            { name: "Celebration", icon: <ConfettiIcon/>, description: "Birthday, Milestones, Anniversaries" },
                            { name: "Event", icon: <MapPinIcon />, description: "Best for: Events, sales, promotions, music, nightlife" },
                            { name: "Wellness", icon: <HeartIcon />, description: "Best for: Wellness, beauty, lifestyle, fashion, health" },
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

                    

                    <div className={`flex flex-col gap-2 p-2 rounded-[12px] border border-gray-500/[0.2] w-full bg-white`}>
                        <textarea 
                            placeholder="Describe your poster idea here..." 
                            className="border-none h-[120px] outline-none p-2 rounded w-full"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                        
                    </div>
                    <div className="flex gap-4 sm:flex-row flex-col justify-between items-start mt-4">
                            {/* Customization Options */}
                            <div className="grid grid-cols-3 gap-2">
                                <Input
                                    className="h-[32px]"
                                    placeholder="Your Brand Name"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                />
                                <Input
                                    className="h-[32px]"
                                    placeholder="Your Brand Logo"
                                    value={brandLogo}
                                    onChange={(e) => setBrandLogo(e.target.value)}
                                />

                                <Dropdown
                                    value={colorScheme}
                                    placeholder="Choose Colour Scheme"
                                    onChange={(value) => setColorScheme(value)}
                                    options={[
                                        { id: 1, title: "Light", icon: <span className="h-4 w-4 bg-white rounded-full"></span> },
                                        { id: 2, title: "Dark", icon: <span className="h-4 w-4 bg-black rounded-full"></span> },
                                        { id: 3, title: "Neutral", icon: <span className="h-4 w-4 bg-gray-500 rounded-full"></span> },
                                        { id: 4, title: "Warm Tones", icon: <span className="h-4 w-4 bg-red-500 rounded-full"></span> },
                                        { id: 5, title: "Cool Tones", icon: <span className="h-4 w-4 bg-blue-500 rounded-full"></span> },
                                        { id: 6, title: "Neon & Bright", icon: <span className="h-4 w-4 bg-pink-500 rounded-full"></span> },
                                        { id: 7, title: "Earthy & Natural", icon: <span className="h-4 w-4 bg-green-500 rounded-full"></span> },
                                        { id: 8, title: "Luxury Gold/Silver", icon: <span className="h-4 w-4 bg-yellow-500 rounded-full"></span> },
                                    ]}
                                />
                            </div>
                            
                            <div className="relative sm:w-auto w-full">
                                <div className="absolute dark:top-[5%] top-[5%] left-[1%] w-[98%] dark:h-[90%] h-[90%] z-[1] btn-bg p-2 backdrop-blur-[15px] rounded-[12px] bg-opacity-80 ">
                                </div>
                                <Button className="relative sm:w-auto w-full z-[2] py-2" onClick={generatePoster} disabled={loading}>
                                    { (loading) ? <SpinnerIcon className="animate-spin" /> : <><StarFourIcon /> Generate</> }
                                </Button>
                            </div>
                        </div>
                </div>
            </div>
            }
        </div>
)}