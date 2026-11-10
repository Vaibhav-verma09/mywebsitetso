'use client';

import { useState } from 'react';
import { MediaItem } from '@/lib/types';
import LightboxModal from './LightboxModal';
import { Play, Eye } from 'lucide-react';

interface MediaGalleryProps {
  initialMedia: MediaItem[];
}

export default function MediaGallery({ initialMedia }: MediaGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  // Extract categories
  const categories = ['All', ...Array.from(new Set(initialMedia.map((m) => m.category || 'Other')))];

  const filteredMedia = initialMedia.filter((m) => {
    if (selectedCategory === 'All') return true;
    return (m.category || 'Other') === selectedCategory;
  });

  return (
    <section id="gallery" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="kick">Design &amp; Media Gallery</div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
          Visual Identity, <em className="text-gold italic not-italic">posters &amp; thumbnails</em>
        </h2>
        <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
          A curated archive of graphic design pieces, educational infographics, and high-impact thumbnail compositions created through TSO Groups.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8 mb-10">
          {categories.map((cat) => {
            const count = cat === 'All' ? initialMedia.length : initialMedia.filter((m) => (m.category || 'Other') === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-gold text-black border-gold font-semibold shadow-sm'
                    : 'bg-surface-1 text-muted border-line hover:text-ink hover:border-gold/30'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredMedia.length === 0 ? (
          <div className="p-12 text-center border border-line rounded-2xl bg-surface-1/40">
            <p className="text-muted font-serif text-lg">No media found in this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                className="group relative rounded-2xl overflow-hidden bg-surface-1 border border-line hover:border-gold/50 cursor-pointer break-inside-avoid shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Media Image */}
                <div className="w-full relative overflow-hidden bg-surface-2">
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Video Play Overlay if video */}
                  {item.kind === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full border border-gold bg-black/70 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white border border-white/20">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 bg-gradient-to-t from-surface-1 to-surface-1/90 border-t border-line/40">
                  <span className="text-[11px] text-gold font-medium uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base text-ink group-hover:text-gold transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </section>
  );
}
