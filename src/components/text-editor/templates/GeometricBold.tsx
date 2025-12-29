import { TextStyle } from "../TextEditor";

export const GeometricBoldTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 30, 
        y: 60, 
        width: 70, 
        fontWeight: "900", 
        textTransform: "uppercase", 
        letterSpacing: "-0.03em", 
        fontFamily: "Bebas Neue",
        textAlign: "center" 
    },
    { 
        fontSize: 11, 
        color: "rgba(255, 255, 255, 0.7)", 
        bgColor: "transparent", 
        x: 30, 
        y: 130, 
        width: 60, 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "0.05em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "rgba(255, 255, 255, 0.6)", 
        bgColor: "transparent", 
        x: 30, 
        y: 150, 
        width: 55, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.03em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 9, 
        color: "rgba(255, 255, 255, 0.5)", 
        bgColor: "transparent", 
        x: 30, 
        y: 168, 
        width: 50, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
