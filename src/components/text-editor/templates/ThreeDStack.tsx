import { TextStyle } from "../TextEditor";

export const ThreeDStackTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 50, 
        y: 80, 
        width: 75, 
        fontWeight: "900", 
        textTransform: "uppercase", 
        letterSpacing: "0.02em", 
        fontFamily: "Anton",
        textAlign: "center" 
    },
    { 
        fontSize: 12, 
        color: "rgba(255, 255, 255, 0.7)", 
        bgColor: "transparent", 
        x: 50, 
        y: 175, 
        width: 65, 
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
        x: 50, 
        y: 195, 
        width: 60, 
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
        x: 50, 
        y: 213, 
        width: 55, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
