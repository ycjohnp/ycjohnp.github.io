import React, { useState } from 'react';
import { 
  FolderGit2, 
  Award, 
  ExternalLink, 
  Cpu, 
  Bot, 
  Sparkles, 
  Layers, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GithubIcon, YoutubeIcon } from './Icons';
import { projects, projectFilters } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categories.includes(activeFilter) || p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>SYSTEMS & RESEARCH SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Spanning autonomous robotics, custom PCBA hardware, edge computer vision, and AI hardware agents.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-surface rounded-xl border border-surface-border self-start md:self-auto">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-surface-border hover:border-cyan-500/50 flex flex-col justify-between overflow-hidden group shadow-lg transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Card Top Banner / Media Thumbnail (if present) */}
              {project.image ? (
                <div 
                  className="relative h-48 w-full bg-slate-950/80 overflow-hidden cursor-pointer border-b border-surface-border/60"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                  
                  {/* Media Overlay Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.award && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-slate-950 shadow-md backdrop-blur-md">
                        <Award className="w-3 h-3" />
                        <span>LA TechWeek Winner</span>
                      </span>
                    )}
                    {project.youtubeId && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-600/90 text-white shadow-md backdrop-blur-md">
                        <YoutubeIcon className="w-3 h-3" />
                        <span>Demo Video</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 text-slate-300 group-hover:text-cyan-400 backdrop-blur-md border border-white/10">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {project.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {project.period}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {project.image && (
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {project.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {project.period}
                      </span>
                    </div>
                  )}

                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs font-medium text-cyan-400 mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills & Actions */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light text-slate-300 border border-surface-border/60"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light text-cyan-400 border border-cyan-500/30">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-surface-border/50">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Inspect Specs</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-surface text-slate-400 hover:text-red-400 transition-colors border border-surface-border"
                          title="Watch Demo Video"
                          aria-label="Demo Video"
                        >
                          <YoutubeIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-surface text-slate-400 hover:text-white transition-colors border border-surface-border"
                          title="View Repository"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
