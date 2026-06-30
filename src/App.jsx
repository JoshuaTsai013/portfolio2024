import './App.css'
import { useState } from 'react';
import { useMotionValue } from "motion/react";
import { AnimatePresence } from 'motion/react';
import SmoothScroll from "./components/SmoothScroll";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Project1 from './pages/project1';
import Project2 from './pages/project2';
import Project3 from './pages/project3';
import WanderApp from './pages/wander';
import Skyfall from './pages/skyfall';
import GuitarLove from './pages/guitar-love';
import LoadingScreen from './components/LoadingScreen';
import { ScrollProvider } from './contexts/ScrollContext';

function App() {
  const scrollY = useMotionValue(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleScrollY = (value) => {
    scrollY.set(value);
  };

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
        <SmoothScroll setScrollY={handleScrollY}>
          <ScrollProvider scrollY={scrollY}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/1" element={<Project1 />} />
              <Route path="/project/2" element={<Project2 />} />
              <Route path="/project/3" element={<Project3 />} />
              <Route path="/project/wander" element={<WanderApp />} />
              <Route path="/project/skyfall" element={<Skyfall />} />
              <Route path="/project/guitar-love" element={<GuitarLove />} />
            </Routes>
          </ScrollProvider>
        </SmoothScroll>
      )}
    </>
  )
}

export default App
