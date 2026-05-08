import { useState, useEffect } from 'react';
import OpeningVideo from '../../components/OpeningVideo';
import ParallaxFooter from "../../components/ParallaxFooter";
import Model from "../../components/Model";
import ParallaxPage from '../../components/ParallaxPage';
import OneLineTitlePage from '../../components/OneLineTitlePage';
import ProjectShowcase from "../../components/ProjectShowcase";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useScrollValue } from '../../contexts/ScrollContext';

function HomePage() {
  const scrollY = useScrollValue();
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
      {/* <ParallaxPage /> */}
      {/* <Model /> */} 
      <OneLineTitlePage />
      <ProjectShowcase />
      {/* <Footer /> */}
      <ParallaxFooter />
    </section>
  );
}

export default HomePage;