import React from 'react';
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import TourCreator from '../components/TourCreator';

const AITours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-6 bg-primary text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AI Tour Creator</h1>
          <p className="text-base text-gray-200 max-w-2xl mx-auto">
            Create personalized travel experiences with our advanced AI that crafts unique tours tailored to your preferences and interests.
          </p>
        </div>
      </motion.section>
      
      <div className="relative">
        <TourCreator />
      </div>
      
      <Footer />
    </div>
  );
};

export default AITours;