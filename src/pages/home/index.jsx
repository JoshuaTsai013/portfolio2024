import { useState, useEffect } from 'react';
import OpeningVideo from '../../components/OpeningVideo';
import ParallaxFooter from "../../components/ParallaxFooter";
import Model from "../../components/Model";
import ParallaxPage from '../../components/ParallaxPage';
import StickPageTest from '../../components/StickPageTest';
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
      {/* <ParallaxPage scrollY={scrollY} /> */}
      {/* <Model scrollY={scrollY} /> */}
      <StickPageTest scrollY={scrollY} />
      <ProjectShowcase />
      {/* <Footer /> */}
      <ParallaxFooter scrollY={scrollY} />
    </section>
  );
}

export default HomePage;