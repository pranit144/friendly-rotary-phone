import { useRef, useState, useEffect, useCallback } from "react";
import { ComputersCanvas } from "../canvas";

// Floating Draggable 3D Computer
const FloatingComputer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialized, setInitialized] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Set initial position (bottom right of hero)
    useEffect(() => {
        const x = window.innerWidth - 520;
        const y = 100;
        setPosition({ x: Math.max(0, x), y });
        setInitialized(true);
    }, []);

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            // Only start drag from the handle bar
            const target = e.target as HTMLElement;
            if (!target.closest("[data-drag-handle]")) return;

            e.preventDefault();
            e.stopPropagation();
            isDragging.current = true;
            setIsDragActive(true);

            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                dragOffset.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }

            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        },
        [],
    );

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();

        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;

        // Keep within viewport bounds
        const maxX = window.innerWidth - 80;
        const maxY = document.documentElement.scrollHeight - 80;

        setPosition({
            x: Math.max(-200, Math.min(newX, maxX)),
            y: Math.max(-50, Math.min(newY, maxY)),
        });
    }, []);

    const handlePointerUp = useCallback(() => {
        isDragging.current = false;
        setIsDragActive(false);
    }, []);

    if (!initialized) return null;

    return (
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: isMinimized ? 60 : 480,
                height: isMinimized ? 60 : 400,
                zIndex: 10,
                transition: isDragActive
                    ? "none"
                    : "width 0.4s ease, height 0.4s ease",
            }}
        >
            {/* Drag handle bar */}
            <div
                data-drag-handle
                className="flex items-center justify-between px-3 rounded-t-xl"
                style={{
                    height: 32,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    borderBottom: "none",
                    cursor: "grab",
                    userSelect: "none",
                }}
            >
                {/* Traffic lights */}
                <div className="flex gap-1.5" data-drag-handle>
                    <div
                        className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                        style={{ cursor: "pointer" }}
                    />
                    <div
                        className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(!isMinimized);
                        }}
                        style={{ cursor: "pointer" }}
                    />
                    <div
                        className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(false);
                            setPosition({
                                x: window.innerWidth - 520,
                                y: 100,
                            });
                        }}
                        style={{ cursor: "pointer" }}
                    />
                </div>

                {/* Title */}
                <p
                    className="text-[11px] text-secondary/70 font-medium select-none"
                    data-drag-handle
                >
                    ⟐ 3D Computer — drag me anywhere
                </p>

                {/* Grip icon */}
                <div className="flex flex-col gap-[2px]" data-drag-handle>
                    <div className="flex gap-[2px]">
                        <div className="w-1 h-1 rounded-full bg-secondary/40" />
                        <div className="w-1 h-1 rounded-full bg-secondary/40" />
                    </div>
                    <div className="flex gap-[2px]">
                        <div className="w-1 h-1 rounded-full bg-secondary/40" />
                        <div className="w-1 h-1 rounded-full bg-secondary/40" />
                    </div>
                </div>
            </div>

            {/* 3D Canvas container */}
            {!isMinimized && (
                <div
                    className="rounded-b-xl overflow-hidden"
                    style={{
                        width: "100%",
                        height: "calc(100% - 32px)",
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        borderTop: "none",
                        boxShadow: isDragActive
                            ? "0 25px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(145, 94, 255, 0.1)"
                            : "0 15px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(145, 94, 255, 0.05)",
                        transition: "box-shadow 0.3s",
                    }}
                >
                    <ComputersCanvas />
                </div>
            )}

            {/* Minimized state */}
            {isMinimized && (
                <div
                    className="flex items-center justify-center rounded-b-xl"
                    style={{
                        width: "100%",
                        height: "calc(100% - 32px)",
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        borderTop: "none",
                    }}
                >
                    <span className="text-lg">🖥️</span>
                </div>
            )}
        </div>
    );
};

export default FloatingComputer;
