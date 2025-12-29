'use client'
import { EyeIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import PosterPreview from "./PosterPreview";

export interface TextStyle {
    content: string;
    fontSize: number;
    color: string;
    bgColor: string;
    x: number;
    y: number;
    width: string | number;
    fontWeight?: string;
    textTransform?: string;
    letterSpacing?: string;
}

interface PosterTemplate {
    name: string;
    description: string;
    styles: Omit<TextStyle, 'content'>[];
}

const POSTER_TEMPLATES: PosterTemplate[] = [
    {
        name: "Bold Impact",
        description: "Explosive diagonal energy",
        styles: [
            { fontSize: 56, color: "#FF0080", bgColor: "rgba(255, 0, 128, 0.15)", x: 15, y: 25, width: 75, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.04em" },
            { fontSize: 28, color: "#00FFD1", bgColor: "rgba(0, 0, 0, 0.8)", x: 280, y: 110, width: 50, fontWeight: "700", letterSpacing: "0.05em" },
            { fontSize: 18, color: "#FFD700", bgColor: "transparent", x: 35, y: 230, width: 65, fontWeight: "600", letterSpacing: "0.08em" },
            { fontSize: 14, color: "#ffffff", bgColor: "#FF0080", x: 320, y: 320, width: 35, fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.15em" }
        ]
    },
    {
        name: "Retro Wave",
        description: "80s neon vibes",
        styles: [
            { fontSize: 48, color: "#FF006E", bgColor: "transparent", x: 180, y: 40, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em" },
            { fontSize: 24, color: "#8338EC", bgColor: "rgba(255, 0, 110, 0.2)", x: 45, y: 120, width: 60, fontWeight: "700", letterSpacing: "0.2em" },
            { fontSize: 20, color: "#FFBE0B", bgColor: "rgba(131, 56, 236, 0.85)", x: 200, y: 200, width: 55, fontWeight: "600", letterSpacing: "0.03em" },
            { fontSize: 16, color: "#FB5607", bgColor: "transparent", x: 60, y: 300, width: 45, fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.18em" }
        ]
    },
    {
        name: "Brutalist Stack",
        description: "Raw, overlapping blocks",
        styles: [
            { fontSize: 50, color: "#000000", bgColor: "#FFFF00", x: 10, y: 60, width: 65, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.05em" },
            { fontSize: 26, color: "#ffffff", bgColor: "#FF0000", x: 220, y: 50, width: 55, fontWeight: "900", letterSpacing: "0em" },
            { fontSize: 18, color: "#000000", bgColor: "#00FF00", x: 30, y: 200, width: 70, fontWeight: "700", letterSpacing: "0.05em" },
            { fontSize: 15, color: "#FFFF00", bgColor: "#000000", x: 240, y: 280, width: 48, fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.12em" }
        ]
    },
    {
        name: "Gradient Flow",
        description: "Smooth color transitions",
        styles: [
            { fontSize: 52, color: "#6366F1", bgColor: "rgba(147, 51, 234, 0.12)", x: 25, y: 35, width: 80, fontWeight: "800", textTransform: "capitalize", letterSpacing: "-0.02em" },
            { fontSize: 22, color: "#EC4899", bgColor: "transparent", x: 200, y: 130, width: 50, fontWeight: "600", letterSpacing: "0.06em" },
            { fontSize: 19, color: "#14B8A6", bgColor: "rgba(236, 72, 153, 0.18)", x: 40, y: 220, width: 68, fontWeight: "500", letterSpacing: "0.02em" },
            { fontSize: 16, color: "#F59E0B", bgColor: "rgba(20, 184, 166, 0.2)", x: 210, y: 310, width: 42, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.14em" }
        ]
    },
    {
        name: "Glitch Chaos",
        description: "Digital distortion aesthetic",
        styles: [
            { fontSize: 54, color: "#00FF41", bgColor: "rgba(0, 0, 0, 0.9)", x: 50, y: 45, width: 72, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.08em" },
            { fontSize: 26, color: "#FF00FF", bgColor: "rgba(0, 255, 65, 0.15)", x: 15, y: 140, width: 58, fontWeight: "800", letterSpacing: "-0.01em" },
            { fontSize: 20, color: "#00FFFF", bgColor: "transparent", x: 250, y: 210, width: 48, fontWeight: "700", letterSpacing: "0.15em" },
            { fontSize: 14, color: "#000000", bgColor: "#00FF41", x: 30, y: 310, width: 52, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.22em" }
        ]
    }
];

interface TextEditorProps {
    backgroundImage: string;
    initialTexts?: {
        headline: string;
        subheadline: string;
        bodyText: string;
        additionalInfo: string;
    };
    initialPrompt?: string;
    onClose?: () => void;
    onRegenerateBackground?: (prompt: string) => Promise<void>;
}

export default function TextEditor({ backgroundImage, initialTexts, initialPrompt = "", onClose, onRegenerateBackground }: TextEditorProps) {
    const [currentTemplate, setCurrentTemplate] = useState(0);

    const getInitialTextStyles = (texts = initialTexts, templateIdx = currentTemplate) => {
        if (!texts) return [];
        const template = POSTER_TEMPLATES[templateIdx];
        const contents = [
            texts.headline,
            texts.subheadline,
            texts.bodyText,
            texts.additionalInfo
        ];
        return template.styles.map((style, index) => ({
            ...style,
            content: contents[index] || ""
        }));
    };

    const [textStyles, setTextStyles] = useState<TextStyle[]>(() => getInitialTextStyles());
    const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState("Texts");
    const [isRegenerating, setIsRegenerating] = useState(false);

    const applyTemplate = (templateIndex: number) => {
        if (!initialTexts) return;
        setTextStyles(getInitialTextStyles(initialTexts, templateIndex));
        setCurrentTemplate(templateIndex);
    };

    // Update text styles when initialTexts or currentTemplate changes
    useEffect(() => {
        if (initialTexts) {
            setTextStyles(getInitialTextStyles(initialTexts, currentTemplate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTexts, currentTemplate]);

    const updateTextStyle = (index: number, updates: Partial<TextStyle>) => {
        const newStyles = [...textStyles];
        newStyles[index] = { ...newStyles[index], ...updates };
        setTextStyles(newStyles);
    }

    const addNewText = () => {
        setTextStyles([...textStyles, {
            content: "New Text",
            fontSize: 16,
            color: "#000000",
            bgColor: "transparent",
            x: 50,
            y: 50,
            width: 40
        }]);
        setSelectedTextIndex(textStyles.length);
        setShowEditor(true);
    }

    const handleRegenerateBackground = async () => {
        if (onRegenerateBackground) {
            setIsRegenerating(true);
            await onRegenerateBackground(initialPrompt);
            setIsRegenerating(false);
        }
    }

    const handleTextClick = (index: number) => {
        setSelectedTextIndex(index);
        setShowEditor(true);
    }

    return (
        <div className="flex gap-6 w-full">
            <div className="flex flex-col rounded-[12px] border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px]">
                <h2 className="font-medium py-3 px-4">Poster Editor</h2>
                <div className="">
                    <div className="py-2 border-y border-gray-500/[0.1] px-4">
                        <div className="flex items-center p-1 border border-gray-500/[0.1] bg-gray-200/[0.2] rounded-[12px]">
                            {
                            ["Texts", "Templates"].map((item, index) => (
                                <button 
                                key={index}
                                onClick={() => setShow(item)}
                                className={`w-full text-center py-[8px] rounded-[8px] font-medium text-[14px]
                                    ${item === show ? "bg-white shadow-sm text-black" : "text-gray-400" }`}
                                >
                                { item }
                                </button>
                                ))
                            }
                        </div>
                    </div>
                <div className="flex-1 overflow-y-auto py-3 px-4 text-[12px]">
                    { show === "Templates" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 mb-2 text-[10px]">Choose a template design</p>
                            {POSTER_TEMPLATES.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => applyTemplate(index)}
                                    className={`p-3 rounded-[12px] text-left border transition-all ${
                                        currentTemplate === index 
                                            ? 'bg-primary/10 border-primary' 
                                            : 'bg-white border-gray-500/[0.1] hover:border-gray-500/[0.3]'
                                    }`}
                                >
                                    <p className="font-semibold text-[13px]">{template.name}</p>
                                    <p className="text-gray-500 text-[10px] mt-1">{template.description}</p>
                                </button>
                            ))}
                        </div>
                    ) : show === "Texts" ? (
                        <div className="flex flex-col gap-1">
                            {textStyles.map((textStyle, index) => (
                                <div 
                                    key={index}
                                    onClick={() => {
                                        setSelectedTextIndex(index);
                                        setShowEditor(true);
                                    }}
                                    className={`flex items-center gap-2 p-3 rounded-[12px] cursor-pointer hover:bg-gray-100/[0.5] ${selectedTextIndex === index ? 'bg-gray-100/[0.5] border border-gray-500/[0.1]' : 'bg-white'}`}
                                >
                                    <p className="text-gray-600 truncate">{textStyle.content}</p>
                                    <p className="w-4"><EyeIcon /></p>
                                </div>
                            ))}
                            
                            <div className="mt-8">
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <p className="text-gray-600">No assets available yet.</p>
                        </div>
                    )}
                </div>
                </div>
            </div>
            
            {/* Poster Preview */}
            <PosterPreview
                backgroundImage={backgroundImage}
                textStyles={textStyles}
                selectedTextIndex={selectedTextIndex}
                onTextClick={handleTextClick}
                onAddText={addNewText}
                onNewPoster={onClose || (() => {})}
                onRegenerateBackground={handleRegenerateBackground}
                isRegenerating={isRegenerating}
            />

            {/* Text Editor Panel */}
            {showEditor && selectedTextIndex !== null && (
                <div className="flex flex-col rounded-[12px] border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px]">
                    <h3 className="font-medium p-4">Edit Text</h3>
                    
                    <div className="space-y-4 px-4 py-4 border-y border-gray-500/[0.1] flex-1 overflow-y-auto">
                        <div>
                            <label className="block text-[12px] font-medium mb-1">Content</label>
                            <textarea
                                value={textStyles[selectedTextIndex].content}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { content: e.target.value })}
                                className="w-full p-2 border rounded outline-none"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Font Size: {textStyles[selectedTextIndex].fontSize}px</label>
                            <input
                                type="range"
                                min="12"
                                max="60"
                                value={textStyles[selectedTextIndex].fontSize}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { fontSize: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Text Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="w-12 h-10 rounded border"
                                />
                                <input
                                    type="text"
                                    value={textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="flex-1 p-2 border rounded outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Background Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={textStyles[selectedTextIndex].bgColor === 'transparent' ? '#ffffff' : textStyles[selectedTextIndex].bgColor}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { bgColor: e.target.value })}
                                    className="w-12 h-10 rounded border"
                                />
                                <input
                                    type="text"
                                    value={textStyles[selectedTextIndex].bgColor}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { bgColor: e.target.value })}
                                    className="flex-1 p-2 border rounded outline-none"
                                    placeholder="transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Font Weight</label>
                            <select
                                value={textStyles[selectedTextIndex].fontWeight || "normal"}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { fontWeight: e.target.value })}
                                className="w-full p-2 border rounded outline-none"
                            >
                                <option value="300">Light (300)</option>
                                <option value="400">Regular (400)</option>
                                <option value="500">Medium (500)</option>
                                <option value="600">Semi Bold (600)</option>
                                <option value="700">Bold (700)</option>
                                <option value="900">Black (900)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Width: {textStyles[selectedTextIndex].width || 'auto'}px</label>
                            <input
                                type="range"
                                min="100"
                                max="800"
                                value={parseInt(textStyles[selectedTextIndex].width.toString() || '400')}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { width: `${e.target.value}px` })}
                                className="w-full"
                            />
                        </div>

                        <button
                            onClick={() => {
                                const newStyles = textStyles.filter((_, i) => i !== selectedTextIndex);
                                setTextStyles(newStyles);
                                setSelectedTextIndex(null);
                                setShowEditor(false);
                            }}
                            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete Text
                        </button>

                        <button
                            onClick={() => setShowEditor(false)}
                            className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Close Editor
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
