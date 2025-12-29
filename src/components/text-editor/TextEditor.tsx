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
    width: number;
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
        description: "Large headline with high contrast",
        styles: [
            { fontSize: 48, color: "#FF6B2C", bgColor: "transparent", x: 30, y: 30, width: 85, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.02em" },
            { fontSize: 24, color: "#1a1a1a", bgColor: "transparent", x: 30, y: 120, width: 75, fontWeight: "600", letterSpacing: "0.01em" },
            { fontSize: 16, color: "#ffffff", bgColor: "#1a1a1a", x: 30, y: 280, width: 70, fontWeight: "500", letterSpacing: "0.02em" },
            { fontSize: 14, color: "#FF6B2C", bgColor: "transparent", x: 30, y: 340, width: 60, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }
        ]
    },
    {
        name: "Centered Elegance",
        description: "Center-aligned minimal design",
        styles: [
            { fontSize: 40, color: "#2C3E50", bgColor: "transparent", x: 150, y: 80, width: 60, fontWeight: "700", textTransform: "capitalize", letterSpacing: "0em" },
            { fontSize: 20, color: "#7F8C8D", bgColor: "transparent", x: 150, y: 140, width: 60, fontWeight: "400", letterSpacing: "0.05em" },
            { fontSize: 16, color: "#2C3E50", bgColor: "transparent", x: 120, y: 250, width: 65, fontWeight: "500", letterSpacing: "0em" },
            { fontSize: 14, color: "#E74C3C", bgColor: "transparent", x: 150, y: 320, width: 50, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em" }
        ]
    },
    {
        name: "Modern Asymmetric",
        description: "Dynamic offset layout",
        styles: [
            { fontSize: 52, color: "#1a1a1a", bgColor: "#FFD700", x: 20, y: 50, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.03em" },
            { fontSize: 22, color: "#ffffff", bgColor: "#1a1a1a", x: 250, y: 140, width: 50, fontWeight: "600", letterSpacing: "0.02em" },
            { fontSize: 18, color: "#1a1a1a", bgColor: "transparent", x: 20, y: 230, width: 75, fontWeight: "500", letterSpacing: "0em" },
            { fontSize: 16, color: "#FFD700", bgColor: "#1a1a1a", x: 250, y: 300, width: 45, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }
        ]
    },
    {
        name: "Minimalist Clean",
        description: "Simple, refined typography",
        styles: [
            { fontSize: 36, color: "#000000", bgColor: "transparent", x: 40, y: 60, width: 80, fontWeight: "300", textTransform: "none", letterSpacing: "0.02em" },
            { fontSize: 18, color: "#555555", bgColor: "transparent", x: 40, y: 120, width: 70, fontWeight: "400", letterSpacing: "0em" },
            { fontSize: 16, color: "#000000", bgColor: "transparent", x: 40, y: 260, width: 75, fontWeight: "500", letterSpacing: "0em" },
            { fontSize: 12, color: "#888888", bgColor: "transparent", x: 40, y: 330, width: 60, fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.2em" }
        ]
    },
    {
        name: "Vibrant Blocks",
        description: "Colorful boxed elements",
        styles: [
            { fontSize: 44, color: "#ffffff", bgColor: "#E91E63", x: 25, y: 40, width: 75, fontWeight: "800", textTransform: "uppercase", letterSpacing: "-0.01em" },
            { fontSize: 20, color: "#ffffff", bgColor: "#9C27B0", x: 25, y: 120, width: 65, fontWeight: "600", letterSpacing: "0.03em" },
            { fontSize: 16, color: "#1a1a1a", bgColor: "#FFC107", x: 25, y: 250, width: 70, fontWeight: "500", letterSpacing: "0.01em" },
            { fontSize: 14, color: "#ffffff", bgColor: "#2196F3", x: 25, y: 310, width: 55, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em" }
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
    const [textStyles, setTextStyles] = useState<TextStyle[]>([]);
    const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState("Texts");
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(0);

    // Update text styles when initialTexts changes
    useEffect(() => {
        if (initialTexts) {
            applyTemplate(currentTemplate);
        }
    }, [initialTexts]);

    const applyTemplate = (templateIndex: number) => {
        if (!initialTexts) return;
        
        const template = POSTER_TEMPLATES[templateIndex];
        const contents = [
            initialTexts.headline,
            initialTexts.subheadline,
            initialTexts.bodyText,
            initialTexts.additionalInfo
        ];

        const newStyles = template.styles.map((style, index) => ({
            ...style,
            content: contents[index] || ""
        }));

        setTextStyles(newStyles);
        setCurrentTemplate(templateIndex);
    };

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
                                value={parseInt(textStyles[selectedTextIndex].width || '400')}
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
