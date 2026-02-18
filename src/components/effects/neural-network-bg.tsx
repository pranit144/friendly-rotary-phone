import { useEffect, useRef } from "react";

/**
 * NeuralNetworkBg — A full-page interactive neural network canvas.
 * Nodes float, attract to mouse, glow, and form connections with signal pulses.
 */

type Node = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseRadius: number;
    radius: number;
    color: string;
    active: number;
};

const COLORS = ["#FF00E5", "#00E5FF", "#C6FF00", "#FF6B6B", "#E0C3FC"];
const NODE_COUNT = 100; // Increased density
const CONNECTION_DIST = 180; // Longer connections
const MOUSE_RADIUS = 300; // Larger interaction area

const NeuralNetworkBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const nodesRef = useRef<Node[]>([]);
    const animRef = useRef(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initNodes() {
            nodesRef.current = [];
            for (let i = 0; i < NODE_COUNT; i++) {
                nodesRef.current.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    baseRadius: Math.random() * 3 + 1,
                    radius: Math.random() * 3 + 1,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    active: 0,
                });
            }
        }

        resize();
        initNodes();
        window.addEventListener("resize", resize);

        function onMouseMove(e: MouseEvent) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }
        function onMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }
        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);

        function animate() {
            if (!ctx || !canvas) return;
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            timeRef.current += 0.015;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const nodes = nodesRef.current;

            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
                n.x = Math.max(0, Math.min(W, n.x));
                n.y = Math.max(0, Math.min(H, n.y));

                const dx = n.x - mx;
                const dy = n.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const targetActive = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;
                n.active += (targetActive - n.active) * 0.1;

                if (dist < MOUSE_RADIUS && dist > 5) {
                    const force = (1 - dist / MOUSE_RADIUS) * 0.025;
                    n.vx -= (dx / dist) * force;
                    n.vy -= (dy / dist) * force;
                }

                const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                if (speed > 1.8) { n.vx *= 1.8 / speed; n.vy *= 1.8 / speed; }

                n.radius = n.baseRadius + n.active * 6;
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > CONNECTION_DIST) continue;

                    const avgActive = (a.active + b.active) / 2;
                    const baseFade = 1 - dist / CONNECTION_DIST;
                    const alpha = baseFade * (0.25 + avgActive * 0.65);
                    if (alpha < 0.01) continue;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                    ctx.lineWidth = 1.0 + avgActive * 3.5;
                    ctx.stroke();

                    if (avgActive > 0.05) {
                        const t = ((timeRef.current * 3 + i * 0.1) % 1);
                        const sx = a.x + (b.x - a.x) * t;
                        const sy = a.y + (b.y - a.y) * t;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 2.5 + avgActive * 4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(0, 255, 230, ${avgActive * 0.9})`;
                        ctx.fill();
                    }
                }
            }

            for (const n of nodes) {
                if (n.active > 0.05) {
                    const glowR = 20 + n.active * 30;
                    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
                    glow.addColorStop(0, n.color.replace("rgb", "rgba").replace(")", `, ${n.active * 0.5})`));
                    glow.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = n.color;
                ctx.globalAlpha = 0.5 + n.active * 0.5;
                ctx.fill();
                ctx.globalAlpha = 1;

                if (n.active > 0.2) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 2 + n.active * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${n.active * 0.95})`;
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="neural-bg"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
                opacity: 0.8,
            }}
            aria-hidden
        />
    );
};

export default NeuralNetworkBg;
