
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useRef(useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })).current;

  // Cinematic "Tunneling" effect: 1x to 15x scale
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.8, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(40px)"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  const smoothScale = useSpring(textScale, { stiffness: 60, damping: 25 });

  return (
    <section ref={containerRef} className="h-[200vh] relative overflow-visible bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <ParticlesBackground />
        
        {/* Atmosphere layer */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-[5] pointer-events-none"
        />

        <motion.div
          style={{ 
            scale: smoothScale, 
            opacity: textOpacity,
            filter: blurValue
          }}
          className="relative z-10 text-center px-6 w-full max-w-7xl pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-8 font-black">
              Christine · AI Product Designer · New York
            </span>
            
            <h1 className="text-7xl md:text-[14vw] font-serif leading-[0.75] tracking-tighter text-white perspective-container">
              <span className="block overflow-hidden">
                <span className="block">SHAPE</span>
              </span>
              <span className="block italic mt-2 opacity-80">
                <span className="block">CLARITY</span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="mt-6 text-zinc-500 text-[11px] md:text-sm tracking-[0.1em] font-medium"
            >
              Designing trustworthy, strategy-driven AI experiences.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 2 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 flex flex-col items-center z-10"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto mb-10 animate-pulse" />
          <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase font-bold">
            Dive Into the Archive
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
