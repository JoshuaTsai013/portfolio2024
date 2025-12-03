import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

function Project3({ scrollY }) {
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
                    <img src="/project3_cover.png" alt="3D Design Lab" />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        3D Design Lab
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Professional 3D modeling and visualization
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
                            3D Design Lab is a state-of-the-art platform for creating, editing, and visualizing
                            three-dimensional models in the browser. Powered by WebGL and modern graphics
                            technologies, it delivers desktop-quality 3D modeling capabilities accessible from
                            anywhere.
                        </p>
                        <p className={styles.text}>
                            The platform serves architects, product designers, and digital artists with tools
                            for parametric modeling, realistic rendering, and collaborative design workflows.
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
                            {['Three.js', 'WebGL', 'React', 'GLSL', 'Babylon.js', 'PostgreSQL'].map((tech) => (
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
                            <li>Real-time 3D modeling and editing</li>
                            <li>Physically-based rendering (PBR) materials</li>
                            <li>Parametric design with procedural workflows</li>
                            <li>Multi-user collaboration and version control</li>
                            <li>Export to industry-standard 3D formats</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Project3;
