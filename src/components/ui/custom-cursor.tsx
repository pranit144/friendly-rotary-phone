import { useEffect, useRef, useState, useCallback } from "react";

type Point = { x: number; y: number; alpha: number };

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const trail = useRef<Point[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const animationFrame = useRef<number>(0);
    const isTouchDevice = useRef(false);

    // Check if element is clickable
    const isClickable = useCallback((target: HTMLElement): boolean => {
        if (!target) return false;
        const tag = target.tagName;
        if (
            tag === "A" ||
            tag === "BUTTON" ||
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT" ||
            tag === "LABEL"
        )
            return true;
        if (target.getAttribute("role") === "button") return true;
        if (target.getAttribute("tabindex")) return true;
        if (target.onclick) return true;
        if (target.closest("a, button, [role='button'], [onclick]")) return true;
        try {
            if (window.getComputedStyle(target).cursor === "pointer") return true;
        } catch {
            // ignore
        }
        return false;
    }, []);

    useEffect(() => {
        // Detect touch device
        isTouchDevice.current =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            // Add trail point
            trail.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
            if (trail.current.length > 20) trail.current.shift();
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            setIsHovering(isClickable(e.target as HTMLElement));
        };

        // Animation logic
        const update = () => {
            if (!isVisible && trail.current.length === 0) {
                animationFrame.current = requestAnimationFrame(update);
                return;
            }

            // Smooth follow
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }

            if (ringRef.current) {
                const scale = isHovering ? 1.5 : isClicking ? 0.8 : 1;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`;
            }

            // Canvas drawing
            const canvas = canvasRef.current;
            if (canvas && isVisible) {
                const ctx = canvas.getContext("2d", { alpha: true });
                if (ctx) {
                    const w = window.innerWidth;
                    const h = window.innerHeight;
                    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for performance

                    if (canvas.width !== w * dpr) {
                        canvas.width = w * dpr;
                        canvas.height = h * dpr;
                        canvas.style.width = `${w}px`;
                        canvas.style.height = `${h}px`;
                    }

                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    ctx.clearRect(0, 0, w, h);

                    // Decay and Filter
                    trail.current.forEach(p => p.alpha *= 0.85); // Faster decay
                    trail.current = trail.current.filter(p => p.alpha > 0.1);

                    if (trail.current.length > 1) {
                        // Connections
                        ctx.beginPath();
                        ctx.moveTo(trail.current[0].x, trail.current[0].y);
                        for (let i = 1; i < trail.current.length; i++) {
                            ctx.lineTo(trail.current[i].x, trail.current[i].y);
                        }
                        ctx.strokeStyle = `rgba(145, 94, 255, 0.3)`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();

                        // Nodes
                        trail.current.forEach((p, i) => {
                            if (i % 4 !== 0) return;
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.alpha * 2.5, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(145, 94, 255, ${p.alpha * 0.6})`;
                            ctx.fill();
                        });
                    }
                }
            } else if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }

            animationFrame.current = requestAnimationFrame(update);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseOver);

        animationFrame.current = requestAnimationFrame(update);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseOver);
            cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    // No custom cursor for touch devices
    if (typeof window !== "undefined" && isTouchDevice.current) return null;

    const baseOpacity = isVisible ? 1 : 0;

    return (
        <div
            id="custom-cursor-root"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            {/* Neural trail canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    opacity: baseOpacity,
                    transition: "opacity 0.3s",
                }}
            />

            {/* Outer ring */}
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    width: isHovering ? 50 : 40,
                    height: isHovering ? 50 : 40,
                    marginLeft: isHovering ? -25 : -20,
                    marginTop: isHovering ? -25 : -20,
                    borderRadius: "50%",
                    border: `2px solid rgba(145, 94, 255, ${isHovering ? 0.8 : 0.5})`,
                    background: isHovering
                        ? "rgba(145, 94, 255, 0.12)"
                        : "transparent",
                    boxShadow: isHovering
                        ? "0 0 20px rgba(145, 94, 255, 0.4), inset 0 0 20px rgba(145, 94, 255, 0.15)"
                        : "0 0 12px rgba(145, 94, 255, 0.25)",
                    transform: isClicking ? "scale(0.75)" : "scale(1)",
                    transition:
                        "width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s, background 0.3s, box-shadow 0.3s, transform 0.15s",
                    opacity: baseOpacity,
                    pointerEvents: "none",
                    mixBlendMode: "normal",
                }}
            />

            {/* Inner dot */}
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    borderRadius: "50%",
                    background: "#915eff",
                    boxShadow:
                        "0 0 8px #915eff, 0 0 20px rgba(145, 94, 255, 0.5), 0 0 40px rgba(145, 94, 255, 0.15)",
                    opacity: baseOpacity,
                    transition: "opacity 0.3s",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};

export default CustomCursor;
