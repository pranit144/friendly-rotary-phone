import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { TECHNOLOGIES } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import { styles } from "../../styles";

type TechCardProps = {
  index: number;
  name: string;
  icon: string;
};

const TechCard = ({ index, name, icon }: TechCardProps) => (
  <Tilt
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
    className="w-28 h-28"
  >
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="w-full h-full green-pink-gradient p-[1px] rounded-full shadow-card cursor-pointer"
    >
      <div className="bg-tertiary rounded-full w-full h-full flex justify-center items-center overflow-hidden">
        <img
          src={icon}
          alt={name}
          className="w-16 h-16 object-contain p-2"
          title={name}
        />
      </div>
    </motion.div>
  </Tilt>
);

// Technologies
export const Tech = () => {
  return (
    <SectionWrapper>
      <>
        <motion.div variants={textVariant()} className="mb-10 text-center">
          <p className={styles.sectionSubText}>My technical toolbelt</p>
          <h2 className={styles.sectionHeadText}>Skills.</h2>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-10">
          {TECHNOLOGIES.map((technology, index) => (
            <TechCard
              key={technology.name}
              index={index}
              {...technology}
            />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};

export default Tech;
