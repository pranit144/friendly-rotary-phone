import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { github, preview } from "../../assets";
import { PROJECTS } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { styles } from "../../styles";
import { cn } from "../../utils/lib";
import { fadeIn, textVariant } from "../../utils/motion";
import { DataStreamBg } from "../../components";

type ProjectCardProps = (typeof PROJECTS)[number] & {
  index: number;
};

// Project Card
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_site_link,
}: ProjectCardProps) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className='w-full sm:w-[360px] group'
  >
    <Tilt
      options={{
        max: 25,
        scale: 1,
        speed: 450,
      }}
      className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col relative overflow-hidden"
    >
      {/* Full Description Overlay on Hover */}
      <div className="absolute inset-0 bg-[#050816]/90 backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 text-center">
        <h3 className="text-white font-bold text-[20px] mb-4">Project Details</h3>
        <p className="text-secondary text-[14px] leading-relaxed overflow-y-auto max-h-[70%] custom-scrollbar">
          {description}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          {/* Re-adding links in the overlay for accessibility */}
          <div
            onClick={() => window.open(live_site_link, "_blank", "noreferrer")}
            className="bg-[#0f172a] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
          >
            <img src={preview} alt="Live Site" className="w-1/2 h-1/2 object-contain" />
          </div>
          <div
            onClick={() => window.open(source_code_link, "_blank", "noreferrer")}
            className="bg-[#0f172a] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
          >
            <img src={github} alt="Github" className="w-1/2 h-1/2 object-contain" />
          </div>
        </div>
      </div>

      <div className="relative w-full h-[230px]">
        {/* Work image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Quick Links */}
        <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2 z-10">
          <div
            onClick={() => window.open(live_site_link, "_blank", "noreferrer")}
            className="bg-[#0f172a] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={preview}
              alt="Live Site"
              title="Live Site"
              className="w-2/3 h-2/3 object-contain"
            />
          </div>

          <div
            onClick={() =>
              window.open(source_code_link, "_blank", "noreferrer")
            }
            className="bg-[#0f172a] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={github}
              alt="Github"
              title="Github"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Work Info */}
      <div className="mt-5 flex-grow">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px] line-clamp-3">{description}</p>
      </div>

      {/* Work Tag */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, tagIdx) => (
          <p key={`Tag-${tagIdx}`} className={cn(tag.color, "text-[14px]")}>
            #{tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

// Works
export const Works = () => {
  return (
    <SectionWrapper idName="projects" className="relative">
      <DataStreamBg />
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        {/* About */}
        <div className="w-full flex">
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Following projects showcase my expertise in AI/ML, deep learning,
            and full-stack development. From multi-agent LLM systems and
            computer vision inspection platforms to geospatial analytics and
            GenAI applications — each project reflects real-world problem solving
            with cutting-edge technology.
          </motion.p>
        </div>

        {/* Project Card */}
        <div className="mt-20 flex flex-wrap gap-7">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={`project-${i}`} index={i} {...project} />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};

export default Works;
