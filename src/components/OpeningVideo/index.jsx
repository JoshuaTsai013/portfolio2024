import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styles from './OpeningVideo.module.css';

function OpeningVideo({ onVideoSection }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Start playing video
            video.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.log('Video autoplay failed:', error);
            });
        }
    }, []);

    useEffect(() => {
        // Notify parent component when video section is active
        onVideoSection?.(true);

        return () => {
            onVideoSection?.(false);
        };
    }, [onVideoSection]);

    return (
        <motion.section
            className={styles.videoSection}
            data-scroll-section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    muted
                    playsInline
                    loop
                >
                    <source src="/OpeningVideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Gradient overlay for better text visibility */}
                <div className={styles.overlay}></div>

                {/* Scroll hint indicator */}
                <motion.div
                    className={styles.scrollHint}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        repeatDelay: 0.5
                    }}
                >
                    <div className={styles.scrollText}>Scroll to Explore</div>
                    <div className={styles.scrollArrow}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path
                                d="M15 5 L15 20 M15 20 L10 15 M15 20 L20 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default OpeningVideo;
