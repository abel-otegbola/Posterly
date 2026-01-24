import { Shape, TextStyle } from "@/types/interfaces/editor";

export const GlassCardTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 24, color: "#ffffff", bgColor: "transparent", 
        x: 100, y: 160, width: "300px", fontWeight: "700", 
        textTransform: "capitalize", fontFamily: "Poppins", 
        textAlign: "center", zIndex: 25 
    },
    { 
        fontSize: 10, color: "#ffffff", bgColor: "transparent", 
        x: 100, y: 200, width: "300px", fontWeight: "300", 
        fontFamily: "Open Sans", textAlign: "center", zIndex: 25,
    }
];

export const GlassCardShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle", x: 75, y: 125, width: 350, height: 150,
        color: "#ffffff", opacity: 0.15, borderRadius: 24, zIndex: 10
        // Use your CSS to add 'backdrop-blur-lg' to this zIndex
    }
];