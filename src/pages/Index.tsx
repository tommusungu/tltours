import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { TourCard } from "@/components/TourCard";

const featuredTours = [
  {
    id: "1",
    title: "Mountain Biking Adventure",
    description: "Experience thrilling mountain biking trails with breathtaking views.",
    price: 149,
    image: "/lovable-uploads/15850510-55ec-40d6-bad3-25dd9e8a6f73.png",
    duration: "1 day"
  },
  {
    id: "2",
    title: "Beach Paradise Tour",
    description: "Relax on pristine beaches and enjoy water activities.",
    price: 299,
    image: "/lovable-uploads/f6ecf2fe-5dcf-4fd8-94bd-fe623b3506d5.png",
    duration: "3 days"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 bg-primary text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.h1 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Discover The Most Engaging Places
              </motion.h1>
              <p className="text-lg mb-8 text-gray-200">
                Start your journey with us and explore the world's most beautiful destinations.
              </p>
              <Link to="/tours">
                <Button size="lg" className="bg-primary-orange hover:bg-primary-orange/90">
                  Explore Tours
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <img 
                src="/lovable-uploads/15850510-55ec-40d6-bad3-25dd9e8a6f73.png" 
                alt="Travel"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Tours</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;