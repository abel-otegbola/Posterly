import { Shape, TextStyle } from "@/types/interfaces/editor";

export const BrutalistTrendTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, color: "#000000", bgColor: "#D9EF34", // Using your primary lime color
        x: 40, y: 40, width: "auto", fontWeight: "900", 
        textTransform: "uppercase", letterSpacing: "-1px", 
        fontFamily: "Inter", textAlign: "left", zIndex: 20,
        styleClass: "px-4 py-2 shadow-xl" // Makes the title pop like a sticker
    },
    { 
        fontSize: 11, color: "#ffffff", bgColor: "#000000", 
        x: 40, y: 100, width: "180px", fontWeight: "500", 
        textTransform: "none", letterSpacing: "normal", 
        fontFamily: "Space Mono", textAlign: "left", zIndex: 20,
        styleClass: "p-2 underline decoration-primary"
    },
    { 
        fontSize: 9, color: "#000000", bgColor: "transparent", 
        x: 320, y: 340, width: "140px", fontWeight: "700", 
        textTransform: "uppercase", letterSpacing: "2px", 
        fontFamily: "Montserrat", textAlign: "right", zIndex: 20 
    }
];

export const BrutalistShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle", x: 0, y: 0, width: 10, height: 400,
        color: "#D9EF34", opacity: 1, borderRadius: 0, zIndex: 10
    }
];