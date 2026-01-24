import { Shape, TextStyle } from "@/types/interfaces/editor";

export const CinematicTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 28, color: "#ffffff", bgColor: "transparent", 
        x: 0, y: 180, width: "500px", fontWeight: "800", 
        textTransform: "uppercase", letterSpacing: "8px", 
        fontFamily: "Cinzel", textAlign: "center", zIndex: 20 
    },
    { 
        fontSize: 9, color: "#D9EF34", bgColor: "transparent", 
        x: 0, y: 365, width: "500px", fontWeight: "600", 
        textTransform: "uppercase", letterSpacing: "4px", 
        fontFamily: "Inter", textAlign: "center", zIndex: 20 
    }
];

export const CinematicShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle", x: 0, y: 350, width: 500, height: 50,
        color: "#000000", opacity: 0.9, borderRadius: 0, zIndex: 5
    }
];