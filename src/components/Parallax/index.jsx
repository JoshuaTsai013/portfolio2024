import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useTransform } from "motion/react";

function Parallex({ scrollY }) {

  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;

  // Offset: the scroll position where parallax section starts (after video section)
  // This is approximately the height of the video section (100vh)
  const sectionOffset = height;

  // Create a "local" scroll value that starts from 0 when this section begins
  // This makes the parallax effects relative to this section, not the page top
  const localScrollY = useTransform(scrollY, (value) => Math.max(0, value - sectionOffset));

  // Now use localScrollY for all transforms - values work as if this section is at the top
  const scaleY = useTransform(localScrollY, [0, 1000], isMobile ? [1, 1.7] : [1, 1.5]);
  const moveY = useTransform(localScrollY, [0, 900], isMobile ? [0, 200] : [0, 600]);
  const moveSmallY = useTransform(localScrollY, [0, 1000], [0, 50]);
  const moveBottom = useTransform(localScrollY, [0, 500], isMobile ? [0, 230] : [0, 530]);
  const scaleBottom = useTransform(localScrollY, [200, 800], isMobile ? [1, 1.3] : [1, 0.6]);

  return (
    <div
      data-scroll-section
      style={{ height: `${height + 500}px` }}
      className="w-full bg-purple-950 bg-opacity-60"

    >
      <motion.div className="h-screen w-full relative left-0 top-0">
        <motion.img
          style={{ transformOrigin: "top" ,height: `${height + 400}px` }}
          className="h-screen absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize"
        />
        <motion.img
          style={{ y: moveY }}
          className="h-1/3 absolute m-auto left-0 right-0 bottom-24 "
          src="ParallexImages/sunSize.png"
          alt="sunSize"
        />
        <motion.img
          style={{ y: moveSmallY }}
          className="h-12 md:h-20 absolute m-auto left-20 bottom-24"
          src="ParallexImages/welcome2.png"
          alt="welcome2"
        />
        <motion.img
          style={{ y: moveSmallY }}
          className="h-12 md:h-20 absolute m-auto right-20 bottom-48"
          src="ParallexImages/welcome2.png"
          alt="welcome2"
        />
        <motion.img
          style={{ y: moveBottom, scaleY: scaleBottom, transformOrigin: "bottom" }}
          className="h-1/2 absolute m-auto left-0 right-0 -bottom-2"
          src="ParallexImages/backgroundDownSize.png"
          alt="backgroundDownSize"
        />
        <motion.img
          style={{ y: moveBottom, scaleY: scaleBottom, transformOrigin: "bottom" }}
          className="h-1/2 absolute m-auto left-0 right-0 -bottom-2"
          src="ParallexImages/gridLineSize.png"
          alt="gridLineSize"
        />
      </motion.div>
    </div>
  );

}

export default Parallex;