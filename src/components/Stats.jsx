import React from 'react';
import { stats, personalInfo } from '../data/portfolioData';
import { 
  Zap, 
  Target, 
  Layers, 
  Users2, 
  PackageCheck, 
  Workflow, 
  TrendingUp, 
  Flame 
} from 'lucide-react';

export default function Stats() {
  const strengthIcons = [
    <Layers className="w-5 h-5 text-cyan-400" />,
    <Zap className="w-5 h-5 text-emerald-400" />,
    <Users2 className="w-5 h-5 text-violet-400" />,
    <PackageCheck className="w-5 h-5 text-amber-400" />
  ];

  return (
    <section className="py-12 border-y border-surface-border/60 bg-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-xl p-5 border border-surface-border/70 hover:border-cyan-500/50 group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-all"></div>
              
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/80 group-hover:scale-150 transition-transform"></span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Pillars / Selected Strengths */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              CORE ENGINEERING CAPABILITIES
            </h3>
            <p className="text-2xl font-bold text-slate-100">
              Why I Build What I Build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {personalInfo.strengths.map((item, index) => (
              <div 
                key={index}
                className="p-5 rounded-xl bg-surface-light/40 border border-surface-border/60 hover:border-slate-500/60 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-surface border border-surface-border flex items-center justify-center mb-4">
                  {strengthIcons[index % strengthIcons.length]}
                </div>
                <h4 className="text-base font-semibold text-slate-100 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
