'use client'
import { ArrowsClockwiseIcon, PencilIcon, SpinnerIcon, DownloadIcon } from "@phosphor-icons/react";
import Button from "../button/Button";

interface PosterActionsProps {
    onAddText: () => void;
    onRegenerateBackground: () => void;
    onNewPoster: () => void;
    onExport: () => void;
    isRegenerating: boolean;
    isExporting: boolean;
}

export default function PosterActions({
    onAddText,
    onRegenerateBackground,
    onNewPoster,
    onExport,
    isRegenerating,
    isExporting
}: PosterActionsProps) {
    return (
        <>
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
                <Button size="small" variant="secondary" onClick={onExport} disabled={isExporting}>
                    {isExporting ? <SpinnerIcon className="animate-spin" /> : <DownloadIcon />} Export PNG
                </Button>
            </div>
        </>
    );
}
