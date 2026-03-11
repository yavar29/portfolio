import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProject from "@/components/sections/FeaturedProject";
import BuildLogSection from "@/components/sections/BuildLogSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JourneySection from "@/components/sections/JourneySection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <JourneySection />
      <FeaturedProject />
      <BuildLogSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
