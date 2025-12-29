'use client'
import { EyeIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import PosterPreview from "./PosterPreview";
import Input from "../input/input";
import Dropdown from "../dropdown/dropdown";
import { POSTER_TEMPLATES } from "./templates";

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
    textAlign?: string;
}

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

    const getInitialTextStyles = (texts = initialTexts) => {
        if (!texts) return [];
        const contents = [
            texts.headline,
            texts.subheadline,
            texts.bodyText,
            texts.additionalInfo
        ];
        
        // Mix different templates for each text element
        const templateIndexes = [0, 1, 3, 4]; // Use Smart Choices, Minimalist Quote, Intelligence Quote, Playful Split
        
        return contents.map((content, index) => {
            const templateIdx = templateIndexes[index] % POSTER_TEMPLATES.length;
            const template = POSTER_TEMPLATES[templateIdx];
            const styleIdx = index % template.styles.length;
            return {
                ...template.styles[styleIdx],
                content: content || ""
            };
        });
    };

    const [textStyles, setTextStyles] = useState<TextStyle[]>(() => getInitialTextStyles());
    const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState("Texts");
    const [isRegenerating, setIsRegenerating] = useState(false);

    const applyTemplate = (templateIndex: number) => {
        if (!initialTexts) return;
        const template = POSTER_TEMPLATES[templateIndex];
        const contents = [
            initialTexts.headline,
            initialTexts.subheadline,
            initialTexts.bodyText,
            initialTexts.additionalInfo
        ];
        setTextStyles(template.styles.map((style, index) => ({
            ...style,
            content: contents[index] || ""
        })));
        setCurrentTemplate(templateIndex);
    };

    // Update text styles when initialTexts changes
    useEffect(() => {
        if (initialTexts) {
            setTextStyles(getInitialTextStyles(initialTexts));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTexts]);

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

    const handlePositionChange = (index: number, x: number, y: number) => {
        updateTextStyle(index, { x, y });
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
                onPositionChange={handlePositionChange}
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
                            <Input
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
                                <Input
                                    type="color"
                                    value={textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="w-12 h-12 rounded-[12px]"
                                />
                                <Input
                                    type="text"
                                    value={textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="flex-1"
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
                                    className="w-12 h-12 rounded-[12px]"
                                />
                                <Input
                                    type="text"
                                    value={textStyles[selectedTextIndex].bgColor}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { bgColor: e.target.value })}
                                    className="flex-1"
                                    placeholder="transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <Dropdown
                                label="Font Family"
                                value={textStyles[selectedTextIndex].fontFamily || "Inter"}
                                onChange={(value) => updateTextStyle(selectedTextIndex, { fontFamily: value })}
                                options={[
                                    { id: 1, title: "Inter" },
                                    { id: 2, title: "Poppins" },
                                    { id: 3, title: "Montserrat" },
                                    { id: 4, title: "Roboto" },
                                    { id: 5, title: "Playfair Display" },
                                    { id: 6, title: "Bebas Neue" },
                                    { id: 7, title: "Oswald" },
                                    { id: 8, title: "Anton" },
                                    { id: 9, title: "Raleway" },
                                    { id: 10, title: "Lato" },
                                    { id: 11, title: "Open Sans" },
                                    { id: 12, title: "Merriweather" },
                                    { id: 13, title: "Arial" },
                                    { id: 14, title: "Helvetica" },
                                    { id: 15, title: "Times New Roman" },
                                    { id: 16, title: "Georgia" },
                                    { id: 17, title: "Courier New" },
                                    { id: 18, title: "Verdana" }
                                ]}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label="Font Weight"
                                value={textStyles[selectedTextIndex].fontWeight || "400"}
                                onChange={(value) => updateTextStyle(selectedTextIndex, { fontWeight: value })}
                                options={[
                                    { id: 1, title: "300" },
                                    { id: 2, title: "400" },
                                    { id: 3, title: "500" },
                                    { id: 4, title: "600" },
                                    { id: 5, title: "700" },
                                    { id: 6, title: "900" }
                                ]}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Width: {textStyles[selectedTextIndex].width || 'auto'}px</label>
                            <Input
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
