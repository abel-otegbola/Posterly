'use client'
import { TextStyle } from "@/types/interfaces/editor";
import Dropdown from "../dropdown/dropdown";
import { POSTER_TEMPLATES } from "./templates";

interface TextEditorPanelProps {
    textStyle: TextStyle;
    index: number;
    onUpdate: (index: number, updates: Partial<TextStyle>) => void;
    onDelete: (index: number) => void;
    onBringForward: (index: number) => void;
    onSendBackward: (index: number) => void;
    onClose: () => void;
    showRightbar: boolean;
    onCloseRightbar: () => void;
}

export default function TextEditorPanel({
    textStyle,
    index,
    onUpdate,
    onDelete,
    onBringForward,
    onSendBackward,
    onClose,
    showRightbar,
    onCloseRightbar
}: TextEditorPanelProps) {
    return (
        <>
            {/* Backdrop for mobile */}
            <div 
                className={`md:hidden fixed top-[46px] inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    showRightbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onCloseRightbar}
            />
            
            <div className={`flex flex-col border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px] min-w-[250px]
                md:relative md:translate-x-0
                fixed right-0 md:top-0 top-[46px] z-50 transition-transform duration-300 ease-in-out ${
                    showRightbar ? 'translate-x-0' : 'translate-x-full'
                }`}>
            <h3 className="font-medium p-4">Edit Text</h3>
            
            <div className="space-y-4 px-4 py-4 border-y border-gray-500/[0.1] flex-1 overflow-y-auto">
                <div>
                    <label className="block text-[12px] font-medium mb-2">Apply Template Style</label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {POSTER_TEMPLATES.map((template, templateIdx) => (
                            <button
                                key={templateIdx}
                                onClick={() => {
                                    const templateStyle = template.styles[0];
                                    onUpdate(index, {
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
                        value={textStyle.content}
                        onChange={(e) => onUpdate(index, { content: e.target.value })}
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
                        value={parseInt(textStyle.width.toString() || '400')}
                        onChange={(e) => onUpdate(index, { width: `${e.target.value}px` })}
                        className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-1">Text Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={textStyle.color.startsWith('rgba') ? '#000000' : textStyle.color}
                            onChange={(e) => onUpdate(index, { color: e.target.value })}
                            className="h-6 w-6 rounded-[12px]"
                        />
                        <input
                            type="text"
                            value={textStyle.color}
                            onChange={(e) => onUpdate(index, { color: e.target.value })}
                            className="w-[calc(100%-1.5rem)] py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                            placeholder="hex or rgba()"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-1">Background Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={textStyle.bgColor === 'transparent' ? '#ffffff' : textStyle.bgColor.startsWith('rgba') ? '#ffffff' : textStyle.bgColor}
                            onChange={(e) => onUpdate(index, { bgColor: e.target.value })}
                            className="h-6 w-6 rounded-[12px]"
                        />
                        <input
                            type="text"
                            value={textStyle.bgColor}
                            onChange={(e) => onUpdate(index, { bgColor: e.target.value })}
                            className="w-[calc(100%-1.5rem)] py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                            placeholder="transparent or rgba()"
                        />
                    </div>
                </div>

                <div>
                    <Dropdown
                        value={textStyle.fontFamily || "Inter"}
                        onChange={(value) => onUpdate(index, { fontFamily: value })}
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
                        value={textStyle.fontWeight || "400"}
                        onChange={(value) => onUpdate(index, { fontWeight: value })}
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
                        value={textStyle.fontSize}
                        onChange={(e) => onUpdate(index, { fontSize: Number(e.target.value) })}
                        className="w-full py-0 leading-[0px] text-[12px] px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                    />
                </div>

                <div>
                    <Dropdown
                        label="Text Transform"
                        value={textStyle.textTransform || "none"}
                        onChange={(value) => onUpdate(index, { textTransform: value })}
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
                        value={textStyle.styleClass || "none"}
                        onChange={(value) => onUpdate(index, { styleClass: value === "none" ? undefined : value })}
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
                        value={textStyle.textAlign || "left"}
                        onChange={(value) => onUpdate(index, { textAlign: value })}
                        options={[
                            { id: 1, title: "left" },
                            { id: 2, title: "center" },
                            { id: 3, title: "right" },
                            { id: 4, title: "justify" }
                        ]}
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[8px] border border-gray-500/[0.2] p-2 flex gap-2">
                        <label className="block text-[12px] font-semibold p-1">X</label>
                        <input
                            type="number"
                            min="0"
                            max="2000"
                            value={textStyle.x}
                            onChange={(e) => onUpdate(index, { x: Number(e.target.value) })}
                            className="w-full border-none outline-none py-0 px-1 text-[12px]"
                        />
                    </div>
                    <div className="rounded-[8px] border border-gray-500/[0.2] p-2 flex gap-2">
                        <label className="block text-[12px] font-semibold p-1">Y</label>
                        <input
                            type="number"
                            min="0"
                            max="1500"
                            value={textStyle.y}
                            onChange={(e) => onUpdate(index, { y: Number(e.target.value) })}
                            className="w-full border-none outline-none py-0 px-1 text-[12px]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-2">Layer Order</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onBringForward(index)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                        >
                            Bring Forward
                        </button>
                        <button
                            onClick={() => onSendBackward(index)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                        >
                            Send Backward
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(index)}
                    className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete Text
                </button>

                <button
                    onClick={onClose}
                    className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Close Editor
                </button>
            </div>
        </div>
        </>
    );
}
