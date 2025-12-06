import { useRef, useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { motion, useTransform } from "motion/react";
import styles from './parallaxFooter.module.css';

function ParallaxFooter({ scrollY }) {

  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState(0);


  // Get the actual position of the parallax section when component mounts
  useEffect(() => {
    const updateOffset = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setSectionOffset(rect.top + scrollTop);
      }
    };

    // Initial calculation
    updateOffset();

    // Recalculate on resize
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Create a "local" scroll value that starts from 0 when this section begins
  // This makes the parallax effects relative to this section, not the page top
  const localScrollY = useTransform(scrollY, (value) => Math.max(0, value - sectionOffset));

  // Now use localScrollY for all transforms - values work as if this section is at the top
  const scaleY = useTransform(localScrollY, [0, 1000], isMobile ? [1, 1.7] : [1, 1.5]);
  const moveY = useTransform(localScrollY, [0, 900], isMobile ? [0, 200] : [0, 630]);
  const moveSmallY = useTransform(localScrollY, [0, height], ["0vh", "-25vh"]);
  const moveBottom = useTransform(localScrollY, [0, 500], isMobile ? [0, 230] : [0, 530]);
  const scaleBottom = useTransform(localScrollY, [200, 800], isMobile ? [1, 1.3] : [1, 0.6]);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      url: 'https://github.com/yourusername', // Replace with your actual URL
    },
    {
      name: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: 'https://instagram.com/yourusername', // Replace with your actual URL
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: 'https://linkedin.com/in/yourusername', // Replace with your actual URL
    },
  ];

  return (
    <div
      ref={sectionRef}
      data-scroll-section
      style={{ height: `${height + 500}px` }}
      className="w-full bg-purple-950 bg-opacity-60"

    >
      <motion.div className="h-screen w-full relative left-0 top-0">
        <motion.img
          style={{ transformOrigin: "top", height: `${height + 400}px` }}
          className="h-screen absolute m-auto left-0 right-0 Top-0"
          src="ParallexImages/backgroundUpLineSize.png"
          alt="backgroundUpLineSize"
        />
        <motion.img
          style={{ y: moveY }}
          className="h-40 md:h-80 absolute m-auto left-0 right-0 bottom-10"
          src="ParallexImages/sunSize.png"
          alt="sunSize"
        />
        {/* <motion.img
          style={{ y: moveSmallY }}
          className="h-12 md:h-20 absolute m-auto left-20 top-24"
          src="ParallexImages/welcome2.png"
          alt="welcome2"
        /> */}
        <motion.div style={{ y: moveSmallY, transformOrigin: "bottom" }} className="h-12 md:h-20 absolute m-auto left-4 md:left-20 bottom-0">
          <h3 className={styles.brandName}>Portfolio</h3>
          <p className={styles.tagline}>Creating digital experiences</p>
        </motion.div>
        {/* <motion.img
          style={{ y: moveSmallY }}
          className="h-12 md:h-20 absolute m-auto right-20 top-32"
          src="ParallexImages/welcome2.png"
          alt="welcome2"
        /> */}
        <motion.div style={{ y: moveSmallY, transformOrigin: "bottom" }} className="h-12 md:h-20 absolute m-auto right-4 md:right-20 bottom-0">
          <p className={styles.socialTitle}>Connect With Me</p>
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
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

export default ParallaxFooter;