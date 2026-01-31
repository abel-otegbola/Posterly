export const exportPosterAsPNG = async (
    posterElement: HTMLDivElement
): Promise<void> => {
    try {
        // Dynamically import dom-to-image-more only when needed (client-side)
        const domtoimage = (await import('dom-to-image-more')).default;
        

        // Temporarily hide all outlines and borders by setting inline styles
        const elementsWithOutlineOrBorder = posterElement.querySelectorAll('.outline, [class*="outline-"], [class*="border"], [style*="border"], [style*="outline"]');
        const originalStyles: {
            element: HTMLElement;
            outline: string;
            outlineWidth: string;
            outlineColor: string;
            border: string;
            borderWidth: string;
            borderColor: string;
            borderStyle: string;
        }[] = [];

        elementsWithOutlineOrBorder.forEach((el) => {
            const htmlEl = el as HTMLElement;
            originalStyles.push({
                element: htmlEl,
                outline: htmlEl.style.outline,
                outlineWidth: htmlEl.style.outlineWidth,
                outlineColor: htmlEl.style.outlineColor,
                border: htmlEl.style.border,
                borderWidth: htmlEl.style.borderWidth,
                borderColor: htmlEl.style.borderColor,
                borderStyle: htmlEl.style.borderStyle
            });
            htmlEl.style.outline = 'none';
            htmlEl.style.outlineWidth = '0';
            htmlEl.style.outlineColor = 'transparent';
            htmlEl.style.border = 'none';
            htmlEl.style.borderWidth = '0';
            htmlEl.style.borderColor = 'transparent';
            htmlEl.style.borderStyle = 'none';
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
        

        // Restore original outline and border styles
        originalStyles.forEach(({ element, outline, outlineWidth, outlineColor, border, borderWidth, borderColor, borderStyle }) => {
            element.style.outline = outline;
            element.style.outlineWidth = outlineWidth;
            element.style.outlineColor = outlineColor;
            element.style.border = border;
            element.style.borderWidth = borderWidth;
            element.style.borderColor = borderColor;
            element.style.borderStyle = borderStyle;
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
