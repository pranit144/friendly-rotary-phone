import { useEffect, useRef } from "react";

/**
 * MathEquationsBg — Subtle mathematical equations floating in the background.
 * Low opacity, clean "research" vibe.
 */

const EQUATIONS = [
    "∂L/∂W",
    "f(x) = σ(Wx + b)",
    "H(p, q) = -∑ p(x) log q(x)",
    "E = mc²",
    "∇f(x)",
    "softmax(zᵢ) = eᶻⁱ / ∑eᶻʲ",
    "ReLU(x) = max(0, x)",
    "MSE = 1/n ∑(y - ŷ)²",
    "z = ∑ wᵢxᵢ + b",
    "p(y|x) = exp(w·x) / Z",
    "Attention(Q, K, V)",
    "d = √∑(xᵢ - yᵢ)²",
];

const MathEquationsBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; text: string; opacity: number }[]>([]);
    const animRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const init = () => {
            particlesRef.current = [];
            for (let i = 0; i < 25; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    text: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
                    opacity: Math.random() * 0.12 + 0.05,
                });
            }
        };

        resize();
        init();
        window.addEventListener("resize", resize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "italic 16px 'serif'";

            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -100) p.x = canvas.width + 100;
                if (p.x > canvas.width + 100) p.x = -100;
                if (p.y < -50) p.y = canvas.height + 50;
                if (p.y > canvas.height + 50) p.y = -50;

                ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
                ctx.fillText(p.text, p.x, p.y);
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
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
};

export default MathEquationsBg;
