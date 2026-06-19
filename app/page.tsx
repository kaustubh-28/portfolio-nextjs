import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BenchmarksSection from "@/components/sections/BenchmarksSection";
import ContactMeSction from "@/components/sections/ContactMeSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BenchmarksSection />
        <ContactMeSction />
      </main>
      <Footer />
    </>
  );
}
