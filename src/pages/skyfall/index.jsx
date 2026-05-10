import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

/* ─── Data ─────────────────────────────────────────────────── */
const TECH_STACK = ['Unity 3D', 'Figma', 'C#', 'Blender'];

const FEATURES = [
    { title: '精緻光影', desc: 'HDRP 渲染管線帶來寫實的畫面與光影體驗' },
    { title: '探索地圖', desc: '駕駛機甲探索地圖，挖掘世界的真相' },
    { title: '武器交互', desc: '靈活切換遠程與近戰攻擊擊敗強敵' },
    { title: '沉浸體驗', desc: '在敵人的槍林彈雨中閃轉騰挪，在激烈的戰鬥中碰撞火花' },
    { title: '操作支援', desc: '完整支援鍵盤、滑鼠與手把操作，提供流暢的戰鬥體驗' },
    { title: '多國語言', desc: '支援中文與英文切換，讓不同地區的玩家都能深入體驗' },
];

const GALLERY = [
    { src: '/SkyfallPhotos/photo1.png', alt: 'SkyFALL Scene 1' },
    { src: '/SkyfallPhotos/photo2.png', alt: 'SkyFALL Scene 2' },
    { src: '/SkyfallPhotos/photo3.png', alt: 'SkyFALL Scene 3' },
    { src: '/SkyfallPhotos/photo4.jpg', alt: 'SkyFALL Scene 4' },
];

/* ─── Section animation preset ─────────────────────────────── */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

/* ─── Sub-components ─────────────────────────────────────────── */

/** Four circle rivets at the corners of a panel */
function Rivets() {
    return (
        <>
            <div className={`${styles.rivetTL}`}><div className={styles.rivetDot} /></div>
            <div className={`${styles.rivetTR}`}><div className={styles.rivetDot} /></div>
            <div className={`${styles.rivetBL}`}><div className={styles.rivetDot} /></div>
            <div className={`${styles.rivetBR}`}><div className={styles.rivetDot} /></div>
        </>
    );
}

/** Spinning gear divider */
function GearDivider() {
    return (
        <div className={styles.gearDivider}>
            <div className={styles.gearDividerLine} />
            {/* <span className={`${styles.gearDividerGear}    ${styles.animGearCW}`}>settings</span> */}
            <span className={`${styles.gearDividerGearLg}  ${styles.animGearCCW}`}>settings</span>
            {/* <span className={`${styles.gearDividerGear}    ${styles.animGearCW}`}>settings</span> */}
            <div className={styles.gearDividerLineRight} />
        </div>
    );
}

/* ─── Main Component ─────────────────────────────────────────── */
function Skyfall() {
    return (
        <section className={styles.projectPage}>
            {/* Global Background Gear */}
            <span className={`${styles.BgGear} ${styles.gearIcon} ${styles.animGearCW}`}>
                settings
            </span>

            <ProjectHeader />

            {/* ── Hero ───────────────────────────────────────────── */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background GIF */}
                <div className={styles.heroImage}>
                    <img src="/SkyfallPhotos/bg.gif" alt="Skyfall Banner" />
                    <div className={styles.heroOverlay} />
                </div>

                {/* Title & date */}
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        SKYFALL
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

            {/* ── Content ────────────────────────────────────────── */}
            <div className={styles.content}>
                <div className={styles.container}>

                    {/* Bento Grid: Overview + Tech */}
                    <motion.div className={styles.bentoGrid} {...fadeUp}>

                        {/* Project Overview */}
                        <section className={`${styles.panel} ${styles.panelOverview}`} id="overview">
                            {/* <div className={`${styles.gearRivet} ${styles.gearRivetTL} ${styles.gearIcon} ${styles.animGearCW}`}>settings</div>
                            <div className={`${styles.gearRivet} ${styles.gearRivetTR} ${styles.gearIcon} ${styles.animGearCW}`}>settings</div>
                            <div className={`${styles.gearRivet} ${styles.gearRivetBL} ${styles.gearIcon} ${styles.animGearCCW}`}>settings</div>
                            <div className={`${styles.gearRivet} ${styles.gearRivetBR} ${styles.gearIcon} ${styles.animGearCCW}`}>settings</div> */}
                            <Rivets />

                            <h2 className={styles.panelTitle}>
                                Project Overview
                            </h2>
                            <p className={styles.overviewText}>
                                一款第三人稱3D動作冒險遊戲，玩家必須操作作為主角的機械個體，探索身處於天空的世界，擊敗強敵、達成目標，並在過程中慢慢了解整個世界的全貌與歷史。<br /><br />一款第三人稱3D動作冒險遊戲，玩家必須操作作為主角的機械個體，探索身處於天空的世界，擊敗強敵、達成目標，並在過程中慢慢了解整個世界的全貌與歷史。
                            </p>
                        </section>

                        {/* Technologies */}
                        <section className={`${styles.panel} ${styles.panelTech}`} id="tech">
                            <h2 className={styles.panelTitleSmall}>Technologies Used</h2>
                            <div className={styles.techGrid}>
                                {TECH_STACK.map((tech) => (
                                    <span key={tech} className={styles.techBadge}>{tech}</span>
                                ))}
                            </div>
                        </section>

                        {/* Key Features */}
                        <section className={`${styles.panel} ${styles.panelFeatures}`} id="features">
                            <Rivets />
                            <h2 className={styles.panelTitleCenter}>Key Features</h2>
                            <ul className={styles.featureGrid} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {FEATURES.map(({ title, desc }) => (
                                    <li key={title} className={styles.featureItem}>
                                        <span className={`${styles.featureIcon} ${styles.gearIcon}`}>settings</span>
                                        <div>
                                            <span className={styles.featureTitle}>{title}</span>
                                            <span className={styles.featureDesc}>{desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </motion.div>

                    {/* Gear Divider */}
                    <GearDivider />

                    {/* Photo Gallery */}
                    <motion.section id="gallery" {...fadeUp}>
                        <h2 className={styles.galleryTitle}>Photo Gallery</h2>
                        <div className={styles.photoGrid}>
                            {GALLERY.map(({ src, alt }) => (
                                <div key={src} className={styles.galleryCard}>
                                    <div className={styles.brassTL} />
                                    <div className={styles.brassTR} />
                                    <div className={styles.brassBL} />
                                    <div className={styles.brassBR} />
                                    <img src={src} alt={alt} />
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className={styles.footer}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    See Game on itch.io
                </a>
            </footer>
        </section >
    );
}

export default Skyfall;