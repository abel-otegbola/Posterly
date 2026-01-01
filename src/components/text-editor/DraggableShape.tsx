'use client'
import { Shape } from "@/types/interfaces/editor";
import Draggable from "react-draggable";
import { RefObject } from "react";

interface DraggableShapeProps {
    shape: Shape;
    shapeRef: RefObject<HTMLDivElement | null>;
    isSelected: boolean;
    onClick: (id: string) => void;
    onPositionChange: (id: string, x: number, y: number) => void;
}

export default function DraggableShape({
    shape,
    shapeRef,
    isSelected,
    onClick,
    onPositionChange
}: DraggableShapeProps) {
    const getShapeStyles = () => {
        const baseStyles: React.CSSProperties = {
            position: 'absolute',
            cursor: 'move',
            opacity: shape.opacity,
            transform: shape.rotation ? `rotate(${shape.rotation}deg)` : 'none',
            zIndex: shape.zIndex || 0
        };

        if (shape.type === 'triangle') {
            return {
                ...baseStyles,
                width: '0',
                height: '0',
                backgroundColor: 'transparent',
                borderLeft: `${shape.width / 2}px solid transparent`,
                borderRight: `${shape.width / 2}px solid transparent`,
                borderBottom: `${shape.height}px solid ${shape.color}`,
                borderRadius: '0'
            };
        }

        return {
            ...baseStyles,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            backgroundColor: shape.color,
            borderRadius: shape.type === 'circle' ? '50%' : `${shape.borderRadius || 0}px`
        };
    };

    return (
        <Draggable
            nodeRef={shapeRef}
            position={{ x: shape.x, y: shape.y }}
            onStop={(e, data) => {
                onPositionChange(shape.id, data.x, data.y);
            }}
            bounds="parent"
        >
            <div
                ref={shapeRef}
                onClick={() => onClick(shape.id)}
                style={getShapeStyles()}
                className={`hover:outline hover:outline-2 hover:outline-blue-500 ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
            />
        </Draggable>
    );
}
