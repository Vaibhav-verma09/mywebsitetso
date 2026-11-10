'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Live Showcase', href: '#demo' },
  { label: 'Skills', href: '#skills' },
  { label: 'Creative Studio', href: '#studio' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(y / winHeight, 1));
      }

      // Check current section
      const sections = NAV_ITEMS.map((item) => document.querySelector(item.href));
      const threshold = window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection(NAV_ITEMS[i].href.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gold z-[120] transition-transform duration-75 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-bg/85 backdrop-blur-md border-b border-line py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="w-9 h-9 rounded-full border border-gold/60 flex items-center justify-center text-gold font-serif italic text-lg group-hover:border-gold group-hover:scale-105 transition-all">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-ink group-hover:text-gold transition-colors">
                Vaibhav Kumar Verma
              </span>
              <span className="text-[11px] tracking-widest text-dim uppercase">
                TSO Groups
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-1/70 border border-line rounded-full px-4 py-1.5 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-black bg-gold font-semibold shadow-sm'
                      : 'text-muted hover:text-ink hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-dim hover:text-gold flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line hover:border-gold/40 transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
            <a
              href="#contact"
              className="btn-solid-gold !py-2 !px-4 text-xs"
            >
              Let’s Talk
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-muted hover:text-gold border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[65px] bg-bg/95 backdrop-blur-xl border-t border-line p-6 flex flex-col justify-between z-[99]">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-lg font-serif text-ink hover:bg-surface-1 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-dim" />
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-line flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-solid-gold w-full text-center"
              >
                Get in Touch
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center text-xs text-dim"
              >
                Admin Management Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
