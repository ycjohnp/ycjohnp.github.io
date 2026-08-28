import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Award, 
  Cpu, 
  Layers, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { GithubIcon, YoutubeIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl bg-surface border border-surface-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-surface-border bg-surface-light/40">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              {project.award && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>{project.award}</span>
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {project.badge}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {project.period}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-sm font-medium text-cyan-400 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-surface-border"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Visual Showcase (Images / Video) */}
          {project.youtubeId && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>DEMO VIDEO & AUTONOMOUS DOCKING</span>
              </h4>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-surface-border shadow-lg bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {project.image && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                HARDWARE & PROTOTYPE VISUALS
              </h4>
              <div className={`grid ${project.secondaryImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div className="rounded-xl overflow-hidden border border-surface-border bg-black/40 flex items-center justify-center max-h-80">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                {project.secondaryImage && (
                  <div className="rounded-xl overflow-hidden border border-surface-border bg-black/40 flex items-center justify-center max-h-80">
                    <img 
                      src={project.secondaryImage} 
                      alt={`${project.title} subsystem`} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.highlights.map((hl, hIdx) => (
                <div key={hIdx} className="p-3.5 rounded-xl bg-surface-light/50 border border-surface-border">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                    {hl.label}
                  </span>
                  <span className="text-sm font-semibold text-cyan-300">
                    {hl.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              PROJECT OVERVIEW
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed bg-surface-light/30 p-4 rounded-xl border border-surface-border/50">
              {project.description}
            </p>
          </div>

          {/* Detailed Engineering Breakdown */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              ENGINEERING SPECIFICATIONS & ARCHITECTURE
            </h3>
            <div className="space-y-3">
              {project.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 p-3 rounded-lg bg-surface-light/20 border border-surface-border/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              TECHNOLOGY & PERIPHERALS
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, tIdx) => (
                <span 
                  key={tIdx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-800/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-surface-border bg-surface-light/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-surface hover:bg-slate-800 text-slate-200 border border-surface-border hover:border-slate-500 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            )}

            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>External Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
