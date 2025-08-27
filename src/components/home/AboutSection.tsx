import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AboutSection = () => {
  const navigate = useNavigate()
  const handleFranceClick = () => {
    // Navigate to France destination page
    navigate('/tours/france')
  };

  const handleGhanaClick = () => {
    // Navigate to Ghana destination page
    navigate('/tours/ghana')
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
         
          
         
          <span className="text-primary-orange italic">Explore Destinations</span>
          <h2 className="text-3xl font-bold mt-2">Discover Two Worlds</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">From the romantic boulevards of Paris to the vibrant culture of Ghana, 
            experience the best of both worlds with our expertly crafted tours.</p>
        </motion.div>

        {/* France Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/seine2.jpg"
                  alt="Paris Seine River"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">Paris, France</span>
                  </div>
                  <h3 className="text-2xl font-bold">City of Light</h3>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                  <span className="w-8 h-px bg-blue-600"></span>
                  France Experience
                </span>
                <h3 className="text-3xl font-bold mt-3 mb-4 text-gray-900">
                  Romance, Art & Culinary Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Immerse yourself in the timeless elegance of Paris. Walk along the Seine, 
                  marvel at the Eiffel Tower, explore world-class museums, and savor 
                  exquisite French cuisine in charming bistros.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">7-14 Days</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">2-20 People</p>
                    <p className="text-sm text-gray-600">Group Size</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleFranceClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore France
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Ghana Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/ghana-hero.avif"
                  alt="Ghana Culture"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">Accra, Ghana</span>
                  </div>
                  <h3 className="text-2xl font-bold">Gateway of Africa</h3>
                </div>
              </div>
            </div>

            <div className="lg:order-1 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm uppercase tracking-wide">
                  <span className="w-8 h-px bg-orange-600"></span>
                  Ghana Adventure
                </span>
                <h3 className="text-3xl font-bold mt-3 mb-4 text-gray-900">
                  Rich Heritage & Warm Hospitality
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Discover Ghana's vibrant culture, ancient castles, bustling markets, 
                  and pristine beaches. Experience traditional festivals, authentic cuisine, 
                  and the legendary warmth of Ghanaian hospitality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">5-12 Days</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">4-25 People</p>
                    <p className="text-sm text-gray-600">Group Size</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGhanaClick}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Ghana
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-orange/10 to-blue-100 rounded-2xl p-8">
            <div className="flex justify-center items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600 font-medium">4.9/5 Customer Rating</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Can't decide? Experience both destinations!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our exclusive dual-destination package and discover the contrasts 
              and connections between European elegance and African authenticity.
            </p>
            <Button 
              onClick={() => console.log('Navigate to combo packages')}
              className="bg-gradient-to-r from-primary-orange to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Combo Packages
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};