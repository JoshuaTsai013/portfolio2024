import { motion } from 'motion/react';
import styles from './project.module.css';
import ProjectHeader from '../../components/ProjectHeader';
import MotionGrid from '../../components/MotionGrid';

/* ─── Data ─────────────────────────────────────────────────── */
const STORIES = [
    {
        index: '01',
        title: 'The First Chord',
        text: 'Placeholder Text',
        image: null, // placeholder
        alt: 'First guitar experience',
    },
    {
        index: '02',
        title: 'Late Night Practice',
        text: 'Placeholder Text',
        image: null,
        alt: 'Late night guitar practice',
    },
    {
        index: '03',
        title: 'Exploring Tones',
        text: 'Placeholder Text',
        image: null,
        alt: 'Exploring guitar tones',
    }
];

/* ─── Section animation preset ─────────────────────────────── */
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: 'easeOut' },
};

/* ─── Sub-components ─────────────────────────────────────────── */

/** Decorative section divider */
function Divider() {
    return (
        <div className={styles.sectionDivider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerDot} />
            <div className={styles.dividerLineRight} />
        </div>
    );
}

/** Story block: image + text pair */
function StoryBlock({ story, index }) {
    const isReverse = index % 2 !== 0;

    return (
        <motion.div
            className={`${styles.storySection} ${isReverse ? styles.reverse : ''}`}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
            {/* Image side */}
            <div className={styles.storyImageWrap}>
                <div className={styles.storyImageFrame}>
                    <div className={styles.cornerTL} />
                    <div className={styles.cornerBR} />
                    {story.image ? (
                        <img src={story.image} alt={story.alt} />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            <span className={styles.placeholderIcon}>🎸</span>
                            <span>Image Placeholder</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Text side */}
            <div className={styles.storyTextWrap}>
                <div className={styles.storyIndex}>{story.index}</div>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyText}>{story.text}</p>
            </div>
        </motion.div>
    );
}

/* ─── Main Component ─────────────────────────────────────────── */
function GuitarLove() {
    return (
        <section className={styles.projectPage}>
            {/* MotionGrid Background */}
            <div className={styles.gridBackground}>
                <MotionGrid
                    direction="diagonal"
                    speed={0.3}
                    borderColor="rgba(212, 160, 83, 0.3)"
                    squareSize={50}
                    hoverFillColor="rgba(212, 160, 83, 0.3)"
                    hoverTrailAmount={3}
                />
            </div>

            <ProjectHeader />

            {/* ── Hero ───────────────────────────────────────────── */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Guitar Love
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        A Lifelong Passion for Playing & Crafting
                    </motion.p>

                    {/* Decorative guitar string lines */}
                    <motion.div
                        className={styles.heroStrings}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={styles.heroString} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Content ────────────────────────────────────────── */}
            <div className={styles.content}>
                <div className={styles.container}>

                    {/* Intro Quote */}
                    <motion.div className={styles.introQuote} {...fadeUp}>
                        <span className={styles.quoteIcon}>&ldquo;</span>
                        <p className={styles.quoteText}>
                            吉他不只是一件樂器，它是我表達自我的方式、也是我用雙手打造理想聲音的起點。
                        </p>
                    </motion.div>

                    <Divider />

                    {/* Story sections */}
                    {STORIES.map((story, i) => (
                        <div key={story.index}>
                            <StoryBlock story={story} index={i} />
                            {i < STORIES.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <p className={styles.footerText}>
                    &ldquo;Music is the language of the spirit.&rdquo;
                </p>
            </footer>
        </section>
    );
}

export default GuitarLove;
