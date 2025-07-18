import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutSectionTwo } from "@/components/home/AboutSectionTwo";
import { AboutSectionThree } from "@/components/home/AboutSectionThree";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 bg-primary text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We're dedicated to creating unforgettable travel experiences that inspire and connect people around the world.
          </p>
        </div>
      </motion.section>

      <AboutSectionTwo />
      <AboutSectionThree />

      <Footer />
    </div>
  );
};

export default About;