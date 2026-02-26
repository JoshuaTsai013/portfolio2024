import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useTransform } from "motion/react";
import ScrollTypewriterText from "../ScrollTypewriterText";

function OneLineTitlePage({ scrollY }) {
    const { height } = useWindowDimensions();
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

    // Create a "local" scroll value that starts from 0 when section enters viewport
    // and reaches 1 when section bottom completely leaves viewport top
    const localScrollY = useTransform(scrollY, (value) => {
        const entryPoint = sectionOffset - viewportHeight; // when section top touches viewport bottom
        const exitPoint = sectionOffset + sectionHeight;   // when section bottom reaches viewport top
        const span = Math.max(1, exitPoint - entryPoint);  // total scroll distance = sectionHeight + viewportHeight
        const normalized = (value - entryPoint) / span;
        return Math.min(1, Math.max(0, normalized));
    });

    // First text: appears early and fades out towards the end
    const textOpacity = useTransform(
        localScrollY,
        [0, 0.2, 0.8, 0.9],
        [0, 1, 1, 0]
    );

    const move = useTransform(
        localScrollY,
        [0, 0.28, 0.75, 0.9],
        [sectionHeight * 0.66, 0, 0, -sectionHeight * 0.2]
    );

    // Create progress values for scroll typing text
    const textProgress = useTransform(localScrollY, [0.2, 0.7], [0, 1]);

    // Render texts outside scroll container using Portal
    const stickyText = createPortal(
        <>
            <motion.div
                className="w-full h-screen flex justify-center items-center fixed top-0 left-0 pointer-events-none z-50"
                style={{
                    opacity: textOpacity,
                    y: move
                }}
            >
                <div className="w-3/4">
                    <ScrollTypewriterText
                        text="This is the first text. It appears early in the scroll."
                        className="text-xl md:text-6xl text-white font-bold"
                        progress={textProgress}
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
                className="h-[200vh] md:h-[250vh] w-full bg-[#373737]"
            >
            </div>
        </>
    );
}

export default OneLineTitlePage;