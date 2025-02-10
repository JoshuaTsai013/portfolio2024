import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const SmoothScroll = ({ children, setScrollY }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,

        });

        locomotiveScroll.on("scroll", (obj) => {
            setScrollY(obj.scroll.y);
        });

        return () => locomotiveScroll.destroy();
    }, [setScrollY]);

    return (
        <div ref={scrollRef} data-scroll-container>
            {children}
        </div>
    );
};

export default SmoothScroll;
