import { SmartChoicesTemplate } from "./SmartChoices";
import { MinimalistQuoteTemplate } from "./MinimalistQuote";
import { GeometricBoldTemplate } from "./GeometricBold";
import { IntelligenceQuoteTemplate } from "./IntelligenceQuote";
import { PlayfulSplitTemplate } from "./PlayfulSplit";
import { ThreeDStackTemplate } from "./ThreeDStack";
import { TextStyle } from "../TextEditor";

export interface PosterTemplate {
    name: string;
    description: string;
    styles: Omit<TextStyle, 'content'>[];
}

export const POSTER_TEMPLATES: PosterTemplate[] = [
    {
        name: "Smart Choices",
        description: "Bold statement with faded layers",
        styles: SmartChoicesTemplate
    },
    {
        name: "Minimalist Quote",
        description: "Centered elegant simplicity",
        styles: MinimalistQuoteTemplate
    },
    {
        name: "Geometric Bold",
        description: "Shapes and condensed type",
        styles: GeometricBoldTemplate
    },
    {
        name: "Intelligence Quote",
        description: "Large impactful statement",
        styles: IntelligenceQuoteTemplate
    },
    {
        name: "Playful Split",
        description: "Staggered word placement",
        styles: PlayfulSplitTemplate
    },
    {
        name: "3D Stack",
        description: "Bold stacked with depth",
        styles: ThreeDStackTemplate
    }
];
