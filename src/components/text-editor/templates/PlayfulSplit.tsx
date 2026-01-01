import { TextStyle, Shape } from "@/types/interfaces/editor";

export const PlayfulSplitTemplate: Omit<TextStyle, 'content'>[] = [
    { 
        fontSize: 52, 
        color: "#ffffff", 
        bgColor: "transparent", 
        x: 47, 
        y: 75, 
        width: "400px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Oswald",
        textAlign: "center",
        zIndex: 4,
        styleClass: "text-cinematic"
    },
    { 
        fontSize: 11, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 156, 
        y: 26, 
        width: "195px", 
        fontWeight: "400", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Raleway",
        textAlign: "center",
        zIndex: 6
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "rgba(180, 220, 200, 0.16)", 
        x: 128, 
        y: 271, 
        width: "244px", 
        fontWeight: "300", 
        textTransform: "none", 
        letterSpacing: "normal", 
        fontFamily: "Verdana",
        textAlign: "center",
        zIndex: 5
    },
    { 
        fontSize: 10, 
        color: "#000000", 
        bgColor: "transparent", 
        x: 48, 
        y: 351, 
        width: "404px", 
        fontWeight: "300", 
        textTransform: "capitalize", 
        letterSpacing: "normal", 
        fontFamily: "Arial",
        textAlign: "center",
        zIndex: 2
    }
];

export const PlayfulSplitShapes: Omit<Shape, 'id'>[] = [
    {
        type: 'triangle',
        x: 150,
        y: 185,
        width: 200,
        height: 215,
        color: '#a8d1c2',
        opacity: 0.38,
        rotation: 0,
        borderRadius: 0,
        zIndex: 2
    }
];
