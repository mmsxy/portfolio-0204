
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Mouse interactivity
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  // Internal Parallax: Image moves opposite to scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="group cursor-pointer perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: 'preserve-3d',
        }}
        className="relative aspect-[16/11] bg-zinc-900 rounded-xl overflow-hidden mb-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-1000 group-hover:shadow-[0_80px_150px_-30px_rgba(255,255,255,0.05)]"
      >
        {/* Image Layer with Scroll Parallax */}
        <motion.div 
          style={{ 
            transform: 'translateZ(40px)', 
            transformStyle: 'preserve-3d',
            y: imageY 
          }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-110 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out"
          />
          
          <motion.div 
            style={{ 
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)`,
              transform: 'translateZ(2px)'
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        </motion.div>

        {/* Text UI with massive Z-depth */}
        <motion.div 
          style={{ transform: 'translateZ(180px)', transformStyle: 'preserve-3d' }}
          className="absolute inset-0 flex flex-col justify-end p-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
        >
          <div className="overflow-hidden">
            <motion.p className="text-white text-[10px] font-black tracking-[0.8em] uppercase mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
              Artifact {project.id}
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h4 className="text-white text-5xl md:text-6xl font-serif italic mb-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-700 delay-100 tracking-tighter">
              {project.title}
            </motion.h4>
          </div>
          <motion.div className="w-12 h-0.5 bg-white/20 group-hover:w-24 transition-all duration-1000 delay-300" />
        </motion.div>
      </motion.div>
      
      <div className="flex justify-between items-center px-4">
        <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{project.category}</span>
        <div className="h-px flex-1 bg-zinc-900 mx-10 transition-colors group-hover:bg-zinc-700" />
        <span className="text-zinc-400 font-mono text-xs">/ 2025</span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
