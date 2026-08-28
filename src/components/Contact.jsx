import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's Build Together
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Whether you have an inquiry about robotics research, embedded hardware engineering, internship opportunities, or a collaborative project, my inbox is open.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Status Pill */}
            <div className="p-5 rounded-2xl bg-surface border border-emerald-500/30 shadow-lg">
              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active & Open to Opportunities</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Available for internships, research roles, and high-impact engineering projects across Embedded Systems, Robotics, and AI.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl glass-card border border-surface-border flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Email Address
                  </span>
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="p-2 rounded-lg bg-surface hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-surface-border"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl glass-card border border-surface-border flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Phone Number
                  </span>
                  <a 
                    href={`tel:${personalInfo.phone.replace(/[^0-9]/g, '')}`} 
                    className="text-sm font-bold text-white hover:text-emerald-400 transition-colors font-mono"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="p-2 rounded-lg bg-surface hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-surface-border"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Locations */}
            <div className="p-5 rounded-2xl glass-card border border-surface-border flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Locations
                </span>
                <span className="text-sm font-bold text-white">
                  Los Angeles, CA &bull; Chicago, IL
                </span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-card border border-surface-border flex items-center justify-between group hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-card border border-surface-border flex items-center justify-between group hover:border-slate-500 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-surface-border shadow-2xl">
              
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>DIRECT MESSAGE DISPATCH</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Robotics Research / Internship / Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello John, I came across your portfolio and would like to connect regarding..."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none custom-scrollbar"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send Message via Email</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
