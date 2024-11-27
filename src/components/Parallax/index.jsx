import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "motion/react"
import { div } from "motion/react-m";
// import styles from './parallax.module.css';
function Parallex() {
  const { scrollYProgress } = useScroll();
  const Y = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001
  });
  return (
    <div style={{ height: "3000px" }} className=" w-full">
      <div className="h-screen w-full relative left-0 top-0 mb-96" >

        <motion.img
          style={{ scaleY: useTransform(scrollYProgress, [0, 0.5], [1, 4]), transformOrigin: 'top' }}
          className="h-3/5 absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize Image"
        />
        {/* <motion.img
        style={{ y: useTransform(Y, [0, 1], [0, 600]) }}
        className="h-3/5 absolute m-auto left-0 right-0 Top-0"
        src="ParallexImages/star.png"
        alt="star Image"
      /> */}
        <motion.img
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 1650]) }}
          className="h-1/3 absolute m-auto left-0 right-0 -top-4 bottom-0"
          src="ParallexImages/sunSize.png"
          alt="sunSize Image"
        />
        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 0.5], [0, 1800]),
            scaleY: useTransform(scrollYProgress, [0.2, 0.6], [1, 0.4]), transformOrigin: 'top'
          }}

          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/backgroundDownSize.png"
          alt="backgroundDownSize Image"
        />

        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 0.5], [0, 1800]),
            scaleY: useTransform(scrollYProgress, [0.2, 0.6], [1, 0.4]), transformOrigin: 'top'
          }}

          // whileHover={{ opacity: 1 }}
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/gridLineSize.png"
          alt="gridLineSize Image"
        />
      </div>
    </div>

  );
}

export default Parallex;