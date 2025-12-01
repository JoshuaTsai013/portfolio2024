import './App.css'
import { useMotionValue } from "motion/react";
import SmoothScroll from "./components/SmoothScroll";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Header from './components/Header';

function App() {
  const scrollY = useMotionValue(0);

  const handleScrollY = (value) => {
    scrollY.set(value);
  };

  return (
    <>
      <Header />
      <SmoothScroll setScrollY={handleScrollY}>
        <Routes>
          <Route path="/" element={<HomePage scrollY={scrollY} />} />
          <Route path="/AboutUs" element={<div>About Us Page</div>} />
          <Route path="/Music" element={<div>Music Page</div>} />
          <Route path="/Model" element={<div>3D Model Page</div>} />
          <Route path="/Sign" element={<div>Sign Up/In Page</div>} />
        </Routes>
      </SmoothScroll>
    </>
  )
}

export default App
