'use client'
import { SpinnerIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { TextStyle, Shape } from "@/types/interfaces/editor";
import DraggableText from "./DraggableText";
import DraggableShape from "./DraggableShape";
import { RefObject } from "react";

interface PosterCanvasProps {
    posterRef: RefObject<HTMLDivElement | null>;
    backgroundImage: string;
    textStyles: TextStyle[];
    shapes: Shape[];
    nodeRefs: RefObject<HTMLDivElement | null>[];
    shapeRefs: RefObject<HTMLDivElement | null>[];
    selectedTextIndex: number | null;
    selectedShapeId: string | null;
    isRegenerating: boolean;
    onTextClick: (index: number) => void;
    onShapeClick: (id: string) => void;
    onPositionChange: (index: number, x: number, y: number) => void;
    onShapePositionChange: (id: string, x: number, y: number) => void;
    onDeselectText: () => void;
}

export default function PosterCanvas({
    posterRef,
    backgroundImage,
    textStyles,
    shapes,
    nodeRefs,
    shapeRefs,
    selectedTextIndex,
    selectedShapeId,
    isRegenerating,
    onTextClick,
    onShapeClick,
    onPositionChange,
    onShapePositionChange,
    onDeselectText
}: PosterCanvasProps) {
    const handleContainerClick = (e: React.MouseEvent) => {
        // Deselect if clicking on the container or background image
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IMG') {
            onDeselectText();
        }
    };

    return (
        <div 
            ref={posterRef}
            className="relative sm:w-[500px] w-full h-[400px] sm:scale-100 scale-75 border border-gray-500/[0.2] bg-cover bg-center overflow-hidden"
            onClick={handleContainerClick}
        >
            <Image 
                src={backgroundImage} 
                alt="Generated Poster" 
                width={2000} 
                height={1500} 
                className="absolute top-0 left-0 w-full h-full object-cover" 
                style={{ zIndex: 1 }}
            />
            
            {/* Editable Text Overlays */}
            <div className="absolute inset-0">
                {textStyles.map((textStyle, index) => (
                    <DraggableText
                        key={index}
                        textStyle={textStyle}
                        index={index}
                        nodeRef={nodeRefs[index]}
                        isSelected={selectedTextIndex === index}
                        onClick={onTextClick}
                        onPositionChange={onPositionChange}
                    />
                ))}

                {/* Shape Overlays */}
                {shapes.map((shape, index) => (
                    <DraggableShape
                        key={shape.id}
                        shape={shape}
                        shapeRef={shapeRefs[index]}
                        isSelected={selectedShapeId === shape.id}
                        onClick={onShapeClick}
                        onPositionChange={onShapePositionChange}
                    />
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
    );
}
