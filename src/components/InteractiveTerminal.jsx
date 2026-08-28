import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles,
  CornerDownLeft
} from 'lucide-react';
import { personalInfo, experiences, projects, skillCategories } from '../data/portfolioData';

export default function InteractiveTerminal({ isOpen, onClose, onOpenResume }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '🤖 Welcome to John Peng\'s Embedded Systems CLI (v2.6.4-arm64-rtos)\nType "help" to view available commands or tap the quick pills below.'
    }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const quickCommands = ['help', 'about', 'skills', 'projects', 'exp', 'edu', 'contact', 'resume', 'clear'];

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    const newEntries = [
      { type: 'input', text: `john@usc-robotics:~$ ${trimmed}` }
    ];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Available commands:
  • about     - Read John's background and core focus
  • skills    - List technical skills (Hardware, Firmware, AI, Robotics)
  • projects  - Explore featured engineering projects
  • exp       - View career and research timeline
  • edu       - View USC degree, GPA, and coursework
  • contact   - Display direct contact info and links
  • resume    - View printable resume
  • whoami    - Display current user role
  • clear     - Clear terminal buffer`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `Yik Chun (John) Peng
Role: ${personalInfo.role}
Tagline: ${personalInfo.headline}

${personalInfo.bio}

Locations: ${personalInfo.locations.join(' | ')}
USC Viterbi School of Engineering (B.S. ECE, GPA: 3.61, Dec 2027)`
        });
        break;

      case 'skills':
        const skillsFormatted = skillCategories.map(c => `[${c.name}]\n  ${c.skills.join(', ')}`).join('\n\n');
        newEntries.push({
          type: 'output',
          text: skillsFormatted
        });
        break;

      case 'projects':
        const projFormatted = projects.map(p => `• ${p.title} (${p.period})\n  ${p.description}\n  Tech: ${p.tech.join(', ')}`).join('\n\n');
        newEntries.push({
          type: 'output',
          text: projFormatted
        });
        break;

      case 'exp':
      case 'experience':
        const expFormatted = experiences.map(e => `[${e.role}] @ ${e.company} (${e.period})\nLocation: ${e.location}\nSummary: ${e.summary}`).join('\n\n');
        newEntries.push({
          type: 'output',
          text: expFormatted
        });
        break;

      case 'edu':
      case 'education':
        newEntries.push({
          type: 'output',
          text: `${personalInfo.education.institution} (${personalInfo.education.location})
Degree: ${personalInfo.education.degree}
GPA: ${personalInfo.education.gpa} / 4.00
Graduation: ${personalInfo.education.graduationDate}

Coursework:
${personalInfo.education.coursework.map(c => ` • ${c}`).join('\n')}`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub:   ${personalInfo.github}`
        });
        break;

      case 'resume':
        newEntries.push({
          type: 'output',
          text: `Opening interactive resume viewer...`
        });
        if (onOpenResume) onOpenResume();
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `guest@recruiter.console (Session: Authorized Visitor)`
        });
        break;

      case 'sudo':
        newEntries.push({
          type: 'output',
          text: `Permission denied: Root access is hardware-locked via physical E-Stop switch.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `command not found: ${cmd}. Type "help" for a list of available commands.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Terminal Window */}
      <div className="relative w-full max-w-3xl bg-[#080d1a] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col h-[600px] max-h-[90vh]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-surface-border select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button 
                onClick={onClose} 
                className="w-3 h-3 rounded-full bg-rose-500 hover:brightness-125 transition-all" 
                aria-label="Close" 
              />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 ml-3 text-xs font-mono text-slate-300">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>john@usc-robotics:~ (ARM64)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setHistory([]); setInput(''); }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Clear terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Clickable Commands Bar */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          <span className="text-slate-400 text-[11px] mr-1 flex-shrink-0">QUICK:</span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              onClick={() => handleCommand(qCmd)}
              className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/40 transition-colors flex-shrink-0"
            >
              {qCmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-200 space-y-2.5 custom-scrollbar bg-[#050914]">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'system' && (
                <div className="text-cyan-400 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-900/40">
                  {item.text}
                </div>
              )}
              {item.type === 'input' && (
                <div className="text-emerald-400 font-semibold">
                  {item.text}
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-300 pl-2 border-l border-slate-800">
                  {item.text}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-rose-400 pl-2">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-semibold select-none flex-shrink-0">
            john@usc-robotics:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type "help" or click a pill...'
            className="flex-1 bg-transparent text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
