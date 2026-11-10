'use client';

import { useState } from 'react';
import { Project, ProjectStatus } from '@/lib/types';
import ProjectModal from './ProjectModal';
import { ExternalLink, ArrowRight, Github } from 'lucide-react';

interface ProjectsSectionProps {
  initialProjects: Project[];
}

const STATUS_BADGES: Record<ProjectStatus, { label: string; dotColor: string; pillClass: string }> = {
  done: { label: 'Completed', dotColor: 'bg-status-done', pillClass: 'text-status-done border-status-done/30 bg-status-done/5' },
  proto: { label: 'Prototype', dotColor: 'bg-status-proto', pillClass: 'text-status-proto border-status-proto/30 bg-status-proto/5' },
  wip: { label: 'In Progress', dotColor: 'bg-status-wip', pillClass: 'text-status-wip border-status-wip/30 bg-status-wip/5' },
  idea: { label: 'Future Idea', dotColor: 'bg-status-idea', pillClass: 'text-status-idea border-status-idea/30 bg-status-idea/5' },
};

export default function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  // Filter projects
  const filteredProjects = initialProjects.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchCategory && matchStatus;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="kick">Featured Projects</div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
              Engineering with <em className="text-gold italic not-italic">transparent status</em>
            </h2>
            <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
              Every project is classified honestly. Explore machine-learning systems, full-stack prototypes, and active tools.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-dim uppercase tracking-wider mr-2 font-semibold">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-black border-gold font-semibold shadow-sm'
                    : 'bg-surface-1 text-muted border-line hover:text-ink hover:border-gold/30'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-dim uppercase tracking-wider mr-2 font-semibold">Status:</span>
            {['all', 'done', 'proto', 'wip', 'idea'].map((st) => {
              const count = st === 'all' ? initialProjects.length : initialProjects.filter((p) => p.status === st).length;
              if (st !== 'all' && count === 0) return null;
              const isSelected = selectedStatus === st;
              const badge = st !== 'all' ? STATUS_BADGES[st as ProjectStatus] : null;

              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-white/10 text-gold border-gold'
                      : 'bg-surface-1 text-muted border-line hover:text-ink hover:border-lineGold'
                  }`}
                >
                  {badge && <span className={`w-2 h-2 rounded-full ${badge.dotColor}`} />}
                  <span>{st === 'all' ? 'Any Status' : badge?.label}</span>
                  <span className="text-[10px] text-dim">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-line rounded-2xl bg-surface-1/50">
            <p className="text-muted font-serif text-lg">No projects match the current filter selection.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-4 text-xs text-gold underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const status = STATUS_BADGES[project.status];
              const isFirstLarge = idx === 0 && selectedCategory === 'all' && selectedStatus === 'all';

              return (
                <article
                  key={project.id}
                  onClick={() => setActiveModalProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className={`group relative bg-surface-1 border border-line hover:border-gold/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col ${
                    isFirstLarge ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-full bg-surface-2 overflow-hidden relative border-b border-line ${
                      isFirstLarge ? 'aspect-[21/9]' : 'aspect-video'
                    }`}
                  >
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-dim font-serif text-3xl italic">
                        {project.title.slice(0, 2)}
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${status.pillClass}`}>
                        {status.label}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-line bg-black/60 backdrop-blur-sm text-dim">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ink group-hover:text-gold transition-colors leading-snug mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-line text-dim bg-surface-2"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[11px] px-1.5 py-0.5 text-dim">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-medium">
                      <span className="text-gold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                      <div className="flex items-center gap-3 text-muted" onClick={(e) => e.stopPropagation()}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gold flex items-center gap-1"
                            title="Open Live Deployment"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gold flex items-center gap-1"
                            title="Open GitHub Repo"
                          >
                            <Github className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal View */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
