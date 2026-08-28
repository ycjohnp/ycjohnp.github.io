import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Education() {
  const { education } = personalInfo;

  return (
    <section id="education" className="py-20 md:py-28 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Education & Community
          </h2>
        </div>

        {/* Education & Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Degree Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-7 border border-surface-border hover:border-amber-500/40 relative overflow-hidden flex flex-col justify-between">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl"></div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-surface-border/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {education.institution}
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-amber-400">
                    {education.degree}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {education.graduationDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {education.location}
                  </span>
                </div>
              </div>

              {/* GPA Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono mb-6">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Cumulative GPA: <strong>{education.gpa}</strong> / 4.00</span>
              </div>

              {/* Coursework list */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>KEY COURSEWORK</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {education.coursework.map((course, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-light/40 border border-surface-border/50 text-xs font-medium text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border/50 text-xs text-slate-400 font-mono">
              Viterbi School of Engineering • Los Angeles, CA
            </div>
          </div>

          {/* Campus Leadership & Organization */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* USC Makers Card */}
            <div className="glass-card rounded-2xl p-6 border border-surface-border hover:border-cyan-500/40 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    USC Makers
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    Director of Technical Resources
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Leading technical knowledge architecture, tutorial pipelines, and resource databases for USC's 100+ member engineering club.
              </p>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5"></span>
                  <span>Confluence-style database indexing club hardware, materials, & code.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5"></span>
                  <span>Direct industry sponsorship & technical partnerships.</span>
                </div>
              </div>
            </div>

            {/* SkateMo Team Leadership */}
            <div className="glass-card rounded-2xl p-6 border border-surface-border hover:border-emerald-500/40 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    SkateMo Autonomous Team
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    Technical Project Manager (6 Engineers)
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Coordinated subsystem design across perception, electrical, and embedded control to build an autonomous electric skateboard.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
