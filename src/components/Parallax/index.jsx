import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useScroll, useTransform } from "motion/react";

function Parallex({ scrollY }) {

  const { height } = useWindowDimensions();
  const scaleY = useTransform(scrollY, [0, 1000], [1, 1.5]);
  const moveY = useTransform(scrollY, [0, 1200], [0, 500]);
  const moveSmallY = useTransform(scrollY, [0, 1000], [0, 50]);
  const moveBottom = useTransform(scrollY, [0, 500], [0, 530]);
  const scaleBottom = useTransform(scrollY, [200, 800], [1, 0.9]);

  return (
    <div
      style={{ height: `${height + 500}px` }}
      className="w-full bg-purple-950 bg-opacity-60"

    >
      <motion.div className="h-screen w-full relative left-0 top-0">
        <motion.img
          style={{ scaleY, transformOrigin: "top" }}
          className="h-screen absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize"
        />
        <motion.img
          style={{ y: moveY }}
          className="h-1/3 absolute m-auto left-0 right-0 -top-4 bottom-0"
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
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/backgroundDownSize.png"
          alt="backgroundDownSize"
        />
        <motion.img
          style={{ y: moveBottom, scaleY: scaleBottom, transformOrigin: "bottom" }}
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/gridLineSize.png"
          alt="gridLineSize"
        />
      </motion.div>
    </div>
  );

}

export default Parallex;