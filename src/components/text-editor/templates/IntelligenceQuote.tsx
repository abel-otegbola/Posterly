import { TextStyle, Shape } from "../TextEditor";

export const IntelligenceQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 19, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 155, 
        y: 75, 
        width: "205px", 
        fontWeight: "700", 
        textTransform: "lowercase", 
        letterSpacing: "normal", 
        fontFamily: "Poppins",
        textAlign: "left",
        zIndex: 2
    },
    { 
        fontSize: 11, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 155, 
        y: 133, 
        width: "200px", 
        fontWeight: "500", 
        textTransform: "uppercase", 
        letterSpacing: "normal", 
        fontFamily: "Montserrat",
        textAlign: "left",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(220, 200, 180, 0.2)", 
        x: 135, 
        y: 268, 
        width: "230px", 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Merriweather",
        textAlign: "center",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 55, 
        y: 347, 
        width: "390px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Georgia",
        textAlign: "center",
        zIndex: 2
    }
];

export const IntelligenceQuoteShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'rectangle',
        x: 135,
        y: 188,
        width: 230,
        height: 205,
        color: '#c4a8d1',
        opacity: 0.35,
        rotation: 0,
        borderRadius: 15,
        zIndex: 2
    }
];
