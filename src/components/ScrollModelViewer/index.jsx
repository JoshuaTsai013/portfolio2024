import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import '@google/model-viewer';
import styles from './ScrollModelViewer.module.css';

const ScrollModelViewer = ({ scrollY }) => {
    const modelRef = useRef(null);
    const [currentScrollY, setCurrentScrollY] = useState(0);

    // Subscribe to the Framer Motion scrollY MotionValue
    useMotionValueEvent(scrollY, "change", (latest) => {
        setCurrentScrollY(latest);
    });

    useEffect(() => {
        console.log('ScrollModelViewer - scrollY:', currentScrollY);
        if (modelRef.current) {
            // Calculate rotation based on scrollY (pixels)
            // Rotate 0.5 degrees for every pixel scrolled
            const rotationSpeed = 0.5;
            const theta = currentScrollY * rotationSpeed;

            // Update camera-orbit
            // Format: "theta phi radius"
            const newOrbit = `${theta}deg 75deg 105%`;
            console.log('Setting cameraOrbit to:', newOrbit);
            modelRef.current.cameraOrbit = newOrbit;
        }
    }, [currentScrollY]);

    return (
        <div className={styles.container} data-scroll-section>
            <h1>ScrollModelViewer</h1>
            <model-viewer
                ref={modelRef}
                src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                alt="A 3D model of an astronaut"
                shadow-intensity="1"
                style={{ width: '100%', maxWidth: '800px', height: '600px' }}
            >
            </model-viewer>
        </div>
    );
};

export default ScrollModelViewer;
