import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  Code
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, experiences, projects } from '../data/portfolioData';
import { resumeText } from '../data/resumeData';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('formatted'); // 'formatted' | 'raw'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-surface border border-surface-border rounded-2xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-surface-border bg-surface-light/50 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Resume • {personalInfo.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Electrical & Computer Engineering @ USC
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-surface border border-surface-border">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'formatted'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Formatted
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'raw'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw Text
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface hover:bg-slate-800 text-slate-300 border border-surface-border transition-colors"
              title="Copy plain text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 transition-all shadow-sm"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar bg-slate-950/60">
          
          {activeTab === 'formatted' ? (
            <div className="max-w-3xl mx-auto bg-surface rounded-xl p-6 sm:p-10 border border-surface-border text-slate-200 shadow-xl space-y-7">
              
              {/* Header */}
              <div className="text-center pb-6 border-b border-surface-border">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white uppercase mb-2">
                  Yik Chun John Peng
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                  <span>Los Angeles, CA | Chicago, IL</span>
                  <span>•</span>
                  <span>(213) 994-0547</span>
                  <span>•</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline">
                    {personalInfo.email}
                  </a>
                  <span>•</span>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                    linkedin.com/in/yc-john-peng
                  </a>
                  <span>•</span>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                    github.com/ycjohnp
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-surface-border pb-1 mb-3">
                  EDUCATION
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-sm mb-1">
                  <span className="font-bold text-white">University of Southern California</span>
                  <span className="text-xs font-mono text-slate-400">Los Angeles, CA • Expected Dec. 2027</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-slate-300 mb-2">
                  <span className="italic">Bachelor of Science, Electrical and Computer Engineering</span>
                  <span className="font-semibold text-amber-300 font-mono">GPA: 3.61</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Relevant Coursework:</strong> Data Structures and Algorithms, Distributed Systems, IoT, Embedded Systems, Linear Circuits, Proof-Based Linear Algebra, Digital Logic and RTL Design.
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-surface-border pb-1 mb-3">
                  TECHNICAL SKILLS
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <strong className="text-slate-200">Languages: </strong>
                    <span className="text-slate-300 font-mono">Python, C/C++, Java, MATLAB, Verilog, SQL, C</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Embedded Systems: </strong>
                    <span className="text-slate-300">Linux, embedded systems, firmware debugging, computer architecture, hardware/software integration, RTOS, system validation</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Robotics: </strong>
                    <span className="text-slate-300">ROS, ROS 2, Raspberry Pi, ESP32, NVIDIA Jetson, robotic actuators, joint motors, motion control, PID control, Gazebo, MoveIt</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Communication Protocols: </strong>
                    <span className="text-slate-300 font-mono">CAN, USB, Ethernet, serial communication, I2C, SPI, UART, TCP/IP, BLE</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">AI/ML & Software: </strong>
                    <span className="text-slate-300">PyTorch, LangChain, LLM APIs, vector databases, semantic search, OpenCV, YOLO, Flask, REST APIs, Firebase, Pandas</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Hardware Design: </strong>
                    <span className="text-slate-300">Altium, KiCad, EasyEDA, schematic capture, PCB layout, BOM management, PCBA, component selection, soldering, reflow assembly</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Lab & Debugging: </strong>
                    <span className="text-slate-300">Oscilloscopes, logic analyzers, multimeters, hardware bring-up, board-level verification, test automation, calibration workflows</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Tools & Workflow: </strong>
                    <span className="text-slate-300">Git/GitHub, Docker, Linux shell, Agile/Scrum, sprint planning, documentation, cross-functional technical leadership</span>
                  </div>
                </div>
              </div>

              {/* Technical Experience */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-surface-border pb-1 mb-4">
                  TECHNICAL EXPERIENCE
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs mb-1">
                        <div>
                          <strong className="text-sm font-bold text-white">{exp.role}</strong>
                          <span className="text-cyan-400 font-medium"> | {exp.company}</span>
                        </div>
                        <span className="font-mono text-slate-400 text-[11px]">{exp.location} • {exp.period}</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 leading-relaxed mt-1.5">
                        {exp.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Experience */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-surface-border pb-1 mb-4">
                  PROJECT EXPERIENCE
                </h3>
                <div className="space-y-5">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs mb-1">
                        <div>
                          <strong className="text-sm font-bold text-white">{proj.title}</strong>
                          {proj.award && (
                            <span className="text-amber-400 font-medium ml-1.5">[{proj.award}]</span>
                          )}
                        </div>
                        <span className="font-mono text-slate-400 text-[11px]">{proj.period}</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 leading-relaxed mt-1">
                        {proj.details.map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Strengths */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-surface-border pb-1 mb-3">
                  SELECTED STRENGTHS
                </h3>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                  {personalInfo.strengths.map((st, sIdx) => (
                    <li key={sIdx}>
                      <strong className="text-white">{st.title}: </strong>
                      {st.description}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-slate-950 p-6 rounded-xl border border-surface-border font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
              {resumeText}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
