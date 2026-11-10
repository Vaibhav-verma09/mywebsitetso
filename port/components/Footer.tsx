'use client';

import { ArrowUp, Github, Linkedin, Youtube, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-1 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-gold text-lg">V</span>
            <span className="font-serif text-ink tracking-tight">
              Vaibhav Kumar Verma
            </span>
          </div>
          <p className="text-xs text-dim mt-1">
            © {currentYear} Vaibhav Kumar Verma · TSO Groups. All rights reserved.
          </p>
        </div>

        {/* Center: Navigation Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
          <a href="#about" className="hover:text-gold transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-gold transition-colors">
            Projects
          </a>
          <a href="#demo" className="hover:text-gold transition-colors">
            Live Demos
          </a>
          <a href="#gallery" className="hover:text-gold transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-gold transition-colors">
            Contact
          </a>
          <Link
            href="/admin"
            className="hover:text-gold transition-colors flex items-center gap-1 text-dim"
          >
            <Shield className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Right: Socials & Back To Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thesecretone09"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-line text-muted hover:text-gold hover:border-gold transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/vaibhav-verma-953044344/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-line text-muted hover:text-gold hover:border-gold transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/@im_Vaibhav_Verma"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-line text-muted hover:text-gold hover:border-gold transition-colors"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-full border border-lineGold text-gold hover:bg-gold hover:text-black transition-all ml-2"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
