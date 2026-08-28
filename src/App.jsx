import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import InteractiveTerminal from './components/InteractiveTerminal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Navigation */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
        <Stats />
        <Experience />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Modals & Interactive Overlays */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
      />
    </div>
  );
}
