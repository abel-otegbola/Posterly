import { TextStyle, Shape } from "../TextEditor";

export const MinimalistQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 28, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 54, 
        y: 89, 
        width: "400px", 
        fontWeight: "600", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Poppins",
        textAlign: "center",
        zIndex: 2,
        styleClass: "text-elegant-shadow"
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 150, 
        y: 143, 
        width: "196px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Playfair Display",
        textAlign: "center",
        zIndex: 2,
        styleClass: "text-premium-gradient"
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(158, 158, 158, 0.13)", 
        x: 131, 
        y: 270, 
        width: "234px", 
        fontWeight: "300", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Inter",
        textAlign: "center",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 53, 
        y: 349, 
        width: "400px", 
        fontWeight: "300", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Inter",
        textAlign: "center",
        zIndex: 2
    }
];

export const MinimalistQuoteShapes: Omit<Shape, 'id'>[] = [];