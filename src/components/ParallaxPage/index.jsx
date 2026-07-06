import { useRef, useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useMotionValueEvent, useTransform, useTime } from "motion/react";
import { useScrollValue } from '../../contexts/ScrollContext';
// import styles from './ParallaxPage.module.css';

function ParallaxPage() {
  const scrollY = useScrollValue();

  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(1);

  // Get the actual position of the parallax section when component mounts
  useEffect(() => {
    const updateOffset = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setSectionOffset(rect.top + scrollTop);
        setSectionHeight(rect.height || 1);
      }
    };

    // Initial calculation
    updateOffset();

    // Recalculate on resize
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  const viewportHeight = height || 1;

  // Create a "local" scroll value that starts from 0 when the section first enters the viewport
  // and reaches 1 after scrolling one full section height (e.g., the full 150vh span)
  const localScrollY = useTransform(scrollY, (value) => {
    const entryPoint = sectionOffset - viewportHeight; // when the top first touches the bottom of the viewport
    const span = Math.max(1, sectionHeight);           // scroll distance to cover the section height
    const normalized = (value - entryPoint) / span;
    return Math.min(1, Math.max(0, normalized));
  });

  // Log the normalized value (0-1) to the console for debugging
  // useMotionValueEvent(localScrollY, "change", (value) => {
  //   console.log("localScrollY", value);
  // });

  // Add a continuous floating animation for the sun using sine wave
  const time = useTime();
  const sunFloat = useTransform(time, (t) => {
    return Math.sin(t / 800) * (isMobile ? 10 : 15); // Float up/down by 10-15px
  });

  // Create pulsing opacity for gridLine that syncs with sun animation
  const gridOpacity = useTransform(time, (t) => {
    const sineValue = (Math.sin(t / 300) + 1) / 2; // 0 to 1
    return 0.6 + (sineValue * 0.4); // Map to 0.6 to 1 range
  });

  const sunMoveY = useTransform(localScrollY, [0, 0.2], isMobile ? [0, (sectionHeight * 0.34)] : [0, (sectionHeight * 0.55)]);
  const sunScale = useTransform(localScrollY, [0, 0.9], isMobile ? [0.5, 1] : [0.1, 1]);
  const moveBrandY = useTransform(localScrollY, [0.5, 0.9],isMobile ? [0, (sectionHeight * 0.2)] : [0, (sectionHeight * 0.4)]);
  const moveSocialY = useTransform(localScrollY, [0, 0.3],isMobile ? [0, (sectionHeight * 0.3)] :[0, (sectionHeight * 0.4)]);
  const moveBottom = useTransform(localScrollY, [0, 0.9],isMobile ? [0, (sectionHeight * 0.2)] : [0, (sectionHeight * 0.44)]);
  const scaleBottomY = useTransform(localScrollY, [0.2, 0.8], isMobile ? [2.4, 1] : [2.2, 1]);
  const scaleBottomX = useTransform(localScrollY, [0.2, 0.8], isMobile ? [1, 1] : [1.5, 1.1]);

    return (
    <div
      ref={sectionRef}
      data-scroll-section
      className="h-[100vh] md:h-[200vh] w-full bg-purple-950 bg-opacity-60"
    >
      <motion.div className="h-screen w-full sticky left-0" style={{ top: 0 }}>
        <motion.div
          style={{ y: moveBrandY, transformOrigin: "top" }}
          className={`absolute m-auto left-0 right-0 top-0 ${isMobile ? 'h-[100vh]' : 'h-[200vh]'}`}
        ><h1 className="text-white text-center pt-40 text-4xl">Parallax Page</h1>
        </motion.div>
        {/* <motion.img
          style={{ 
            y: useTransform(() => sunMoveY.get() + sunFloat.get()), 
            scale: sunScale, 
            transformOrigin: "bottom" 
          }}
          className="h-60 md:h-80 absolute m-auto left-0 right-0 bottom-1/2"
          src="ParallexImages/sunSize.webp"
          alt="sunSize"
        /> */}
        {/* <motion.div style={{ y: moveBrandY, transformOrigin: "bottom" }} className={styles.brandContainer}>
          <h3 className={styles.brandName}>Portfolio</h3>
          <p className={styles.tagline}>Creating digital experiences</p>
        </motion.div> */}
      </motion.div>
    </div>
  );

}

export default ParallaxPage;