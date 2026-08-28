import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FileText, 
  Menu, 
  X, 
  Cpu, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenResume, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/85 backdrop-blur-md border-b border-surface-border/60 py-3 shadow-lg shadow-black/20' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="group flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-base">
              JP
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              <span>John Peng</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                USC ECE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">Hardware • Robotics • AI</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/70 px-3 py-1.5 rounded-full border border-surface-border/50 backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm border border-cyan-500/30'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-sm group"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 group-hover:text-cyan-400" />
            <span>CLI</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35"
          >
            <FileText className="w-3.5 h-3.5 text-slate-950" />
            <span>Resume</span>
          </button>

          <div className="h-5 w-px bg-surface-border mx-1"></div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface/60 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors border border-surface-border/40"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors border border-surface-border/40"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-800 text-cyan-300 border border-cyan-500/30"
            aria-label="Open CLI Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface text-slate-300 hover:text-white border border-surface-border"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-border mt-3 px-4 py-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
            
            <div className="h-px bg-surface-border my-2"></div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-cyan-500/30"
              >
                <Terminal className="w-4 h-4" />
                <span>CLI Terminal</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-3 text-slate-400">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span>•</span>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs hover:text-cyan-400"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
