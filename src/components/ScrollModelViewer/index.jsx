import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { useScrollValue } from '../../contexts/ScrollContext';
import '@google/model-viewer';

const ScrollModelViewer = ({ rotationSpeed, modelSrc}) => {
    const scrollY = useScrollValue();
    const modelRef = useRef(null);
    const [currentScrollY, setCurrentScrollY] = useState(0);

    // Subscribe to the Framer Motion scrollY MotionValue
    useMotionValueEvent(scrollY, "change", (latest) => {
        setCurrentScrollY(latest);
    });

    useEffect(() => {
        // console.log('ScrollModelViewer - scrollY:', currentScrollY);
        if (modelRef.current) {
            // Calculate rotation based on scrollY (pixels)
            // Rotate 0.5 degrees for every pixel scrolled
            const _rotationSpeed = rotationSpeed;
            const theta = currentScrollY * _rotationSpeed;

            // Update camera-orbit
            // Format: "theta phi radius"
            const newOrbit = `${theta}deg 75deg 105%`;
            // console.log('Setting cameraOrbit to:', newOrbit);
            modelRef.current.cameraOrbit = newOrbit;
        }
    }, [currentScrollY, rotationSpeed]);

    return (
        // <div className={styles.container} data-scroll-section>
        //     <h1>ScrollModelViewer</h1>
            <model-viewer
                ref={modelRef}
                src={modelSrc}
                // Add modelSrc to the component props
                alt="A 3D model"
                shadow-intensity="1"
                camera-controls
                disable-zoom
                style={{ width: '100%', maxWidth: '800px', height: '600px' }}
            >
            </model-viewer>
        // </div>
    );
};

export default ScrollModelViewer;
