import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import styles from './ProjectShowcase.module.css';

function ProjectShowcase() {
    const projects = [
        {
            id: 1,
            title: 'TechVision AI Platform',
            description: 'Advanced AI-powered platform for next-gen solutions',
            image: '/project1_cover.png',
            path: '/project/1',
            fullWidth: true
        },
        {
            id: 2,
            title: 'SoundWave Studio',
            description: 'Innovative music production and sound design',
            image: '/project2_cover.png',
            path: '/project/2',
            fullWidth: false
        },
        {
            id: 3,
            title: '3D Design Lab',
            description: 'Professional 3D modeling and visualization',
            image: '/project3_cover.png',
            path: '/project/3',
            fullWidth: false
        }
    ];

    return (
        <section id="project-showcase" className={styles.showcase} data-scroll-section>
            <div className={styles.container}>
                {/* Section title */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.title}>Featured Projects</h2>
                    <p className={styles.subtitle}>Explore my latest work and creative endeavors</p>
                </motion.div>

                {/* Project banners grid */}
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`${styles.bannerWrapper} ${project.fullWidth ? styles.fullWidth : styles.halfWidth}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Link to={project.path} className={styles.banner}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay}></div>
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.projectNumber}>0{project.id}</div>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>

                                    <div className={styles.cta}>
                                        <span className={styles.ctaText}>View Project</span>
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
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectShowcase;
