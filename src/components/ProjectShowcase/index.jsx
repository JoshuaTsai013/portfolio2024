import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ProjectShowcase.module.css';
import ShowcaseRow from './ShowcaseRow';

// ─── Static data ──────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: 1,
        title: 'skyfall',
        description: 'This is a description for Project 1',
        image: '/ProjectCover1.png',
        path: '/project/skyfall',
    },
    {
        id: 2,
        title: 'wander',
        description: 'This is a description for Project 2',
        image: '/ProjectCover3.png',
        path: '/project/wander',
    },
    {
        id: 3,
        title: 'Project3',
        description: 'This is a description for Project 3',
        image: '/ProjectCover3.png',
        path: '/project/3',
    },
];

// Row grouping: each entry becomes one sticky row
// Row 1 → full-width card, Row 2 → two side-by-side cards
const ROWS = [
    [PROJECTS[0]],
    [PROJECTS[1], PROJECTS[2]],
];

// Shared duration for expand animation + navigation delay
const EXPAND_DURATION = 0.3;

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Returns Framer Motion props that animate a div from the card's rect to fullscreen
function makeExpandProps(rect) {
    return {
        initial: {
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: '3px',
        },
        animate: {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
        },
        transition: {
            duration: EXPAND_DURATION,
            ease: [0.235, 0.721, 0.352, 0.949],
        },
    };
}

// ─── Main component ───────────────────────────────────────────────────────────

function ProjectShowcase() {
    const navigate = useNavigate();
    const [expandingProject, setExpandingProject] = useState(null);

    const handleProjectClick = (e, project) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        setExpandingProject({ rect, image: project.image });
        setTimeout(() => navigate(project.path), EXPAND_DURATION * 1000);
    };

    // Compute expand props once per render to avoid repeated calls
    const expandProps = expandingProject ? makeExpandProps(expandingProject.rect) : null;

    return (
        <div className={styles.showcaseSection} id="project-showcase" data-scroll-section>
            {/* Section header */}
            <div className={styles.headerContainer}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.title}>Featured Projects</h2>
                    <p className={styles.subtitle}>Explore my latest work and creative endeavors</p>
                </motion.div>
            </div>

            {/* One ShowcaseRow per grid row — each manages its own scroll space + portal */}
            {ROWS.map((rowProjects, i) => (
                <ShowcaseRow
                    key={i}
                    projects={rowProjects}
                    onNavigate={handleProjectClick}
                />
            ))}

            {/* Click-to-navigate expand overlay — portalled to escape Locomotive transforms */}
            {expandingProject && createPortal(
                <>
                    {/* Layer 1 — cover image expands from the card's position */}
                    <motion.div {...expandProps} style={{ zIndex: 9995, pointerEvents: 'none' }}>
                        <img
                            src={expandingProject.image}
                            alt="Expanding cover"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Layer 2 — dark overlay fades in to mask the route transition */}
                    <motion.div
                        {...expandProps}
                        initial={{ ...expandProps.initial, opacity: 0 }}
                        animate={{ ...expandProps.animate, opacity: 1 }}
                        style={{ zIndex: 9999, background: '#020202', pointerEvents: 'none' }}
                    />
                </>,
                document.body
            )}
        </div>
    );
}

export default ProjectShowcase;
