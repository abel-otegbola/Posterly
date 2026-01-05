import { TextStyle, Shape, GeneratedTexts } from "@/types/interfaces/editor";
import { POSTER_TEMPLATES } from "../templates";

export const getInitialTextStyles = (initialTexts?: GeneratedTexts): TextStyle[] => {
    if (!initialTexts) return [];
    
    const { content, styles } = initialTexts;
    const contents = [
        content.headline,
        content.subheadline,
        content.bodyText,
        content.additionalInfo
    ];
    
    // Use AI-generated styles if available, otherwise fall back to template
    if (styles) {
        return [
            {
                content: contents[0] || "",
                fontSize: styles.headline.fontSize,
                color: styles.headline.color,
                bgColor: "transparent",
                x: 50,
                y: 50,
                width: 80,
                fontFamily: styles.headline.fontFamily,
                fontWeight: styles.headline.fontWeight,
                textTransform: styles.headline.textTransform,
                letterSpacing: styles.headline.letterSpacing,
                zIndex: 2
            },
            {
                content: contents[1] || "",
                fontSize: styles.subheadline.fontSize,
                color: styles.subheadline.color,
                bgColor: "transparent",
                x: 50,
                y: 150,
                width: 70,
                fontFamily: styles.subheadline.fontFamily,
                fontWeight: styles.subheadline.fontWeight,
                textTransform: styles.subheadline.textTransform,
                letterSpacing: styles.subheadline.letterSpacing,
                zIndex: 3
            },
            {
                content: contents[2] || "",
                fontSize: styles.bodyText.fontSize,
                color: styles.bodyText.color,
                bgColor: "transparent",
                x: 50,
                y: 220,
                width: 60,
                fontFamily: styles.bodyText.fontFamily,
                fontWeight: styles.bodyText.fontWeight,
                textTransform: styles.bodyText.textTransform,
                letterSpacing: styles.bodyText.letterSpacing,
                zIndex: 4
            },
            {
                content: contents[3] || "",
                fontSize: styles.additionalInfo.fontSize,
                color: styles.additionalInfo.color,
                bgColor: "transparent",
                x: 50,
                y: 280,
                width: 50,
                fontFamily: styles.additionalInfo.fontFamily,
                fontWeight: styles.additionalInfo.fontWeight,
                textTransform: styles.additionalInfo.textTransform,
                letterSpacing: styles.additionalInfo.letterSpacing,
                zIndex: 5
            }
        ];
    }
    
    // Fallback to template if no styles provided
    const template = POSTER_TEMPLATES[0];
    return contents.map((content, index) => {
        const styleIdx = index % template.styles.length;
        return {
            ...template.styles[styleIdx],
            content: content || "",
        };
    });
};

export const getInitialShapes = (): Shape[] => {
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

export const addNewText = (
    textStyles: TextStyle[], 
    shapes: Shape[]
): TextStyle => {
    return {
        content: "New Text",
        fontSize: 16,
        color: "#000000",
        bgColor: "transparent",
        x: 50,
        y: 50,
        width: 40,
        zIndex: textStyles.length + shapes.length + 2
    };
};

export const addNewShape = (
    type: 'rectangle' | 'circle' | 'triangle',
    textStyles: TextStyle[],
    shapes: Shape[]
): Shape => {
    return {
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
};

export const bringForward = (
    textStyles: TextStyle[],
    shapes: Shape[]
): number => {
    return Math.max(
        ...textStyles.map(t => t.zIndex || 0),
        ...shapes.map(s => s.zIndex || 0)
    ) + 1;
};

export const sendBackward = (
    textStyles: TextStyle[],
    shapes: Shape[]
): number => {
    const minZIndex = Math.min(
        ...textStyles.map(t => t.zIndex || 2),
        ...shapes.map(s => s.zIndex || 2)
    );
    return Math.max(2, minZIndex - 1);
};
