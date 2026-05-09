import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

const SectionDivider = () => (
    <svg
        width="95%" height="20" viewBox="0 0 1000 20" fill="none"
        style={{ display: 'block', marginBottom: '1.5rem', marginTop: '0.2rem', maxWidth: '900px', opacity: 0.6 }}
    >
        <motion.path
            d="M 5 10 Q 250 0, 500 10 T 995 10"
            stroke="#8FB591" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" fill="transparent"
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
        />
    </svg>
);

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

                {/* --- Animated Decorative Background Elements --- */}
                {/* 1. Floating Plane/Ticket */}
                <motion.div
                    className={styles.decorPlane}
                    animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className={styles.placeholderBox}>
                        <span>✈️<br />Plane / Ticket<br />(Img Needed)</span>
                    </div>
                </motion.div>

                {/* 2. Floating Stamp/Compass */}
                <motion.div
                    className={styles.decorStamp}
                    animate={{ y: [0, 10, 0], rotate: [-5, -2, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <div className={styles.placeholderBox}>
                        <span>💮<br />Travel Stamp<br />(Img Needed)</span>
                    </div>
                </motion.div>

                {/* 3. Floating Leaf/Nature */}
                <motion.div
                    className={styles.decorLeaf}
                    animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    <div className={styles.placeholderBox}>
                        <span>🌿<br />Leaf / Nature<br />(Img Needed)</span>
                    </div>
                </motion.div>
                {/* --- End of Decorative Elements --- */}

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
                        <SectionDivider />
                        <div className={`${styles.scrapbookCard} ${styles.rotate1}`}>
                            <div className={styles.tape}></div>
                            <p className={styles.text}>
                                一款能隨手簡單的紀錄生活每一天生活的App。透過直覺、簡單操作的介面讓使用者更有動力記錄下每一天的生活
                            </p>
                        </div>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Technologies Used <span style={{ display: 'inline-block', transform: 'rotate(12deg)', opacity: 0.6, fontSize: '0.8em', marginLeft: '8px' }}>💻</span></h2>
                        <SectionDivider />
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
                        <SectionDivider />
                        <ul className={styles.featureList}>
                            <li>
                                <span className={`${styles.featureIcon} ${styles.featureIcon1}`}>📸</span>
                                <span>拍照留存美好的瞬間</span>
                            </li>
                            <li>
                                <span className={`${styles.featureIcon} ${styles.featureIcon2}`}>📁</span>
                                <span>客製化的分類</span>
                            </li>
                            <li>
                                <span className={`${styles.featureIcon} ${styles.featureIcon3}`}>📍</span>
                                <span>自動捕捉地點紀錄</span>
                            </li>
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
                        <SectionDivider />
                        <div className={styles.photoLayout}>
                            <div className={styles.leftColumn}>
                                <div className={`${styles.imgScrapbook1}`}>
                                    <div className={styles.tape} style={{ top: '-10px', left: '15%' }}></div>
                                    <img src="/WanderPhotos/Intro.png" alt="Wander App Intro" />
                                </div>
                                <div className={`${styles.imgScrapbook2}`}>
                                    <div className={styles.tape} style={{ top: '-12px', right: '20%', left: 'auto' }}></div>
                                    <img src="/WanderPhotos/Guide.png" alt="Wander App Guide" />
                                </div>
                            </div>
                            <div className={styles.rightColumn}>
                                <div className={`${styles.imgScrapbook3}`}>
                                    <div className={styles.tape} style={{ top: '-8px', left: '40%' }}></div>
                                    <img src="/WanderPhotos/Wireframe.png" alt="Wander App Wireframe" />
                                </div>
                                <div className={`${styles.imgScrapbook1}`}>
                                    <div className={styles.tape} style={{ top: '-10px', right: '15%', left: 'auto' }}></div>
                                    <img src="/WanderPhotos/Frame(lightMode).png" alt="Wander App Light Mode" />
                                </div>
                                <div className={`${styles.imgScrapbook2}`}>
                                    <div className={styles.tape} style={{ top: '-12px', left: '25%' }}></div>
                                    <img src="/WanderPhotos/Frame(DarkMode).png" alt="Wander App Dark Mode" />
                                </div>
                                {/* YouTube Video */}
                                <div className={`${styles.imgScrapbook3}`}>
                                    <div className={styles.tape} style={{ top: '-12px', left: '50%', transform: 'translateX(-50%)' }}></div>
                                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', zIndex: 11 }}>
                                        <iframe
                                            style={{ width: '100%', height: '100%', border: 0 }}
                                            src="https://www.youtube.com/embed/YmzM2_J9VbI?si=0M7-VBxwQg7qHi9X"
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
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
