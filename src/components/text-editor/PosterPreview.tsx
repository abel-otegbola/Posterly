'use client'
import { useMemo, useRef, useState } from "react";
import { PosterPreviewProps } from "@/types/interfaces/editor";
import PosterCanvas from "./PosterCanvas";
import PosterActions from "./PosterActions";
import { exportPosterAsPNG } from "./helpers/exportHelpers";

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

    const handleExport = async () => {
        if (!posterRef.current) return;
        
        setIsExporting(true);
        try {
            await exportPosterAsPNG(posterRef.current);
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="sm:w-auto w-full">
            <PosterCanvas
                posterRef={posterRef}
                backgroundImage={backgroundImage}
                textStyles={textStyles}
                shapes={shapes}
                nodeRefs={nodeRefs}
                shapeRefs={shapeRefs}
                selectedTextIndex={selectedTextIndex}
                selectedShapeId={selectedShapeId}
                isRegenerating={isRegenerating}
                onTextClick={onTextClick}
                onShapeClick={onShapeClick}
                onPositionChange={onPositionChange}
                onShapePositionChange={onShapePositionChange}
                onDeselectText={onDeselectText}
            />
            
            <PosterActions
                onAddText={onAddText}
                onRegenerateBackground={onRegenerateBackground}
                onNewPoster={onNewPoster}
                onExport={handleExport}
                isRegenerating={isRegenerating}
                isExporting={isExporting}
            />
        </div>
    );
}
