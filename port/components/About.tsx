import { Profile } from '@/lib/types';
import { GraduationCap, MapPin, Briefcase, Award } from 'lucide-react';

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-24 relative border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="kick">About Me</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink leading-tight mb-8">
              Code that runs with precision. Design that{' '}
              <em className="text-gold italic not-italic">lands with purpose.</em>
            </h2>

            <div className="space-y-5 text-muted text-base sm:text-lg font-light leading-relaxed">
              <p>
                I’m <span className="text-ink font-medium">{profile.fullName}</span>, currently pursuing my B.Tech in Computer Science and Engineering at {profile.educationInstitution}. My engineering focus centers on machine learning architectures, statistical model benchmarking, and modern full-stack web engineering.
              </p>
              <p>
                Alongside software engineering, I direct <span className="text-gold font-medium">{profile.studioName}</span>, a creative media and branding studio where I engineer high-conversion YouTube thumbnails, cinematic video edits, and identity systems for educational creators and businesses.
              </p>
              <p>
                The two disciplines continuously reinforce each other: I design the interface for the algorithms I code, and I build the high-performance backends for the designs I envision.
              </p>
            </div>
          </div>

          {/* Right Column: Verified Facts Box */}
          <div className="lg:col-span-5 bg-surface-1 border border-line rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-xl text-ink mb-6 pb-4 border-b border-line flex items-center justify-between">
              <span>Verified Coordinates</span>
              <span className="text-xs font-sans text-gold uppercase tracking-wider">Prayagraj, IN</span>
            </h3>

            <div className="divide-y divide-line text-sm">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-muted flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold" />
                  <span>Education</span>
                </span>
                <span className="text-ink font-medium text-right">
                  {profile.educationDegree}
                </span>
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-muted flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>University</span>
                </span>
                <span className="text-ink font-medium text-right">
                  {profile.educationInstitution}
                </span>
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-muted flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold" />
                  <span>Studio</span>
                </span>
                <span className="text-gold font-semibold text-right">
                  {profile.studioName}
                </span>
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-muted flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Base</span>
                </span>
                <span className="text-ink font-medium text-right">
                  {profile.location}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line text-xs text-dim leading-relaxed">
              * Every project, demo link, and credential on this website is labelled honestly according to its actual completion status.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
