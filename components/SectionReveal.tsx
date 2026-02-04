
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 100, 
        z: -200,
        rotateX: 45, 
        scale: 0.7,
        filter: "blur(40px)"
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        z: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)"
      } : {}}
      transition={{ 
        duration: 2.5, 
        ease: [0.23, 1, 0.32, 1], // EaseOutQuartz
      }}
      className="perspective-container origin-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
