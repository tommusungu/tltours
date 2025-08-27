import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutSectionTwo } from "@/components/home/AboutSectionTwo";
import { AboutSectionThree } from "@/components/home/AboutSectionThree";
import { useNavigate } from "react-router-dom";
import FAQ from "@/components/home/FAQ";
import { MapPin, Clock, Users, Star, Award, Heart, Globe } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-16 bg-primary text-white relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-2">About</h1>
                        {/* <span className="text-orange-500 italic text-lg mb-6">Discover Our Story</span> */}

          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We're dedicated to creating unforgettable travel experiences that inspire and connect people around the world.
          </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main About Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/seine2.jpg"
                    alt="Seine River Paris"
                    className="w-full min-h-80 h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-medium">Paris, France</span>
                    </div>
                    <h3 className="text-2xl font-bold">Creating Memories</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    <span className="w-8 h-px bg-blue-600"></span>
                    Who We Are
                  </span>
                  <h2 className="text-3xl font-bold mt-3 mb-4 text-gray-900">
                    We Are The Leading Travel And Adventure Company
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    At TL Travel Tours, we believe that travel should be an enriching and unforgettable experience. 
                    We are passionate about crafting unique and personalized journeys that go beyond the ordinary.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <p className="text-gray-700 font-semibold">
                      <strong className="text-blue-600">Our Mission:</strong> To provide exceptional travel experiences that exceed expectations, 
                      combining expert planning with a deep understanding of your individual needs and desires.
                    </p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <Heart className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Concierge Services</p>
                      <p className="text-sm text-gray-600">24/7 support & exclusive experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                    <Globe className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Travel Planning</p>
                      <p className="text-sm text-gray-600">Complete travel arrangements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <Award className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Destination Expertise</p>
                      <p className="text-sm text-gray-600">Local culture & insider tips</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                    <Users className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Group Travel</p>
                      <p className="text-sm text-gray-600">Customized packages for all sizes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What Sets Us Apart Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/tourOne.jpg"
                    alt="Travel Experience"
                    className="w-full min-h-80 h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">Excellence in Service</span>
                    </div>
                    <h3 className="text-2xl font-bold">Beyond Expectations</h3>
                  </div>
                </div>
              </div>

              <div className="lg:order-1 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm uppercase tracking-wide">
                    <span className="w-8 h-px bg-orange-600"></span>
                    What Sets Us Apart
                  </span>
                  <h2 className="text-3xl font-bold mt-3 mb-4 text-gray-900">
                    We Go Above and Beyond to Redefine Your Travel Experience
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our commitment to excellence and personalized service makes us the preferred choice for discerning travelers.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personalized Service</h4>
                      <p className="text-gray-600 text-sm">We go beyond simply booking flights and hotels, creating bespoke itineraries tailored to your interests and budget.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Concierge Expertise</h4>
                      <p className="text-gray-600 text-sm">Our experienced concierges are available 24/7 to assist with any travel-related needs and local recommendations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Exclusive Experiences</h4>
                      <p className="text-gray-600 text-sm">We unlock access to unique experiences, from private tours to hidden gems and off-the-beaten-path adventures.</p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Commitment to Excellence</h4>
                      <p className="text-gray-600 text-sm">We strive to provide the highest level of service, ensuring your travel experience is seamless and unforgettable.</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex justify-center items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-700 font-semibold text-lg">4.9/5 Customer Rating</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-gray-600">Destinations Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
};

export default About;