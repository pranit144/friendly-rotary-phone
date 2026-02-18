import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

// All gallery images
const ROW_1 = [
    { src: "/gallery/slide-2.jpg", label: "Solutions 25 — Winner" },
    { src: "/gallery/slide-3.jpg", label: "Team VedaVerse" },
    { src: "/gallery/slide-8.jpg", label: "Rolls-Royce Vibes" },
    { src: "/gallery/slide-10.jpg", label: "Beach Vibes" },
    { src: "/gallery/slide-14.jpg", label: "Event Day" },
    { src: "/gallery/slide-20.jpg", label: "Hackathon Discussion" },
    { src: "/gallery/slide-21.jpg", label: "Heritage Visit" },
    { src: "/gallery/slide-25.jpg", label: "AI + IoT Project" },
    { src: "/gallery/slide-30.jpg", label: "Cavista Hackathon" },
    { src: "/gallery/slide-33.jpg", label: "Group Photo" },
    { src: "/gallery/slide-36.jpg", label: "Sunset Adventure" },
    { src: "/gallery/slide-7.jpg", label: "Project Presentation" },
    { src: "/gallery/slide-15.jpg", label: "Stage Moment" },
    { src: "/gallery/slide-22.jpg", label: "Friends & Memories" },
    { src: "/gallery/slide-29.jpg", label: "Festival Celebration" },
    { src: "/gallery/slide-34.jpg", label: "Tech Exhibition" },
    { src: "/gallery/slide-1.gif", label: "AI Showcase" },
    { src: "/gallery/slide-11.jpg", label: "Conference Moment" },
    { src: "/gallery/slide-18.jpg", label: "Study Hour" },
];

const ROW_2 = [
    { src: "/gallery/slide-4.jpg", label: "Profile" },
    { src: "/gallery/slide-5.jpg", label: "Formal Portrait" },
    { src: "/gallery/slide-6.jpg", label: "Hackathon Prep" },
    { src: "/gallery/slide-9.jpg", label: "Workshop Session" },
    { src: "/gallery/slide-12.jpg", label: "Campus Activity" },
    { src: "/gallery/slide-13.jpg", label: "Coding Session" },
    { src: "/gallery/slide-16.jpg", label: "Tech Talk" },
    { src: "/gallery/slide-17.jpg", label: "Networking Event" },
    { src: "/gallery/slide-19.jpg", label: "Award Ceremony" },
    { src: "/gallery/slide-23.jpg", label: "Campus Life" },
    { src: "/gallery/slide-24.jpg", label: "Seminar" },
    { src: "/gallery/slide-26.jpg", label: "Workshop" },
    { src: "/gallery/slide-27.jpg", label: "Certificate" },
    { src: "/gallery/slide-28.jpg", label: "Coding Marathon" },
    { src: "/gallery/slide-31.jpg", label: "Lab Work" },
    { src: "/gallery/slide-32.jpg", label: "Event Coordination" },
    { src: "/gallery/slide-35.jpg", label: "Maserati Vibes" },
    { src: "/gallery/slide-37.jpg", label: "Exploration Day" },
    { src: "/gallery/slide-38.jpeg", label: "LinkedIn Profile" },
];

// Marquee row component
const MarqueeRow = ({
    images,
    direction,
    speed,
}: {
    images: typeof ROW_1;
    direction: "left" | "right";
    speed: number;
}) => {
    const rowRef = useRef<HTMLDivElement>(null);

    // Duplicate images for seamless loop
    const duplicated = [...images, ...images];

    return (
        <div
            className="relative overflow-hidden group/row"
            style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        >
            <div
                ref={rowRef}
                className="flex gap-4 w-max hover:[animation-play-state:paused]"
                style={{
                    animation: `marquee-${direction} ${speed}s linear infinite`,
                }}
            >
                {duplicated.map((img, i) => (
                    <div
                        key={`${img.src}-${i}`}
                        className="relative flex-shrink-0 rounded-xl overflow-hidden group/card"
                        style={{
                            width: "280px",
                            height: "200px",
                            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease",
                        }}

                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.05) translateY(-4px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(145, 94, 255, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {/* Hover label */}
                        <div
                            className="absolute inset-0 flex items-end opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                            }}
                        >
                            <span className="text-white text-xs font-medium px-3 pb-3 drop-shadow-lg">
                                {img.label}
                            </span>
                        </div>
                        {/* Subtle border glow */}
                        <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                border: "1px solid rgba(145, 94, 255, 0.4)",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ImageSlider = () => {

    return (
        <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="mt-16 w-full"
        >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(145,94,255,0.15), rgba(0,206,168,0.15))",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#galleryGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <defs>
                            <linearGradient id="galleryGrad" x1="0" y1="0" x2="24" y2="24">
                                <stop offset="0%" stopColor="#915eff" />
                                <stop offset="100%" stopColor="#00cea8" />
                            </linearGradient>
                        </defs>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-white text-lg font-bold tracking-tight">Gallery</h3>
                    <p className="text-gray-500 text-xs">Moments that define the journey</p>
                </div>
                <div className="flex-1 h-[1px] ml-4" style={{ background: "linear-gradient(to right, rgba(145,94,255,0.2), transparent)" }} />
            </div>

            {/* Marquee rows */}
            <div className="flex flex-col gap-4">
                <MarqueeRow
                    images={ROW_1}
                    direction="left"
                    speed={60}
                />
                <MarqueeRow
                    images={ROW_2}
                    direction="right"
                    speed={70}
                />
            </div>

            {/* Hint text */}
            <p className="text-center text-xs text-gray-600 mt-4 italic">
                Hover to pause
            </p>

            {/* Keyframe animations injected via style tag */}
            <style>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </motion.div>
    );
};

export default ImageSlider;
