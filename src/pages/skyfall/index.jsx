import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';

function Skyfall() {
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
                    <img src="../SkyfallPhotos/bg.gif" alt="Skyfall Banner" />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        SkyFALL
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
                            一款第三人稱3D動作冒險遊戲, 玩家必須操作作為主角的機械個體, 探索身處於天空的世界, 擊敗強敵、達成目標, 並在過程中慢慢了解整個世界的全貌與歷史。
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
                            {['Unity', 'Figma', 'C#', 'Blender'].map((tech) => (
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
                            <li>精緻光影 ─ HDRP 渲染管線帶來寫實的畫面與光影體驗</li>
                            <li>探索地圖 ─ 駕駛機甲探索地圖，挖掘世界的真相</li>
                            <li>武器交互 ─ 靈活切換遠程與近戰攻擊擊敗強敵</li>
                            <li>沉浸體驗 ─ 在敵人的槍林彈雨中閃轉騰挪，在激烈的戰鬥中碰撞火花</li>
                            <li>操作支援 ─ 完整支援鍵盤、滑鼠與手把操作，提供流暢的戰鬥體驗</li>
                            <li>多國語言 ─ 支援中文與英文切換，讓不同地區的玩家都能深入體驗</li>

                        </ul>
                    </motion.div>

                    {/* Photo gallery */}
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.sectionTitle}>Photo gallery</h2>
                        <div className={styles.photoLayout}>
                            <div className={styles.leftColumn}>
                                <img src="/SkyfallPhotos/photo1.png" alt="SkyfallPhoto1" />
                                <img src="/SkyfallPhotos/photo2.png" alt="SkyfallPhoto2" />
                            </div>
                            <div className={styles.rightColumn}>
                                <img src="/SkyfallPhotos/photo3.png" alt="SkyfallPhoto3" />
                                <img src="/SkyfallPhotos/photo4.jpg" alt="SkyfallPhoto4" />
                            </div>
                        </div>
                    </motion.div>
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