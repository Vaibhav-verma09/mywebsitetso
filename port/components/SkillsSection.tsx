import { SkillCategory } from '@/lib/types';
import { Code, Cpu, Globe, Terminal, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Programming languages': <Code className="w-5 h-5 text-gold" />,
  'AI and machine learning': <Cpu className="w-5 h-5 text-gold" />,
  'Web development': <Globe className="w-5 h-5 text-gold" />,
  'Tools and technologies': <Terminal className="w-5 h-5 text-gold" />,
  'Creative skills (TSO Groups)': <Sparkles className="w-5 h-5 text-gold" />,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="kick">Skills &amp; Technologies</div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
          Tools I <em className="text-gold italic not-italic">command</em> and what I’m exploring
        </h2>
        <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
          No arbitrary percentage bars. Strictly the languages, libraries, and frameworks utilized across production codebases and ongoing research.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((categoryGroup) => {
            const icon = CATEGORY_ICONS[categoryGroup.category] || <Code className="w-5 h-5 text-gold" />;

            return (
              <div
                key={categoryGroup.category}
                className="p-7 rounded-2xl bg-surface-1 border border-line hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-lineGold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>

                  <h3 className="font-serif text-xl text-ink mb-4">
                    {categoryGroup.category}
                  </h3>

                  <ul className="flex flex-wrap gap-2">
                    {categoryGroup.skills.map((skill) => {
                      const isExploring = skill.toLowerCase().includes('exploring');
                      return (
                        <li
                          key={skill}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                            isExploring
                              ? 'border-lineGold/50 bg-gold/5 text-gold font-medium'
                              : 'border-line bg-surface-2 text-muted hover:text-ink hover:border-gold/30'
                          }`}
                        >
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between text-[11px] text-dim">
                  <span>Verified Competency</span>
                  <span className="text-gold">Active Stack</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
