import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NavbarProps = {
  onWork?: () => void;
  onAbout?: () => void;
  onContact?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onWork, onAbout, onContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work-artifacts', onClick: onWork },
    { label: 'About', href: '#about', onClick: onAbout },
    
    { label: 'Contact', href: '#contact-finale', onClick: onContact }
  ];

  const handleNavClick = (href: string, cb?: () => void) => (e: React.MouseEvent) => {
    // 用我们自己的逻辑：阻止默认 hash 跳转（否则在 project page 时会失效/不稳定）
    e.preventDefault();
    cb?.();
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-black/50 backdrop-blur-md' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif italic tracking-tight font-bold"
          onClick={(e) => {
            e.preventDefault();
            // 点 logo 回到顶部（可选）
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsOpen(false);
          }}
        >
          Christine<span className="text-zinc-500">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={handleNavClick(item.href, item.onClick)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-medium tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </motion.a>
          ))}

          <motion.a
            href="https://drive.google.com/file/d/1wLGX65t87aJsiHmJ2AGJGNyngliOkSAW/view?usp=sharing/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-zinc-200 transition-all"
          >
            RESUME
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-zinc-800 p-8 flex flex-col items-center space-y-6 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xl font-medium"
                onClick={handleNavClick(item.href, item.onClick)}
              >
                {item.label}
              </a>
            ))}

            <a
              href="https://drive.google.com/file/d/1wLGX65t87aJsiHmJ2AGJGNyngliOkSAW/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
