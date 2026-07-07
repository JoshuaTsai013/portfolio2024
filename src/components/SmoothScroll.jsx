import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScroll = ({ children, setScrollY }) => {
    const scrollRef = useRef(null);
    const locomotiveScrollRef = useRef(null);
    const location = useLocation();

    // Disable browser's native scroll restoration (one-time setup)
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    // Destroy and recreate Locomotive on every route change to ensure fresh state
    useEffect(() => {
        // Destroy existing instance if it exists
        if (locomotiveScrollRef.current) {
            locomotiveScrollRef.current.destroy();
            locomotiveScrollRef.current = null;
        }

        // CRITICAL: Manually clear any lingering transforms on the container
        if (scrollRef.current) {
            scrollRef.current.style.transform = '';
        }

        // Wait for DOM to update, then create fresh instance
        requestAnimationFrame(() => {
            locomotiveScrollRef.current = new LocomotiveScroll({
                el: scrollRef.current,
                smooth: true,
                multiplier: 1.2,
                class: "is-reveal",
                lerp: 0.04,
            });

            locomotiveScrollRef.current.on("scroll", (obj) => {
                setScrollY(obj.scroll.y);
            });

            // Handle initial scroll position
            if (location.state && location.state.target) {
                const targetElement = document.querySelector(`#${location.state.target}`);
                if (targetElement) {
                    locomotiveScrollRef.current.scrollTo(targetElement, { duration: 0, disableLerp: true });
                } else {
                    locomotiveScrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
                }
                // Clear the target from history state
                window.history.replaceState({}, '');
            } else {
                locomotiveScrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
            }
        });

        // Also reset native scroll
        window.scrollTo(0, 0);

        return () => {
            if (locomotiveScrollRef.current) {
                locomotiveScrollRef.current.destroy();
                locomotiveScrollRef.current = null;
            }
        };
        // location.state is deliberately NOT a dependency: locomotive must be
        // destroyed/recreated only on route (pathname) change; state only carries
        // the initial scroll target read during that rebuild.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, setScrollY]);

    return (
        <div ref={scrollRef} data-scroll-container>
            {children}
        </div>
    );
};

export default SmoothScroll;
