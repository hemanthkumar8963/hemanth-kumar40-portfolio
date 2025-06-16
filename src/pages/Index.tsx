
import { Header } from '@/components/Header';
import { HomeSection } from '@/components/portfolio/HomeSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { CodingProfilesSection } from '@/components/portfolio/CodingProfilesSection';
import { ContactSection } from '@/components/portfolio/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CodingProfilesSection />
      <ContactSection />
    </div>
  );
};

export default Index;
