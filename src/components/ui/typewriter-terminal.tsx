import { useEffect, useRef, useState } from "react";

/**
 * TypewriterTerminal — adapted from index (1) copy.html
 * Auto-typing Python code in a fake terminal, with syntax highlighting.
 * Uses IntersectionObserver to start only when visible.
 */

type Chunk = { text: string; cls: string };

const CODE_CHUNKS: Chunk[] = [
    { text: "# pranit_model.py\n", cls: "cmt" },
    { text: "import ", cls: "kw" }, { text: "tensorflow ", cls: "" }, { text: "as ", cls: "kw" }, { text: "tf\n", cls: "" },
    { text: "from ", cls: "kw" }, { text: "sklearn ", cls: "" }, { text: "import ", cls: "kw" }, { text: "train_test_split\n\n", cls: "fn" },
    { text: "model = tf.keras.", cls: "" }, { text: "Sequential", cls: "fn" }, { text: "([\n", cls: "" },
    { text: "    tf.keras.layers.", cls: "" }, { text: "Dense", cls: "fn" }, { text: "(128, ", cls: "" }, { text: '"relu"', cls: "str" }, { text: "),\n", cls: "" },
    { text: "    tf.keras.layers.", cls: "" }, { text: "Dropout", cls: "fn" }, { text: "(0.3),\n", cls: "" },
    { text: "    tf.keras.layers.", cls: "" }, { text: "Dense", cls: "fn" }, { text: "(10, ", cls: "" }, { text: '"softmax"', cls: "str" }, { text: ")\n])\n\n", cls: "" },
    { text: "model.", cls: "" }, { text: "compile", cls: "fn" }, { text: "(", cls: "" }, { text: '"adam"', cls: "str" }, { text: ", ", cls: "" }, { text: '"crossentropy"', cls: "str" }, { text: ")\n", cls: "" },
    { text: "model.", cls: "" }, { text: "fit", cls: "fn" }, { text: "(X, y, epochs=", cls: "" }, { text: "100", cls: "str" }, { text: ")\n\n", cls: "" },
    { text: "# Accuracy: 97.3% ✨", cls: "cmt" },
];

const COLORS: Record<string, string> = {
    kw: "#c678dd",   // purple keywords
    str: "#98c379",  // green strings
    fn: "#61afef",   // blue functions
    cmt: "rgba(255,255,255,0.3)", // dimmed comments
};

const TypewriterTerminal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    // Start typing when the component scrolls into view
    useEffect(() => {
        const el = containerRef.current;
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
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (!started || !bodyRef.current) return;
        const body = bodyRef.current;
        body.innerHTML = "";
        let idx = 0;

        function typeNext() {
            if (idx >= CODE_CHUNKS.length) {
                // Show blinking cursor at end
                body.innerHTML += '<span class="tw-cursor"></span>';
                return;
            }
            const chunk = CODE_CHUNKS[idx];
            const escaped = chunk.text
                .replace(/\n/g, "<br>")
                .replace(/ /g, "&nbsp;");

            if (chunk.cls) {
                body.innerHTML += `<span style="color:${COLORS[chunk.cls] || "#abb2bf"}">${escaped}</span>`;
            } else {
                body.innerHTML += escaped;
            }
            idx++;
            setTimeout(typeNext, chunk.text.length > 10 ? 55 : 30 + Math.random() * 45);
        }
        typeNext();
    }, [started]);

    return (
        <div ref={containerRef} className="w-full">
            <div
                className="rounded-2xl overflow-hidden"
                style={{
                    background: "#1e1e2e",
                    boxShadow: "0 16px 48px rgba(13,13,43,0.18)",
                }}
            >
                {/* Window chrome */}
                <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                >
                    <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                    <span
                        className="ml-2 text-xs"
                        style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.35)" }}
                    >
                        pranit_model.py
                    </span>
                </div>

                {/* Code body */}
                <div
                    ref={bodyRef}
                    className="p-5"
                    style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.78rem",
                        lineHeight: 1.9,
                        color: "#abb2bf",
                        minHeight: "180px",
                    }}
                />
            </div>

            <style>{`
                .tw-cursor {
                    display: inline-block;
                    width: 8px;
                    height: 15px;
                    background: #98c379;
                    vertical-align: text-bottom;
                    margin-left: 2px;
                    animation: twBlink 1s step-end infinite;
                }
                @keyframes twBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default TypewriterTerminal;
