import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { TourCard } from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tours = [
  {
    id: "1",
    title: "Mountain Biking Adventure",
    description: "Experience thrilling mountain biking trails with breathtaking views.",
    price: 149,
    image: "/lovable-uploads/15850510-55ec-40d6-bad3-25dd9e8a6f73.png",
    duration: "1 day",
    category: "adventure"
  },
  {
    id: "2",
    title: "Beach Paradise Tour",
    description: "Relax on pristine beaches and enjoy water activities.",
    price: 299,
    image: "/lovable-uploads/f6ecf2fe-5dcf-4fd8-94bd-fe623b3506d5.png",
    duration: "3 days",
    category: "relaxation"
  },
];

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">All Tours</h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "adventure" ? "default" : "outline"}
                onClick={() => setSelectedCategory("adventure")}
              >
                Adventure
              </Button>
              <Button
                variant={selectedCategory === "relaxation" ? "default" : "outline"}
                onClick={() => setSelectedCategory("relaxation")}
              >
                Relaxation
              </Button>
            </div>
          </div>

          {/* Tours Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tours;