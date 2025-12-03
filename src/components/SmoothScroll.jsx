import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScroll = ({ children, setScrollY }) => {
    const scrollRef = useRef(null);
    const locomotiveScrollRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Disable browser's native scroll restoration to prevent conflicts with Locomotive Scroll
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force native scroll to top on route change to prevent restoration issues
        window.scrollTo(0, 0);

        if (!locomotiveScrollRef.current) {
            // Initialize Locomotive Scroll on first mount
            locomotiveScrollRef.current = new LocomotiveScroll({
                el: scrollRef.current,
                smooth: true,
                multiplier: 1.2,
                class: "is-reveal",
                lerp: 0.05,
            });

            locomotiveScrollRef.current.on("scroll", (obj) => {
                setScrollY(obj.scroll.y);
            });

            // Ensure Locomotive Scroll starts at 0
            locomotiveScrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
        }

        return () => {
            // Optional: Reset to auto on unmount, though usually not strictly necessary for SPA root
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }

            if (locomotiveScrollRef.current) {
                locomotiveScrollRef.current.destroy();
                locomotiveScrollRef.current = null;
            }
        };
    }, [location.pathname, setScrollY]);

    return (
        <div ref={scrollRef} data-scroll-container>
            {children}
        </div>
    );
};

export default SmoothScroll;
