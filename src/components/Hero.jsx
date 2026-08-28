import React from 'react';
import { 
  ArrowRight, 
  Terminal, 
  FileText, 
  MapPin, 
  GraduationCap, 
  Award, 
  Cpu, 
  Bot, 
  Brain, 
  Sparkles,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume, onOpenTerminal }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glows and Circuit Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm shadow-cyan-950">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-semibold text-slate-200">USC Viterbi School of Engineering</span>
              <span className="text-slate-500">|</span>
              <span>ECE '27</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-gradient">John Peng</span>
              <span className="inline-block ml-3 animate-pulse">👋</span>
            </h1>

            {/* Sub-headline / Identity */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-200 mt-4 leading-snug">
              Building at the intersection of <br className="hidden sm:block"/>
              <span className="text-cyan-400">Embedded Systems</span>, <span className="text-emerald-400">Robotics</span>, and <span className="text-violet-400">AI</span>.
            </p>

            {/* Bio Narrative */}
            <p className="text-base text-slate-300 mt-5 leading-relaxed max-w-2xl font-light">
              Engineering student and researcher dedicated to bridging hardware with intelligent software. From designing 
              <strong className="text-slate-100 font-medium"> self-assembling modular robots</strong> and <strong className="text-slate-100 font-medium">7-DOF manipulator arms</strong> to developing 
              <strong className="text-slate-100 font-medium"> Knowledge-Graph RAG pipelines</strong> for LLMs, I turn complex, ambiguous challenges into reliable physical and digital systems.
            </p>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-surface-border">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Los Angeles, CA • Chicago, IL</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-surface-border">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>USC B.S. ECE • GPA 3.61</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-surface-border">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>LA TechWeek Hardware Winner</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-surface hover:bg-slate-800 text-slate-200 border border-surface-border hover:border-slate-600 transition-all hover:-translate-y-0.5"
              >
                <span>View Experience</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-surface-light/80 hover:bg-surface-light text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition-all hover:-translate-y-0.5"
                title="Launch CLI terminal"
              >
                <Terminal className="w-4 h-4" />
                <span>$ ./run_cli</span>
              </button>
            </div>

          </div>

          {/* Right Column: Engineering HUD / Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Corner Accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>

              {/* Main HUD Card */}
              <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                
                {/* Header of HUD */}
                <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="font-mono text-xs font-semibold text-slate-200">SYSTEM ARCHITECTURE // HUD</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                    TARGET: LIVE
                  </span>
                </div>

                {/* Subsystem Telemetry Grid */}
                <div className="space-y-3">
                  
                  {/* Module 1: Hardware & PCB */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 text-cyan-300 font-medium">
                        <Cpu className="w-4 h-4" />
                        <span>PCB & Hardware Bring-Up</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">Altium / KiCad</span>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-snug">
                      Custom 2-layer RF/IMU boards, AC-signal handling, BOM & reflow assembly.
                    </p>
                  </div>

                  {/* Module 2: Robotics & Firmware */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 text-emerald-300 font-medium">
                        <Bot className="w-4 h-4" />
                        <span>Robotics & Motion Control</span>
                      </div>
                      <span className="font-mono text-[11px] text-cyan-400">ROS 2 / CAN / PID</span>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-snug">
                      7-DOF robotic arm architecture, self-assembling modular robots, and OptiTrack kinematics.
                    </p>
                  </div>

                  {/* Module 3: AI & Graph RAG */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-colors">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 text-violet-300 font-medium">
                        <Brain className="w-4 h-4" />
                        <span>AI, Graph RAG & Perception</span>
                      </div>
                      <span className="font-mono text-[11px] text-violet-400">KuzuDB / Jetson / YOLO</span>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-snug">
                      Knowledge Graph multi-hop agents, edge vision, and real-time sensory adaptation.
                    </p>
                  </div>

                </div>

                {/* Live Console Output simulation */}
                <div className="mt-4 pt-3 border-t border-surface-border">
                  <div className="font-mono text-[11px] text-slate-400 space-y-1 bg-black/40 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 inline" />
                      <span>Firmware E-Stop & ROS 2 Control: READY</span>
                    </div>
                    <div className="text-cyan-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 inline" />
                      <span>Manycore Graph RAG: +40% Relevance</span>
                    </div>
                    <div className="text-slate-500 flex items-center justify-between text-[10px]">
                      <span>STATUS: ONLINE</span>
                      <span>ENV: EMBEDDED_LINUX</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
