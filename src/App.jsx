import './App.css'
import { useMotionValue } from "motion/react";
import SmoothScroll from "./components/SmoothScroll";
import HomePage from './pages/home';

function App() {
  const scrollY = useMotionValue(0);

  const handleScrollY = (value) => {
    scrollY.set(value);
  };

  return (
    <SmoothScroll setScrollY={handleScrollY}>
      <HomePage scrollY={scrollY} />
    </SmoothScroll>
  )
}

export default App
