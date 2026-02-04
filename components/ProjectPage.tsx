
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import SectionReveal from './SectionReveal';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
  onNext: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack, onNext }) => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-white min-h-screen selection:bg-blue-500"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] hover:text-zinc-400 transition-colors"
        >
          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
          Back to Work
        </button>
        <span className="text-[10px] font-mono opacity-50">
          PROJECT NO. {project.id.padStart(2, '0')}
        </span>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${project.accentColor ?? 'text-blue-400'}  text-[10px] font-black uppercase tracking-[1em] mb-8 block`}
          >
            {project.category}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[12vw] font-serif italic leading-none tracking-tighter"
          >
            {project.title}
          </motion.h1>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-left border-t border-white/10 pt-10">
            <div>
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-450 mb-2 opacity-50">Client</p>
              <p className="text-sm font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-450 mb-2 opacity-50">Year</p>
              <p className="text-sm font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-450 mb-2 opacity-50">Role</p>
              <p className="text-sm font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-450 mb-2 opacity-50">Services</p>
              <p className="text-sm font-medium">{project.tags.join(', ')}</p>
            </div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-white to-transparent"
        />
      </header>

      {/* Content Sections */}
      <main className="container mx-auto px-6 py-40">
        <SectionReveal>
          <div className="max-w-4xl mx-auto mb-60">
            <h2   className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>The Overview</h2>
            <p className="text-2xl md:text-5xl font-serif leading-tight text-zinc-300 italic hover:text-zinc-700 
  opacity-100 transition-all duration-1000 ease-out ease-[cubic-bezier(0.16,1,0.3,1)]">
              {project.longDescription}
            </p>
          </div>
        </SectionReveal>

        {/* Project Plan */}
        <div className="max-w-4xl mx-auto">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Project Plan</h2>
          {project.projectPlanGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative  overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>
          
           {/* Problem & Solution Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Problem&Solution</h2>
          {project.problemSolutionGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>
       
        {/* How Might We Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>How Might We…</h2>
          <SectionReveal>
          <div className="max-w-4xl mx-auto mb-60">
            <p className="text-2xl md:text-5xl font-serif leading-tight text-zinc-300 italic hover:text-zinc-700 
  opacity-100 transition-all duration-1000 ease-out ease-[cubic-bezier(0.16,1,0.3,1)]">
              {project.hmwDescription}
            </p>
          </div>
        </SectionReveal>
        </div>

        {/* Persona Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Persona</h2>
          {project.personaGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Market Research Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Market Research</h2>
          {project.marketResearchGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* User Journey Map Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>User Journey Map</h2>
          {project.userJourneyMapGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>

           {/* Storyboard Gallery */}
{Array.isArray(project.storyboardGallery) &&
  project.storyboardGallery.length > 0 && (
    <div className="max-w-4xl mx-auto mt-40">
      <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>
        Storyboard
      </h2>

      {project.storyboardGallery.map((img, idx) => (
        <SectionReveal key={idx}>
          <div
            className={`relative overflow-hidden rounded-sm group ${
              idx % 2 !== 0
                ? 'md:ml-auto md:max-w-4xl'
                : 'md:mr-auto md:max-w-4xl'
            }`}
          >
            <motion.img
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={img}
              className="w-full h-full object-contain hover:grayscale-0 transition-all duration-1000"
              alt={`Storyboard ${idx + 1}`}
            />
          </div>
        </SectionReveal>
      ))}
    </div>
)}



            {/* User Flow Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>User Flow</h2>
          {project.userFlowGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>


            {/* Infor Architecture Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Information Architecture</h2>
          {project.inforArchitectureGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>

            {/* Lowfi Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Low Fidelity</h2>
          {project.lowFiGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>


            {/* High Fidelity Gallery */}
<div className="max-w-4xl mx-auto mt-40">
  <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>
    High Fidelity
  </h2>

  {project.hiFiGallery?.map((img, idx) => (
    <SectionReveal key={idx}>
      <div
        className={[
          "relative overflow-hidden rounded-sm group",
          idx % 2 !== 0 ? "md:ml-auto md:max-w-4xl" : "md:mr-auto md:max-w-4xl",
          idx !== (project.hiFiGallery?.length ?? 0) - 1 ? "mb-16" : ""
        ].join(" ")}
      >
        <motion.img
          whileHover={{ scale: 1.0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={img}
          className="w-full h-full object-contain hover:grayscale-0 transition-all duration-1000"
          alt={`Process ${idx}`}
        />
      </div>
    </SectionReveal>
  ))}
</div>




             {/* FinalDesign Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Final Design</h2>
          {project.finalDesignGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>





             {/* Impact Gallery */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className={`${project.accentColor ?? 'text-blue-400'} text-[10px] font-black uppercase tracking-[1em] mb-12`}>Impact</h2>
          {project.impactGallery?.map((img, idx) => (
            <SectionReveal key={idx}>
              <div className={`relative overflow-hidden overflow-hidden rounded-sm group ${idx % 2 !== 0 ? 'md:ml-auto md:max-w-4xl' : 'md:mr-auto md:max-w-4xl'}`}>
                <motion.img 
                  whileHover={{ scale: 1.0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-contain  hover:grayscale-0 transition-all duration-1000"
                  alt={`Process ${idx}`}
                />
              </div>
            </SectionReveal>
          ))}
        </div>


        





      {/* Narrative Details */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-60 max-w-6xl mx-auto">
  <SectionReveal>
    <div>
      <h3 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-6">
        The Challenge
      </h3>
      <p className="text-2xl md:text-3xl font-serif italic leading-tight text-zinc-300 hover:text-zinc-700 
  opacity-100 transition-all duration-1000 ease-out ease-[cubic-bezier(0.16,1,0.3,1)]">
        {project.challenge}
      </p>
    </div>
  </SectionReveal>

  <SectionReveal>
    <div>
      <h3 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.6em] mb-6">
        The Vision
      </h3>
      <p className="text-2xl md:text-3xl font-serif italic leading-tight text-zinc-300 hover:text-zinc-700 
  opacity-100 transition-all duration-1000 ease-out ease-[cubic-bezier(0.16,1,0.3,1)]">
        {project.approach}
      </p>
    </div>
  </SectionReveal>
</div>

      </main>

      {/* Next Project Footer */}
      <footer className="py-60 bg-black text-center border-t border-white/5 cursor-pointer group" onClick={onNext}>
        <SectionReveal>
          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[1em] mb-12 block">Next Artifact</span>
          <h2 className="text-6xl md:text-[10vw] font-serif italic leading-none group-hover:tracking-wider transition-all duration-1000">
            Discover <br/> <span className="not-italic text-zinc-500 group-hover:text-white transition-colors">More</span>
          </h2>
          <div className="mt-20 overflow-hidden h-20 w-px bg-white/20 mx-auto">
             <motion.div 
               animate={{ y: ["-100%", "100%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="h-full w-full bg-blue-500"
             />
          </div>
        </SectionReveal>
      </footer>
    </motion.div>
  );
};

export default ProjectPage;
