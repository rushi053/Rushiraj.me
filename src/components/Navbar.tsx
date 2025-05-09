'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/ios-apps', label: 'iOS Apps' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      className="py-8 md:py-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center md:justify-center relative border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="md:absolute md:left-0"
        >
          <Link href="/" className="text-xl font-normal tracking-tight">
            Rushiraj
          </Link>
        </motion.div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link 
                href={item.href} 
                className="text-sm tracking-wide hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors uppercase"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="md:absolute md:right-0">
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-5 flex flex-col space-y-4 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="text-sm uppercase tracking-wide hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 