export interface TextStyle {
    content: string;
    fontSize: number;
    color: string;
    bgColor: string;
    x: number;
    y: number;
    width: string | number;
    fontWeight?: string;
    textTransform?: string;
    letterSpacing?: string;
    fontFamily?: string;
    textAlign?: string;
    zIndex?: number;
    styleClass?: string;
}

export interface Shape {
    id: string;
    type: 'rectangle' | 'circle' | 'triangle';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
    rotation?: number;
    borderRadius?: number;
    zIndex?: number;
}

export interface TextEditorProps {
    backgroundImage: string;
    initialTexts?: {
        headline: string;
        subheadline: string;
        bodyText: string;
        additionalInfo: string;
    };
    initialPrompt?: string;
    themeColor?: string;
    onClose?: () => void;
    onRegenerateBackground?: (prompt: string) => Promise<void>;
}

export interface PosterPreviewProps {
    backgroundImage: string;
    textStyles: TextStyle[];
    shapes: Shape[];
    selectedTextIndex: number | null;
    selectedShapeId: string | null;
    onTextClick: (index: number) => void;
    onShapeClick: (id: string) => void;
    onAddText: () => void;
    onNewPoster: () => void;
    onRegenerateBackground: () => void;
    onPositionChange: (index: number, x: number, y: number) => void;
    onShapePositionChange: (id: string, x: number, y: number) => void;
    onDeselectText: () => void;
    isRegenerating?: boolean;
}
