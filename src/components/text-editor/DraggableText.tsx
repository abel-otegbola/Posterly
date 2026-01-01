'use client'
import { TextStyle } from "@/types/interfaces/editor";
import Draggable from "react-draggable";
import { RefObject } from "react";

interface DraggableTextProps {
    textStyle: TextStyle;
    index: number;
    nodeRef: RefObject<HTMLDivElement | null>;
    isSelected: boolean;
    onClick: (index: number) => void;
    onPositionChange: (index: number, x: number, y: number) => void;
}

export default function DraggableText({
    textStyle,
    index,
    nodeRef,
    isSelected,
    onClick,
    onPositionChange
}: DraggableTextProps) {
    return (
        <Draggable
            nodeRef={nodeRef}
            position={{ x: textStyle.x, y: textStyle.y }}
            onStop={(e, data) => {
                onPositionChange(index, data.x, data.y);
            }}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                onClick={() => onClick(index)}
                style={{
                    position: 'absolute',
                    width: typeof textStyle.width === 'number' ? `${textStyle.width}px` : textStyle.width,
                    fontSize: `${textStyle.fontSize}px`,
                    color: textStyle.color,
                    backgroundColor: textStyle.bgColor,
                    cursor: 'move',
                    padding: textStyle.bgColor !== 'transparent' ? '8px 12px' : '0',
                    borderRadius: '4px',
                    fontWeight: textStyle.fontWeight || (index === 0 ? 'bold' : index === 1 ? '600' : 'normal'),
                    lineHeight: '1.2',
                    textTransform: (textStyle.textTransform || 'none') as 'none' | 'uppercase' | 'lowercase' | 'capitalize',
                    letterSpacing: textStyle.letterSpacing || 'normal',
                    fontFamily: textStyle.fontFamily || 'Inter',
                    textAlign: (textStyle.textAlign || 'left') as 'left' | 'center' | 'right' | 'justify',
                    zIndex: textStyle.zIndex || 0
                }}
                className={`hover:outline hover:outline-2 hover:outline-blue-500 ${isSelected ? 'outline outline-2 outline-blue-500' : ''} ${textStyle.styleClass || ''}`}
            >
                {textStyle.content}
            </div>
        </Draggable>
    );
}
