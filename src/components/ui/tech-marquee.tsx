/**
 * TechMarquee — adapted from index (1) copy.html
 * Horizontal infinitely scrolling strip of tech keywords.
 * Placed between sections for visual rhythm.
 */
const KEYWORDS = [
    "MACHINE LEARNING",
    "DEEP LEARNING",
    "COMPUTER VISION",
    "NEURAL NETWORKS",
    "TRANSFORMERS",
    "DATA SCIENCE",
    "PYTHON",
    "TENSORFLOW",
    "LANGCHAIN",
    "GENERATIVE AI",
    "NLP",
    "PyTorch",
];

const TechMarquee = () => {
    // Duplicate for seamless loop
    const items = [...KEYWORDS, ...KEYWORDS];

    return (
        <div
            className="relative z-1 overflow-hidden mx-4 sm:mx-6 rounded-3xl"
            style={{
                background: "#0d0d2b",
                padding: "36px 0",
            }}
        >
            <div
                className="flex gap-12 w-max"
                style={{
                    animation: "techMarquee 35s linear infinite",
                }}
            >
                {items.map((kw, i) => (
                    <span
                        key={`${kw}-${i}`}
                        className="whitespace-nowrap text-2xl sm:text-3xl font-extrabold select-none"
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            letterSpacing: "-0.5px",
                            ...(i % 2 === 0
                                ? {
                                    background: "linear-gradient(135deg, #915eff, #00cea8)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }
                                : {
                                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                                    color: "transparent",
                                }),
                        }}
                    >
                        {kw}
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes techMarquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default TechMarquee;
