import { Shape, TextStyle } from "@/types/interfaces/editor";

export const IntelligenceQuoteTemplate: Omit<TextStyle, 'content'>[] = [
    {
        fontSize: 28,
        color: "#ffffff",
        bgColor: "transparent",
        x: 94,
        y: 176,
        width: "320px",
        fontWeight: "600",
        textTransform: "capitalize",
        letterSpacing: "normal",
        fontFamily: "Poppins",
        textAlign: "center",
        zIndex: 20,
        styleClass: "text-glass"
    },
    {
        fontSize: 9,
        color: "#ffd561",
        bgColor: "transparent",
        x: 94,
        y: 158,
        width: "320px",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "3px",
        fontFamily: "Montserrat",
        textAlign: "center",
        zIndex: 20
    },
    {
        fontSize: 11,
        color: "#cccccc",
        bgColor: "transparent",
        x: 112,
        y: 222,
        width: "280px",
        fontWeight: "400",
        textTransform: "none",
        letterSpacing: "normal",
        fontFamily: "Lato",
        textAlign: "center",
        zIndex: 20
    }
];

export const IntelligenceQuoteShapes: Omit<Shape, 'id'>[] = [
    {
        type: "rectangle",
        x: 82,
        y: 145,
        width: 340,
        height: 120,
        color: "#ffffff",
        opacity: 0.1,
        borderRadius: 16,
        zIndex: 5
    }
];