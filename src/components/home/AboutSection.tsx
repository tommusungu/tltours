import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AboutSection = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about')
  }
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-24">
        <div className="flex flex-col sm:flex-row items-center gap-12">
          <div className="w-full flex items-center justify-center sm:w-1/2 relative">
            <div className="relative  w-full h-72 sm:w-full sm:h-96">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src="/seine2.jpg"
                  alt="Seine"
                  className="w-full h-full rounded-lg"
                />
              </motion.div>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <span className="text-primary-orange italic">Our Story</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">
              We Are The Leading Travel And Adventure Company.
            </h2>
            <p className="text-gray-600 mb-8">
            At TL Tours, we believe that travel should be an enriching and unforgettable experience. We are passionate about crafting unique and personalized journeys that go beyond the ordinary.
            </p>
            <Button onClick={handleClick} className="bg-primary-orange hover:bg-primary-orange/70">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};