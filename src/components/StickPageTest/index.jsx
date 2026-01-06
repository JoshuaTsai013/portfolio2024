import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useMotionValueEvent, useTransform, useSpring } from "motion/react";
import TypewriterText from "../TypewriterText";
import ScrollTypewriterText from "../ScrollTypewriterText";

function StickPageTest({ scrollY }) {

  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(1);
  const [text1Trigger, setText1Trigger] = useState(false);
  const [text2Trigger, setText2Trigger] = useState(false);

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

  // Create a "local" scroll value that starts from 0 when section enters viewport
  // and reaches 1 when section bottom completely leaves viewport top
  const localScrollY = useTransform(scrollY, (value) => {
    const entryPoint = sectionOffset - viewportHeight; // when section top touches viewport bottom
    const exitPoint = sectionOffset + sectionHeight;   // when section bottom reaches viewport top
    const span = Math.max(1, exitPoint - entryPoint);  // total scroll distance = sectionHeight + viewportHeight
    const normalized = (value - entryPoint) / span;
    return Math.min(1, Math.max(0, normalized));
  });
  // Log the normalized value (0-1) to the console for debugging
  useMotionValueEvent(localScrollY, "change", (value) => {
    // console.log("localScrollY", value);

    // Trigger typewriter animation when text becomes visible
    if (value >= 0.26) {
      setText1Trigger(true);
    } else if (value <= 0.1) {
      setText1Trigger(false);
    }

    if (value >= 0.5) {
      setText2Trigger(true);
    } else if (value <= 0.4) {
      setText2Trigger(false);
    }
  });
  // First text: appears early and fades out at midpoint
  const text1Opacity = useTransform(
    localScrollY,
    [0, 0.1, 0.4, 0.45],
    [0, 1, 1, 0]
  );

  // Second text: appears after first one fades out
  const text2Opacity = useTransform(
    localScrollY,
    [0.45, 0.5, 0.75, 0.92],
    [0, 1, 1, 0]
  );

  const moveIn = useTransform(
    localScrollY,
    [0, 0.25],
    [sectionHeight * 0.25, 0]
  );
  const moveOut = useTransform(
    localScrollY,
    [0.75, 0.92],
    [0, -sectionHeight * 0.1]
  );

  // Create progress values for scroll typing text
  // Text 1 appears from 0.1 to 0.4
  const text1Progress = useTransform(localScrollY, [0.1, 0.35], [0, 1]);
  // Text 2 appears from 0.45 to 0.7
  const text2Progress = useTransform(localScrollY, [0.45, 0.7], [0, 1]);

  // Render texts outside scroll container using Portal
  const stickyText = createPortal(
    <>
      <motion.div
        className="w-full h-screen flex justify-center items-center fixed top-0 left-0 pointer-events-none z-50"
        style={{
          opacity: text1Opacity,
          y: moveIn
        }}
      >
        <div className="w-3/4">
          {/* <TypewriterText 
            text="This is the first text. It appears early in the scroll."
            className="text-xl md:text-6xl"
            trigger={text1Trigger}
            speed={40}
          /> */}
          <ScrollTypewriterText
            text="This is the first text. It appears early in the scroll."
            className="text-xl md:text-6xl text-white font-bold"
            progress={text1Progress}
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full h-screen flex justify-center items-center fixed top-0 left-0 pointer-events-none z-50"
        style={{
          opacity: text2Opacity,
          y: moveOut
        }}
      >
        <div className="w-3/4">
          {/* <TypewriterText 
            text="This is the second text. It appears after the first fades out."
            className="text-xl md:text-6xl"
            trigger={text2Trigger}
            speed={40}
          /> */}
          <ScrollTypewriterText
            text="This is the second text. It appears after the first fades out."
            className="text-xl md:text-6xl text-white font-bold"
            progress={text2Progress}
          />
        </div>
      </motion.div>
    </>,
    document.body
  );

  return (
    <>
      {stickyText}
      <div
        ref={sectionRef}
        data-scroll-section
        className="h-[250vh] md:h-[500vh] w-full bg-opacity-60 relative bg-gradient-to-b from-orange-400 to-purple-950"
      >
      </div>
    </>
  );
}

export default StickPageTest;