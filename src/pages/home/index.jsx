import { useState, useEffect } from 'react';
import OpeningVideo from '../../components/OpeningVideo';
import Parallex from "../../components/Parallax";
import Model from "../../components/Model";
import ProjectShowcase from "../../components/ProjectShowcase";
import Footer from "../../components/Footer";

function HomePage({ scrollY, isVisible }) {
  return (
    <section>
      <OpeningVideo />
      <Parallex scrollY={scrollY} />
      {/* <Parallex/> */}
      {/* <Model scrollY={scrollY} /> */}
      <ProjectShowcase />
      <Footer />
    </section>
  );
}

export default HomePage;