import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchBanner } from "@/components/home/SearchBanner";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AdventureSection } from "@/components/home/AdventureSection";
import { AboutSection } from "@/components/home/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SearchBanner />
      <FeaturesSection />
      <AdventureSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;