import { motion } from "framer-motion";

import { styles } from "../../styles";
import { SERVICES } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";
import ImageSlider from "../ui/image-slider";
import TypewriterTerminal from "../ui/typewriter-terminal";

/**
 * Attn — Attention-styled text.
 * Intensity (w): h=high, m=medium, l=low.
 */
const Attn = ({ children, w = "m" }: { children: React.ReactNode; w?: "h" | "m" | "l" }) => {
    const intensities = {
        h: "text-purple-500 font-bold",
        m: "text-teal-500 font-medium",
        l: "text-blue-400 opacity-90",
    };
    return (
        <span
            className={`${intensities[w]} transition-all duration-300 hover:brightness-125 cursor-help hover:drop-shadow-[0_0_8px_rgba(145,94,255,0.8)]`}
        >
            {children}
        </span>
    );
};

const Chip = ({ children }: { children: React.ReactNode }) => (
    <div className="px-4 py-1.5 rounded-full border border-secondary/30 bg-white/10 backdrop-blur-sm text-sm text-secondary hover:border-purple-500 hover:text-purple-500 transition-all duration-300 cursor-default hover:-translate-y-1">
        {children}
    </div>
);

const ServiceCard = ({ index, title, icon }: { index: number; title: string; icon: string }) => (
    <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full sm:w-[250px] green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <img src={icon} alt={title} className="w-16 h-16 object-contain" />
            <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
    </motion.div>
);

const About = () => {
    return (
        <SectionWrapper idName="about">
            <>
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>// About Me</p>
                    <h2 className={styles.sectionHeadText}>
                        Turning neurons<br />into neural nets.
                    </h2>
                </motion.div>

                {/* Body — side by side: text + chips (left) | terminal (right) */}
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left — Text & Chips */}
                    <motion.div variants={fadeIn("right", "tween", 0.2, 1)}>
                        <p className="attn-paragraph text-secondary text-[17px] leading-[30px] mb-4">
                            I'm <Attn w="h">Pranit Chilbule</Attn> — an{" "}
                            <Attn w="h">AI/ML</Attn> student with an insatiable hunger for
                            understanding how <Attn w="m">machines</Attn> can{" "}
                            <Attn w="h">think</Attn>, <Attn w="h">learn</Attn>, and{" "}
                            <Attn w="m">create</Attn>. My journey began with a simple "Hello
                            World" and has <Attn w="l">evolved</Attn> into building{" "}
                            <Attn w="h">intelligent systems</Attn> that solve real-world
                            problems.
                        </p>

                        <p className="attn-paragraph text-secondary text-[17px] leading-[30px] mb-4">
                            When I'm not <Attn w="h">training models</Attn> or{" "}
                            <Attn w="m">debugging</Attn> code, you'll find me reading{" "}
                            <Attn w="h">research papers</Attn>, experimenting with new{" "}
                            <Attn w="h">architectures</Attn>, or brainstorming the next big idea
                            in <Attn w="m">AI</Attn>. I believe in building{" "}
                            <Attn w="l">technology</Attn> that <Attn w="h">matters</Attn>.
                        </p>

                        {/* Interest Chips - Staggered POP */}
                        <motion.div
                            variants={fadeIn("up", "spring", 0.5, 0.75)}
                            className="flex flex-wrap gap-3 mt-7"
                        >
                            <Chip>🤖 Machine Learning</Chip>
                            <Chip>🧠 Deep Learning</Chip>
                            <Chip>👁️ Computer Vision</Chip>
                            <Chip>💬 NLP</Chip>
                            <Chip>📊 Data Science</Chip>
                            <Chip>🎨 Generative AI</Chip>
                        </motion.div>
                    </motion.div>

                    {/* Right — Typewriter Terminal */}
                    <motion.div variants={fadeIn("left", "tween", 0.3, 1)}>
                        <TypewriterTerminal />
                    </motion.div>
                </div>

                <div className="mt-20">
                    <ImageSlider />
                </div>

                <div className="mt-20 flex flex-wrap gap-10">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.title} index={index} {...service} />
                    ))}
                </div>
            </>
        </SectionWrapper>
    );
};

export default About;
