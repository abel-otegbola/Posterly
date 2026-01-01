import { SmartChoicesTemplate, SmartChoicesShapes } from "./SmartChoices";
import { MinimalistQuoteTemplate, MinimalistQuoteShapes } from "./MinimalistQuote";
import { GeometricBoldTemplate, GeometricBoldShapes } from "./GeometricBold";
import { IntelligenceQuoteTemplate, IntelligenceQuoteShapes } from "./IntelligenceQuote";
import { PlayfulSplitTemplate, PlayfulSplitShapes } from "./PlayfulSplit";
import { ThreeDStackTemplate, ThreeDStackShapes } from "./ThreeDStack";
import { TextStyle, Shape } from "@/types/interfaces/editor";

export interface PosterTemplate {
    name: string;
    description: string;
    styles: Omit<TextStyle, 'content'>[];
    shapes?: Omit<Shape, 'id'>[];
}

export const POSTER_TEMPLATES: PosterTemplate[] = [
    {
        name: "Smart Choices",
        description: "Bold statement with faded layers",
        styles: SmartChoicesTemplate,
        shapes: SmartChoicesShapes
    },
    {
        name: "Minimalist Quote",
        description: "Centered elegant simplicity",
        styles: MinimalistQuoteTemplate,
        shapes: MinimalistQuoteShapes
    },
    {
        name: "Geometric Bold",
        description: "Shapes and condensed type",
        styles: GeometricBoldTemplate,
        shapes: GeometricBoldShapes
    },
    {
        name: "Intelligence Quote",
        description: "Large impactful statement",
        styles: IntelligenceQuoteTemplate,
        shapes: IntelligenceQuoteShapes
    },
    {
        name: "Playful Split",
        description: "Staggered word placement",
        styles: PlayfulSplitTemplate,
        shapes: PlayfulSplitShapes
    },
    {
        name: "3D Stack",
        description: "Bold stacked with depth",
        styles: ThreeDStackTemplate,
        shapes: ThreeDStackShapes
    }
];
