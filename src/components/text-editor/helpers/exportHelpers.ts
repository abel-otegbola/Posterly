export const exportPosterAsPNG = async (
    posterElement: HTMLDivElement
): Promise<void> => {
    try {
        // Dynamically import dom-to-image-more only when needed (client-side)
        const domtoimage = (await import('dom-to-image-more')).default;
        
        // Temporarily hide all outlines by setting inline styles
        const elementsWithOutline = posterElement.querySelectorAll('.outline, [class*="outline-"]');
        const originalStyles: { 
            element: HTMLElement; 
            outline: string; 
            outlineWidth: string; 
            outlineColor: string 
        }[] = [];
        
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
        
        const dataUrl = await domtoimage.toPng(posterElement, {
            quality: 1,
            width: posterElement.offsetWidth * 2,
            height: posterElement.offsetHeight * 2,
            style: {
                transform: 'scale(2)',
                transformOrigin: 'top left',
                width: posterElement.offsetWidth + 'px',
                height: posterElement.offsetHeight + 'px'
            }
        });
        
        // Restore original outline styles
        originalStyles.forEach(({ element, outline, outlineWidth, outlineColor }) => {
            element.style.outline = outline;
            element.style.outlineWidth = outlineWidth;
            element.style.outlineColor = outlineColor;
        });
        
        // Download the image
        const link = document.createElement('a');
        link.download = `poster-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Export error:', error);
        throw new Error('Export failed. Please try again.');
    }
};
