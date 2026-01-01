import { TextStyle, Shape } from "@/types/interfaces/editor";

export const GeometricBoldTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 22, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 145, 
        y: 85, 
        width: "220px", 
        fontWeight: "900", 
        textTransform: "uppercase", 
        letterSpacing: "normal", 
        fontFamily: "Bebas Neue",
        textAlign: "right",
        zIndex: 2
    },
    { 
        fontSize: 12, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 145, 
        y: 142, 
        width: "190px", 
        fontWeight: "600", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Oswald",
        textAlign: "right",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(180, 180, 220, 0.18)", 
        x: 125, 
        y: 273, 
        width: "250px", 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Raleway",
        textAlign: "center",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 50, 
        y: 350, 
        width: "400px", 
        fontWeight: "300", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Open Sans",
        textAlign: "center",
        zIndex: 2
    }
];

export const GeometricBoldShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'rectangle',
        x: 125,
        y: 195,
        width: 250,
        height: 180,
        color: '#a8c4d1',
        opacity: 0.45,
        rotation: 0,
        borderRadius: 8,
        zIndex: 2
    }
];
