import { TextStyle } from "../TextEditor";

export const PlayfulSplitTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 80, 
        y: 80, 
        width: 50, 
        fontWeight: "900", 
        textTransform: "uppercase", 
        letterSpacing: "0em", 
        fontFamily: "Oswald",
        textAlign: "center" 
    },
    { 
        fontSize: 11, 
        color: "#444444", 
        bgColor: "transparent", 
        x: 80, 
        y: 145, 
        width: 55, 
        fontWeight: "400", 
        textTransform: "none", 
        letterSpacing: "0.05em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 10, 
        color: "#666666", 
        bgColor: "transparent", 
        x: 80, 
        y: 165, 
        width: 50, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0.03em", 
        fontFamily: "Inter",
        textAlign: "center" 
    },
    { 
        fontSize: 9, 
        color: "#888888", 
        bgColor: "transparent", 
        x: 80, 
        y: 183, 
        width: 45, 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "0em", 
        fontFamily: "Inter",
        textAlign: "center" 
    }
];
