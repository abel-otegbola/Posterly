import { TextStyle, Shape } from "../TextEditor";

export const SmartChoicesTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 24, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 198, 
        y: 148, 
        width: "100px", 
        fontWeight: "700", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Open Sans",
        textAlign: "left",
        zIndex: 20,
        styleClass: "text-soft-glow"
    },
    { 
        fontSize: 8, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 36, 
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
        fontSize: 8, 
        color: "#ffffff", 
        bgColor: "rgba(200, 200, 200, 0.15)", 
        x: 187, 
        y: 204, 
        width: "124px", 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Montserrat",
        textAlign: "left",
        zIndex: 20
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 63, 
        y: 355, 
        width: "380px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Lato",
        textAlign: "center",
        zIndex: 20,
        styleClass: "text-glass"
    }
];

export const SmartChoicesShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'rectangle',
        x: 183,
        y: 135,
        width: 128,
        height: 140,
        color: '#808080',
        opacity: 0.7,
        borderRadius: 11,
        zIndex: 11
    },
    {
        type: 'rectangle',
        x: 221,
        y: 97,
        width: 120,
        height: 80,
        color: '#808080',
        opacity: 0.8,
        borderRadius: 10,
        zIndex: 2
    },
    {
        type: 'rectangle',
        x: 304,
        y: 52,
        width: 60,
        height: 40,
        color: '#808080',
        opacity: 0.8,
        borderRadius: 0,
        zIndex: 9
    },
    {
        type: 'rectangle',
        x: 244,
        y: 207,
        width: 100,
        height: 110,
        color: '#808080',
        opacity: 0.6,
        borderRadius: 10,
        zIndex: 10
    },
    {
        type: 'rectangle',
        x: 176,
        y: 283,
        width: 60,
        height: 40,
        color: '#808080',
        opacity: 0.3,
        borderRadius: 3,
        zIndex: 11
    },
    {
        type: 'rectangle',
        x: 354,
        y: 104,
        width: 10,
        height: 100,
        color: '#808080',
        opacity: 0.2,
        borderRadius: 3,
        zIndex: 12
    }
];
