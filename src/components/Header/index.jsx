import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Headerstyle.module.css';

function Header({ isVisible = true }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  const navLinks = [
    { name: "HOME", path: "/home" },
    { name: "ABOUT US", path: "/project/1" }, // Assuming these might point to different routes later
    { name: "MUSIC", path: "/project/2" },
    { name: "3D MODEL", path: "/project/3" },
  ];

  return (
    <motion.header
      className={`${styles.navbarCustom} fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20, pointerEvents: isVisible ? "auto" : "none" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo or Brand Name could go here */}
      <div className="text-white font-bold text-xl z-50">
        {/* Placeholder for Logo if needed, or just keep empty for now as per original */}
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 items-center">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={`${styles.navlink} text-white hover:text-gray-300 transition-colors duration-300 relative`}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white z-50 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-8 h-0.5 bg-white"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-8 h-0.5 bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-8 h-0.5 bg-white"
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex flex-col justify-center items-center md:hidden z-40"
          >
            <div className="flex flex-col space-y-8 text-center">
              <div className="text-white text-2xl font-bold mb-8 tracking-widest">TRANCE MENU</div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                >
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={`${styles.navlink} text-2xl text-white hover:text-purple-400 transition-colors duration-300 block`}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
