import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative h-fit bg-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-24 h-full flex items-center sm:py-16 pb-36 sm:pb-16 pt-24">
        <div className="w-full sm:w-1/2 text-white">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg mb-2 sm:mb-4 italic"
          >
            Tour with TL Tours
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold my-2 sm:my-4"
          >
            Discover The Most<br />Engaging Places
          </motion.h1>
          <p className="text-lg mb-3 sm:mb-6 text-gray-200">
            Start your journey with us and explore the world's most beautiful destinations.
          </p>
          <Link to="/tours">
            <Button size="lg" className="bg-primary-orange hover:bg-primary-orange/90">
              Start Now
            </Button>
          </Link>
        </div>
        <div className="w-1/2 hidden sm:flex">
          <img 
            src="/tourOne.jpg"
            alt="Travelers exploring"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};