import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

/**
 * StatsCounter — adapted from index (1) copy.html
 * Animated counting stats with glassmorphism card,
 * triggers on scroll into view.
 */

const STATS = [
    { value: 15, suffix: "+", label: "Projects Built", emoji: "🚀" },
    { value: 4, suffix: "+", label: "Hackathons Won", emoji: "🏆" },
    { value: 3, suffix: "", label: "Research Papers", emoji: "📄" },
    { value: 1000, suffix: "+", label: "Lines of Python", emoji: "🐍" },
];

const AnimatedNumber = ({
    target,
    suffix,
    duration = 2000,
    started,
}: {
    target: number;
    suffix: string;
    duration?: number;
    started: boolean;
}) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!started) return;
        const start = performance.now();
        function step(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(eased * target);
            setCurrent(val);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }, [started, target, duration]);

    const display = target >= 1000 ? current.toLocaleString() : String(current);
    return (
        <span>
            {display}
            {suffix}
        </span>
    );
};

const StatsCounter = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setStarted(true);
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-full max-w-5xl mx-auto -mt-8 relative z-10 px-4"
        >
            <div
                className="grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden"
                style={{
                    background: "rgba(5, 8, 22, 0.45)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                }}
            >
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="py-8 px-6 text-center relative group transition-colors hover:bg-white/50"
                    >
                        <div className="text-2xl mb-2">{stat.emoji}</div>
                        <div
                            className="text-3xl sm:text-4xl font-extrabold"
                            style={{
                                background: "linear-gradient(135deg, #915eff, #00cea8)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            <AnimatedNumber
                                target={stat.value}
                                suffix={stat.suffix}
                                started={started}
                            />
                        </div>
                        <div className="text-sm text-gray-500 mt-2 font-medium">
                            {stat.label}
                        </div>
                        {/* Vertical divider (except last) */}
                        {i < STATS.length - 1 && (
                            <div
                                className="absolute right-0 top-[20%] h-[60%] w-px hidden md:block"
                                style={{ background: "rgba(13,13,43,0.08)" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatsCounter;
