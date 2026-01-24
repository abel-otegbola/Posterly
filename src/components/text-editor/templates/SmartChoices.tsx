import { TextStyle, Shape } from "@/types/interfaces/editor";

export const SmartChoicesTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 32, 
        color: "#ffd561", 
        bgColor: "transparent", 
        x: 37, 
        y: 81, 
        width: "299px", 
        fontWeight: "600", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Open Sans",
        textAlign: "left",
        zIndex: 20,
        styleClass: "text-glass"
    },
    { 
        fontSize: 8, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 37, 
        y: 38, 
        width: "200px", 
        fontWeight: "500", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Poppins",
        textAlign: "left",
        zIndex: 20,
        styleClass: "text-soft-glow"
    },
    { 
        fontSize: 13, 
        color: "#ffffff", 
        bgColor: "#1f1f1f", 
        x: 28, 
        y: 198, 
        width: "280px", 
        fontWeight: "500", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Montserrat",
        textAlign: "left",
        zIndex: 20,
        styleClass: "text-neon-soft"
    },
    { 
        fontSize: 10, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 37, 
        y: 356, 
        width: "380px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Lato",
        textAlign: "left",
        zIndex: 20,
        styleClass: "text-glass"
    }
];

export const SmartChoicesShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle",
        x: 288.6666259765625,
        y: 33.3333740234375,
        width: 180,
        height: 330,
        color: "#000000",
        opacity: 1,
        borderRadius: 11,
        zIndex: 21
    }
];