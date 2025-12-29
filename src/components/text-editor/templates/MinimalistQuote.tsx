import { TextStyle } from "../TextEditor";

export const MinimalistQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 60, 
        y: 140, 
        width: 75, 
        fontWeight: "700", 
        textTransform: "lowercase", 
        letterSpacing: "0em", 
        fontFamily: "Playfair Display",
        textAlign: "center" 
    },
    { 
        fontSize: 11, 
        color: "#666666", 
        bgColor: "transparent", 
        x: 60, 
        y: 200, 
        width: 60, 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "0.05em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "#888888", 
        bgColor: "transparent", 
        x: 60, 
        y: 220, 
        width: 55, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.03em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 9, 
        color: "#999999", 
        bgColor: "transparent", 
        x: 60, 
        y: 238, 
        width: 50, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
