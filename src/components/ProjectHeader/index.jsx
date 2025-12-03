import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import styles from './ProjectHeader.module.css';

function ProjectHeader({ isVisible = true }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleBackClick = () => {
        navigate('/home');
    };

    const headerContent = (
        <motion.header
            className={`${styles.projectHeader} fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <button
                onClick={handleBackClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={styles.backButton}
                aria-label="Go back to home"
            >
                <motion.svg
                    className={styles.arrowIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ x: isHovered ? -5 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <path
                        d="M19 12H5M5 12L12 19M5 12L12 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
                <span className={styles.backText}>BACK</span>
            </button>
        </motion.header>
    );

    // Use portal to render outside of Locomotive Scroll container
    return createPortal(headerContent, document.body);
}

export default ProjectHeader;
