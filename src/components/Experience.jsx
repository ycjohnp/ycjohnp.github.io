import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Building2, 
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Experience' },
    { id: 'internship', label: 'Internships', match: (e) => e.type.includes('Internship') },
    { id: 'research', label: 'Research & Lab', match: (e) => e.type.includes('Research') },
    { id: 'leadership', label: 'Leadership', match: (e) => e.type.includes('Leadership') },
  ];

  const filteredExperiences = experiences.filter((item) => {
    if (filter === 'all') return true;
    const option = filterOptions.find(o => o.id === filter);
    return option && option.match ? option.match(item) : true;
  });

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER & RESEARCH TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Technical Experience
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-surface rounded-xl border border-surface-border self-start md:self-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === opt.id
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-surface-border space-y-12">
          
          {filteredExperiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className="relative group transition-all duration-300"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-cyan-400 group-hover:border-cyan-300 group-hover:bg-cyan-500/20 transition-all flex items-center justify-center shadow-md shadow-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></div>
              </div>

              {/* Main Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-7 border border-surface-border hover:border-cyan-500/40 shadow-lg">
                
                {/* Header info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4 pb-4 border-b border-surface-border/60">
                  <div>
                    <div className="flex items-center flex-wrap gap-2.5 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-slate-300">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="text-slate-500 hidden sm:inline">•</span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-surface-light px-3 py-1.5 rounded-lg border border-surface-border self-start lg:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Brief summary */}
                <p className="text-sm text-slate-300 font-normal mb-5 leading-relaxed bg-surface/50 p-3 rounded-xl border border-surface-border/40">
                  {exp.summary}
                </p>

                {/* Detailed Bullet Points */}
                <div className="space-y-2.5 mb-6">
                  {exp.bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills used */}
                <div className="flex items-center flex-wrap gap-1.5 pt-3 border-t border-surface-border/40">
                  <span className="text-[11px] font-mono text-slate-400 mr-1.5">STACK:</span>
                  {exp.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-surface-light/80 text-slate-300 border border-surface-border hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
