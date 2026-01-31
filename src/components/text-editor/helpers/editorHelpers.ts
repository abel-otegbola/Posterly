import { TextStyle, Shape, PosterTextContent } from "@/types/interfaces/editor";
import { POSTER_TEMPLATES } from "../templates";

export const getInitialTextStyles = (initialTexts?: PosterTextContent): TextStyle[] => {
    if (!initialTexts) return [];
    
    console.log("Initial Texts:", initialTexts);
    const content = initialTexts;
    const contents = [
        content.headline,
        content.subheadline,
        content.bodyText,
        content.additionalInfo
    ];
    
    const template = POSTER_TEMPLATES[Math.floor(Math.random() * 4)]; // Randomly select between first four templates
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
    const template = POSTER_TEMPLATES[Math.floor(Math.random() * 4)]; // Randomly select between first four templates
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
