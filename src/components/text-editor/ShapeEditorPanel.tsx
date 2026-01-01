'use client'
import { Shape } from "@/types/interfaces/editor";
import Input from "../input/input";

interface ShapeEditorPanelProps {
    shape: Shape;
    onUpdate: (id: string, updates: Partial<Shape>) => void;
    onDelete: (id: string) => void;
    onBringForward: (id: string) => void;
    onSendBackward: (id: string) => void;
    onClose: () => void;
    showRightbar: boolean;
    onCloseRightbar: () => void;
}

export default function ShapeEditorPanel({
    shape,
    onUpdate,
    onDelete,
    onBringForward,
    onSendBackward,
    onClose,
    showRightbar,
    onCloseRightbar
}: ShapeEditorPanelProps) {
    return (
        <>
            {/* Backdrop for mobile */}
            <div 
                className={`md:hidden fixed top-[46px] inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    showRightbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onCloseRightbar}
            />
            
            <div className={`flex flex-col border border-gray-500/[0.1] bg-white py-4 h-[95vh] w-[250px]
                md:relative md:translate-x-0
                fixed right-0 md:top-0 top-[46px] z-50 transition-transform duration-300 ease-in-out ${
                    showRightbar ? 'translate-x-0' : 'translate-x-full'
                }`}>
            <h3 className="font-medium p-4">Edit Shape</h3>
            
            <div className="space-y-4 px-4 py-4 border-y border-gray-500/[0.1] flex-1 overflow-y-auto">
                <div>
                    <label className="block text-[12px] font-medium mb-1">Shape Type</label>
                    <p className="text-[10px] capitalize text-gray-600">{shape.type}</p>
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-1">Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={shape.color.startsWith('rgba') ? '#000000' : shape.color}
                            onChange={(e) => onUpdate(shape.id, { color: e.target.value })}
                            className="w-12 h-12 rounded-[12px]"
                        />
                        <Input
                            type="text"
                            value={shape.color}
                            onChange={(e) => onUpdate(shape.id, { color: e.target.value })}
                            className="flex-1"
                            placeholder="hex or rgba()"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-1">Opacity: {Math.round(shape.opacity * 100)}%</label>
                    <Input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={shape.opacity}
                        onChange={(e) => onUpdate(shape.id, { opacity: Number(e.target.value) })}
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-medium mb-1">Width (px)</label>
                        <input
                            type="number"
                            min="20"
                            max="500"
                            value={shape.width}
                            onChange={(e) => onUpdate(shape.id, { width: Number(e.target.value) })}
                            className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-medium mb-1">Height (px)</label>
                        <input
                            type="number"
                            min="20"
                            max="500"
                            value={shape.height}
                            onChange={(e) => onUpdate(shape.id, { height: Number(e.target.value) })}
                            className="w-full py-1 px-3 border border-gray-500/[0.2] rounded-[12px] outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-medium mb-1">Rotation: {shape.rotation || 0}°</label>
                    <Input
                        type="range"
                        min="0"
                        max="360"
                        value={shape.rotation || 0}
                        onChange={(e) => onUpdate(shape.id, { rotation: Number(e.target.value) })}
                        className="w-full"
                    />
                </div>

                {shape.type !== 'triangle' && (
                    <div>
                        <label className="block text-[10px] font-medium mb-1">Corner Radius: {shape.borderRadius || 0}px</label>
                        <Input
                            type="range"
                            min="0"
                            max="100"
                            value={shape.borderRadius || 0}
                            onChange={(e) => onUpdate(shape.id, { borderRadius: Number(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-[10px] font-medium mb-2">Layer Order</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onBringForward(shape.id)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                        >
                            Bring Forward
                        </button>
                        <button
                            onClick={() => onSendBackward(shape.id)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-500/[0.2] rounded-[8px] hover:bg-gray-200 text-[12px]"
                        >
                            Send Backward
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(shape.id)}
                    className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete Shape
                </button>

                <button
                    onClick={onClose}
                    className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Close Editor
                </button>
            </div>
        </div>
        </>
    );
}
