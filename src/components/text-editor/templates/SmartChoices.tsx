import { TextStyle, Shape } from "../TextEditor";

export const SmartChoicesTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 40, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 50, 
        y: 136, 
        width: "400px", 
        fontWeight: "700", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Playfair Display",
        textAlign: "center",
        zIndex: 4,
        styleClass: "text-soft-glow"
    },
    { 
        fontSize: 11, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 148, 
        y: 63, 
        width: "200px", 
        fontWeight: "500", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Poppins",
        textAlign: "center",
        zIndex: 3
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(200, 200, 200, 0.15)", 
        x: 140, 
        y: 265, 
        width: "220px", 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Montserrat",
        textAlign: "center",
        zIndex: 5
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 60, 
        y: 345, 
        width: "380px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Lato",
        textAlign: "center",
        zIndex: 2
    }
];

export const SmartChoicesShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'circle',
        x: 145,
        y: 105,
        width: 210,
        height: 210,
        color: '#e8d5c4',
        opacity: 0.4,
        rotation: 0,
        borderRadius: 50,
        zIndex: 2
    }
];
