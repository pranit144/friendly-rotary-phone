import { useEffect, useRef } from "react";

/**
 * DataStreamBg — Matrix-style but AI/ML focused.
 * Shows binary, vectors, and weights [0.12, 0.88] in vertical streams.
 */

type Stream = {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    opacity: number;
};

const DataStreamBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamsRef = useRef<Stream[]>([]);
    const animRef = useRef(0);

    const charSets = [
        "01",
        "0123456789",
        "[]{},.+-*/=",
        "W=θλβε",
        "λ=0.88",
        "[0.1, 0.9]",
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStreams = () => {
            const cols = Math.floor(canvas.width / 40);
            streamsRef.current = [];
            for (let i = 0; i < cols; i++) {
                streamsRef.current.push({
                    x: i * 40 + Math.random() * 20,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 2 + 1,
                    chars: [],
                    opacity: Math.random() * 0.15 + 0.05,
                });
            }
        };

        resize();
        initStreams();
        window.addEventListener("resize", resize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "12px monospace";

            streamsRef.current.forEach((s) => {
                s.y += s.speed;
                if (s.y > canvas.height) {
                    s.y = -100;
                    s.speed = Math.random() * 2 + 1;
                }

                // Randomly add a new bit of data to the trail
                if (Math.random() > 0.95 || s.chars.length === 0) {
                    const set = charSets[Math.floor(Math.random() * charSets.length)];
                    const char = set[Math.floor(Math.random() * set.length)];
                    s.chars.push(char);
                    if (s.chars.length > 15) s.chars.shift();
                }

                s.chars.forEach((c, i) => {
                    const alpha = s.opacity * (i / s.chars.length);
                    ctx.fillStyle = `rgba(145, 94, 255, ${alpha})`;
                    ctx.fillText(c, s.x, s.y - i * 18);
                });
            });

            animRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            style={{ zIndex: -1 }}
        />
    );
};

export default DataStreamBg;
