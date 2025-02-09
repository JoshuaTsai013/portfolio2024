import { useRef } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "motion/react"

// import styles from './parallax.module.css';
function Parallex() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const { height } = useWindowDimensions();

  // const { scrollYProgress } = useScroll();
  // const Y = useSpring(scrollYProgress, {
  //   stiffness: 200,
  //   damping: 40,
  //   restDelta: 0.001
  // });
  return (
    <div style={{ height: `${height * 3}px` }} className="w-full bg-purple-950 bg-opacity-60"
      ref={ref}>
      <motion.div className="h-screen w-full relative left-0 top-0 " >
        <motion.img
          style={{ scaleY: useTransform(scrollYProgress, [0, 1], [1, 5]), transformOrigin: 'top' }}
          className="h-3/5 absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize Image"
        />
        <motion.img
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, height*2]) }}
          className="h-1/3 absolute m-auto left-0 right-0 -top-4 bottom-0"
          src="ParallexImages/sunSize.png"
          alt="sunSize Image"
        />

        <motion.img
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, height+300]) }}
          className="h-12 md:h-20 absolute m-auto left-20 top-40 bottom-0"
          src="ParallexImages/welcome2.png"
          alt="welcome2 Image"
        />
      
        <motion.img
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, height+400]) }}
          className="h-12 md:h-20 absolute m-auto right-20 bottom-10"
          src="ParallexImages/welcome2.png"
          alt="welcome2 Image"
        />
        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, height*2+100]),
            scaleY: useTransform(scrollYProgress, [0.1, 0.6], [1, 0.9]), transformOrigin: 'bottom'
          }}
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/backgroundDownSize.png"
          alt="backgroundDownSize Image"
        />

        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, height*2+100]),
            scaleY: useTransform(scrollYProgress, [0.1, 0.6], [1, 0.9]), transformOrigin: 'bottom'
          }}
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/gridLineSize.png"
          alt="gridLineSize Image"
        />
      </motion.div>
      {/* <motion.img
          style={{ scaleY: useTransform(scrollYProgress, [0, 0.5], [1, 4.5]), transformOrigin: 'top' }}
          className="h-3/5 absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize Image"
        />
        <motion.img
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 1650]) }}
          className="h-1/3 absolute m-auto left-0 right-0 -top-4 bottom-0"
          src="ParallexImages/sunSize.png"
          alt="sunSize Image"
        />

        <motion.img
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 900]) }}
          className="h-12 md:h-20 absolute m-auto left-20 top-40 bottom-0"
          src="ParallexImages/welcome2.png"
          alt="welcome2 Image"
        />
        <motion.img
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 300]) }}
          className="h-12 md:h-20 absolute m-auto right-20 top-80 bottom-0"
          src="ParallexImages/welcome2.png"
          alt="welcome2 Image"
        />
        <motion.img
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 300]) }}
          className="h-12 md:h-20 absolute m-auto right-20 bottom-10"
          src="ParallexImages/welcome2.png"
          alt="welcome2 Image"
        />
        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 0.5], [0, 300]),
            scaleY: useTransform(scrollYProgress, [0.1, 0.6], [1, 0.7]), transformOrigin: 'bottom'
          }}

          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/backgroundDownSize.png"
          alt="backgroundDownSize Image"
        />

        <motion.img
          style={{
            y: useTransform(scrollYProgress, [0, 0.5], [0, 300]),
            scaleY: useTransform(scrollYProgress, [0.1, 0.6], [1, 0.7]), transformOrigin: 'bottom'
          }}

          // whileHover={{ opacity: 1 }}
          className="h-1/2 absolute m-auto left-0 right-0 bottom-0"
          src="ParallexImages/gridLineSize.png"
          alt="gridLineSize Image"
        /> */}
    </div>

  );
}

export default Parallex;