import React, { useState } from 'react';
import { 
  Cpu, 
  Code, 
  Bot, 
  Network, 
  Brain, 
  Wrench, 
  GitBranch, 
  Search, 
  Layers, 
  Check, 
  Sparkles,
  CircuitBoard
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Languages': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Hardware & PCB Design': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Embedded Systems & Firmware': return <CircuitBoard className="w-4 h-4 text-sky-400" />;
      case 'Robotics & Controls': return <Bot className="w-4 h-4 text-violet-400" />;
      case 'Communication Protocols': return <Network className="w-4 h-4 text-amber-400" />;
      case 'AI/ML, Vision & Software': return <Brain className="w-4 h-4 text-rose-400" />;
      case 'Lab, Debugging & Instrumentation': return <Wrench className="w-4 h-4 text-teal-400" />;
      case 'Tools & Leadership': return <GitBranch className="w-4 h-4 text-indigo-400" />;
      default: return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  const matchesSearch = (skill) => {
    if (!searchTerm.trim()) return false;
    return skill.toLowerCase().includes(searchTerm.toLowerCase().trim());
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>TECHNICAL CAPABILITIES MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Skills & Instrumentation
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Cross-disciplinary stack spanning silicon PCB layouts, embedded firmware, robotic controls, and modern AI pipelines.
            </p>
          </div>

          {/* Quick Skill Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skill (e.g. ROS 2, Altium)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-surface-border text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => {
            const hasMatchedSkill = category.skills.some(matchesSearch);

            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  hasMatchedSkill
                    ? 'border-cyan-400 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'border-surface-border hover:border-slate-600'
                }`}
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-surface-border/60">
                    <div className="p-2 rounded-lg bg-surface border border-surface-border/60">
                      {getCategoryIcon(category.name)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-light line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Pill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.skills.map((skill, sIdx) => {
                      const isHighlighted = matchesSearch(skill);
                      return (
                        <span
                          key={sIdx}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                            isHighlighted
                              ? 'bg-cyan-400 text-slate-950 font-bold scale-105 shadow-sm'
                              : 'bg-surface-light/80 text-slate-300 border border-surface-border/80 hover:border-cyan-500/40 hover:text-cyan-300'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
