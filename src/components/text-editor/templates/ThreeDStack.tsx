import { TextStyle, Shape } from "../TextEditor";

export const ThreeDStackTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 20, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 148, 
        y: 77, 
        width: "208px", 
        fontWeight: "900", 
        textTransform: "uppercase", 
        letterSpacing: "normal", 
        fontFamily: "Anton",
        textAlign: "right",
        zIndex: 2
    },
    { 
        fontSize: 12, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 148, 
        y: 136, 
        width: "200px", 
        fontWeight: "600", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Bebas Neue",
        textAlign: "right",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(200, 220, 180, 0.19)", 
        x: 133, 
        y: 269, 
        width: "238px", 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Helvetica",
        textAlign: "center",
        zIndex: 2
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 51, 
        y: 348, 
        width: "398px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Courier New",
        textAlign: "center",
        zIndex: 2
    }
];

export const ThreeDStackShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'rectangle',
        x: 133,
        y: 192,
        width: 238,
        height: 195,
        color: '#d1a8c2',
        opacity: 0.42,
        rotation: 0,
        borderRadius: 25,
        zIndex: 2
    }
];
