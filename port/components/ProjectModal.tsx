'use client';

import { useEffect } from 'react';
import { Project } from '@/lib/types';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const STATUS_LABELS: Record<string, { label: string; colorClass: string }> = {
  done: { label: 'Completed', colorClass: 'text-status-done border-status-done/40 bg-status-done/10' },
  proto: { label: 'Prototype', colorClass: 'text-status-proto border-status-proto/40 bg-status-proto/10' },
  wip: { label: 'In Progress', colorClass: 'text-status-wip border-status-wip/40 bg-status-wip/10' },
  idea: { label: 'Future Idea', colorClass: 'text-status-idea border-status-idea/40 bg-status-idea/10' },
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const statusConfig = STATUS_LABELS[project.status] || {
    label: project.status,
    colorClass: 'text-muted border-line',
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-1 border border-lineGold rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface-2/80">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${statusConfig.colorClass}`}
            >
              {statusConfig.label}
            </span>
            <span className="text-xs text-dim uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-surface-3 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Image preview if present */}
          {project.imageUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-line bg-black relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-ink mb-3 leading-snug">
              {project.title}
            </h3>
            <p className="text-muted text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider text-dim block mb-2 font-semibold">
                Technologies &amp; Libraries
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-line bg-surface-2 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {project.nextStep && (
            <div className="p-4 rounded-xl border border-lineGold/30 bg-surface-2/50">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-semibold mb-1">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Next Milestone / Active Roadmap</span>
              </div>
              <p className="text-sm text-ink">{project.nextStep}</p>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-line flex flex-wrap items-center gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid-gold !py-2.5 !px-5 text-sm"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-xs text-dim italic">
                * Live public deployment pending local model validation.
              </span>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold !py-2.5 !px-5 text-sm"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
