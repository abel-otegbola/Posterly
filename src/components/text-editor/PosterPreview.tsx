'use client'
import { ArrowsClockwiseIcon, PencilIcon, SpinnerIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Button from "../button/Button";
import { TextStyle } from "./TextEditor";
import Draggable from "react-draggable";
import { useMemo } from "react";

interface PosterPreviewProps {
    backgroundImage: string;
    textStyles: TextStyle[];
    selectedTextIndex: number | null;
    onTextClick: (index: number) => void;
    onAddText: () => void;
    onNewPoster: () => void;
    onRegenerateBackground: () => void;
    onPositionChange: (index: number, x: number, y: number) => void;
    isRegenerating?: boolean;
}

export default function PosterPreview({
    backgroundImage,
    textStyles,
    selectedTextIndex,
    onTextClick,
    onAddText,
    onNewPoster,
    onRegenerateBackground,
    onPositionChange,
    isRegenerating = false
}: PosterPreviewProps) {
    // Create refs array that matches the number of text styles
    const nodeRefs = useMemo(() => 
        textStyles.map(() => ({ current: null as HTMLDivElement | null })),
        [textStyles]
    );

    return (
        <div className="flex-1">
            <div className="relative w-[500px] h-[400px] border border-gray-500/[0.2] rounded-[12px] bg-cover bg-center overflow-hidden">
                <Image 
                    src={backgroundImage} 
                    alt="Generated Poster" 
                    width={2000} 
                    height={1500} 
                    className="absolute top-0 left-0 w-full h-full rounded-[12px] object-cover" 
                />
                
                {/* Editable Text Overlays */}
                <div className="absolute inset-0">
                    {textStyles.map((textStyle, index) => (
                        <Draggable
                            key={index}
                            nodeRef={nodeRefs[index]}
                            position={{ x: textStyle.x, y: textStyle.y }}
                            onStop={(e, data) => {
                                onPositionChange(index, data.x, data.y);
                            }}
                            bounds="parent"
                        >
                            <div
                                ref={nodeRefs[index]}
                                onClick={() => onTextClick(index)}
                                style={{
                                    position: 'absolute',
                                    width: `${textStyle.width}%`,
                                    fontSize: `${textStyle.fontSize}px`,
                                    color: textStyle.color,
                                    backgroundColor: textStyle.bgColor,
                                    cursor: 'move',
                                    padding: textStyle.bgColor !== 'transparent' ? '8px 12px' : '0',
                                    borderRadius: '4px',
                                    fontWeight: textStyle.fontWeight || (index === 0 ? 'bold' : index === 1 ? '600' : 'normal'),
                                    lineHeight: '1.2',
                                    textTransform: (textStyle.textTransform || 'none') as 'none' | 'uppercase' | 'lowercase' | 'capitalize',
                                    letterSpacing: textStyle.letterSpacing || 'normal',
                                    fontFamily: textStyle.fontFamily || 'Inter',
                                    textAlign: (textStyle.textAlign || 'left') as 'left' | 'center' | 'right' | 'justify'
                                }}
                                className={`hover:outline hover:outline-2 hover:outline-blue-500 ${selectedTextIndex === index ? 'outline outline-2 outline-blue-500' : ''}`}
                            >
                                {textStyle.content}
                            </div>
                        </Draggable>
                    ))}
                </div>

                {/* Regenerating Overlay */}
                {isRegenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[12px]">
                        <div className="text-white flex flex-col items-center gap-2">
                            <SpinnerIcon className="animate-spin" size={32} />
                            <p className="text-sm">Regenerating background...</p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="flex gap-2 mt-4">
                <Button size="small" onClick={onAddText}>
                    <PencilIcon /> Add Text
                </Button>
                <Button size="small" variant="secondary" onClick={onRegenerateBackground} disabled={isRegenerating}>
                    {isRegenerating ? <SpinnerIcon className="animate-spin" /> : <ArrowsClockwiseIcon />} Regenerate BG
                </Button>
                <Button size="small" variant="secondary" onClick={onNewPoster}>
                    New Poster
                </Button>
            </div>
        </div>
    );
}
