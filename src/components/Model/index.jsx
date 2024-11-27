import { motion, useScroll, useSpring, useTransform, MotionValue } from "motion/react"
function Model() {
    return (
        <div className="h-screen place-items-center" >
            <h1>Model Page</h1>
            <h2>Model</h2>
            <p>
                This is the model page. It is a placeholder for the model page.
            </p>
            <motion.div className="w-10 m-10" initial={{ scale: 1 }} animate={{ scale: [1, 2, 1] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }  }> 
          <div className="h-10 w-5 bg-white place-self-center"/>
          </motion.div>
        </div>
    );
};

export default Model;