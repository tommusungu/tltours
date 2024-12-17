import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-12">
          <div className="w-1/2 relative">
            <div className="relative rounded-full bg-primary-orange/20 w-96 h-96">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="w-1/2">
            <span className="text-primary-orange italic">Our Story</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">
              We Are The Leading Travel And Adventure Company.
            </h2>
            <p className="text-gray-600 mb-8">
              With years of experience and a passion for adventure, we create unforgettable journeys that combine excitement, safety, and comfort. Our expert guides and carefully crafted itineraries ensure you get the most out of every experience.
            </p>
            <Button className="bg-primary-orange hover:bg-primary-orange/90">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};