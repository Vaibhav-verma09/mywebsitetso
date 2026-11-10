'use client';

import { ArrowDown, Github, Linkedin, Youtube, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

interface HeroProps {
  projects: Project[];
  mediaCount: number;
}

export default function Hero({ projects, mediaCount }: HeroProps) {
  const totalProjects = projects.length;
  const prototypesCount = projects.filter((p) => p.status === 'proto').length;
  const wipCount = projects.filter((p) => p.status === 'wip').length;

  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="orb-glow-1" />
      <div className="orb-glow-2" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold/30 bg-surface-1/80 backdrop-blur-sm text-xs font-medium text-gold mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Summer Internships & Freelance Contracts</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[76px] leading-[1.03] tracking-tight text-ink mb-6">
              Building Digital Experiences.{' '}
              <span className="italic text-gold font-normal block sm:inline">
                Exploring Intelligent Technology.
              </span>
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-muted text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-8">
              I’m <strong className="text-ink font-medium">Vaibhav Kumar Verma</strong>, a B.Tech Computer Science &amp; Engineering student at United University, Prayagraj. I architect machine-learning models and full-stack web applications, while directing <span className="text-gold">TSO Groups</span>—a studio for graphic design, video editing, and digital branding.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#projects" className="btn-solid-gold">
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-gold">
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-4 text-dim text-xs">
              <span className="text-muted uppercase tracking-wider font-semibold">Channels:</span>
              <a
                href="https://github.com/thesecretone09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center gap-1.5"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vaibhav-verma-953044344/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center gap-1.5"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@im_Vaibhav_Verma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center gap-1.5"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            </div>
          </div>

          {/* Right Visual Element: Premium Orbital Core */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-72 sm:w-96 aspect-square flex items-center justify-center">
              {/* Outer Slow Ring */}
              <div className="absolute inset-0 rounded-full border border-gold/30 border-dashed animate-spin-slow" />
              {/* Inner Reverse Ring */}
              <div className="absolute inset-8 rounded-full border border-line border-dashed animate-spin-reverse" />

              {/* Core Monogram */}
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-surface-2 to-surface-1 border border-gold/40 flex flex-col items-center justify-center shadow-2xl shadow-gold/10">
                <span className="font-serif italic text-6xl text-gold">V</span>
                <span className="text-xs uppercase tracking-widest text-dim mt-1 font-semibold">
                  TSO GROUPS
                </span>
              </div>

              {/* Orbiting Tech Chips */}
              <div className="absolute top-2 right-4 px-3 py-1 rounded-full border border-lineGold bg-bg/90 text-xs font-medium text-ink shadow-lg animate-float">
                AI / ML
              </div>
              <div
                className="absolute bottom-6 left-0 px-3 py-1 rounded-full border border-lineGold bg-bg/90 text-xs font-medium text-ink shadow-lg animate-float"
                style={{ animationDelay: '-2s' }}
              >
                Full-Stack Web
              </div>
              <div
                className="absolute bottom-10 right-6 px-3 py-1 rounded-full border border-lineGold bg-bg/90 text-xs font-medium text-ink shadow-lg animate-float"
                style={{ animationDelay: '-4s' }}
              >
                Creative Direction
              </div>
            </div>
          </div>
        </div>

        {/* Live Verified KPI Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-line">
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              {totalProjects}
            </span>
            <span className="text-xs text-muted mt-1 uppercase tracking-wider">
              Total Projects
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl text-status-proto font-normal">
              {prototypesCount}
            </span>
            <span className="text-xs text-muted mt-1 uppercase tracking-wider">
              Active Prototypes
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl text-status-wip font-normal">
              {wipCount}
            </span>
            <span className="text-xs text-muted mt-1 uppercase tracking-wider">
              In Development
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl text-gold font-normal">
              {mediaCount}
            </span>
            <span className="text-xs text-muted mt-1 uppercase tracking-wider">
              Creative Gallery Works
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Tech Marquee */}
      <div className="w-full mt-14 py-3.5 border-y border-line bg-surface-1/40 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[slide_35s_linear_infinite] will-change-transform text-muted/70 text-sm font-serif italic tracking-wide">
          <span className="mx-8 text-ink">Machine Learning</span> /
          <span className="mx-8 text-ink">Next.js &amp; React</span> /
          <span className="mx-8 text-ink">Python &amp; Scikit-learn</span> /
          <span className="mx-8 text-ink">YouTube Thumbnails</span> /
          <span className="mx-8 text-ink">Postgres &amp; Supabase</span> /
          <span className="mx-8 text-ink">Streamlit Applications</span> /
          <span className="mx-8 text-ink">Video Post-Production</span> /
          <span className="mx-8 text-ink">Digital Branding</span> /
          <span className="mx-8 text-ink">Machine Learning</span> /
          <span className="mx-8 text-ink">Next.js &amp; React</span> /
          <span className="mx-8 text-ink">Python &amp; Scikit-learn</span> /
          <span className="mx-8 text-ink">YouTube Thumbnails</span> /
        </div>
      </div>
    </section>
  );
}
