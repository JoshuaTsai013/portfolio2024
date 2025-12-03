import './App.css'
import { useState, useEffect, useCallback } from 'react';
import { useMotionValue } from "motion/react";
import { AnimatePresence } from 'motion/react';
import SmoothScroll from "./components/SmoothScroll";
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import Project1 from './pages/project1';
import Project2 from './pages/project2';
import Project3 from './pages/project3';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const scrollY = useMotionValue(0);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Reset scrollY to 0 on route change
  useEffect(() => {
    scrollY.set(0);
  }, [location.pathname, scrollY]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const videoSectionHeight = window.innerHeight * 0.95;
      setHeaderVisible(latest > videoSectionHeight);
    });
  }, [scrollY]);

  const handleScrollY = useCallback((value) => {
    scrollY.set(value);
  }, [scrollY]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header isVisible={headerVisible} />
          <SmoothScroll setScrollY={handleScrollY}>
            <Routes>
              <Route path="/home" element={<HomePage scrollY={scrollY} />} />
              <Route path="/project/1" element={<Project1 scrollY={scrollY} />} />
              <Route path="/project/2" element={<Project2 scrollY={scrollY} />} />
              <Route path="/project/3" element={<Project3 scrollY={scrollY} />} />
              <Route path="/AboutUs" element={<div>About Us Page</div>} />
              <Route path="/Music" element={<div>Music Page</div>} />
              <Route path="/Model" element={<div>3D Model Page</div>} />
              <Route path="/Sign" element={<div>Sign Up/In Page</div>} />
            </Routes>
          </SmoothScroll>
        </>
      )}
    </>
  )
}

export default App
