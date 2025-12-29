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
    fontFamily?: string;
}

interface PosterTemplate {
    name: string;
    description: string;
    styles: Omit<TextStyle, 'content'>[];
}

const POSTER_TEMPLATES: PosterTemplate[] = [
    {
        name: "Smart Choices",
        description: "Bold statement with faded layers",
        styles: [
            { fontSize: 64, color: "#ffffff", bgColor: "transparent", x: 50, y: 80, width: 80, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.02em", fontFamily: "Inter" },
            { fontSize: 64, color: "rgba(255, 255, 255, 0.25)", bgColor: "transparent", x: 50, y: 140, width: 80, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.02em", fontFamily: "Inter" },
            { fontSize: 64, color: "#ffffff", bgColor: "transparent", x: 50, y: 210, width: 80, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.02em", fontFamily: "Inter" },
            { fontSize: 12, color: "rgba(255, 255, 255, 0.4)", bgColor: "transparent", x: 50, y: 330, width: 60, fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "Inter" }
        ]
    },
    {
        name: "Minimalist Quote",
        description: "Centered elegant simplicity",
        styles: [
            { fontSize: 48, color: "#000000", bgColor: "transparent", x: 60, y: 140, width: 75, fontWeight: "700", textTransform: "lowercase", letterSpacing: "0em", fontFamily: "Playfair Display" },
            { fontSize: 14, color: "#000000", bgColor: "transparent", x: 150, y: 250, width: 50, fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "Montserrat" },
            { fontSize: 12, color: "#666666", bgColor: "transparent", x: 150, y: 280, width: 50, fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "Montserrat" },
            { fontSize: 10, color: "#999999", bgColor: "transparent", x: 150, y: 310, width: 40, fontWeight: "300", textTransform: "none", letterSpacing: "0em", fontFamily: "Inter" }
        ]
    },
    {
        name: "Geometric Bold",
        description: "Shapes and condensed type",
        styles: [
            { fontSize: 56, color: "#ffffff", bgColor: "transparent", x: 30, y: 60, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.03em", fontFamily: "Bebas Neue" },
            { fontSize: 56, color: "#ffffff", bgColor: "transparent", x: 30, y: 130, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.03em", fontFamily: "Bebas Neue" },
            { fontSize: 56, color: "#ffffff", bgColor: "transparent", x: 30, y: 200, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.03em", fontFamily: "Bebas Neue" },
            { fontSize: 56, color: "#ffffff", bgColor: "transparent", x: 30, y: 270, width: 70, fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.03em", fontFamily: "Bebas Neue" }
        ]
    },
    {
        name: "Intelligence Quote",
        description: "Large impactful statement",
        styles: [
            { fontSize: 72, color: "#000000", bgColor: "transparent", x: 40, y: 100, width: 85, fontWeight: "900", textTransform: "lowercase", letterSpacing: "-0.02em", fontFamily: "Poppins" },
            { fontSize: 72, color: "#000000", bgColor: "transparent", x: 40, y: 180, width: 85, fontWeight: "900", textTransform: "lowercase", letterSpacing: "-0.02em", fontFamily: "Poppins" },
            { fontSize: 72, color: "#000000", bgColor: "transparent", x: 40, y: 260, width: 85, fontWeight: "900", textTransform: "lowercase", letterSpacing: "-0.02em", fontFamily: "Poppins" },
            { fontSize: 18, color: "#000000", bgColor: "transparent", x: 40, y: 340, width: 50, fontWeight: "400", textTransform: "none", letterSpacing: "0em", fontFamily: "Inter" }
        ]
    },
    {
        name: "Playful Split",
        description: "Staggered word placement",
        styles: [
            { fontSize: 52, color: "#000000", bgColor: "transparent", x: 80, y: 80, width: 50, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0em", fontFamily: "Oswald" },
            { fontSize: 52, color: "#000000", bgColor: "transparent", x: 80, y: 140, width: 60, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0em", fontFamily: "Oswald" },
            { fontSize: 52, color: "#000000", bgColor: "transparent", x: 220, y: 200, width: 40, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0em", fontFamily: "Oswald" },
            { fontSize: 52, color: "#000000", bgColor: "transparent", x: 160, y: 260, width: 45, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0em", fontFamily: "Oswald" }
        ]
    },
    {
        name: "3D Stack",
        description: "Bold stacked with depth",
        styles: [
            { fontSize: 80, color: "#ffffff", bgColor: "transparent", x: 50, y: 80, width: 75, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "Anton" },
            { fontSize: 80, color: "#ffffff", bgColor: "transparent", x: 50, y: 170, width: 75, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "Anton" },
            { fontSize: 80, color: "#ffffff", bgColor: "transparent", x: 50, y: 260, width: 75, fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "Anton" },
            { fontSize: 12, color: "rgba(255, 255, 255, 0.6)", bgColor: "transparent", x: 50, y: 350, width: 50, fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "Inter" }
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
                            <label className="block text-[12px] font-medium mb-2">Apply Template Style</label>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {POSTER_TEMPLATES.map((template, templateIdx) => (
                                    <button
                                        key={templateIdx}
                                        onClick={() => {
                                            // Apply first style from selected template to current text
                                            const templateStyle = template.styles[0];
                                            updateTextStyle(selectedTextIndex, {
                                                fontSize: templateStyle.fontSize,
                                                color: templateStyle.color,
                                                bgColor: templateStyle.bgColor,
                                                fontWeight: templateStyle.fontWeight,
                                                textTransform: templateStyle.textTransform,
                                                letterSpacing: templateStyle.letterSpacing,
                                                fontFamily: templateStyle.fontFamily
                                            });
                                        }}
                                        className="p-2 text-[10px] rounded-lg border border-gray-500/[0.1] hover:bg-gray-100 transition-all"
                                    >
                                        {template.name}
                                    </button>
                                ))}
                            </div>
                        </div>

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
                            <label className="block text-sm font-medium mb-1">Font Family</label>
                            <select
                                value={textStyles[selectedTextIndex].fontFamily || "Inter"}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { fontFamily: e.target.value })}
                                className="w-full p-2 border rounded outline-none"
                            >
                                <optgroup label="Google Fonts">
                                    <option value="Inter">Inter</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Playfair Display">Playfair Display</option>
                                    <option value="Bebas Neue">Bebas Neue</option>
                                    <option value="Oswald">Oswald</option>
                                    <option value="Anton">Anton</option>
                                    <option value="Raleway">Raleway</option>
                                    <option value="Lato">Lato</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="Merriweather">Merriweather</option>
                                </optgroup>
                                <optgroup label="System Fonts">
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Verdana">Verdana</option>
                                </optgroup>
                            </select>
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
