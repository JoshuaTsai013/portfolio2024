import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ProjectShowcase.module.css';

// ─── Static data ──────────────────────────────────────────────────────────────
const PROJECTS = [
    {
        id: 1,
        title: 'TechVision AI Platform',
        description: 'Advanced AI-powered platform for next-gen solutions',
        image: '/project1_cover.png',
        path: '/project/1',
        fullWidth: true,
    },
    {
        id: 2,
        title: 'SoundWave Studio',
        description: 'Innovative music production and sound design',
        image: '/project2_cover.png',
        path: '/project/2',
        fullWidth: false,
    },
    {
        id: 3,
        title: '3D Design Lab',
        description: 'Professional 3D modeling and visualization',
        image: '/project3_cover.png',
        path: '/project/3',
        fullWidth: false,
    },
];

// Duration shared between the overlay animation and the navigate() delay
const EXPAND_DURATION = 0.3;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns common motion props for both overlay layers so they stay in sync. */
function expandVariants(rect) {
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon() {
    return (
        <svg
            className={styles.ctaArrow}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
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

    return (
        <section id="project-showcase" className={styles.showcase} data-scroll-section>
            <div className={styles.container}>
                {/* Section header */}
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

                {/* Project grid */}
                <div className={styles.grid}>
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`${styles.bannerWrapper} ${project.fullWidth ? styles.fullWidth : styles.halfWidth}`}
                            initial={{ opacity: 0.9 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false, amount: 'all' }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link
                                to={project.path}
                                className={styles.banner}
                                onClick={(e) => handleProjectClick(e, project)}
                            >
                                <div className={styles.imageContainer}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay} />
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.projectNumber}>0{project.id}</div>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>

                                    <div className={styles.cta}>
                                        <span className={styles.ctaText}>View Project</span>
                                        <ArrowIcon />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Fullscreen expand overlay (rendered via portal to escape Locomotive transforms) */}
            {expandingProject && createPortal(
                <>
                    {/* Layer 1 — cover image expands from card position */}
                    <motion.div
                        {...expandVariants(expandingProject.rect)}
                        style={{ zIndex: 9995, pointerEvents: 'none' }}
                    >
                        <img
                            src={expandingProject.image}
                            alt="Expanding cover"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Layer 2 — dark overlay fades in on top to mask the route change */}
                    <motion.div
                        {...expandVariants(expandingProject.rect)}
                        initial={{ ...expandVariants(expandingProject.rect).initial, opacity: 0 }}
                        animate={{ ...expandVariants(expandingProject.rect).animate, opacity: 1 }}
                        style={{ zIndex: 9999, background: '#020202', pointerEvents: 'none' }}
                    />
                </>,
                document.body
            )}
        </section>
    );
}

export default ProjectShowcase;
