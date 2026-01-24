import { Shape, TextStyle } from "@/types/interfaces/editor";

export const MinimalistQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, color: "#1a1a1a", bgColor: "transparent", 
        x: 40, y: 60, width: "300px", fontWeight: "700", 
        textTransform: "uppercase", letterSpacing: "2px", 
        fontFamily: "Montserrat", textAlign: "left", zIndex: 20 
    },
    { 
        fontSize: 10, color: "#666666", bgColor: "transparent", 
        x: 40, y: 45, width: "200px", fontWeight: "400", 
        textTransform: "uppercase", letterSpacing: "1px", 
        fontFamily: "Lato", textAlign: "left", zIndex: 20 
    },
    { 
        fontSize: 12, color: "#333333", bgColor: "transparent", 
        x: 40, y: 110, width: "250px", fontWeight: "300", 
        textTransform: "none", letterSpacing: "normal", 
        fontFamily: "Open Sans", textAlign: "left", zIndex: 20 
    }
];

export const MinimalistQuoteShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle", x: 30, y: 40, width: 4, height: 100,
        color: "#1a1a1a", opacity: 1, borderRadius: 0, zIndex: 10
    }
];