import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

function WanderApp() {
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
                    {/* <img src="/project1_cover.png" alt="Wander App" />
                    <div className={styles.heroOverlay}></div> */}
                </div>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Wander App
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Mar, 2024 - May, 2024
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
                            一款能隨手簡單的紀錄生活每一天生活的App。透過直覺、簡單操作的介面讓使用者更有動力記錄下每一天的生活
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
                            {['React Native', 'Figma', 'Google Map API', 'Async Storage'].map((tech) => (
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
                            <li>拍照留存美好的瞬間</li>
                            <li>客製化的分類</li>
                            <li>自動捕捉地點紀錄</li>
                        </ul>
                    </motion.div>

                    {/* Design Layout */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Design Layout</h2>
                        <div className={styles.photoLayout}>
                            <div className={styles.leftColumn}>
                                <img src="/WanderPhotos/Intro.png" alt="Wander App Intro" />
                                <img src="/WanderPhotos/Guide.png" alt="Wander App Guide" />
                            </div>
                            <div className={styles.rightColumn}>
                                <img src="/WanderPhotos/Wireframe.png" alt="Wander App Wireframe" />
                                <img src="/WanderPhotos/Frame(lightMode).png" alt="Wander App Light Mode" />
                                <img src="/WanderPhotos/Frame(DarkMode).png" alt="Wander App Dark Mode" />
                                <iframe width="460" height="315" src="https://www.youtube.com/embed/YmzM2_J9VbI?si=okDJOuRvd-INY-0x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className={styles.footer}>
                <a href="https://www.figma.com/proto/CsBQvmoTujODw9Au72mZkA/%EF%BC%B7ander_Prototype?node-id=21-747&p=f&viewport=421%2C462%2C0.05&t=Uqc6S7OangEFLiHx-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1" target="_blank" rel="noopener noreferrer">
                    See prototype in Figma
                </a>
            </footer>
        </section>
    );
}

export default WanderApp;
