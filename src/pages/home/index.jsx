import { useState, useEffect } from 'react';
import OpeningVideo from '../../components/OpeningVideo';
import Parallex from "../../components/Parallax";
import Model from "../../components/Model";
import ProjectShowcase from "../../components/ProjectShowcase";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function HomePage({ scrollY }) {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const videoSectionHeight = window.innerHeight * 0.95;
      setHeaderVisible(latest > videoSectionHeight);
    });
  }, [scrollY]);

  return (
    <section>
      <Header isVisible={headerVisible} />
      <OpeningVideo />
      {/* <Parallex scrollY={scrollY} /> */}
      <Model scrollY={scrollY} />
      <ProjectShowcase />
      <Footer />
    </section>
  );
}

export default HomePage;