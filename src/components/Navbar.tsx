import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute w-full bg-white/80 backdrop-blur-sm z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">TOUR<span className="text-primary-orange">VISOR</span></span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex gap-8 items-center">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About Us</Link>
              <Link to="/tours" className="text-gray-700 hover:text-primary transition-colors">Pages</Link>
              <Link to="/destinations" className="text-gray-700 hover:text-primary transition-colors">Destinations</Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* Search and Become Expert Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5 text-gray-600" />
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