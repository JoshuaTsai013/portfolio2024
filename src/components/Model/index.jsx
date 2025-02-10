import { motion } from "motion/react"
import { motionConfig } from "../../../motion.config";
function Model({ scrollY }) {
    return (
        <div style={{ height: "1800px" }} className="place-items-center bg-zinc-700  p-40" >
            <h1>Model Page</h1>
            <h2>Model</h2>
            <p>
                This is the model page. It is a placeholder for the model page.
            </p>
            <motion.div layout={motionConfig} className="w-10 m-10" initial={{ scale: 1 }} animate={{ scale: [1, 2, 1] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}>
                <div className="h-10 w-5 bg-white place-self-center" />
            </motion.div>
        </div>
    );
};

export default Model;