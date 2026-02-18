import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Banner,
  CustomCursor,
  FloatingComputer,
  Footer,
  NeuralNetworkBg,
  StatsCounter,
  TechMarquee,
  StarsCanvas,
} from "./components";

// App
const App = () => {
  const [hide, setHide] = useState(true);

  return (
    <BrowserRouter>
      <CustomCursor />
      {/* Interactive neural network — fixed canvas behind content */}
      <NeuralNetworkBg />
      <StarsCanvas />

      <Banner hide={hide} setHide={setHide} />

      <div className="relative z-0 min-h-screen">
        <Navbar hide={hide} />
        <Hero />

        {/* Floating draggable 3D computer */}
        <FloatingComputer />

        {/* Dynamic Stats Bar */}
        <StatsCounter />

        <About />

        {/* Tech Transition Strip */}
        <TechMarquee />

        <Experience />
        <Tech />
        <Works />

        {/* Testimonials */}
        <Feedbacks />

        {/* Contact */}
        <div className="relative z-0">
          <Contact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
