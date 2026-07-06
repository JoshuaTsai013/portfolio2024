import React from 'react';
import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

function Project2() {
    return (
        <section className={styles.projectPage}>
            <ProjectHeader />
            {/* Hero section */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.heroImage}>
                    <img src="/project2_cover.webp" alt="SoundWave Studio" />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        SoundWave Studio
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Innovative music production and sound design
                    </motion.p>
                </div>
            </motion.div>

            {/* Content sections */}
            <div className={styles.content}>
                <div className={styles.container}>
                    {/* Overview */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Project Overview</h2>
                        <p className={styles.text}>
                            SoundWave Studio is a comprehensive digital audio workstation (DAW) designed for
                            professional musicians, producers, and sound designers. With an intuitive interface
                            and powerful audio processing capabilities, it transforms creative ideas into
                            polished productions.
                        </p>
                        <p className={styles.text}>
                            The platform features advanced audio synthesis, multi-track recording, real-time
                            effects processing, and seamless collaboration tools for remote teams.
                        </p>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Technologies Used</h2>
                        <div className={styles.techGrid}>
                            {['Web Audio API', 'React', 'WebAssembly', 'Tone.js', 'WebRTC', 'MongoDB'].map((tech) => (
                                <div key={tech} className={styles.techBadge}>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Key Features</h2>
                        <ul className={styles.featureList}>
                            <li>Multi-track audio recording and editing</li>
                            <li>Real-time effects and audio processing</li>
                            <li>Virtual instrument library with synthesizers</li>
                            <li>Cloud-based project collaboration</li>
                            <li>Professional mixing and mastering tools</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Project2;
