'use client';

import { useState } from 'react';
import { ExternalLink, Play, RotateCcw, Monitor, ShieldCheck, AlertCircle } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  tabTitle: string;
  projectTitle: string;
  category: string;
  status: string;
  description: string;
  bulletPoints: string[];
  embedUrl: string;
  directUrl: string;
  note: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'demo-smartcar',
    tabTitle: 'Vehicle Prices (ML)',
    projectTitle: 'Smart Vehicle Price Prediction & Recommendation',
    category: 'AI/ML',
    status: 'Streamlit Cloud Live App',
    description: 'An interactive machine learning application comparing five regression models (Linear Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost) trained on the CarDekho dataset to predict real market valuations.',
    bulletPoints: [
      'Automatic model benchmarking: the best R² scoring model is dynamically selected',
      'Engineered with Python, Scikit-learn, XGBoost, and MobileNetV2 damage detection',
      'Full parameter inputs: fuel type, transmission, mileage, engine capacity, ownership history'
    ],
    embedUrl: 'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/?embed=true',
    directUrl: 'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/',
    note: 'Note: Streamlit Community Cloud puts apps to sleep when idle. If a wake-up button appears, click it and allow ~45 seconds.'
  },
  {
    id: 'demo-imagix',
    tabTitle: 'IMAGIX Studio',
    projectTitle: 'IMAGIX – In-Browser Image Studio (TSO Groups)',
    category: 'Web Tool',
    status: 'Deployed on Netlify',
    description: 'A client-side image processing studio developed for creators and designers to compress, resize, format convert, and crop graphics directly in browser memory without server uploads.',
    bulletPoints: [
      'Supports JPG, PNG, WEBP, GIF, BMP, and modern AVIF image standards',
      'Zero cloud uploads: 100% private, client-side HTML5 Canvas execution',
      'Instant interactive before/after preview comparison'
    ],
    embedUrl: 'https://imagix-tso.netlify.app',
    directUrl: 'https://imagix-tso.netlify.app',
    note: 'Tip: You can drag and drop any image or paste from clipboard (Ctrl/Cmd + V) directly into IMAGIX.'
  },
  {
    id: 'demo-smartgaon',
    tabTitle: 'Smart Village 2.0',
    projectTitle: 'Smart Village 2.0 – Digital Rural Services Platform',
    category: 'Web Prototype',
    status: 'Deployed on Netlify',
    description: 'A comprehensive rural governance and utility hub covering agricultural market prices, educational scholarship links, grievance redressal, emergency contacts, and citizen schemes.',
    bulletPoints: [
      'Bilingual interface prototype designed for accessibility and high legibility',
      'Dedicated citizen grievance submission system and verification hotline directory',
      'Dynamic agriculture pricing and fertilizer availability dashboards'
    ],
    embedUrl: 'https://smartgaon2.netlify.app/',
    directUrl: 'https://smartgaon2.netlify.app/',
    note: 'Notice: Figures, market prices, and announcements on this prototype represent sample evaluation data.'
  },
  {
    id: 'demo-grainguard',
    tabTitle: 'GrainGuard',
    projectTitle: 'GrainGuard – Acoustic Grain-Loss Monitoring Dashboard',
    category: 'AI/ML & IoT',
    status: 'Deployed on Netlify',
    description: 'An acoustic telemetry dashboard prototype that visualizes grain silo storage risk metrics, insect acoustic activity spikes, and simulated wireless sensor node telemetry.',
    bulletPoints: [
      'Multi-node sensor map with real-time risk classification and event thresholds',
      'Simulated pest activity triggers with automated alert dispatching',
      'Telemetry logs designed for agritech storage facility managers'
    ],
    embedUrl: 'https://grain-guardai.netlify.app',
    directUrl: 'https://grain-guardai.netlify.app',
    note: 'Notice: Prototype simulation mode. Hardware sensor inputs and telemetry streams are simulated in software.'
  }
];

export default function LiveShowcase() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const current = SHOWCASE_ITEMS[activeTabIdx];

  const handleTabChange = (idx: number) => {
    setActiveTabIdx(idx);
    setIsIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section id="demo" className="py-24 relative border-t border-line bg-surface-1/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="kick">Live Project Demonstrations</div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
          Interact with deployed systems, <em className="text-gold italic not-italic">live</em>
        </h2>
        <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
          Choose a project below. Run it directly within our sandboxed preview frame, or launch it in an isolated browser window.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-8 mb-8">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabChange(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                activeTabIdx === idx
                  ? 'bg-gold text-black border-gold font-semibold shadow-md'
                  : 'bg-surface-1 text-muted border-line hover:text-ink hover:border-gold/30'
              }`}
            >
              {item.tabTitle}
            </button>
          ))}
        </div>

        {/* Browser Frame */}
        <div className="border border-lineGold/40 rounded-2xl overflow-hidden bg-surface-1 shadow-2xl">
          {/* Simulated Browser Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-line text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex-1 max-w-xl mx-4 bg-bg border border-line rounded-full px-4 py-1 text-dim text-[11px] truncate flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{current.directUrl}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsIframeLoaded(false);
                  setIframeKey((prev) => prev + 1);
                }}
                className="p-1 rounded text-dim hover:text-ink hover:bg-surface-3 transition-colors"
                title="Reload Sandbox Frame"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <a
                href={current.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded text-gold hover:text-white transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Frame Body Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Info Drawer */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/5 font-medium">
                    {current.status}
                  </span>
                  <span className="text-xs text-dim uppercase tracking-wider">
                    {current.category}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-ink leading-snug mb-3">
                  {current.projectTitle}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {current.description}
                </p>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-dim font-semibold block">
                    Architecture Highlights:
                  </span>
                  <ul className="space-y-2 text-xs text-muted">
                    {current.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-line space-y-3">
                <div className="flex items-center gap-2 text-xs text-dim">
                  <AlertCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{current.note}</span>
                </div>

                <a
                  href={current.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid-gold w-full text-center text-xs justify-center"
                >
                  <span>Launch Live Fullscreen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Sandbox Iframe Stage */}
            <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[580px] bg-bg flex items-center justify-center">
              {!isIframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-bg/90 backdrop-blur-sm">
                  <Monitor className="w-12 h-12 text-gold/60 mb-4 animate-pulse" />
                  <h4 className="font-serif text-xl text-ink mb-2">
                    {current.projectTitle}
                  </h4>
                  <p className="text-xs text-dim max-w-sm mb-6">
                    Click the button below to initialize the live sandboxed embed directly on this page.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsIframeLoaded(true)}
                    className="btn-solid-gold !py-2.5 !px-6 text-xs flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Load Live App Frame</span>
                  </button>
                </div>
              )}

              {isIframeLoaded && (
                <iframe
                  key={iframeKey}
                  src={current.embedUrl}
                  title={current.projectTitle}
                  className="w-full h-full min-h-[460px] sm:min-h-[580px] border-0 bg-white"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
