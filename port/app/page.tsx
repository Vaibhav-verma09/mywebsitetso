import {
  getProfile,
  getProjects,
  getSkills,
  getServices,
  getMedia,
  getJourney,
} from '@/lib/db';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsSection from '@/components/ProjectsSection';
import LiveShowcase from '@/components/LiveShowcase';
import SkillsSection from '@/components/SkillsSection';
import StudioSection from '@/components/StudioSection';
import MediaGallery from '@/components/MediaGallery';
import JourneyTimeline from '@/components/JourneyTimeline';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const revalidate = 0; // Dynamic server rendering to reflect updates instantly

export default async function HomePage() {
  const [profile, projects, skills, services, media, journey] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getServices(),
    getMedia(),
    getJourney(),
  ]);

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col selection:bg-gold selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Hero projects={projects} mediaCount={media.length} />
        <About profile={profile} />
        <ProjectsSection initialProjects={projects} />
        <LiveShowcase />
        <SkillsSection skills={skills} />
        <StudioSection services={services} />
        <MediaGallery initialMedia={media} />
        <JourneyTimeline milestones={journey} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
