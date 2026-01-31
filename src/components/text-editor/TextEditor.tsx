'use client'
import { useState } from "react";
import PosterPreview from "./PosterPreview";
import PosterEditorSidebar from "./PosterEditorSidebar";
import TextEditorPanel from "./TextEditorPanel";
import ShapeEditorPanel from "./ShapeEditorPanel";
import { TextStyle, Shape, TextEditorProps } from "@/types/interfaces/editor";
import { POSTER_TEMPLATES } from "./templates";
import { 
    getInitialTextStyles, 
    getInitialShapes, 
    addNewText as createNewText, 
    addNewShape as createNewShape,
    bringForward,
    sendBackward
} from "./helpers/editorHelpers";
import { ListIcon } from "@phosphor-icons/react";

export default function TextEditor({ 
    backgroundImage, 
    initialTexts, 
    initialPrompt = "", 
    onClose, 
    onRegenerateBackground 
}: TextEditorProps) {
    const [currentTemplate, setCurrentTemplate] = useState(0);
    const [textStyles, setTextStyles] = useState<TextStyle[]>(() => getInitialTextStyles(initialTexts));
    const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(null);
    const [shapes, setShapes] = useState<Shape[]>(() => getInitialShapes());
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState<"Texts" | "Shapes" | "Templates">("Texts");
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [showLeftbar, setShowLeftbar] = useState(true);
    const [showRightbar, setShowRightbar] = useState(true);

    const applyTemplate = (templateIndex: number) => {
        if (!initialTexts) return;
        const template = POSTER_TEMPLATES[templateIndex];
        const contents = [
            initialTexts.headline,
            initialTexts.subheadline,
            initialTexts.bodyText,
            initialTexts.additionalInfo
        ];
        setTextStyles(template.styles.map((style, index) => ({
            ...style,
            content: contents[index] || ""
        })));
        
        if (template.shapes) {
            setShapes(template.shapes.map((shape, index) => ({
                ...shape,
                id: `shape-${Date.now()}-${index}`
            })));
        } else {
            setShapes([]);
        }
        
        setCurrentTemplate(templateIndex);
    };

    const updateTextStyle = (index: number, updates: Partial<TextStyle>) => {
        const newStyles = [...textStyles];
        newStyles[index] = { ...newStyles[index], ...updates };
        setTextStyles(newStyles);
    }

    const addNewText = () => {
        const newText = createNewText(textStyles, shapes);
        setTextStyles([...textStyles, newText]);
        setSelectedTextIndex(textStyles.length);
        setSelectedShapeId(null);
        setShowEditor(true);
    }

    const addNewShape = (type: 'rectangle' | 'circle' | 'triangle') => {
        const newShape = createNewShape(type, textStyles, shapes);
        setShapes([...shapes, newShape]);
        setSelectedShapeId(newShape.id);
        setSelectedTextIndex(null);
        setShowEditor(true);
    }

    const updateShape = (id: string, updates: Partial<Shape>) => {
        const newShapes = shapes.map(shape => 
            shape.id === id ? { ...shape, ...updates } : shape
        );
        setShapes(newShapes);
    }

    const deleteShape = (id: string) => {
        setShapes(shapes.filter(shape => shape.id !== id));
        setSelectedShapeId(null);
        setShowEditor(false);
    }

    const deleteText = (index: number) => {
        const newStyles = textStyles.filter((_, i) => i !== index);
        setTextStyles(newStyles);
        setSelectedTextIndex(null);
        setShowEditor(false);
    }

    const bringTextForward = (index: number) => {
        const maxZIndex = bringForward(textStyles, shapes);
        updateTextStyle(index, { zIndex: maxZIndex });
    }

    const sendTextBackward = (index: number) => {
        const minZIndex = sendBackward(textStyles, shapes);
        updateTextStyle(index, { zIndex: minZIndex });
    }

    const bringShapeForward = (id: string) => {
        const maxZIndex = bringForward(textStyles, shapes);
        updateShape(id, { zIndex: maxZIndex });
    }

    const sendShapeBackward = (id: string) => {
        const minZIndex = sendBackward(textStyles, shapes);
        updateShape(id, { zIndex: minZIndex });
    }

    const handleRegenerateBackground = async () => {
        if (onRegenerateBackground) {
            setIsRegenerating(true);
            await onRegenerateBackground(initialPrompt);
            setIsRegenerating(false);
        }
    }

    const handleTextClick = (index: number) => {
        setSelectedTextIndex(index);
        setSelectedShapeId(null);
        setShowEditor(true);
    }

    const handleShapeClick = (id: string) => {
        setSelectedShapeId(id);
        setSelectedTextIndex(null);
        setShowEditor(true);
    }

    const handleShapePositionChange = (id: string, x: number, y: number) => {
        updateShape(id, { x, y });
    }

    const handlePositionChange = (index: number, x: number, y: number) => {
        updateTextStyle(index, { x, y });
    }

    const handleDeselectText = () => {
        setSelectedTextIndex(null);
        setSelectedShapeId(null);
        setShowEditor(false);
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex justify-between items-center gap-2 bg-black text-white">
                <button className="p-4" onClick={() => setShowLeftbar(!showLeftbar)}><ListIcon /></button>
                <p>Posterly</p>
                <button className="p-4" onClick={() => setShowRightbar(!showRightbar)}><ListIcon /></button>
            </div>
            <div className="flex gap-6 w-full relative">
                {/* Left Sidebar - Poster Editor */}
                <PosterEditorSidebar
                    show={show}
                    setShow={setShow}
                    textStyles={textStyles}
                    shapes={shapes}
                    selectedTextIndex={selectedTextIndex}
                    selectedShapeId={selectedShapeId}
                    currentTemplate={currentTemplate}
                    onApplyTemplate={applyTemplate}
                    onTextClick={handleTextClick}
                    onShapeClick={handleShapeClick}
                    onAddShape={addNewShape}
                    showLeftbar={showLeftbar}
                    onClose={() => setShowLeftbar(false)}
                />
                
                {/* Center - Poster Preview */}
                <div className="flex justify-center items-center flex-1 w-full py-4 px-auto">
                    <PosterPreview
                        backgroundImage={backgroundImage}
                        textStyles={textStyles}
                        shapes={shapes}
                        selectedTextIndex={selectedTextIndex}
                        selectedShapeId={selectedShapeId}
                        onTextClick={handleTextClick}
                        onShapeClick={handleShapeClick}
                        onAddText={addNewText}
                        onNewPoster={onClose || (() => {})}
                        onRegenerateBackground={handleRegenerateBackground}
                        onPositionChange={handlePositionChange}
                        onShapePositionChange={handleShapePositionChange}
                        onDeselectText={handleDeselectText}
                        isRegenerating={isRegenerating}
                    />
                </div>

                {/* Right Sidebar - Text Editor Panel */}
                {showEditor && selectedTextIndex !== null && (
                    <TextEditorPanel
                        textStyle={textStyles[selectedTextIndex]}
                        index={selectedTextIndex}
                        onUpdate={updateTextStyle}
                        onDelete={deleteText}
                        onBringForward={bringTextForward}
                        onSendBackward={sendTextBackward}
                        onClose={() => setShowEditor(false)}
                        showRightbar={showRightbar}
                        onCloseRightbar={() => setShowRightbar(false)}
                    />
                )}

                {/* Right Sidebar - Shape Editor Panel */}
                {showEditor && selectedShapeId !== null && (() => {
                    const shape = shapes.find(s => s.id === selectedShapeId);
                    if (!shape) return null;
                    return (
                        <ShapeEditorPanel
                            shape={shape}
                            onUpdate={updateShape}
                            onDelete={deleteShape}
                            onBringForward={bringShapeForward}
                            onSendBackward={sendShapeBackward}
                            onClose={() => setShowEditor(false)}
                            showRightbar={showRightbar}
                            onCloseRightbar={() => setShowRightbar(false)}
                        />
                    );
                })()}
            </div>
        </div>
    );
}
