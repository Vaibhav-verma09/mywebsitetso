import { JourneyMilestone } from '@/lib/types';

interface JourneyTimelineProps {
  milestones: JourneyMilestone[];
}

const STATUS_INDICATORS: Record<string, { dotColor: string; textColor: string; label: string }> = {
  done: { dotColor: 'bg-status-done', textColor: 'text-status-done', label: 'Achieved' },
  proto: { dotColor: 'bg-status-proto', textColor: 'text-status-proto', label: 'Next Focus' },
  wip: { dotColor: 'bg-status-wip', textColor: 'text-status-wip', label: 'In Progress' },
  idea: { dotColor: 'bg-status-idea', textColor: 'text-status-idea', label: 'Long-Term Vision' },
};

export default function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  return (
    <section id="journey" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="kick">Experience &amp; Learning Journey</div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
          Where I am, and where I’m <em className="text-gold italic not-italic">heading</em>
        </h2>
        <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
          An honest, uninflated record of education, shipped implementations, and active aspirations.
        </p>

        {/* Timeline Line */}
        <div className="relative mt-16 max-w-3xl ml-4 sm:ml-8 pl-6 sm:pl-10 border-l border-line space-y-12">
          {milestones.map((m) => {
            const statusConfig = STATUS_INDICATORS[m.statusType] || STATUS_INDICATORS.done;

            return (
              <div key={m.id} className="relative group">
                {/* Node Dot on the Line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-bg ${statusConfig.dotColor} ring-4 ring-bg`}
                />

                {/* Period Pill & Status */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold font-sans">
                    {m.period}
                  </span>
                  <span className="text-dim">•</span>
                  <span className={`text-[11px] font-medium ${statusConfig.textColor}`}>
                    {statusConfig.label}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="font-serif text-2xl text-ink mb-1 group-hover:text-gold transition-colors">
                  {m.title}
                </h3>

                {/* Organization */}
                {m.organization && (
                  <span className="text-xs text-dim block mb-2 font-medium">
                    {m.organization}
                  </span>
                )}

                {/* Description */}
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
