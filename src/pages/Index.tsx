import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TourCard } from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";

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

const features = [
  {
    icon: "🎯",
    title: "Easy & Quick Booking",
    description: "Book your dream tour in just a few clicks"
  },
  {
    icon: "🌟",
    title: "Best Guide",
    description: "Experienced and knowledgeable tour guides"
  },
  {
    icon: "💬",
    title: "Enriched Communication",
    description: "24/7 support for all your queries"
  },
  {
    icon: "🌍",
    title: "Customer Care 24/7",
    description: "Round-the-clock assistance for your needs"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 bg-primary text-white relative"
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

        {/* Search Banner */}
        <div className="container mx-auto px-4 relative -mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="flex items-center gap-2">
              <MapPin className="text-primary-orange" />
              <Input placeholder="Where are you going?" className="border-none" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-primary-orange" />
              <Input type="date" className="border-none" />
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-primary-orange" />
              <Input type="number" placeholder="Number of people" className="border-none" />
            </div>
            <Button className="bg-primary-orange hover:bg-primary-orange/90 w-full">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">Experience the best travel services with our expert team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Tours</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">2000+</h3>
              <p>Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p>Destinations</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p>Tours Completed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p>Tour Guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <p className="text-gray-600 mb-4">
                  "Amazing experience! The tour was well organized and our guide was very knowledgeable."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-500">Adventure Enthusiast</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Get the latest updates and special offers directly in your inbox</p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="bg-primary-orange hover:bg-primary-orange/90">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;