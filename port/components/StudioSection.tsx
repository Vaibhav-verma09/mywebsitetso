import { Service } from '@/lib/types';
import { ExternalLink, Palette, Image, FileText, Video, Youtube, Sparkles, Globe } from 'lucide-react';

interface StudioSectionProps {
  services: Service[];
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5 text-gold" />,
  Image: <Image className="w-5 h-5 text-gold" />,
  FileText: <FileText className="w-5 h-5 text-gold" />,
  Video: <Video className="w-5 h-5 text-gold" />,
  Youtube: <Youtube className="w-5 h-5 text-gold" />,
  Sparkles: <Sparkles className="w-5 h-5 text-gold" />,
  Globe: <Globe className="w-5 h-5 text-gold" />,
};

export default function StudioSection({ services }: StudioSectionProps) {
  return (
    <section id="studio" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="kick">Creative Studio &amp; Services</div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">
              TSO Groups, the <em className="text-gold italic not-italic">creative dimension</em>
            </h2>
            <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl font-light">
              Technical capability gets software to work. Deliberate design and narrative structure compel people to use it.
            </p>
          </div>

          <a
            href="https://imagix-tso.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 btn-gold !py-2.5 !px-5 text-xs self-start"
          >
            <span>Try IMAGIX Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Services Showcase Rows */}
        <div className="divide-y divide-line border-y border-line">
          {services.map((service, idx) => {
            const icon = SERVICE_ICONS[service.iconName] || <Sparkles className="w-5 h-5 text-gold" />;

            return (
              <div
                key={service.id}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:bg-surface-1/40 px-4 rounded-xl transition-all duration-300 group"
              >
                <div className="md:col-span-1 font-serif italic text-2xl text-gold/60 group-hover:text-gold transition-colors">
                  0{idx + 1}
                </div>

                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-2 border border-line flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <h3 className="font-serif text-2xl text-ink group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                </div>

                <div className="md:col-span-7">
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {service.shortDescription}
                  </p>
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[11px] px-2.5 py-0.5 rounded-full border border-line bg-surface-2/60 text-dim"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Note */}
        <div className="mt-12 p-6 rounded-2xl border border-lineGold/30 bg-surface-1/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            The studio’s flagship public tool is{' '}
            <strong className="text-ink">IMAGIX</strong>, an image studio that runs completely inside the client browser. Browse selected posters and high-CTR thumbnail samples in the gallery below.
          </p>
          <a
            href="#gallery"
            className="btn-solid-gold !py-2 !px-4 text-xs whitespace-nowrap shrink-0"
          >
            Explore Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
