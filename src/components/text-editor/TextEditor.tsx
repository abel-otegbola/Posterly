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
    zIndex?: number;
    styleClass?: string;
}

export interface Shape {
    id: string;
    type: 'rectangle' | 'circle' | 'triangle';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
    rotation?: number;
    borderRadius?: number;
    zIndex?: number;
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
        
        // Use Smart Choices template (index 0) for initial load
        const template = POSTER_TEMPLATES[0];
        
        return contents.map((content, index) => {
            const styleIdx = index % template.styles.length;
            return {
                ...template.styles[styleIdx],
                content: content || ""
            };
        });
    };

    const getInitialShapes = () => {
        // Use Smart Choices template shapes for initial load
        const template = POSTER_TEMPLATES[0];
        if (template.shapes) {
            return template.shapes.map((shape, index) => ({
                ...shape,
                id: `shape-${Date.now()}-${index}`
            }));
        }
        return [];
    };

    const [textStyles, setTextStyles] = useState<TextStyle[]>(() => getInitialTextStyles());
    const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
    const [shapes, setShapes] = useState<Shape[]>(() => getInitialShapes());
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
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
        
        // Apply template shapes if available
        if (template.shapes) {
            setShapes(template.shapes.map((shape, index) => ({
                ...shape,
                id: `shape-${Date.now()}-${index}`
            })));
        } else {
            setShapes([]);
        }
        
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
            width: 40,
            zIndex: textStyles.length + shapes.length + 2
        }]);
        setSelectedTextIndex(textStyles.length);
        setSelectedShapeId(null);
        setShowEditor(true);
    }

    const addNewShape = (type: 'rectangle' | 'circle' | 'triangle') => {
        const newShape: Shape = {
            id: `shape-${Date.now()}`,
            type,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            color: "#000000",
            opacity: 1,
            borderRadius: type === 'circle' ? 50 : 0,
            zIndex: textStyles.length + shapes.length + 2
        };
        setShapes([...shapes, newShape]);
        setSelectedShapeId(newShape.id);
        setSelectedTextIndex(null);
        setShowEditor(true);
    }

    const updateShape = (id: string, updates: Partial<Shape>) => {
        const newShapes = shapes.map(shape => 
            shape.id === id ? { ...shape, ...updates } : shape
        );
        setShapes(newShapes);
    }

    const deleteShape = (id: string) => {
        setShapes(shapes.filter(shape => shape.id !== id));
        setSelectedShapeId(null);
        setShowEditor(false);
    }

    const bringTextForward = (index: number) => {
        const maxZIndex = Math.max(
            ...textStyles.map(t => t.zIndex || 0),
            ...shapes.map(s => s.zIndex || 0)
        );
        updateTextStyle(index, { zIndex: maxZIndex + 1 });
    }

    const sendTextBackward = (index: number) => {
        const minZIndex = Math.min(
            ...textStyles.map(t => t.zIndex || 2),
            ...shapes.map(s => s.zIndex || 2)
        );
        updateTextStyle(index, { zIndex: Math.max(2, minZIndex - 1) });
    }

    const bringShapeForward = (id: string) => {
        const maxZIndex = Math.max(
            ...textStyles.map(t => t.zIndex || 0),
            ...shapes.map(s => s.zIndex || 0)
        );
        updateShape(id, { zIndex: maxZIndex + 1 });
    }

    const sendShapeBackward = (id: string) => {
        const minZIndex = Math.min(
            ...textStyles.map(t => t.zIndex || 2),
            ...shapes.map(s => s.zIndex || 2)
        );
        updateShape(id, { zIndex: Math.max(2, minZIndex - 1) });
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
        setSelectedShapeId(null);
        setShowEditor(true);
    }

    const handleShapeClick = (id: string) => {
        setSelectedShapeId(id);
        setSelectedTextIndex(null);
        setShowEditor(true);
    }

    const handleShapePositionChange = (id: string, x: number, y: number) => {
        updateShape(id, { x, y });
    }

    const handlePositionChange = (index: number, x: number, y: number) => {
        updateTextStyle(index, { x, y });
    }

    const handleDeselectText = () => {
        setSelectedTextIndex(null);
        setSelectedShapeId(null);
        setShowEditor(false);
    }

    return (
        <div className="flex gap-6 w-full">
            <div className="flex flex-col rounded-[12px] border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px] min-w-[250px]">
                <h2 className="font-medium py-3 px-4">Poster Editor</h2>
                <div className="">
                    <div className="py-2 border-y border-gray-500/[0.1] px-4">
                        <div className="flex items-center p-1 border border-gray-500/[0.1] bg-gray-200/[0.2] rounded-[12px]">
                            {
                            ["Texts", "Shapes", "Templates"].map((item, index) => (
                                <button 
                                key={index}
                                onClick={() => setShow(item)}
                                className={`w-full text-center py-[8px] rounded-[8px] font-medium text-[12px]
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
                                        setSelectedShapeId(null);
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
                    ) : show === "Shapes" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 mb-2 text-[10px]">Add shapes to your poster</p>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <button
                                    onClick={() => addNewShape('rectangle')}
                                    className="p-3 rounded-[12px] border border-gray-500/[0.1] hover:bg-gray-100 transition-all flex flex-col items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-gray-800 rounded"></div>
                                    <span className="text-[10px]">Rectangle</span>
                                </button>
                                <button
                                    onClick={() => addNewShape('circle')}
                                    className="p-3 rounded-[12px] border border-gray-500/[0.1] hover:bg-gray-100 transition-all flex flex-col items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                                    <span className="text-[10px]">Circle</span>
                                </button>
                                <button
                                    onClick={() => addNewShape('triangle')}
                                    className="p-3 rounded-[12px] border border-gray-500/[0.1] hover:bg-gray-100 transition-all flex flex-col items-center gap-2"
                                >
                                    <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-gray-800"></div>
                                    <span className="text-[10px]">Triangle</span>
                                </button>
                            </div>
                            
                            {shapes.length > 0 && (
                                <>
                                    <p className="text-gray-600 mb-2 text-[10px] mt-4">Your shapes</p>
                                    {shapes.map((shape) => (
                                        <div 
                                            key={shape.id}
                                            onClick={() => handleShapeClick(shape.id)}
                                            className={`flex items-center gap-2 p-3 rounded-[12px] cursor-pointer hover:bg-gray-100/[0.5] ${selectedShapeId === shape.id ? 'bg-gray-100/[0.5] border border-gray-500/[0.1]' : 'bg-white'}`}
                                        >
                                            <div 
                                                className="w-4 h-4"
                                                style={{
                                                    backgroundColor: shape.type === 'triangle' ? 'transparent' : shape.color,
                                                    borderRadius: shape.type === 'circle' ? '50%' : '0',
                                                    ...(shape.type === 'triangle' && {
                                                        width: 0,
                                                        height: 0,
                                                        borderLeft: '8px solid transparent',
                                                        borderRight: '8px solid transparent',
                                                        borderBottom: `14px solid ${shape.color}`
                                                    })
                                                }}
                                            />
                                            <p className="text-gray-600 capitalize">{shape.type}</p>
                                        </div>
                                    ))}
                                </>
                            )}
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
            <div className="flex justify-center items-center flex-1 w-full px-auto">
                <PosterPreview
                    backgroundImage={backgroundImage}
                    textStyles={textStyles}
                    shapes={shapes}
                    selectedTextIndex={selectedTextIndex}
                    selectedShapeId={selectedShapeId}
                    onTextClick={handleTextClick}
                    onShapeClick={handleShapeClick}
                    onAddText={addNewText}
                    onNewPoster={onClose || (() => {})}
                    onRegenerateBackground={handleRegenerateBackground}
                    onPositionChange={handlePositionChange}
                    onShapePositionChange={handleShapePositionChange}
                    onDeselectText={handleDeselectText}
                    isRegenerating={isRegenerating}
                />
            </div>

            {/* Text Editor Panel */}
            {showEditor && selectedTextIndex !== null && (
                <div className="flex flex-col rounded-[12px] border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px] min-w-[250px]">
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
                                className="w-full p-2 border border-gray-500/[0.2] text-[12px] rounded-[12px] outline-none resize-none"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium mb-1">Width (px)</label>
                            <input
                                type="number"
                                min="10"
                                max="800"
                                value={parseInt(textStyles[selectedTextIndex].width.toString() || '400')}
                                onChange={(e) => updateTextStyle(selectedTextIndex, { width: `${e.target.value}px` })}
                                className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium mb-1">Text Color</label>
                            <div className="grid grid-cols-3 gap-2">
                                <Input
                                    type="color"
                                    value={textStyles[selectedTextIndex].color.startsWith('rgba') ? '#000000' : textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="col-span-1 h-6 py-2 rounded-[12px]"
                                />
                                <input
                                    type="text"
                                    value={textStyles[selectedTextIndex].color}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { color: e.target.value })}
                                    className="col-span-2 py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                                    placeholder="hex or rgba()"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium mb-1">Background Color</label>
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="color"
                                    value={textStyles[selectedTextIndex].bgColor === 'transparent' ? '#ffffff' : textStyles[selectedTextIndex].bgColor.startsWith('rgba') ? '#ffffff' : textStyles[selectedTextIndex].bgColor}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { bgColor: e.target.value })}
                                    className="col-span-1 h-6 rounded-[12px]"
                                />
                                <input
                                    type="text"
                                    value={textStyles[selectedTextIndex].bgColor}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { bgColor: e.target.value })}
                                    className="col-span-2 py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                                    placeholder="transparent or rgba()"
                                />
                            </div>
                        </div>

                        <div>
                            <Dropdown
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
                        <div className="grid grid-cols-2 gap-4">
                                <Dropdown
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
                                <input
                                    type="number"
                                    min="4"
                                    max="60"
                                    value={textStyles[selectedTextIndex].fontSize}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { fontSize: Number(e.target.value) })}
                                    className="w-full py-0 leading-[0px] text-[12px] px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                                />
                        </div>

                        <div>
                            <Dropdown
                                label="Text Transform"
                                value={textStyles[selectedTextIndex].textTransform || "none"}
                                onChange={(value) => updateTextStyle(selectedTextIndex, { textTransform: value })}
                                options={[
                                    { id: 1, title: "none" },
                                    { id: 2, title: "uppercase" },
                                    { id: 3, title: "lowercase" },
                                    { id: 4, title: "capitalize" }
                                ]}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label="Premium Text Style"
                                value={textStyles[selectedTextIndex].styleClass || "none"}
                                onChange={(value) => updateTextStyle(selectedTextIndex, { styleClass: value === "none" ? undefined : value })}
                                options={[
                                    { id: 1, title: "none" },
                                    { id: 2, title: "text-soft-glow" },
                                    { id: 3, title: "text-cinematic" },
                                    { id: 4, title: "text-glass" },
                                    { id: 5, title: "text-offset" },
                                    { id: 6, title: "text-neon-soft" },
                                    { id: 7, title: "text-luxury-gold" },
                                    { id: 8, title: "text-royal-purple" },
                                    { id: 9, title: "text-elegant-shadow" },
                                    { id: 10, title: "text-metallic-silver" },
                                    { id: 11, title: "text-bold-outline" },
                                    { id: 12, title: "text-premium-gradient" },
                                    { id: 13, title: "text-fire-glow" },
                                    { id: 14, title: "text-ocean-depth" },
                                    { id: 15, title: "text-vintage" },
                                    { id: 16, title: "text-diamond-shine" }
                                ]}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label="Text Align"
                                value={textStyles[selectedTextIndex].textAlign || "left"}
                                onChange={(value) => updateTextStyle(selectedTextIndex, { textAlign: value })}
                                options={[
                                    { id: 1, title: "left" },
                                    { id: 2, title: "center" },
                                    { id: 3, title: "right" },
                                    { id: 4, title: "justify" }
                                ]}
                            />
                        </div>
                        
                        {/* //x and y onPositionChange */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-[8px] border border-gray-500/[0.2] p-2 flex gap-2">
                                <label className="block text-[12px] font-semibold p-1">X</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="2000"
                                    value={textStyles[selectedTextIndex].x}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { x: Number(e.target.value) })}
                                    className="w-full border-none outline-none py-0 px-1 text-[12px]"
                                />
                            </div>
                            <div className="rounded-[8px] border border-gray-500/[0.2] p-2 flex gap-2">
                                <label className="block text-[12px] font-semibold p-1">Y</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1500"
                                    value={textStyles[selectedTextIndex].y}
                                    onChange={(e) => updateTextStyle(selectedTextIndex, { y: Number(e.target.value) })}
                                    className="w-full border-none outline-none py-0 px-1 text-[12px]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium mb-2">Layer Order</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => bringTextForward(selectedTextIndex)}
                                    className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                                >
                                    Bring Forward
                                </button>
                                <button
                                    onClick={() => sendTextBackward(selectedTextIndex)}
                                    className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                                >
                                    Send Backward
                                </button>
                            </div>
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

            {/* Shape Editor Panel */}
            {showEditor && selectedShapeId !== null && (
                <div className="flex flex-col rounded-[12px] border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px]">
                    <h3 className="font-medium p-4">Edit Shape</h3>
                    
                    <div className="space-y-4 px-4 py-4 border-y border-gray-500/[0.1] flex-1 overflow-y-auto">
                        {(() => {
                            const shape = shapes.find(s => s.id === selectedShapeId);
                            if (!shape) return null;

                            return (
                                <>
                                    <div>
                                        <label className="block text-[12px] font-medium mb-1">Shape Type</label>
                                        <p className="text-[10px] capitalize text-gray-600">{shape.type}</p>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-medium mb-1">Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={shape.color.startsWith('rgba') ? '#000000' : shape.color}
                                                onChange={(e) => updateShape(shape.id, { color: e.target.value })}
                                                className="w-12 h-12 rounded-[12px]"
                                            />
                                            <Input
                                                type="text"
                                                value={shape.color}
                                                onChange={(e) => updateShape(shape.id, { color: e.target.value })}
                                                className="flex-1"
                                                placeholder="hex or rgba()"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-medium mb-1">Opacity: {Math.round(shape.opacity * 100)}%</label>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={shape.opacity}
                                            onChange={(e) => updateShape(shape.id, { opacity: Number(e.target.value) })}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-medium mb-1">Width (px)</label>
                                            <input
                                                type="number"
                                                min="20"
                                                max="500"
                                                value={shape.width}
                                                onChange={(e) => updateShape(shape.id, { width: Number(e.target.value) })}
                                                className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-medium mb-1">Height (px)</label>
                                            <input
                                                type="number"
                                                min="20"
                                                max="500"
                                                value={shape.height}
                                                onChange={(e) => updateShape(shape.id, { height: Number(e.target.value) })}
                                                className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-medium mb-1">Rotation: {shape.rotation || 0}°</label>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="360"
                                            value={shape.rotation || 0}
                                            onChange={(e) => updateShape(shape.id, { rotation: Number(e.target.value) })}
                                            className="w-full"
                                        />
                                    </div>

                                    {shape.type !== 'triangle' && (
                                        <div>
                                            <label className="block text-[10px] font-medium mb-1">Corner Radius: {shape.borderRadius || 0}px</label>
                                            <Input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={shape.borderRadius || 0}
                                                onChange={(e) => updateShape(shape.id, { borderRadius: Number(e.target.value) })}
                                                className="w-full"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-[10px] font-medium mb-2">Layer Order</label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => bringShapeForward(shape.id)}
                                                className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                                            >
                                                Bring Forward
                                            </button>
                                            <button
                                                onClick={() => sendShapeBackward(shape.id)}
                                                className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                                            >
                                                Send Backward
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteShape(shape.id)}
                                        className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete Shape
                                    </button>

                                    <button
                                        onClick={() => setShowEditor(false)}
                                        className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Close Editor
                                    </button>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
