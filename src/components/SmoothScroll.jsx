import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScroll = ({ children, setScrollY }) => {
    const scrollRef = useRef(null);
    const locomotiveScrollRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
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
        } else {
            // Update Locomotive Scroll when route changes
            setTimeout(() => {
                locomotiveScrollRef.current.update();
                locomotiveScrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
            }, 100);
        }

        return () => {
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
