import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'motion/react';
import useWindowDimensions from '../Hooks/useWindowDimensions';
import styles from './ProjectShowcase.module.css';

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
    return (
        <svg className={styles.ctaArrow} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Forward wheel events to Locomotive Scroll's container so scrolling
// works even while the cursor is over the fixed card overlay
function forwardWheel(e) {
    const container = document.querySelector('[data-scroll-container]');
    if (container) container.dispatchEvent(new WheelEvent('wheel', e.nativeEvent));
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * ShowcaseRow
 *
 * Owns a tall scroll spacer (DOM anchor) and a portal overlay.
 * The spacer's position drives a normalised 0→1 `localScrollY`,
 * which animates the card row and description bar into / out of view.
 *
 * Props:
 *   projects   — 1 or 2 project objects (determines grid layout)
 *   scrollY    — MotionValue from App (updated by Locomotive Scroll)
 *   onNavigate — (e, project) => void  called when a card is clicked
 */
function ShowcaseRow({ projects, scrollY, onNavigate }) {
    const sectionRef = useRef(null);
    const [sectionOffset, setSectionOffset] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(1);
    const { height: viewportHeight } = useWindowDimensions();

    // Measure spacer position on mount and on window resize
    useEffect(() => {
        const update = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setSectionOffset(rect.top + scrollTop);
            setSectionHeight(rect.height || 1);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const vh = viewportHeight || 1;

    // 0 when the section enters the bottom of the viewport,
    // 1 when the section bottom leaves the top of the viewport
    const localScrollY = useTransform(scrollY, (value) => {
        const entry = sectionOffset - vh;
        const exit = sectionOffset + sectionHeight;
        return Math.min(1, Math.max(0, (value - entry) / Math.max(1, exit - entry)));
    });

    // ── Row animation ──────────────────────────────────────────────────────
    // Scrolls up from below (sectionHeight * 0.3 px), holds, then exits upward
    const rowOpacity = useTransform(localScrollY, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
    const rowY = useTransform(localScrollY, [0, 0.2, 0.8, 1], [sectionHeight * 0.3, 0, 0, -sectionHeight * 0.15]);
    const rowPointerEvents = useTransform(rowOpacity, (v) => v > 0.05 ? 'auto' : 'none');

    // ── Description bar animation ──────────────────────────────────────────
    // Slides up after the row settles, exits together with the row
    const descOpacity = useTransform(localScrollY, [0.45, 0.55, 0.8, 0.92], [0, 1, 1, 0]);
    const descY = useTransform(localScrollY, [0.1, 0.15, 0.8, 0.92], [-sectionHeight * 0.05, 0, 0, -sectionHeight * 0.08]);

    const isFullWidth = projects.length === 1;

    return (
        <>
            {/* Scroll spacer — provides DOM position for scroll calculations */}
            <div ref={sectionRef} className={styles.rowSpacer} />

            {createPortal(
                <>
                    {/* Fixed card row */}
                    <motion.div
                        className={styles.rowFixed}
                        style={{ opacity: rowOpacity, y: rowY, pointerEvents: rowPointerEvents }}
                        onWheel={forwardWheel}
                    >
                        <div className={styles.container}>
                            <div className={`${styles.rowGrid} ${isFullWidth ? styles.rowGridFull : styles.rowGridHalf}`}>
                                {projects.map((project) => (
                                    <div key={project.id} className={styles.bannerWrapper}>
                                        <Link
                                            to={project.path}
                                            className={styles.banner}
                                            onClick={(e) => onNavigate(e, project)}
                                        >
                                            <div className={styles.imageContainer}>
                                                <img src={project.image} alt={project.title} className={styles.image} />
                                                <div className={styles.overlay} />
                                            </div>
                                            <div className={styles.content}>
                                                <div className={styles.projectNumber}>0{project.id}</div>
                                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Description bar — slides up below the cards */}
                    <motion.div
                        className={styles.descriptionBar}
                        style={{ opacity: descOpacity, y: descY, zIndex: 50 }}
                    >
                        <div className={styles.container}>
                            <div className={`${styles.descriptionBarInner} ${isFullWidth ? '' : styles.descriptionBarHalf}`}>
                                {projects.map((project) => (
                                    <div key={project.id} className={styles.descriptionItem}>
                                        <p className={styles.projectDescription}>{project.description}</p>
                                        <Link
                                            to={project.path}
                                            className={styles.cta}
                                            onClick={(e) => onNavigate(e, project)}
                                        >
                                            <span className={styles.ctaText}>View Project</span>
                                            <ArrowIcon />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>,
                document.body
            )}
        </>
    );
}

export default ShowcaseRow;
