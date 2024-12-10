import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-md z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">TourVisor</Link>
        <div className="flex gap-6 items-center">
          <Link to="/tours" className="text-gray-600 hover:text-primary transition-colors">Tours</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
          <Link to="/login">
            <Button variant="outline" className="mr-2">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary-orange hover:bg-primary-orange/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};