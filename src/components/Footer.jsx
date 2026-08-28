import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenResume, onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border bg-surface/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-surface-border/60">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-sm">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                JP
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-base">Yik Chun (John) Peng</span>
              <p className="text-xs text-slate-400 font-mono">Electrical & Computer Engineering @ USC</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <button onClick={onOpenResume} className="hover:text-cyan-400 transition-colors">Resume</button>
            <button onClick={onOpenTerminal} className="hover:text-cyan-400 transition-colors font-mono">CLI</button>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-surface-border"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors border border-surface-border"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg bg-surface hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors border border-surface-border"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-surface-light hover:bg-slate-700 text-cyan-400 transition-colors border border-surface-border"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} Yik Chun (John) Peng. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Engineered with React, Vite & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
