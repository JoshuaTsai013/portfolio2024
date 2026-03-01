import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './LoadingScreen.module.css';

function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 500; // 0.5 second loading
        const interval = 50; // Update every 50ms
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onComplete();
                    }, 500); // Small delay before transitioning
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    // Generate sine wave points
    const generateSineWave = (offset = 0) => {
        const points = [];
        const width = 100;
        const height = 20;
        const frequency = 3;
        const amplitude = height / 2;

        for (let x = 0; x <= width; x += 1) {
            const y = amplitude + amplitude * Math.sin((x / width * frequency * Math.PI * 2) + offset);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    };

    return (
        <motion.div
            className={styles.loadingScreen}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* CRT Scanlines overlay */}
            <div className={styles.scanlines}></div>

            {/* Vignette effect */}
            <div className={styles.vignette}></div>

            <div className={styles.content}>
                {/* Retro title */}
                {/* <h1 className={styles.title}>
                    <span className={styles.glitch} data-text="INITIALIZING">INITIALIZING</span>
                </h1> */}

                {/* Sine wave visualization */}
                <div className={styles.waveContainer}>
                    <svg className={styles.wave} viewBox="0 0 100 20" preserveAspectRatio="none">
                        {/* Multiple sine waves for layered effect */}
                        <polyline
                            className={`${styles.waveLine} ${styles.wave1}`}
                            points={generateSineWave(0)}
                            fill="none"
                        />
                        <polyline
                            className={`${styles.waveLine} ${styles.wave2}`}
                            points={generateSineWave(Math.PI / 4)}
                            fill="none"
                        />
                        <polyline
                            className={`${styles.waveLine} ${styles.wave3}`}
                            points={generateSineWave(Math.PI / 2)}
                            fill="none"
                        />
                    </svg>
                </div>

                {/* Progress bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <motion.div
                            className={styles.progressFill}
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <div className={styles.progressText}>
                        {Math.floor(progress)}%
                    </div>
                </div>

                {/* Retro loading text */}
                {/* <div className={styles.loadingText}>
                    LOADING SYSTEM<span className={styles.blinkingCursor}>_</span>
                </div> */}
            </div>
        </motion.div>
    );
}

export default LoadingScreen;
