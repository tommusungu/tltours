import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchBanner } from "@/components/home/SearchBanner";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AdventureSection } from "@/components/home/AdventureSection";
import { AboutSection } from "@/components/home/AboutSection";
import { RecommendedTours } from "@/components/home/RecommendedTours";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      {/* <SearchBanner /> */}
      <FeaturesSection />
      <RecommendedTours/>
      <AdventureSection />
      <AboutSection />
      <FAQ/>
      <Footer />
    </div>
  );
};

export default Index;