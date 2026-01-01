'use client'
import { EyeIcon } from "@phosphor-icons/react";
import { TextStyle, Shape } from "@/types/interfaces/editor";
import { POSTER_TEMPLATES } from "./templates";

interface PosterEditorSidebarProps {
    show: "Texts" | "Shapes" | "Templates";
    setShow: (value: "Texts" | "Shapes" | "Templates") => void;
    textStyles: TextStyle[];
    shapes: Shape[];
    selectedTextIndex: number | null;
    selectedShapeId: string | null;
    currentTemplate: number;
    onApplyTemplate: (index: number) => void;
    onTextClick: (index: number) => void;
    onShapeClick: (id: string) => void;
    onAddShape: (type: 'rectangle' | 'circle' | 'triangle') => void;
    showLeftbar: boolean;
    onClose: () => void;
}

export default function PosterEditorSidebar({
    show,
    setShow,
    textStyles,
    shapes,
    selectedTextIndex,
    selectedShapeId,
    currentTemplate,
    onApplyTemplate,
    onTextClick,
    onShapeClick,
    onAddShape,
    showLeftbar,
    onClose
}: PosterEditorSidebarProps) {
    return (
        <>
            {/* Backdrop for mobile */}
            <div 
                className={`md:hidden fixed top-[46px] inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    showLeftbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            
            <div className={`flex flex-col border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px] min-w-[250px]
                md:relative md:translate-x-0
                fixed left-0 md:top-0 top-[46px] z-50 transition-transform duration-300 ease-in-out ${
                    showLeftbar ? 'translate-x-0' : '-translate-x-full'
                }`}>
            <h2 className="font-medium py-3 px-4">Poster Editor</h2>
            <div className="">
                <div className="py-2 border-y border-gray-500/[0.1] px-4">
                    <div className="flex items-center p-1 border border-gray-500/[0.1] bg-gray-200/[0.2] rounded-[12px]">
                        {["Texts", "Shapes", "Templates"].map((item, index) => (
                            <button 
                                key={index}
                                onClick={() => setShow(item as "Texts" | "Shapes" | "Templates")}
                                className={`w-full text-center py-[8px] rounded-[8px] font-medium text-[12px]
                                    ${item === show ? "bg-white shadow-sm text-black" : "text-gray-400" }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-3 px-4 text-[12px]">
                    {show === "Templates" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 mb-2 text-[10px]">Choose a template design</p>
                            {POSTER_TEMPLATES.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => onApplyTemplate(index)}
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
                                    onClick={() => onTextClick(index)}
                                    className={`flex items-center justify-between gap-2 p-3 rounded-[12px] cursor-pointer hover:bg-gray-100/[0.5] ${selectedTextIndex === index ? 'bg-gray-100/[0.5] border border-gray-500/[0.1]' : 'bg-white'}`}
                                >
                                    <p className="text-gray-600 truncate">{textStyle.content}</p>
                                    <p className="w-2"><EyeIcon /></p>
                                </div>
                            ))}
                        </div>
                    ) : show === "Shapes" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 mb-2 text-[10px]">Add shapes to your poster</p>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <button
                                    onClick={() => onAddShape('rectangle')}
                                    className="p-3 rounded-[12px] border border-gray-500/[0.1] hover:bg-gray-100 transition-all flex flex-col items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-gray-800 rounded"></div>
                                    <span className="text-[10px]">Rectangle</span>
                                </button>
                                <button
                                    onClick={() => onAddShape('circle')}
                                    className="p-3 rounded-[12px] border border-gray-500/[0.1] hover:bg-gray-100 transition-all flex flex-col items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                                    <span className="text-[10px]">Circle</span>
                                </button>
                                <button
                                    onClick={() => onAddShape('triangle')}
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
                                            onClick={() => onShapeClick(shape.id)}
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
        </>
    );
}
