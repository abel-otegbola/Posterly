import { TextStyle } from "../TextEditor";

export const SmartChoicesTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 24, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 50, 
        y: 80, 
        width: 80, 
        fontWeight: "900", 
        textTransform: "capitalize", 
        letterSpacing: "-0.02em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 12, 
        color: "rgba(255, 255, 255, 0.6)", 
        bgColor: "transparent", 
        x: 50, 
        y: 160, 
        width: 60, 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "0.05em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "rgba(255, 255, 255, 0.5)", 
        bgColor: "transparent", 
        x: 50, 
        y: 180, 
        width: 60, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.03em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "rgba(255, 255, 255, 0.4)", 
        bgColor: "transparent", 
        x: 50, 
        y: 200, 
        width: 50, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.02em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
