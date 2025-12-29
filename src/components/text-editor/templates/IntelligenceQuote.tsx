import { TextStyle } from "../TextEditor";

export const IntelligenceQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 40, 
        y: 100, 
        width: 85, 
        fontWeight: "900", 
        textTransform: "lowercase", 
        letterSpacing: "-0.02em", 
        fontFamily: "Poppins",
        textAlign: "center" 
    },
    { 
        fontSize: 12, 
        color: "#333333", 
        bgColor: "transparent", 
        x: 40, 
        y: 190, 
        width: 70, 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "0.05em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "#555555", 
        bgColor: "transparent", 
        x: 40, 
        y: 210, 
        width: 65, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.03em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 9, 
        color: "#777777", 
        bgColor: "transparent", 
        x: 40, 
        y: 228, 
        width: 60, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
