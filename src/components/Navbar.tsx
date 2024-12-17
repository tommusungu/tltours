import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full transition-all duration-300 z-50 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-primary'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              TOUR<span className="text-primary-orange">VISOR</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex gap-8 items-center">
              <Link to="/" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                Home
              </Link>
              <Link to="/about" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                About Us
              </Link>
              <Link to="/tours" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                Pages
              </Link>
              <Link to="/destinations" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                Destinations
              </Link>
              <Link to="/blog" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                Blog
              </Link>
              <Link to="/contact" className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-primary-orange transition-colors`}>
                Contact
              </Link>
            </div>

            {/* Search and Become Expert Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button className="bg-primary-orange hover:bg-primary-orange/90 text-white rounded-full px-6">
                Become An Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};