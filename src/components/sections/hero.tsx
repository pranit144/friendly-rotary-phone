import { motion } from "framer-motion";

import { styles } from "../../styles";
import { cn } from "../../utils/lib";
import { textVariant } from "../../utils/motion";
import { TrainingSimulationBg } from "../../components";

// Hero
export const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <TrainingSimulationBg />
      <div
        className={cn(
          styles.paddingX,
          "absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5",
        )}
      >
        {/* Title */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* About Me */}
        <div>
          <motion.h1
            variants={textVariant(0.1)}
            initial="hidden"
            animate="show"
            className={cn(styles.heroHeadText)}
          >
            Hi, I'm{" "}
            <span className="hero-gradient-text">Pranit</span>
          </motion.h1>
          <motion.p
            variants={textVariant(0.2)}
            initial="hidden"
            animate="show"
            className={cn(styles.heroSubText, "mt-2")}
          >
            AI/ML Engineer & Full Stack Developer <br className="sm:block hidden" />
            at VIT Pune | Building intelligent solutions
          </motion.p>

          {/* Status tag — from reference */}
          <motion.div
            variants={textVariant(0.3)}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, rgba(145,94,255,0.12), rgba(0,206,168,0.12))",
              border: "1px solid rgba(145,94,255,0.25)",
              color: "#915eff",
              letterSpacing: "2px",
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-[#00cea8]"
              style={{ animation: "statusPulse 2s ease-in-out infinite" }}
            />
            Open to Opportunities
          </motion.div>
        </div>
      </div>

      {/* Scroll to about section */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>

      {/* Inline keyframes for hero effects */}
      <style>{`
        .hero-gradient-text {
          background: linear-gradient(135deg, #915eff, #ff6b6b, #00cea8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: heroGradientShift 4s ease infinite;
        }
        @keyframes heroGradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
