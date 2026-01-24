import { Shape, TextStyle } from "@/types/interfaces/editor";

export const GeometricBoldTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 30, color: "#2c2c2c", bgColor: "transparent", 
        x: 200, y: 300, width: "250px", fontWeight: "400", 
        textTransform: "none", letterSpacing: "1px", 
        fontFamily: "Playfair Display", textAlign: "right", zIndex: 20 
    },
    { 
        fontSize: 9, color: "#8d775f", bgColor: "transparent", 
        x: 250, y: 285, width: "200px", fontWeight: "600", 
        textTransform: "uppercase", letterSpacing: "2px", 
        fontFamily: "Montserrat", textAlign: "right", zIndex: 20 
    },
    { 
        fontSize: 10, color: "#4a4a4a", bgColor: "transparent", 
        x: 200, y: 350, width: "250px", fontWeight: "400", 
        fontFamily: "Lato", textAlign: "right", zIndex: 20 
    }
];

export const GeometricBoldShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle", x: 380, y: 280, width: 80, height: 1,
        color: "#8d775f", opacity: 0.8, borderRadius: 0, zIndex: 10
    }
];