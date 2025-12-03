import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

function Project1({ scrollY }) {
    const [headerVisible, setHeaderVisible] = useState(false);
    
    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setHeaderVisible(latest > 100);
        });
    }, [scrollY]);

    return (
        <section className={styles.projectPage}>
            <ProjectHeader isVisible={headerVisible} />
            {/* Hero section */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.heroImage}>
                    <img src="/project1_cover.png" alt="TechVision AI Platform" />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        TechVision AI Platform
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Advanced AI-powered platform for next-gen solutions
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
                            TechVision AI Platform is a cutting-edge solution that leverages artificial intelligence
                            to revolutionize how businesses interact with technology. Built with modern frameworks
                            and cloud-native architecture, this platform delivers unprecedented performance and
                            scalability.
                        </p>
                        <p className={styles.text}>
                            The platform integrates machine learning models, real-time data processing, and
                            intuitive user interfaces to create a seamless experience for enterprise clients.
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
                            {['React', 'TypeScript', 'Node.js', 'TensorFlow', 'AWS', 'Docker'].map((tech) => (
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
                            <li>Real-time AI-powered analytics and insights</li>
                            <li>Scalable cloud infrastructure with 99.9% uptime</li>
                            <li>Advanced machine learning model integration</li>
                            <li>Intuitive dashboard with customizable widgets</li>
                            <li>Seamless API integration capabilities</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Project1;
