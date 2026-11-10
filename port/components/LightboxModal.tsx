'use client';

import { useEffect } from 'react';
import { MediaItem } from '@/lib/types';
import { X, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  // Extract YouTube ID if it is a video
  const ytMatch = item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  const ytId = ytMatch ? ytMatch[1] : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-1 border border-lineGold rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface-2/90">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full border border-gold/40 text-gold bg-gold/10">
              {item.category}
            </span>
            <span className="text-xs text-muted uppercase tracking-wider">
              {item.kind}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-surface-3 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[75vh]">
          {item.kind === 'image' ? (
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
            />
          ) : ytId ? (
            <div className="w-full aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                title={item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-12 text-center text-muted">
              <p className="mb-4">Direct video playback is not embedded.</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid-gold !py-2 !px-4 text-xs"
              >
                <span>Watch on External Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Bottom Details */}
        <div className="p-4 sm:p-6 border-t border-line bg-surface-2 flex items-center justify-between">
          <h4 className="font-serif text-lg text-ink truncate mr-4">
            {item.title}
          </h4>
          <span className="text-xs text-dim shrink-0">
            TSO Groups Archive
          </span>
        </div>
      </div>
    </div>
  );
}
