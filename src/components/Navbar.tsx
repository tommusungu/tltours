import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full transition-all duration-300 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-primary"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              TL<span className="text-primary-orange"> TOURS</span>
              {/* <img src={'/tltours1.png'} className="w-28 h-auto"/> */}
            </span>
          </Link>

          {/* Hamburger Menu - Small Devices */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`rounded-full  ${
                isScrolled ? "bg-primary text-white" : "bg-white text-gray-600"
              }`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex gap-8 items-center">
              <Link
                to="/"
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-primary-orange text-base transition-colors`}
              >
                Home
              </Link>

              <Link
                to="/tours"
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-primary-orange text-base transition-colors`}
              >
                Tours
              </Link>

              <Link
                to="/blogs"
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-primary-orange text-base transition-colors`}
              >
                Blogs
              </Link>

              <Link
                to="/about"
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-primary-orange text-base transition-colors`}
              >
                About
              </Link>
            </div>

            {/* Search and Contact Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => handleNavigate("/tours")}
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  isScrolled ? "text-gray-600" : "text-white"
                }`}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleNavigate("/contact")}
                className="bg-primary-orange text-base hover:bg-primary-orange/90 text-white rounded-full px-6"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col gap-4 p-4">
              <Link
                to="/"
                onClick={() => handleNavigate("/")}
                className="text-gray-700 hover:text-primary-orange text-base transition-colors"
              >
                Home
              </Link>
              <Link
                to="/tours"
                onClick={() => handleNavigate("/tours")}
                className="text-gray-700 hover:text-primary-orange text-base transition-colors"
              >
                Tours
              </Link>
              <Link
                to="/blogs"
                onClick={() => handleNavigate("/blogs")}
                className="text-gray-700 hover:text-primary-orange text-base transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/about"
                onClick={() => handleNavigate("/about")}
                className="text-gray-700 hover:text-primary-orange text-base transition-colors"
              >
                About
              </Link>
              <Button
                onClick={() => handleNavigate("/contact")}
                className="bg-primary-orange text-base hover:bg-primary-orange/90 text-white rounded-full px-6"
              >
                Contact us
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};
