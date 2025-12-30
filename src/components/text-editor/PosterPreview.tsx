'use client'
import { ArrowsClockwiseIcon, PencilIcon, SpinnerIcon, DownloadIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Button from "../button/Button";
import { TextStyle, Shape } from "./TextEditor";
import Draggable from "react-draggable";
import { useMemo, useRef, useState } from "react";
import domtoimage from "dom-to-image-more";

interface PosterPreviewProps {
    backgroundImage: string;
    textStyles: TextStyle[];
    shapes: Shape[];
    selectedTextIndex: number | null;
    selectedShapeId: string | null;
    onTextClick: (index: number) => void;
    onShapeClick: (id: string) => void;
    onAddText: () => void;
    onNewPoster: () => void;
    onRegenerateBackground: () => void;
    onPositionChange: (index: number, x: number, y: number) => void;
    onShapePositionChange: (id: string, x: number, y: number) => void;
    onDeselectText: () => void;
    isRegenerating?: boolean;
}

export default function PosterPreview({
    backgroundImage,
    textStyles,
    shapes,
    selectedTextIndex,
    selectedShapeId,
    onTextClick,
    onShapeClick,
    onAddText,
    onNewPoster,
    onRegenerateBackground,
    onPositionChange,
    onShapePositionChange,
    onDeselectText,
    isRegenerating = false
}: PosterPreviewProps) {
    // Create refs array that matches the number of text styles
    const nodeRefs = useMemo(() => 
        textStyles.map(() => ({ current: null as HTMLDivElement | null })),
        [textStyles]
    );

    // Create refs array for shapes
    const shapeRefs = useMemo(() => 
        shapes.map(() => ({ current: null as HTMLDivElement | null })),
        [shapes]
    );

    const posterRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const exportAsPNG = async () => {
        if (!posterRef.current) return;
        
        setIsExporting(true);
        try {
            // Temporarily hide all outlines by setting inline styles
            const elementsWithOutline = posterRef.current.querySelectorAll('.outline, [class*="outline-"]');
            const originalStyles: { element: HTMLElement; outline: string; outlineWidth: string; outlineColor: string }[] = [];
            
            elementsWithOutline.forEach((el) => {
                const htmlEl = el as HTMLElement;
                originalStyles.push({
                    element: htmlEl,
                    outline: htmlEl.style.outline,
                    outlineWidth: htmlEl.style.outlineWidth,
                    outlineColor: htmlEl.style.outlineColor
                });
                htmlEl.style.outline = 'none';
                htmlEl.style.outlineWidth = '0';
                htmlEl.style.outlineColor = 'transparent';
            });
            
            const dataUrl = await domtoimage.toPng(posterRef.current, {
                quality: 1,
                width: posterRef.current.offsetWidth * 2,
                height: posterRef.current.offsetHeight * 2,
                style: {
                    transform: 'scale(2)',
                    transformOrigin: 'top left',
                    width: posterRef.current.offsetWidth + 'px',
                    height: posterRef.current.offsetHeight + 'px'
                }
            });
            
            // Restore original outline styles
            originalStyles.forEach(({ element, outline, outlineWidth, outlineColor }) => {
                element.style.outline = outline;
                element.style.outlineWidth = outlineWidth;
                element.style.outlineColor = outlineColor;
            });
            
            const link = document.createElement('a');
            link.download = `poster-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Export error:', error);
            alert('Export failed. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };



    const handleContainerClick = (e: React.MouseEvent) => {
        // Deselect if clicking on the container or background image
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IMG') {
            onDeselectText();
        }
    };

    return (
        <div className="">
            <div 
                ref={posterRef}
                className="relative w-[500px] h-[400px] border border-gray-500/[0.2] rounded-[12px] bg-cover bg-center overflow-hidden"
                onClick={handleContainerClick}
            >
                <Image 
                    src={backgroundImage} 
                    alt="Generated Poster" 
                    width={2000} 
                    height={1500} 
                    className="absolute top-0 left-0 w-full h-full rounded-[12px] object-cover" 
                    style={{ zIndex: 1 }}
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
                                    width: typeof textStyle.width === 'number' ? `${textStyle.width}px` : textStyle.width,
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
                                    textAlign: (textStyle.textAlign || 'left') as 'left' | 'center' | 'right' | 'justify',
                                    zIndex: textStyle.zIndex || 0
                                }}
                                className={`hover:outline hover:outline-2 hover:outline-blue-500 ${selectedTextIndex === index ? 'outline outline-2 outline-blue-500' : ''} ${textStyle.styleClass || ''}`}
                            >
                                {textStyle.content}
                            </div>
                        </Draggable>
                    ))}

                    {/* Shape Overlays */}
                    {shapes.map((shape, index) => (
                        <Draggable
                            key={shape.id}
                            nodeRef={shapeRefs[index]}
                            position={{ x: shape.x, y: shape.y }}
                            onStop={(e, data) => {
                                onShapePositionChange(shape.id, data.x, data.y);
                            }}
                            bounds="parent"
                        >
                            <div
                                ref={shapeRefs[index]}
                                onClick={() => onShapeClick(shape.id)}
                                style={{
                                    position: 'absolute',
                                    width: shape.type === 'triangle' ? '0' : `${shape.width}px`,
                                    height: shape.type === 'triangle' ? '0' : `${shape.height}px`,
                                    backgroundColor: shape.type === 'triangle' ? 'transparent' : shape.color,
                                    opacity: shape.opacity,
                                    cursor: 'move',
                                    borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'triangle' ? '0' : `${shape.borderRadius || 0}px`,
                                    transform: shape.rotation ? `rotate(${shape.rotation}deg)` : 'none',
                                    zIndex: shape.zIndex || 0,
                                    ...(shape.type === 'triangle' && {
                                        borderLeft: `${shape.width / 2}px solid transparent`,
                                        borderRight: `${shape.width / 2}px solid transparent`,
                                        borderBottom: `${shape.height}px solid ${shape.color}`
                                    })
                                }}
                                className={`hover:outline hover:outline-2 hover:outline-blue-500 ${selectedShapeId === shape.id ? 'outline outline-2 outline-blue-500' : ''}`}
                            />
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
            
            <div className="flex gap-2 mt-2">
                <Button size="small" variant="secondary" onClick={exportAsPNG} disabled={isExporting}>
                    {isExporting ? <SpinnerIcon className="animate-spin" /> : <DownloadIcon />} Export PNG
                </Button>
            </div>
        </div>
    );
}
