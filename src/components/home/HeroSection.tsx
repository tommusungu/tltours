import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative h-screen bg-primary overflow-hidden">
      <div className="container mx-auto px-4 h-full flex items-center pt-20">
        <div className="w-1/2 text-white">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg mb-4 italic"
          >
            Natural Beauty
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Discover The Most<br />Engaging Places
          </motion.h1>
          <p className="text-lg mb-8 text-gray-200">
            Start your journey with us and explore the world's most beautiful destinations.
          </p>
          <Link to="/tours">
            <Button size="lg" className="bg-primary-orange hover:bg-primary-orange/90">
              Start Now
            </Button>
          </Link>
        </div>
        <div className="w-1/2">
          <img 
            src="/lovable-uploads/8dc39654-4b08-40b4-b1fe-dbe25b65f487.png"
            alt="Travelers exploring"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};