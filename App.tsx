import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity
} from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectPage from './components/ProjectPage';
// import AIAssistant from './components/AIAssistant';
import CustomCursor from './components/CustomCursor';
import SectionReveal from './components/SectionReveal';

import { PROJECTS, CHRISTINE_BIO } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Simple state-based router for seamless experience
  const activeProject = PROJECTS.find(p => p.id === activeProjectId);

  // ====== URL <-> State sync helpers ======
  const getProjectIdFromHash = () => {
    const m = window.location.hash.match(/^#project-(.+)$/);
    return m ? m[1] : null;
  };

  const syncFromUrl = () => {
    const id = getProjectIdFromHash();
    setActiveProjectId(id);
  };

  const handleProjectSelect = (id: string) => {
    setActiveProjectId(id);
    window.history.pushState({ id }, '', `#project-${id}`);
  };

  const handleBack = () => {
    setActiveProjectId(null);
    // Clear hash without forcing a full route change
    window.history.pushState({}, '', '#');
  };

  const handleNext = () => {
    const currentIndex = PROJECTS.findIndex(p => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    const nextId = PROJECTS[nextIndex].id;

    setActiveProjectId(nextId);
    window.history.pushState({ id: nextId }, '', `#project-${nextId}`);
  };

  // ✅ Robust routing: works for refresh, direct links, back/forward
  useEffect(() => {
    // On first load / refresh
    syncFromUrl();

    const onPopState = (event: PopStateEvent) => {
      // Prefer history state when available
      const stateId = (event.state && (event.state as any).id) as string | undefined;
      if (stateId) {
        setActiveProjectId(stateId);
      } else {
        // Fallback to hash (refresh/direct link)
        syncFromUrl();
      }
    };

    const onHashChange = () => {
      syncFromUrl();
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== From 2nd code: Global Page Momentum (for home only) ======
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 50, damping: 20 });
  const skewVelocity = useTransform(smoothVelocity, [-0.5, 0.5], [-2, 2]);
  const pageRotateX = useTransform(smoothVelocity, [-1, 1], [5, -5]);
  const pageScale = useTransform(smoothVelocity, [-1, 1], [0.98, 1.02]);

  // Marquee translate (hook must be declared here, not inside JSX)
  const marqueeX = useTransform(scrollYProgress, [0.4, 1.4], ['20%', '-20%']);
  const contactBgY = useTransform(scrollYProgress, [0.8, 1], ['0%', '50%']);

  // ====== From 2nd code: About section mouse tilt ======
  const aboutX = useMotionValue(0);
  const aboutY = useMotionValue(0);
  const aboutXSpring = useSpring(aboutX, { stiffness: 80, damping: 20 });
  const aboutYSpring = useSpring(aboutY, { stiffness: 80, damping: 20 });
  const aboutRotateX = useTransform(aboutYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const aboutRotateY = useTransform(aboutXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleAboutMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    aboutX.set(xPct);
    aboutY.set(yPct);
  };

  const handleAboutMouseLeave = () => {
    aboutX.set(0);
    aboutY.set(0);
  };

  // ====== Navbar scroll navigation (Home sections) ======
  const navigateToSection = (hash: string) => {
    // if you're on a project page, go back to home first
    if (activeProjectId) {
      setActiveProjectId(null);
      window.history.pushState({}, '', '#');
    }

    // wait for home to render, then scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  return (
    <div className="relative selection:bg-white selection:text-black bg-black">
      <CustomCursor />

      {/* Scroll Progress Bar - Only on home (keeps your original behavior) */}
      {!activeProjectId && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-white z-[60] origin-left"
          style={{ scaleX }}
        />
      )}

      <AnimatePresence mode="wait">
        {!activeProjectId ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar
              onWork={() => navigateToSection('#work-artifacts')}
              onAbout={() => navigateToSection('#about')}
              onContact={() => navigateToSection('#contact-finale')}
            />

            {/* Global Wrapper with Scroll Physics (from 2nd code, applied to home main) */}
            <motion.main
              style={{
                skewY: skewVelocity,
                rotateX: pageRotateX,
                scale: pageScale,
                transformStyle: 'preserve-3d'
              }}
              className="relative z-10 origin-center"
            >
              <Hero />

              {/* 2nd code: Work Section (kept) */}
              <section id="work-artifacts" className="py-24 md:py-40 bg-black">
                <div className="container mx-auto px-6 max-w-5xl">
                  <SectionReveal>
                    <div className="mb-32 flex flex-col items-center text-center">
                      <motion.span
                        initial={{ letterSpacing: '0.2em' }}
                        whileInView={{ letterSpacing: '1.2em' }}
                        transition={{ duration: 2 }}
                        className="text-zinc-600 text-[10px] font-black uppercase mb-10"
                      >
                        The Artifacts
                      </motion.span>
                      <h2 className="text-6xl md:text-[10vw] font-serif leading-[0.85] italic text-white/90 tracking-tighter">
                        Selected <br /> <span className="not-italic opacity-50">Work</span>
                      </h2>
                    </div>
                  </SectionReveal>

                  <div className="flex flex-col gap-y-40 md:gap-y-60">
                    {PROJECTS.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="w-full cursor-pointer"
                        onClick={() => handleProjectSelect(project.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleProjectSelect(project.id);
                        }}
                        // ✅ no scale bounce
                        whileHover={{ filter: 'brightness(1.05)' }}
                        whileTap={{ filter: 'brightness(0.98)' }}
                      >
                        <ProjectCard project={project} index={index} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 2nd code: Dynamic Kinetic Marquee (kept) */}
              <section className="py-40 md:py-60 bg-white text-black overflow-hidden relative">
                <motion.div style={{ x: marqueeX }} className="whitespace-nowrap flex gap-24">
                  <span className="text-[8vw] font-serif italic tracking-tighter opacity-10 uppercase font-black">
                    Relentless —
                  </span>
                  <span className="text-[8vw] font-serif italic tracking-tighter opacity-10 uppercase font-black">
                    Relentless —
                  </span>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                  <SectionReveal>
                    <h3 className="text-4xl md:text-7xl font-serif max-w-5xl mx-auto leading-[0.9] tracking-tighter italic">
                      "Clarity in complexity <span className="not-italic"></span>{' '}
                      <span className="not-italic"></span> <span className="not-italic"></span>."
                    </h3>
                  </SectionReveal>
                </div>
              </section>

              {/* 2nd code: About Section (kept + interactive tilt) */}
              <section
                id="about"
                className="py-24 md:py-60 bg-black overflow-visible relative"
                onMouseMove={handleAboutMouseMove}
                onMouseLeave={handleAboutMouseLeave}
              >
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-60 items-center">
                    <SectionReveal>
                      <motion.div
                        className="relative group perspective-container"
                        style={{
                          rotateX: aboutRotateX,
                          rotateY: aboutRotateY,
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <div className="aspect-[3/4] bg-zinc-900 overflow-hidden transform-gpu shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] group-hover:shadow-[0_120px_240px_-60px_rgba(255,255,255,0.05)] transition-shadow duration-1000">
                          <img
                            src="assets/portrait.jpg"
                            alt="Christine - Portrait"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1544717297-fa95b3697628?q=80&w=1200&h=1600&auto=format&fit=crop';
                            }}
                          />
                        </div>

                        {/* Floating Depth Pane */}
                        <motion.div
                          style={{ transform: 'translateZ(150px)' }}
                          className="absolute -bottom-16 -right-8 glass p-10 hidden md:block border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                        >
                          <p className="text-7xl font-serif mb-4 tracking-tighter text-white/20 group-hover:text-white transition-colors duration-1000">
                            EST
                          </p>
                          <p className="text-[10px] uppercase tracking-[1em] text-zinc-500 font-black">
                            NewYork 2026
                          </p>
                        </motion.div>

                        <motion.div
                          style={{ transform: 'translateZ(-100px)' }}
                          className="absolute -top-16 -left-16 w-48 h-48 border border-white/5 bg-white/[0.02] backdrop-blur-sm -z-10 rounded-full"
                        />
                      </motion.div>
                    </SectionReveal>

                    <div className="lg:pt-10">
                      <SectionReveal>
                        <span className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.8em] mb-12 block">
                          The Soul of Work
                        </span>
                        <h2 className="text-5xl md:text-8xl font-serif mb-16 tracking-tighter text-white leading-[0.85]">
                          Christine <br />
                          <span className="italic">Lin</span>
                        </h2>
                        <div className="space-y-12 text-2xl text-zinc-500 leading-relaxed font-light max-w-2xl transition-colors hover:text-zinc-300">
                          <p>{CHRISTINE_BIO}</p>
                          <p className="border-l-4 border-white/10 pl-10 italic text-zinc-600 text-xl font-serif">
                            "I design the invisible layers of trust in digital experiences."
                          </p>
                        </div>
                      </SectionReveal>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2nd code: Contact Finale (kept) */}
              <section
                id="contact-finale"
                className="min-h-[80vh] flex items-center justify-center bg-black text-white relative overflow-hidden"
              >
                <div className="container mx-auto px-6 text-center z-10">
                  <SectionReveal>
                    <span className="text-zinc-800 text-[10px] font-black uppercase tracking-[1.5em] mb-24 block">
                      Get In Touch
                    </span>
                    <a
                      href="mailto:ql2677@nyu.edu"
                      className="text-7xl md:text-[15vw] font-serif leading-none tracking-tighter hover:italic hover:text-zinc-400 transition-all duration-1000 block mb-32"
                    >
                      LET&apos;S <br /> TALK
                    </a>

                    <div className="flex flex-wrap justify-center gap-20 text-[10px] font-black uppercase tracking-[0.8em] text-zinc-700">
                      <a href="tel:+15513712417" className="hover:text-white transition-colors">
                        5513712417
                      </a>
                      <a href="mailto:ql2677@nyu.edu" className="hover:text-white transition-colors">
                        ql2677@nyu.edu
                      </a>
                      <a href="https://www.linkedin.com/in/qinyulin/" className="hover:text-white transition-colors">
                        Linkedin
                      </a>
                    </div>
                  </SectionReveal>
                </div>

                <motion.div
                  style={{ y: contactBgY }}
                  className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex justify-center items-center"
                >
                  <span className="text-[40vw] font-black tracking-tighter opacity-10">C.</span>
                </motion.div>
              </section>
            </motion.main>
          </motion.div>
        ) : (
          <ProjectPage key={activeProjectId} project={activeProject!} onBack={handleBack} onNext={handleNext} />
        )}
      </AnimatePresence>

      {/* Keep your original footer (unchanged) */}
      <footer className="py-24 bg-black border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-zinc-700 text-[9px] tracking-[0.5em] font-black uppercase">
            &copy; ALL RIGHTS OBSERVED
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-px bg-zinc-900" />
            <span className="text-white text-lg font-serif italic">Christine.</span>
            <div className="w-20 h-px bg-zinc-900" />
          </div>
        
          <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-zinc-500 hover:text-white transition-colors text-[9px] tracking-[0.5em] font-black uppercase flex items-center gap-2"
            >
           BACK TO TOP
          </button>

        </div>
      </footer>

      {/* <AIAssistant /> */}
    </div>
  );
};

export default App;
