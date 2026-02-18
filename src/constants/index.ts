// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  creator,
  web,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  python,
  pytorch,
  opencv,
  numpy,
  pandas,
  streamlit,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  user1,
  user2,
  user3,
  youtube,
  linkedin,
  twitter,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Experience",
    link: null,
  },
  {
    id: "projects",
    title: "Projects",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "source-code",
    title: "GitHub",
    link: "https://github.com/pranit144",
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "AI/ML Engineer",
    icon: web,
  },
  {
    title: "Full Stack Developer",
    icon: mobile,
  },
  {
    title: "Data Scientist",
    icon: backend,
  },
  {
    title: "Research & Innovation",
    icon: creator,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "PyTorch",
    icon: pytorch,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "OpenCV",
    icon: opencv,
  },
  {
    name: "Streamlit",
    icon: streamlit,
  },
  {
    name: "Pandas",
    icon: pandas,
  },
  {
    name: "Numpy",
    icon: numpy,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Tailwind",
    icon: tailwind,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "AI/ML Intern",
    company_name: "Passion Infotech Pvt. Ltd",
    icon: starbucks,
    iconBg: "#383E56",
    date: "July 2024 – November 2024",
    points: [
      "Developed an emotion-aware music and visual relaxation system combining GANs, BERT, and computer vision for real-time facial emotion detection.",
      "Implemented a complete pipeline for real-time emotion analysis, personalized music recommendation, and synchronized visual generation.",
      "Built AI-driven immersive visuals for therapeutic use cases using deep learning and generative AI models.",
      "Tech Stack: GANs, BERT, LLMs, TensorFlow, Computer Vision, Deep Learning.",
    ],
  },
  {
    title: "AI Intern",
    company_name: "Softgrowth Infotech",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "June 2024",
    points: [
      "Designed comprehensive ML pipelines for AgriTech solutions including pest & disease detection, crop yield prediction, price forecasting, and soil analysis.",
      "Built geospatial intelligence tools for pest mapping, geofencing, and intrusion detection using QGIS and weather APIs.",
      "Created ML-powered REST APIs and interactive dashboards using Streamlit, collaborating with agronomists to refine models.",
      "Tech Stack: ML Pipelines, QGIS, APIs, Streamlit, XGBoost.",
    ],
  },
  {
    title: "4× National Hackathon Winner",
    company_name: "CAVISTA, AIT SOLVEX, Agri AI & SIH",
    icon: shopify,
    iconBg: "#383E56",
    date: "2024 – 2025",
    points: [
      "Winner at CAVISTA 2025, AIT SOLVEX 2025, and Agri AI Hackathon 2025 for developing innovative AI solutions.",
      "Runner-up at Smart India Hackathon 2024 — one of India's largest national-level hackathons.",
      "Built AI/ML-powered prototypes under tight time constraints, competing against 500+ participants nationwide.",
      "Delivered innovative solutions across healthcare, agriculture, and engineering domains.",
    ],
  },
  {
    title: "Founder & College Council Coordinator",
    company_name: "Innovsphere Tech Club — VIT Pune",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "2023 – 2024",
    points: [
      "Founded Innovsphere Tech Club — led a 200+ member tech community driving GenAI and automation initiatives.",
      "Organized 10+ campus events including workshops, hackathons, and tech talks with industry professionals.",
      "Published 3 Research Papers in IEEE and Scopus-indexed conferences (Maitri 2024, ICICC 2025).",
      "Honored with the Best Project Award for Plant Disease Detection & Curing (March 2024).",
    ],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    testimonial:
      "Pranit's AI solutions at CAVISTA Hackathon were incredibly innovative. His multi-agent financial intelligence system showed remarkable technical depth and practical impact.",
    name: "Hackathon Jury Panel",
    designation: "Judges",
    company: "CAVISTA 2025",
    image: user1,
  },
  {
    testimonial:
      "His research on Plant Disease Detection published in Scopus demonstrated both academic rigor and real-world applicability. A true AI innovator with a researcher's mindset.",
    name: "Research Committee",
    designation: "Reviewers",
    company: "IEEE & ICICC 2025",
    image: user2,
  },
  {
    testimonial:
      "Pranit's leadership of the Innovsphere Tech Club has been transformative. He mentors students with passion and has built a thriving 200+ member tech community at VIT Pune.",
    name: "Faculty Advisor",
    designation: "Professor",
    company: "VIT Pune",
    image: user3,
  },
] as const;

// Projects
export const PROJECTS = [
  {
    name: "Market & Financial Intelligence Multi-Agent System",
    description:
      "5-agent LLM-driven system for stock trend analysis, news summarization, and financial risk insights. Integrates time-series LSTM models with YFinance, Polygon & NewsAPI. Improved predictive accuracy by 15% through agent interaction optimization.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "lstm",
        color: "green-text-gradient",
      },
      {
        name: "langchain-rag",
        color: "pink-text-gradient",
      },
    ],
    image: project1,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
  {
    name: "Inspect.AI – Institute Inspection System",
    description:
      "End-to-end AI platform for infrastructure inspection using CNNs, YOLOv8, and image segmentation. OCR/NLP pipelines for document understanding, faculty verification, and automated SWOT generation via Gemini API. Reduced manual inspection time by 40%.",
    tags: [
      {
        name: "flask",
        color: "blue-text-gradient",
      },
      {
        name: "yolov8",
        color: "green-text-gradient",
      },
      {
        name: "genai",
        color: "pink-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
  {
    name: "Groundwater Level Predictor",
    description:
      "Predictive models using XGBoost and Prophet achieving 90% accuracy on spatiotemporal groundwater level estimation. Interactive Flask web app with Folium for real-time prediction and water scarcity zone identification.",
    tags: [
      {
        name: "xgboost",
        color: "blue-text-gradient",
      },
      {
        name: "prophet",
        color: "green-text-gradient",
      },
      {
        name: "folium",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
  {
    name: "Emotion-Aware Music & Visual Relaxation",
    description:
      "Real-time facial emotion detection system combining GANs, BERT, and computer vision. Generates personalized music recommendations with AI-driven immersive visuals for therapeutic applications.",
    tags: [
      {
        name: "gans",
        color: "blue-text-gradient",
      },
      {
        name: "bert",
        color: "green-text-gradient",
      },
      {
        name: "computer-vision",
        color: "pink-text-gradient",
      },
    ],
    image: project4,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
  {
    name: "AgriTech ML Platform",
    description:
      "Comprehensive ML pipelines for pest & disease detection, crop yield prediction, price forecasting, soil analysis, and irrigation optimization. Geospatial tools for pest mapping and intrusion detection using QGIS.",
    tags: [
      {
        name: "ml-pipelines",
        color: "blue-text-gradient",
      },
      {
        name: "streamlit",
        color: "green-text-gradient",
      },
      {
        name: "qgis",
        color: "pink-text-gradient",
      },
    ],
    image: project5,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
  {
    name: "Plant Disease Detection & Curing",
    description:
      "CNN-based plant disease classification system with treatment recommendations. Won the Best Project Award from the department. Published in Scopus and IEEE indexed conferences.",
    tags: [
      {
        name: "tensorflow",
        color: "blue-text-gradient",
      },
      {
        name: "cnn",
        color: "green-text-gradient",
      },
      {
        name: "flask",
        color: "pink-text-gradient",
      },
    ],
    image: project6,
    source_code_link: "https://github.com/pranit144",
    live_site_link: "https://github.com/pranit144",
  },
] as const;

export const SOCIALS = [
  {
    name: "YouTube",
    icon: youtube,
    link: "https://youtube.com",
  },
  {
    name: "LinkedIn",
    icon: linkedin,
    link: "https://www.linkedin.com/in/pranit-chilbule",
  },
  {
    name: "Twitter",
    icon: twitter,
    link: "https://twitter.com",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/pranit144",
  },
] as const;
